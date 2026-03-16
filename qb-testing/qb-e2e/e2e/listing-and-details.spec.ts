
import { expect, test } from '@playwright/test';

test.describe('Product Listing and Details', () => {
  test('should verify basic components exist', async ({ page }) => {
    await page.goto('/app/dashboard/listing');

    const listingView = page.getByTestId('ListingViewTid');
    await expect(listingView).toBeVisible();

    const productSummaryView = page.getByTestId('ProductSummaryViewTid');
    await expect(productSummaryView).toHaveCount(12);
  });

  test('should walk across page and test interactions', async ({ page }) => {
    await page.goto('/app/dashboard/listing');

    await page.getByTestId('NextButtonTid').click();
    await page.getByTestId('PrevButtonTid').click();
    await page.getByTestId('FilterButtonTid').click();
    await page.locator('div:nth-child(2) > div:nth-child(2) > div:nth-child(4) > div > div > .css-view-g5y9jx.r-touchAction-1otgn73').click();
    await page.getByTestId('ApplyButtonTid').click();
    await page.getByTestId('ClearFilterButtonTid').click();
    await page.getByTestId('ProductNameInputTid').click();
    await page.getByTestId('ProductNameInputTid').fill('ipho');
    await page.getByTestId('ClearFilterButtonTid').click();
  });
});
