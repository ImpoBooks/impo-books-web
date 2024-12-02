import { test, expect } from '@playwright/test';

import Routes from '@/constants/routes';

test.describe('Contacts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Routes.CONTACTS);
  });

  test.describe('Check Contact Form', () => {
    test('should have the correct heading text', async ({ page }) => {
      const heading = page.locator('h2');
      await expect(heading).toHaveText(/Зв'яжіться з нами/);
    });

    test('should show error messages when submitting invalid form data', async ({
      page,
    }) => {
      await page.fill('input[name="name"]', '');
      await page.fill('input[name="email"]', 'invalid@email');
      await page.fill('textarea[name="message"]', 'Short message');

      await page.click('button[type="submit"]');

      await expect(
        page.locator('text="Поле не може бути пустим"'),
      ).toBeVisible();
      await expect(page.locator('text="Невірний формат email"')).toBeVisible();
      await expect(page.locator('text="Мінімум 20 символів"')).toBeVisible();
    });

    test('should reset form after successful submission', async ({ page }) => {
      await page.fill('input[name="name"]', 'Test');
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill(
        'textarea[name="message"]',
        'This is a valid message with more than 20 characters.',
      );

      await page.click('button[type="submit"]');

      await expect(page.locator('input[name="name"]')).toHaveValue('');
      await expect(page.locator('input[name="email"]')).toHaveValue('');
      await expect(page.locator('textarea[name="message"]')).toHaveValue('');
    });
  });

  test.describe('Check Contact Information', () => {
    test('should show contact items and social links', async ({ page }) => {
      await expect(page.locator('[data-testid="contact-block"]')).toHaveCount(
        2,
      );
      await expect(
        page.locator('[data-testid="contact-item-paragraph"]'),
      ).toHaveCount(3);

      await expect(page.locator('[data-testid="contact-block"] a')).toHaveCount(
        3,
      );
    });
  });
});
