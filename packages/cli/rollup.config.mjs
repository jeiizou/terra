import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: {
    file: 'bin/terra.js',
    format: 'cjs',
  },
  plugins: [typescript(), json()],
};
