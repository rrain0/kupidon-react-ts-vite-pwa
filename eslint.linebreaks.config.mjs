import globals from 'globals'
import ts from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'


export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        }
      },
    },
    files: ['**/*.{ts,cts,mts,tsx,d.ts,js,cjs,mjs,jsx}'],
    plugins: {
      '@stylistic/js': stylistic,
    },
    rules: {
      '@stylistic/js/linebreak-style': ['error', 'unix'],
    },
  },
  // !!! ignores must be in a standalone object to work globally
  {
    ignores: ['dist', 'dev-dist', 'eslint.config.mjs'],
  }
]
