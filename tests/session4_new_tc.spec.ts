import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
});

test('TC001 - Verify sort by price', async ({ page }) => {
    let listPrice = page.locator('.inventory_item_price');
    let listPriceBeforeSort = await listPrice.allInnerTexts();
    listPriceBeforeSort = removeDollarSign(listPriceBeforeSort);
    listPriceBeforeSort = sortPricesByValue(listPriceBeforeSort);
    await page.locator('.product_sort_container').selectOption('lohi');
    let listPriceAfterSort = await listPrice.allInnerTexts();
    listPriceAfterSort = removeDollarSign(listPriceAfterSort);
    expect(listPriceBeforeSort).toEqual(listPriceAfterSort)
});

test('TC002 - Verify sort by price', async ({ page }) => {
    let firstItemBtn = page.locator('.pricebar').first().getByRole('button');
    await firstItemBtn.click();
    await expect(firstItemBtn).toHaveText('Remove');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', { name: "Checkout" }).click();

    let firstNameInput = page.getByPlaceholder("First Name");
    await firstNameInput.fill('Test');
    await expect(firstNameInput).toHaveValue('Test');

    let lastNameInput = page.getByPlaceholder("Last Name");
    await lastNameInput.fill('KMSer');
    await expect(lastNameInput).toHaveValue('KMSer');

    let zipInput = page.getByPlaceholder("Zip");
    await zipInput.fill('720000');
    await expect(zipInput).toHaveValue('720000')

    await page.getByRole('button', { name: "Continue" }).click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', { name: "Finish" }).click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

function removeDollarSign(prices: string[]): string[] {
    return prices.map(price => price.replace('$', ''));
}

function sortPricesByValue(prices: string[]): string[] {
    return prices.sort((a, b) => parseFloat(a) - parseFloat(b));
}