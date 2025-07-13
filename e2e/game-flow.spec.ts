import { test, expect } from '@playwright/test';

test('Story initialisiert korrekt', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Zauberbuch');
});
