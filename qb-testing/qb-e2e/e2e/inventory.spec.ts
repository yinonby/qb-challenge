import { test } from '@playwright/test';

test.describe('Product Inventory', () => {
  test('Update single product stock', async ({ page }) => {
    await page.goto('/app/dashboard/listing');

    await page.getByRole('button', { name: 'Show navigation menu' }).click();
    await page.getByRole('button', { name: 'Inventory Management' }).click();
    await page.getByRole('button', { name: 'Filter and Sort' }).click();
    await page.getByTestId('food').click();
    await page.getByTestId('ContentViewTid').getByTestId('ApplyButtonTid').click();
    await page.getByTestId('EditButtonTid').first().click({ force: true });
    await page.getByTestId('NewStockTextInputTid').click();
    await page.getByTestId('NewStockTextInputTid').fill('25');
    await page.getByTestId('ReasonTextInputTid').click();
    await page.getByTestId('ReasonTextInputTid').fill('change');
    await page.getByTestId('ContentViewTid').getByTestId('ApplyButtonTid').click();
  });

  test('test', async ({ page }) => {
    await page.goto('/app/dashboard/listing');

    await page.getByRole('button', { name: 'Show navigation menu' }).click();
    await page.getByRole('button', { name: 'Inventory Management' }).click();
    await page.getByTestId('EditButtonTid').first().click({ force: true });
    await page.getByTestId('NewStockTextInputTid').click();
    await page.getByTestId('NewStockTextInputTid').fill('120');
    await page.getByTestId('ReasonTextInputTid').click();
    await page.getByTestId('ReasonTextInputTid').fill('sold');
    await page.getByTestId('AddToBatchButtonTid').click();
    await page.getByTestId('EditButtonTid').nth(5).click({ force: true });
    await page.getByTestId('NewStockTextInputTid').fill('1900');
    await page.getByTestId('ReasonTextInputTid').dblclick();
    await page.getByTestId('ReasonTextInputTid').fill('restock');
    await page.getByTestId('ContentViewTid').getByTestId('ApplyButtonTid').click();
    await page.getByTestId('ApplyButtonTid').click();
  });
});

