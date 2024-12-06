import { test, expect } from '@playwright/test';

import Routes from '@/constants/routes';

test.describe('Book Page', () => {
  const bookId = 10;
  const bookPageUrl = `/${bookId}`;

  test.beforeEach(async ({ page }) => {
    await page.goto(Routes.AUTH);
    await page.getByTestId('login').click();
    await page.getByPlaceholder('your@email.com').fill('testmail@gmail.com');
    await page.getByPlaceholder('••••••••').fill('123123123');
    await page.getByTestId('login-submit').click();
    await page.goto(bookPageUrl);
  });

  test('should display book details correctly', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText(/The Catcher in the Rye/i);
    await expect(page.getByTestId('book-name')).toBeVisible();
    await expect(page.getByTestId('book-description')).toBeVisible();
    await expect(page.getByTestId('book-author')).toBeVisible();
  });

  test('should add the book to the cart when "Add to Cart" is clicked', async ({
    page,
  }) => {
    await expect(page.getByTestId('cart-count')).toHaveText('Кошик (0)');
    await page.click('button[data-testid="add-to-cart"]');
    await expect(page.getByTestId('cart-count')).toHaveText('Кошик (1)');
  });

  test('should display comments if they exist', async ({ page }) => {
    const comments = page.locator('[data-testid="comment"]');
    if ((await comments.count()) > 0) {
      await expect(comments).toBeVisible();
    } else {
      await expect(page.getByTestId('no-comments')).toBeVisible();
    }
  });
});
