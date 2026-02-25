import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const eslintConfig = [
  // Configuração base do Next.js
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Prettier - deve vir depois de outras configurações para sobrescrever conflitos
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  // Regras globais aplicadas a todos os arquivos
  {
    rules: {
      // Prettier cuida da formatação (semi, espaços, quebra de linha, etc.)
      // Regras gerais úteis
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-param-reassign': 'off',
      'consistent-return': 'off',
      // React/JSX - regras úteis que não entram em conflito com next/core-web-vitals
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-curly-newline': 'off',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/function-component-definition': 'off',
      // Importações
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },
  },
  // Configurações específicas para arquivos TypeScript/TSX
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // TypeScript específico
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-nocheck': 'allow-with-description' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-undef': 'off',
      camelcase: 'off',
    },
  },
  // Arquivos de configuração e inicialização
  {
    files: ['*.config.{js,ts,mjs}', 'init.{js,ts}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // Ignorar arquivos e diretórios
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];
export default eslintConfig;
