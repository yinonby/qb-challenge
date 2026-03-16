
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  use: {
    baseURL: 'http://localhost:4100',
    headless: false,
  },

  webServer: {
    command: 'pushd ../../../apps/qb-dashboard-expo/ && npx expo start --web',
    url: 'http://localhost:4100',
    reuseExistingServer: !process.env.CI,
  },
});
