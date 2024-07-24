/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
        checker({
            // https://vite-plugin-checker.netlify.app/introduction/introduction.html
            typescript: true,
            eslint: {
                lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            },
            overlay: {
                badgeStyle: 'display: none;',
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@features': path.resolve(__dirname, './src/features'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@lib': path.resolve(__dirname, './src/lib'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '@types': path.resolve(__dirname, './src/types'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
        exclude: ['**/node_modules/**', '**/dist/**', '**/src/app/routes/**'],
        coverage: {
            include: ['**/src/**'],
            exclude: [
                '**/node_modules/**',
                '**/dist/**',
                '**/src/app/routes/**',
                '**/*.test.ts', // Exclude test files from coverage
                '**/*.test.tsx', // Exclude test files from coverage
                '**/__tests__/**', // Exclude __tests__ directories from coverage
            ],
            reporter: ['text', 'json', 'html'],
            thresholds: {
                lines: 100,
                statements: 100,
                branches: 100,
                functions: 100,
            },
        },
    },
})
