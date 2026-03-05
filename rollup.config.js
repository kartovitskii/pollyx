import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import json from '@rollup/plugin-json';

const plugins = [
    json(),
    resolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react']
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true }),
    filesize()
];

export default [
    // 1. ЯДРО: UMD (для браузера через тег <script>)
    {
        input: 'src/core.js',
        external: ['diff-match-patch'],
        output: {
            name: 'Pollyx',
            file: 'dist/pollyx.umd.js',
            format: 'umd',
            sourcemap: true,
            exports: 'named',
            globals: { 'diff-match-patch': 'DiffMatchPatch' }
        },
        plugins: [...plugins, terser()]
    },
    // 2. ЯДРО: CommonJS (для Node.js)
    {
        input: 'src/core.js',
        external: ['diff-match-patch'],
        output: {
            file: 'dist/pollyx.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        plugins
    },
    // 3. ЯДРО: ES module (для бандлеров)
    {
        input: 'src/core.js',
        external: ['diff-match-patch'],
        output: {
            file: 'dist/pollyx.esm.js',
            format: 'es',
            sourcemap: true,
            exports: 'named'
        },
        plugins
    },
    // 4. АДАПТЕР: React (ESM)
    {
        input: 'src/adapters/react.js',
        external: ['react', 'diff-match-patch'],
        plugins,
        output: {
            file: 'dist/react.js',
            format: 'es',
            sourcemap: true,
            exports: 'named'
        }
    },
    // 5. АДАПТЕР: React (CJS)
    {
        input: 'src/adapters/react.js',
        external: ['react', 'diff-match-patch'],
        plugins,
        output: {
            file: 'dist/react.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        }
    },
    // 6. АДАПТЕР: Vue (ESM)
    {
        input: 'src/adapters/vue.js',
        external: ['vue', 'diff-match-patch'],
        plugins,
        output: {
            file: 'dist/vue.js',
            format: 'es',
            sourcemap: true,
            exports: 'named'
        }
    },
    // 7. АДАПТЕР: Vue (CJS)
    {
        input: 'src/adapters/vue.js',
        external: ['vue', 'diff-match-patch'],
        plugins,
        output: {
            file: 'dist/vue.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        }
    }
];