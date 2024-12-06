import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  const bookId = 10;
  const bookPageUrl = `/${bookId}`;

  test.beforeEach(async ({ page }) => {
    await page.goto(bookPageUrl);
    const button = page.getByTestId('add-to-cart');
    await button.click();
    await page.waitForTimeout(1000);

    const cartButton = page.getByTestId('Кошик');
    await cartButton.click();
  });

  test('should display cart items correctly', async ({ page }) => {
    await expect(page.getByTestId('cart-items-list')).toBeVisible();
    await expect(page.getByTestId('cart-item')).toHaveCount(1);
  });

  test('should update item count when increment or decrement buttons are clicked', async ({
    page,
  }) => {
    await expect(page.getByTestId('cart-item')).toHaveText('1');
    await page.locator('button[aria-label="Increment"]').click();
    await expect(page.getByTestId('cart-item')).toHaveText('2');
    await page.locator('button[aria-label="Decrement"]').click();
    await expect(page.getByTestId('cart-item')).toHaveText('1');
  });

  test('should delete item from cart when delete button is clicked', async ({
    page,
  }) => {
    await page.locator('button[aria-label="Delete"]').click();
    await expect(page.locator('.cart-item')).toHaveCount(0);
  });

  test('should display total amount correctly', async ({ page }) => {
    await expect(page.getByTestId('cart-total')).toHaveText('Сума: $10.50');
  });

  test('should disable submit button if form fields are not filled', async ({
    page,
  }) => {
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });
});
