import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between main pages', async ({ page }) => {
    // Start at the home page
    await page.goto('/');
    
    // Verify we're on the home page
    await expect(page).toHaveTitle(/LocalSource/);
    
    // Navigate to search page
    await page.getByText('Search').first().click();
    await expect(page).toHaveURL(/.*\/search/);
    
    // Check search functionality is present
    await expect(page.getByPlaceholder('Search vendors...')).toBeVisible();
    
    // Navigate to vendors page 
    await page.getByText('Vendors').first().click();
    await expect(page).toHaveURL(/.*\/vendors/);
    
    // Check vendor list is visible
    await expect(page.locator('.vendor-list')).toBeVisible();
  });
});

test.describe('Search Functionality', () => {
  test('should search for vendors', async ({ page }) => {
    // Go to search page
    await page.goto('/search');
    
    // Enter search query
    await page.getByPlaceholder('Search vendors...').fill('farm');
    
    // Wait for search results
    await page.waitForTimeout(1000); // Wait for debounce
    
    // Verify results are shown
    await expect(page.locator('.search-results')).toBeVisible();
  });
  
  test('should filter search results', async ({ page }) => {
    // Go to search page
    await page.goto('/search');
    
    // Open filter panel
    await page.getByRole('button').first().click();
    
    // Select category filter
    await page.locator('select[aria-label="Category"]').selectOption('Farm');
    
    // Wait for filtered results
    await page.waitForTimeout(1000); // Wait for debounce
    
    // Verify filtered results
    await expect(page.locator('.search-results')).toBeVisible();
  });
});

test.describe('Vendor Details', () => {
  test('should show vendor details', async ({ page }) => {
    // Go to vendors page
    await page.goto('/vendors');
    
    // Click on the first vendor
    await page.locator('.vendor-card').first().click();
    
    // Verify we're on the vendor details page
    await expect(page).toHaveURL(/.*\/vendors\/\w+/);
    
    // Check vendor details components are visible
    await expect(page.locator('.vendor-details')).toBeVisible();
    await expect(page.locator('#vendor-map')).toBeVisible();
  });
}); 