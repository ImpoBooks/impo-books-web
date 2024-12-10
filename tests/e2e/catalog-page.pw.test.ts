import { test, expect } from '@playwright/test';

import Routes from '@/constants/routes';

test.describe('Catalog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Routes.CATALOG);
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Каталог | ImpoBooks/);
  });

  test('should have the correct heading text', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toHaveText(/Каталог книг/);
  });

  test.describe('Check filters', () => {
    test.describe('Check search input', () => {
      test('should search books by title', async ({ page }) => {
        const searchInput = page.getByPlaceholder(
          'Назва, автор або ключові слова',
        );
        await searchInput.fill('Dune');
        await searchInput.press('Enter');

        const bookTitle = page.getByTestId('title');
        const bookTitles = await bookTitle.allTextContents();

        if (bookTitles.length > 0) {
          await expect(bookTitle).toHaveText('Dune');
        } else {
          await expect(bookTitle).toHaveCount(0);
        }
      });

      test('should search no books with wrong title', async ({ page }) => {
        const searchInput = page.getByPlaceholder(
          'Назва, автор або ключові слова',
        );
        await searchInput.fill('Wrong title');
        await searchInput.press('Enter');

        const bookTitle = page.getByTestId('title');

        await expect(bookTitle).toHaveCount(0);
      });

      test('should search many books with lower case letter', async ({
        page,
      }) => {
        const searchInput = page.getByPlaceholder(
          'Назва, автор або ключові слова',
        );
        await searchInput.fill('the');
        await searchInput.press('Enter');

        const bookTitle = page.getByTestId('title');
        const bookTitles = await bookTitle.allTextContents();

        if (bookTitles.length > 0) {
          await expect(bookTitle).toHaveText('The');
        } else {
          await expect(bookTitle).toHaveCount(0);
        }
      });
    });

    test.describe('Check filter by genre', () => {
      test('should filter books by genre', async ({ page }) => {
        const selector = page.getByTestId('genre-selector');
        await selector.click();
        await page.click('text=Fiction');

        const bookGenre = page.getByTestId('genre');
        const booksWithGenre = await bookGenre.allTextContents();

        if (booksWithGenre.length > 0) {
          await expect(bookGenre).toHaveText('Fiction');
        } else {
          await expect(bookGenre).toHaveCount(0);
        }
      });
    });

    test.describe('Check filter by slider', () => {
      test('should filter books by price', async ({ page }) => {
        const thumbStart = page.getByTestId('thumb-start');
        const thumbEnd = page.getByTestId('thumb-end');

        await thumbStart.dragTo(thumbEnd);

        const bookPrice = page.getByTestId('price');

        const prices = await bookPrice.allTextContents();

        prices.forEach((price) => {
          const priceNumber = parseInt(price.replace('$', ''));
          expect(priceNumber).toBeGreaterThan(0);
          expect(priceNumber).toBeLessThanOrEqual(100);
        });
      });

      test('should filter books by min price', async ({ page }) => {
        const thumbStart = page.getByTestId('thumb-start');
        const thumbEnd = page.getByTestId('thumb-end');

        await thumbEnd.dragTo(thumbStart);

        const bookPrice = page.getByTestId('price');

        const prices = await bookPrice.allTextContents();

        expect(prices.length).toBe(0);
      });
    });

    test.describe('Check filter by rating', () => {
      test('should filter books by rating', async ({ page }) => {
        const selector = page.getByTestId('rating-selector');
        await selector.click();
        await page.click('text=4');

        const bookRating = page.getByTestId('rating');
        const booksWithRating = await bookRating.allTextContents();

        if (booksWithRating.length > 0) {
          await expect(bookRating).toHaveText('4');
        } else {
          await expect(bookRating).toHaveCount(0);
        }
      });
    });
  });
});
