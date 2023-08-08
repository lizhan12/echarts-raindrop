import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import babel from '@rollup/plugin-babel';
// import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: './src/lib/index.js',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'umd'
    },
    // {
    //   file: 'dist/bundle.cjs.js',
    //   format: 'cjs'
    // },
    // {
    //   file: 'dist/bundle.esm.js',
    //   format: 'esm'
    // },
    // {
    //   file: 'dist/bundle.min.js',
    //   format: 'iife',
    //   name: 'MyLibrary',
    //   plugins: [terser()]
    // }
  ],
  plugins: [
    nodeResolve(),
    // commonjs(),
    // babel({
    //   babelHelpers: 'bundled',
    //   exclude: 'node_modules/**'
    // })
  ]
};
