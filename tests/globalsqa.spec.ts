import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows');
});

test('TC004 - Verify Frame ', { tag: '@regression' }, async ({ page }) => {
    await page.getByRole('tab').filter({ hasText: "IFRAME" }).click();
    let frame = page.frameLocator('iframe[name="globalSqa"]')
    await frame.getByRole('textbox').fill('Playwright');
    await expect(frame.getByRole('textbox')).toHaveValue('Playwright');
    await frame.locator('.button_search').click();
    await expect(frame.locator('.search_res')).toHaveText('Sorry, no posts matched your criteria.');
});