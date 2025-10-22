import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await expect(page.getByText('Kanban Fire')).toBeVisible();
    await expect(page.locator('app-root')).toContainText('Create a Kanban app');
});
