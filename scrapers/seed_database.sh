#!/bin/bash
set -e

# Check if required environment variables are set
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE" ]; then
  echo "Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE environment variables must be set"
  echo "Example usage:"
  echo "  SUPABASE_URL=https://your-project-id.supabase.co SUPABASE_SERVICE_ROLE=your-service-role-key ./seed_database.sh"
  exit 1
fi

# Extract database info from SUPABASE_URL
DB_HOST=$(echo $SUPABASE_URL | sed 's/https:\/\//db./')
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres

# Run the SQL seed file
echo "Seeding database with vendor data..."
PGPASSWORD=$SUPABASE_SERVICE_ROLE psql -h $DB_HOST -p $DB_PORT -d $DB_NAME -U $DB_USER -f seed_database.sql

echo "Database seeded successfully!" 