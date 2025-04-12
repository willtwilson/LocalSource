#!/bin/bash

# Enable debugging
set -x

# Make script stop on first error
set -e

# Get the actual directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SCRAPERS_DIR="$SCRIPT_DIR/scrapers"
cd "$SCRIPT_DIR"

echo "=== HedgeVeg.je Data Scraper and Loader ==="
echo "============================================"
echo
echo "Running from directory: $SCRIPT_DIR"
echo "Scrapers directory: $SCRAPERS_DIR"
echo
echo "Files in scrapers directory:"
ls -la "$SCRAPERS_DIR"
echo

# Determine Python command (python3 vs python)
if [ -d "$SCRAPERS_DIR/venv" ]; then
    PYTHON_CMD="$SCRAPERS_DIR/venv/bin/python3"
    echo "Using Python from virtual environment"
else
    PYTHON_CMD="python3"
    if ! command -v $PYTHON_CMD &> /dev/null; then
        PYTHON_CMD="python"
        if ! command -v $PYTHON_CMD &> /dev/null; then
            echo "Python not found. Please install Python 3."
            exit 1
        fi
    fi
    echo "Using Python command: $PYTHON_CMD"
fi

# Check Node requirements
echo "Checking NodeJS requirements..."
if ! command -v npm &> /dev/null; then
    echo "npm not found. Please install Node.js and npm."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "node not found. Please install Node.js."
    exit 1
fi

# Warn about dependencies
echo
echo "Warning: This script requires the following dependencies:"
echo "- Python: playwright, numpy, requests, json, uuid"
echo "- Node.js: puppeteer"
echo
echo "If you encounter errors, you may need to install them manually using:"
echo "  $PYTHON_CMD -m pip install playwright numpy requests"
echo "  $PYTHON_CMD -m playwright install chromium --with-deps"
echo "  npm install puppeteer"
echo

read -p "Press Enter to continue or Ctrl+C to cancel..." dummy
echo

# Run with best-effort approach (continue even if some steps fail)
ERRORS=0

# Step 1: Run the Playwright scraper
echo "Step 1: Running Playwright scraper..."
if [ -f "$SCRAPERS_DIR/playwright_scraper.py" ]; then
    echo "Running command: (cd $SCRAPERS_DIR && $PYTHON_CMD playwright_scraper.py)"
    (cd "$SCRAPERS_DIR" && $PYTHON_CMD playwright_scraper.py) || {
        echo "Error running Playwright scraper. Check dependencies."
        ((ERRORS++))
    }
else
    echo "Error: playwright_scraper.py not found in $SCRAPERS_DIR"
    ((ERRORS++))
fi
echo

# Step 2: Run the Puppeteer scraper
echo "Step 2: Running Puppeteer scraper..."
if [ -f "$SCRAPERS_DIR/puppeteer_scraper.js" ]; then
    # Install puppeteer if needed
    if [ ! -d "$SCRAPERS_DIR/node_modules" ]; then
        echo "Installing Puppeteer..."
        (cd "$SCRAPERS_DIR" && npm init -y && npm install puppeteer) || {
            echo "Error installing Puppeteer. Trying to continue anyway."
        }
    fi
    
    echo "Running command: (cd $SCRAPERS_DIR && node puppeteer_scraper.js)"
    (cd "$SCRAPERS_DIR" && node puppeteer_scraper.js) || {
        echo "Error running Puppeteer scraper. Check dependencies."
        ((ERRORS++))
    }
else
    echo "Error: puppeteer_scraper.js not found in $SCRAPERS_DIR"
    ((ERRORS++))
fi
echo

# Step 3: Reconcile the data
echo "Step 3: Reconciling data from both scrapers..."
if [ -f "$SCRAPERS_DIR/reconcile_data.py" ]; then
    echo "Running command: (cd $SCRAPERS_DIR && $PYTHON_CMD reconcile_data.py)"
    (cd "$SCRAPERS_DIR" && $PYTHON_CMD reconcile_data.py) || {
        echo "Error running reconciliation script. Check dependencies."
        ((ERRORS++))
    }
else
    echo "Error: reconcile_data.py not found in $SCRAPERS_DIR"
    ((ERRORS++))
fi
echo

# Check if we have the SQL file
if [ ! -f "$SCRAPERS_DIR/seed_database.sql" ]; then
    echo "Error: SQL file not generated. Cannot proceed to upload."
    ((ERRORS++))
else
    # Step 4: Upload to Supabase
    echo "Step 4: Uploading data to Supabase..."
    echo "Supabase Project ID: zmobmsmtlkbdkffonqgz"
    echo "This step requires the Supabase CLI. Choose an option:"
    echo "1. Use the Supabase SQL Editor (recommended)"
    echo "2. Use the Supabase CLI (if installed)"
    echo "3. Skip this step"
    read -p "Select option (1-3): " upload_option

    case $upload_option in
      1)
        echo "Please copy the SQL from '$SCRAPERS_DIR/seed_database.sql' into the Supabase SQL Editor at:"
        echo "https://app.supabase.com/project/zmobmsmtlkbdkffonqgz/sql"
        echo "and execute it there."
        ;;
      2)
        echo "Running with Supabase CLI..."
        npx supabase sql --db-url "postgres://$SUPABASE_DB_USER:$SUPABASE_DB_PASSWORD@$SUPABASE_DB_HOST:$SUPABASE_DB_PORT/$SUPABASE_DB_NAME" --file "$SCRAPERS_DIR/seed_database.sql" || {
            echo "Error running Supabase CLI. Check configuration."
            ((ERRORS++))
        }
        ;;
      3)
        echo "Skipping database upload. You can upload manually later."
        ;;
      *)
        echo "Invalid option. Skipping database upload."
        ;;
    esac
fi

echo
echo "=== Process Complete ==="
if [ $ERRORS -gt 0 ]; then
    echo "Warning: $ERRORS errors occurred during execution."
    echo "Check the output above for details."
fi
echo "SQL file is available at: $SCRAPERS_DIR/seed_database.sql"
echo "Reconciled data JSON is available at: $SCRAPERS_DIR/reconciled_data.json"

# Seed the database if requested
if [ "$1" = "--seed" ]; then
  echo "Seeding database..."
  (cd "$SCRAPERS_DIR" && ./seed_database.sh)
fi

echo "Done!"

# Disable debugging
set +x 