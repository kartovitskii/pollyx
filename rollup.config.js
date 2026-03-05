import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import json from '@rollup/plugin-json';

const plugins = [
    json(),
    resolve({
        browser: true,
        preferBuiltins: false
    }),
    commonjs(),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react']
    }),
    replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true
    }),
    filesize()
];

export default [
    // Browser-friendly UMD build
    {
        input: 'src/index.js',
        output: {
            name: 'Pollyx',
            file: 'dist/pollyx.umd.js',
            format: 'umd',
            sourcemap: true,
            globals: {
                'diff-match-patch': 'DiffMatchPatch',
                'react': 'React',
                'react-dom': 'ReactDOM',
                'vue': 'Vue'
            }
        },
        plugins: [...plugins, terser()],
        external: ['diff-match-patch', 'react', 'react-dom', 'vue']
    },
    // CommonJS build
    {
        input: 'src/index.js',
        output: {
            file: 'dist/pollyx.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        plugins,
        external: ['diff-match-patch', 'react', 'react-dom', 'vue']
    },
    // ES module build
    {
        input: 'src/index.js',
        output: {
            file: 'dist/pollyx.esm.js',
            format: 'es',
            sourcemap: true,
            exports: 'named'
        },
        plugins,
        external: ['diff-match-patch', 'react', 'react-dom', 'vue']
    }
];