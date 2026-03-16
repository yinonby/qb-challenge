
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  use: {
    baseURL: 'http://localhost:4100',
    headless: false,
  },

  webServer: {
    command: 'pushd ../../apps/qb-dashboard-expo/ && npx expo start --web',
    url: 'http://localhost:4100',
    reuseExistingServer: !process.env.CI,
    timeout: 180000, // wait up to 3 minutes for the server
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
