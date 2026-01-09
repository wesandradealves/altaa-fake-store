import { defineConfig } from '@playwright/test';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`;

export default defineConfig({
  testDir: './e2e',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    headless: true,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `npm run start -- -p ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
