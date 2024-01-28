import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'lib/index.ts',
  output: {
    file: 'bin/myset.js',
    format: 'cjs',
  },
  plugins: [typescript(), json()],
};
