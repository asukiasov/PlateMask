import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/{core,dom,presets}/**/*.test.js'],
    environmentMatchGlobs: [['tests/dom/**', 'happy-dom']],
    coverage: { include: ['src/**'] },
  },
});
