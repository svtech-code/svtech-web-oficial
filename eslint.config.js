import eslintPluginAstro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{ts}'],
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  //ignora archivos específicos
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**'],
  },
]);
