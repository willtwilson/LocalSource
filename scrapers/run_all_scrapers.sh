#!/bin/bash

# Script to run all scrapers and compare results
echo "============================================="
echo "Running all Hedgeveg.je scrapers and comparing results"
echo "============================================="

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Run Puppeteer scraper
echo "Running Puppeteer scraper..."
node scrapers/puppeteer_scraper.js
echo "Puppeteer scraper complete."

# Run original Playwright scraper
echo "Running original Playwright scraper..."
python3 scrapers/playwright_scraper.py
echo "Original Playwright scraper complete."

# Run enhanced Playwright scraper
echo "Running enhanced Playwright scraper..."
python3 scrapers/playwright_enhanced_scraper.py
echo "Enhanced Playwright scraper complete."

# Compare the results
echo "Comparing Puppeteer vs Original Playwright data..."
python3 -c "
import json
import os
from scrapers.compare_data import load_json, analyze_data, compare_data

# Load data from all scrapers
puppeteer_data = load_json('scrapers/puppeteer_data.json')
playwright_data = load_json('scrapers/playwright_data.json')
enhanced_data = load_json('scrapers/playwright_enhanced_data.json')

# Analyze and compare the original scrapers
print('\n====== PUPPETEER vs ORIGINAL PLAYWRIGHT ======')
analyze_data(puppeteer_data, 'Puppeteer')
analyze_data(playwright_data, 'Original Playwright')
compare_data(puppeteer_data, playwright_data)

# Compare puppeteer vs enhanced playwright
print('\n====== PUPPETEER vs ENHANCED PLAYWRIGHT ======')
analyze_data(puppeteer_data, 'Puppeteer')
analyze_data(enhanced_data, 'Enhanced Playwright')
compare_data(puppeteer_data, enhanced_data)

# Compare original vs enhanced playwright
print('\n====== ORIGINAL vs ENHANCED PLAYWRIGHT ======')
analyze_data(playwright_data, 'Original Playwright')
analyze_data(enhanced_data, 'Enhanced Playwright')
compare_data(playwright_data, enhanced_data)
"

echo "Comparison complete!"

# Make the script executable
chmod +x scrapers/run_all_scrapers.sh 