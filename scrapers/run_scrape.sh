#!/bin/bash

# Make script stop on first error
set -e

echo "=== HedgeVeg.je Data Scraper and Loader ==="
echo "============================================"
echo

# Determine Python command (python3 vs python)
PYTHON_CMD="python3"
if ! command -v $PYTHON_CMD &> /dev/null; then
    PYTHON_CMD="python"
    if ! command -v $PYTHON_CMD &> /dev/null; then
        echo "Python not found. Please install Python 3."
        exit 1
    fi
fi
echo "Using Python command: $PYTHON_CMD"

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
echo "  $PYTHON_CMD -m pip install --user playwright numpy requests"
echo "  $PYTHON_CMD -m playwright install chromium --with-deps"
echo "  (cd scrapers && npm install puppeteer)"
echo
read -p "Press Enter to continue or Ctrl+C to cancel..." dummy
echo

# Ensure required directories exist
mkdir -p scrapers

# Run with best-effort approach (continue even if some steps fail)
ERRORS=0

# Step 1: Run the Playwright scraper
echo "Step 1: Running Playwright scraper..."
if [ -f "scrapers/playwright_scraper.py" ]; then
    (cd scrapers && $PYTHON_CMD playwright_scraper.py) || {
        echo "Error running Playwright scraper. Check dependencies."
        ((ERRORS++))
    }
else
    echo "Error: scrapers/playwright_scraper.py not found."
    ((ERRORS++))
fi
echo

# Step 2: Run the Puppeteer scraper
echo "Step 2: Running Puppeteer scraper..."
if [ -f "scrapers/puppeteer_scraper.js" ]; then
    # Install puppeteer if needed
    if [ ! -d "scrapers/node_modules" ]; then
        echo "Installing Puppeteer..."
        (cd scrapers && npm init -y && npm install puppeteer) || {
            echo "Error installing Puppeteer. Trying to continue anyway."
        }
    fi
    
    (cd scrapers && node puppeteer_scraper.js) || {
        echo "Error running Puppeteer scraper. Check dependencies."
        ((ERRORS++))
    }
else
    echo "Error: scrapers/puppeteer_scraper.js not found."
    ((ERRORS++))
fi
echo

# Step 3: Reconcile the data
echo "Step 3: Reconciling data from both scrapers..."
if [ -f "scrapers/reconcile_data.py" ]; then
    (cd scrapers && $PYTHON_CMD reconcile_data.py) || {
        echo "Error running reconciliation script. Check dependencies."
        ((ERRORS++))
    }
else
    echo "Error: scrapers/reconcile_data.py not found."
    ((ERRORS++))
fi
echo

# Check if we have the SQL file
if [ ! -f "scrapers/seed_database.sql" ]; then
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
        echo "Please copy the SQL from 'scrapers/seed_database.sql' into the Supabase SQL Editor at:"
        echo "https://app.supabase.com/project/zmobmsmtlkbdkffonqgz/sql"
        echo "and execute it there."
        ;;
      2)
        echo "Running with Supabase CLI..."
        npx supabase sql --db-url "postgres://$SUPABASE_DB_USER:$SUPABASE_DB_PASSWORD@$SUPABASE_DB_HOST:$SUPABASE_DB_PORT/$SUPABASE_DB_NAME" --file "scrapers/seed_database.sql" || {
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
echo "SQL file is available at: scrapers/seed_database.sql"
echo "Reconciled data JSON is available at: scrapers/reconciled_data.json"

# Seed the database if requested
if [ "$1" = "--seed" ]; then
  echo "Seeding database..."
  ./seed_database.sh
fi

echo "Done!"
