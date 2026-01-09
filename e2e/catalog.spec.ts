import { test, expect, type Locator, type Page } from '@playwright/test';

const openSelect = async (page: Page, label: string) => {
  const trigger = page.getByRole('combobox', { name: label });
  await expect(trigger).toBeVisible();
  await expect(trigger).toBeEnabled();
  await trigger.click();
  const listbox = page.locator('[role="listbox"]');
  await expect(listbox).toBeVisible();
  return listbox;
};

const getProductTitles = async (page: Page) => {
  const titles = await page.locator('h3').allTextContents();
  return titles.map((title) => title.trim()).filter(Boolean);
};

const selectFirstCategory = async (listbox: Locator) => {
  const options = listbox.locator('[role="option"]:not([aria-disabled="true"])');
  const preferred = options.filter({ hasText: 'jewelery' });
  if ((await preferred.count()) > 0) {
    const label = (await preferred.first().innerText()).trim();
    await preferred.first().click();
    return label;
  }

  const count = await options.count();
  for (let i = 0; i < count; i += 1) {
    const text = (await options.nth(i).innerText()).trim();
    if (text && text !== 'Todas as categorias') {
      await options.nth(i).click();
      return text;
    }
  }
  return '';
};

test.describe('Catalogo', () => {
  test('filtra por categoria', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h3').first()).toBeVisible();

    const initialCount = await page.locator('h3').count();
    expect(initialCount).toBeGreaterThan(0);

    const listbox = await openSelect(page, 'Categoria');
    const selectedCategory = await selectFirstCategory(listbox);
    expect(selectedCategory).toBeTruthy();

    const categorySelect = page.getByRole('combobox', { name: 'Categoria' });
    await expect(categorySelect).toContainText(selectedCategory);

    await expect.poll(async () => page.locator('h3').count()).toBeLessThan(initialCount);
  });

  test('ordena por nome (Z a A)', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h3').first()).toBeVisible();

    const listbox = await openSelect(page, 'Ordenacao');
    await listbox.getByRole('option', { name: 'Nome: Z a A' }).click();

    const titles = await getProductTitles(page);
    const sorted = [...titles].sort((a, b) => b.localeCompare(a));
    expect(titles).toEqual(sorted);
  });

  test('paginacao troca itens', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h3').first()).toBeVisible();

    const firstPageTitles = await getProductTitles(page);
    expect(firstPageTitles.length).toBeGreaterThan(0);

    await page.getByRole('button', { name: 'Proxima' }).click();

    const activePage = page.locator('[aria-current="page"]');
    await expect(activePage).toHaveText(/2/);

    const secondPageTitles = await getProductTitles(page);
    expect(secondPageTitles.length).toBeGreaterThan(0);
    expect(secondPageTitles).not.toEqual(firstPageTitles);
  });
});
