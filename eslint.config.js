import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier, // Add Prettier plugin
      import: pluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ], // Unused variables
      // 'no-unused-imports': 'warn', // Unused imports (through import plugin)
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true },
      ],

      // Import management
      'import/no-unresolved': 'error', // Disallow unresolved imports
      'import/no-duplicates': 'error', // Disallow duplicate imports
      'import/order': [
        'error',
        {
          // Enforce a certain order for imports
          groups: ['builtin', 'external', 'internal'],
        },
      ],

      // React-specific rules
      'react-hooks/rules-of-hooks': 'error', // Check the rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Check effect dependencies

      'prettier/prettier': 'error',
      ...prettierConfig.rules,
      quotes: [
        'error',
        'single',
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      'jsx-quotes': ['error', 'prefer-single'],
    },
  },
]
