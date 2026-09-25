import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'coverage/', 'playwright-report/'] },
  js.configs.recommended,
  { files: ['src/core/**', 'src/presets/**'], languageOptions: { globals: {} } },
  { files: ['src/dom/**', 'examples/**'], languageOptions: { globals: globals.browser } },
  { files: ['tests/**', '*.config.js'], languageOptions: { globals: globals.node } },
];
