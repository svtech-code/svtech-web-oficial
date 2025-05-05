import eslintPluginAstro from 'eslint-plugin-astro'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
])
