import { test, expect } from '@playwright/test';

test.describe('Task List Application', () => {
  test('should add a new task and intercept the API request', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Expect the header to be visible
    await expect(page.getByRole('heading', { name: 'CraftAmplify Tasks' })).toBeVisible();

    // Set up request interception for the API call
    const requestPromise = page.waitForRequest(request => 
      request.url().includes('/tasks') && request.method() === 'POST'
    );

    // Type into the input labeled 'Task' (or placeholder)
    const taskInput = page.getByPlaceholder('Add a new task...');
    await taskInput.fill('Playwright test task');

    // Click Add
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify the API request payload
    const request = await requestPromise;
    const postData = request.postDataJSON();
    expect(postData.text).toBe('Playwright test task');
    expect(postData.completed).toBe(false);

    // Expect the new task title to be visible in the list
    await expect(page.getByText('Playwright test task')).toBeVisible();
  });
});