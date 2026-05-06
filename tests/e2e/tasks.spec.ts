import { test, expect } from '@playwright/test';

test.describe('Task List Application', () => {
  test('should add a new task and intercept the API request', async ({ page }) => {
    const taskTitle = `Playwright test task ${Date.now()}`;

    // Navigate to the app
    await page.goto('/');

    // Expect the header to be visible
    await expect(page.getByRole('heading', { name: 'CraftAmplify Tasks' })).toBeVisible();

    // Set up request interception for the API call
    const requestPromise = page.waitForRequest(request => 
      request.url().includes('/tasks') && request.method() === 'POST'
    );

    // Type into the input labeled 'Task'
    const taskInput = page.getByRole('textbox', { name: 'Task', exact: true });
    await taskInput.fill(taskTitle);

    // Click Add
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify the API request payload
    const request = await requestPromise;
    const postData = request.postDataJSON();
    expect(postData.text).toBe(taskTitle);
    expect(postData.completed).toBe(false);

    // Expect the new task title to be visible in the list
    await expect(page.getByText(taskTitle)).toBeVisible();
  });
});
