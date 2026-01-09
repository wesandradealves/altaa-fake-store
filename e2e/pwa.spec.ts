import { test, expect, type Page } from '@playwright/test';

const ensureServiceWorker = async (page: Page) => {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => navigator.serviceWorker.ready);

  const hasController = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
  if (!hasController) {
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => navigator.serviceWorker.ready);
    const controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
    if (!controlled) {
      throw new Error('Service worker nao esta controlando a pagina');
    }
  }
};

test.describe('PWA', () => {
  test('manifest e service worker registrados', async ({ page, request }) => {
    const response = await request.get('/manifest.json');
    expect(response.ok()).toBeTruthy();

    const manifest = await response.json();
    expect(manifest.name).toBe('Fake Store');
    expect(manifest.start_url).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(Array.isArray(manifest.icons)).toBeTruthy();
    expect(manifest.icons.length).toBeGreaterThan(0);

    await page.goto('/');
    await ensureServiceWorker(page);

    const registrations = await page.evaluate(() =>
      navigator.serviceWorker.getRegistrations().then((items) => items.length)
    );
    expect(registrations).toBeGreaterThan(0);
  });

  test('lista de produtos funciona offline com cache', async ({ page }) => {
    await page.goto('/');
    await ensureServiceWorker(page);

    const firstTitle = page.locator('h3').first();
    await expect(firstTitle).toBeVisible();
    const cachedTitle = (await firstTitle.innerText()).trim();

    expect(cachedTitle).toBeTruthy();

    await page.context().setOffline(true);
    await page.reload();

    await expect(page.getByRole('heading', { name: cachedTitle as string })).toBeVisible();

    await page.context().setOffline(false);
  });

  test('detalhe de produto funciona offline com cache', async ({ page }) => {
    await page.goto('/');
    await ensureServiceWorker(page);

    const productLink = page.locator('a[href^="/product/"]').first();
    await productLink.waitFor();
    const href = await productLink.getAttribute('href');
    expect(href).toBeTruthy();

    await page.goto(href as string);
    await ensureServiceWorker(page);

    const detailTitle = page.getByRole('heading', { level: 1 });
    await expect(detailTitle).toBeVisible();
    const cachedTitle = (await detailTitle.innerText()).trim();

    expect(cachedTitle).toBeTruthy();

    await page.context().setOffline(true);
    await page.reload();

    await expect(page.getByRole('heading', { name: cachedTitle as string })).toBeVisible();

    await page.context().setOffline(false);
  });
});
