import terser from '@rollup/plugin-terser';
import { readdirSync } from 'node:fs';

const presets = readdirSync('src/presets')
  .filter((f) => f.endsWith('.js') && f !== 'index.js')
  .map((f) => f.replace('.js', ''));

export default [
  {
    input: { 'plate-mask': 'src/index.js', core: 'src/core/index.js' },
    output: { dir: 'dist', format: 'es', entryFileNames: '[name].mjs' },
  },
  {
    input: 'src/index.js',
    output: { file: 'dist/plate-mask.umd.min.js', format: 'umd', name: 'PlateMask', plugins: [terser()] },
  },
  ...presets.map((p) => ({
    input: `src/presets/${p}.js`,
    output: { file: `dist/presets/${p}.mjs`, format: 'es' },
  })),
];
