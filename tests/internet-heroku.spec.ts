import { test, expect } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
});

test.skip('TC001 - Verify Checkboxes ', { tag: '@regression' }, async ({ page }) => {
  await page.getByRole('link').filter({ hasText: "checkboxes" }).click();
  expect(page.getByRole('heading')).toHaveText("Checkboxes")
  let firstCheckbox = page.getByRole('checkbox').first();
  await firstCheckbox.check();
  await expect(firstCheckbox).toBeChecked();
  let lastCheckbox = page.getByRole('checkbox').last();
  await lastCheckbox.uncheck();
  await expect(lastCheckbox).not.toBeChecked();
});

test('TC002 - Verify Drag and Drop', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
  await page.getByRole('link').filter({ hasText: "Drag and Drop" }).click();
  expect(page.getByRole('heading')).toHaveText("Drag and Drop")
  let firstColumn = page.locator('.column').first();
  let secondColumn = page.locator('.column').last();
  await firstColumn.dragTo(secondColumn);
  await expect(firstColumn).toHaveText('B');
});

test.fail('TC003 - Verify Dropdown', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
  await page.getByRole('link').filter({ hasText: "Dropdown" }).click();
  expect(page.getByRole('heading')).toHaveText("Dropdown List")
  await page.selectOption('#dropdown', 'Option 2');
  await expect.soft(page.locator('#dropdown')).toHaveValue('1')
  await page.locator('#dropdown').selectOption({ value: '1' });
  await expect(page.locator('#dropdown')).toHaveValue('1')
});

test('TC005 - Upload File', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
  await page.getByRole('link').filter({ hasText: "File Upload" }).click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('heading')).toHaveText("File Uploader")
  await page.locator('#file-upload').setInputFiles(path.join(__dirname, 'tmp.txt'));
  await page.getByRole('button', { name: "Upload" }).click();
  await expect(page.getByRole('heading')).toHaveText('File Uploaded!');
  await expect(page.locator('#uploaded-files')).toHaveText('tmp.txt')
});

test('TC006 - Verify Dynamically Loaded Page Elements', { tag: '@regression' }, async ({ page }) => {
  await page.getByRole('link').filter({ hasText: "Dynamic Loading" }).click();
  await expect(page.getByRole('heading')).toHaveText('Dynamically Loaded Page Elements')
  await page.getByText('Example 1').click();
  await expect(page.getByRole('heading').filter({ hasText: "Dynamically Loaded" })).toHaveText('Dynamically Loaded Page Elements');
  await page.getByRole('button').click();
  await expect(page.locator('#finish')).toHaveText("Hello World!");
});

