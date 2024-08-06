import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
});

test('TC007 - Verify Input', async ({ page }) => {
    let nameInput = page.locator('#name');
    nameInput.fill("Nguyen Van A");
    await expect(nameInput).toHaveValue("Nguyen Van A");
    let addressInput = page.locator('#textarea');
    addressInput.fill("2 Tan Vien, Tan Binh, HCMC");
    await expect(addressInput).toHaveValue("2 Tan Vien, Tan Binh, HCMC");

    nameInput.fill("");
    await expect(nameInput).toHaveValue("");
    addressInput.fill("");
    await expect(addressInput).toHaveValue("");
});

test('TC008 - Handle dialog', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Automation Testing Practice' })).toBeVisible();

    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Please enter your name:');
        expect(dialog.defaultValue()).toBe('Harry Potter');
        await dialog.accept('KMSer');
    });

    await page.getByRole('button', { name: "Prompt" }).click();
    let displayedText = page.locator('#demo');
    await expect(displayedText).toHaveText('Hello KMSer! How are you today?');
});