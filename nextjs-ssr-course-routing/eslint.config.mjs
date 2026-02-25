import tseslint from 'typescript-eslint';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import importHelpers from 'eslint-plugin-import-helpers';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  {
    // Arquivos/pastas ignorados (equivalente a .eslintignore)
    ignores: [
      'node_modules/',
      '.next/',
      'dist/',
      'build/',
      'coverage/',
    ],
  },

  // Regras recomendadas do TypeScript + type-check
  ...tseslint.configs.recommendedTypeChecked,

  // Regras específicas do projeto (TS + React + Testing Library + Prettier)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      'testing-library': testingLibraryPlugin,
      'import-helpers': importHelpers,
      prettier: prettierPlugin,
    },
    rules: {
      /* =========================
       * Prettier
       * ========================= */
      'prettier/prettier': 'error',

      /* =========================
       * JS/TS base
       * ========================= */
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      /* =========================
       * React Hooks
       * ========================= */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* =========================
       * Testing Library
       * ========================= */
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': ['error', 'react'],

      /* =========================
       * Imports helpers
       * ========================= */
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },
);

