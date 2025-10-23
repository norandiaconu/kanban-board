import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await expect(page.getByText('Kanban Fire')).toBeVisible();
    await expect(page.locator('app-root')).toContainText('Create a Kanban app');
});

test('add task', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('1');
    await page.getByRole('textbox', { name: 'Description' }).click();
    await page.getByRole('textbox', { name: 'Description' }).fill('2');
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('1 2')).toBeVisible();
});
