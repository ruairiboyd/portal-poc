module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // This should be last to override other configs
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh', 'prettier', 'import', 'check-file'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'prettier/prettier': [
            'error',
            {
                usePrettierrc: true,
                endOfLine: 'auto',
            },
        ],
        'check-file/filename-naming-convention': [
            'error',
            {
                'src/app/routes/!(*index).{jsx,tsx}': 'PASCAL_CASE',
                'src/lib/**/*.{js,jsx,ts,tsx}': 'PASCAL_CASE',
            },
            {
                ignoreMiddleExtensions: true,
            },
        ],
        'import/no-restricted-paths': [
            'error',
            {
                zones: [
                    {
                        target: 'src/features',
                        from: 'src/app',
                    },
                ],
            },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variableLike',
                format: ['camelCase'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'function',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'variable',
                types: ['boolean', 'string', 'number', 'array'],
                format: ['strictCamelCase', 'UPPER_CASE'],
            },
        ],
    },
    overrides: [
        {
            files: ['vite.config.ts'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
            },
        },
    ],
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
            },
            alias: {
                map: [
                    ['@', './src'],
                    ['@assets', './src/assets'],
                    ['@components', './src/components'],
                    ['@config', './src/config'],
                    ['@features', './src/features'],
                    ['@hooks', './src/hooks'],
                    ['@lib', './src/lib'],
                    ['@stores', './src/stores'],
                    ['@types', './src/types'],
                    ['@utils', './src/utils'],
                ],
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
            },
        },
    },
}
