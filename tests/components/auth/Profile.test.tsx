import { test, expect } from '@playwright/test';
import { supabase } from '../../../LocalSource/src/lib/supabase';

test.describe('Profile Component', () => {
  let testUser: any;

  test.beforeEach(async () => {
    // Create a test user
    const { data: { user }, error } = await supabase.auth.signUp({
      email: `test-${Math.random()}@example.com`,
      password: 'testpassword123'
    });

    if (error) throw error;
    testUser = user;
  });

  test.afterEach(async () => {
    // Clean up test user
    if (testUser) {
      await supabase.auth.signOut();
      // Note: In a real app, you'd want to delete the test user,
      // but Supabase doesn't provide a direct way to do this
    }
  });

  test('should display profile form', async ({ page }) => {
    await page.goto('/profile');
    
    // Check if form elements are present
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Avatar')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Update Profile' })).toBeVisible();
  });

  test('should update username', async ({ page }) => {
    await page.goto('/profile');
    
    const newUsername = `testuser-${Math.random()}`;
    
    // Fill in username
    await page.getByLabel('Username').fill(newUsername);
    
    // Submit form
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    // Wait for success state
    await expect(page.getByText('Saving...')).not.toBeVisible();
    
    // Verify username was updated
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', testUser.id)
      .single();
      
    expect(error).toBeNull();
    expect(data?.username).toBe(newUsername);
  });

  test('should handle avatar upload', async ({ page }) => {
    await page.goto('/profile');
    
    // Create a test image file
    const imageBuffer = Buffer.from('fake-image-content');
    
    // Upload file
    await page.getByLabel('Avatar').setInputFiles({
      name: 'test-avatar.png',
      mimeType: 'image/png',
      buffer: imageBuffer,
    });
    
    // Submit form
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    // Wait for success state
    await expect(page.getByText('Saving...')).not.toBeVisible();
    
    // Verify avatar was uploaded
    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', testUser.id)
      .single();
      
    expect(error).toBeNull();
    expect(data?.avatar_url).toContain('avatars');
  });

  test('should handle errors gracefully', async ({ page }) => {
    await page.goto('/profile');
    
    // Force an error by using an invalid username (too short)
    await page.getByLabel('Username').fill('a');
    
    // Submit form
    await page.getByRole('button', { name: 'Update Profile' }).click();
    
    // Check if error message is displayed
    await expect(page.getByText('Error updating profile')).toBeVisible();
  });
}); 