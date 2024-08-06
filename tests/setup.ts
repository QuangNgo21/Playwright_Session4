import { test, expect } from '@playwright/test';

test('Sign in as normal user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: "Login" }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.context().storageState({ path: './session.json' });
});