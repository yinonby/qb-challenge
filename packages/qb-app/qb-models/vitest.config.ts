
import { baseViteUserConfig } from '@qb/vitest';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...baseViteUserConfig,
  test: {
    ...baseViteUserConfig.test,
    passWithNoTests: true,
    setupFiles: ["./test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@test": path.resolve(__dirname, "test"),
    },
  },
});
