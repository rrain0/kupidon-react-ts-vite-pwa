import { FlatCompat } from '@eslint/eslintrc'
import * as url from 'url'
import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import react from 'eslint-plugin-react'
import reactConfigRecommended from 'eslint-plugin-react/configs/recommended.js'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
// https://github.com/eslint-community/eslint-plugin-promise
import promise from 'eslint-plugin-promise'
import jsxA11y from 'eslint-plugin-jsx-a11y'
// https://github.com/prettier/eslint-plugin-prettier
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended'
import prettier from 'eslint-plugin-prettier'
// https://www.npmjs.com/package/eslint-plugin-react-refresh
// Validate that your components can safely be updated with fast refresh.
import reactRefresh from 'eslint-plugin-react-refresh'


// use for old plugins
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
})



// Migration from .eslintrc.cjs to eslint.config.mjs
// https://eslint.org/docs/latest/use/configure/migration-guide

export default [
  ...ts.config(
    js.configs.recommended, // works
    ...ts.configs.recommended, // works
  ),
  ...compat.extends('plugin:react/recommended'), // works
  // must be after react.configs.recommended ('plugin:react/recommended')
  ...compat.extends('plugin:react/jsx-runtime'), // seems to be working
  ...compat.extends('plugin:react-hooks/recommended'), // works
  ...compat.extends('plugin:import/errors'), // works
  ...compat.extends('plugin:import/warnings'), // works
  ...compat.extends('plugin:promise/recommended'), // works
  
  ...compat.extends('plugin:jsx-a11y/recommended'), // NOT work
  
  // prettier must be last
  //prettierConfigRecommended, // works
  
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
      'react-refresh': reactRefresh, // works
      'react': react,
      'import': importPlugin,
      'jsx-a11y': jsxA11y,
      '@stylistic/js': stylistic,
      //'prettier': prettier,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        alias: [
          ['', './public']
        ],
      }
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-no-target-blank': 'off',
      'react/function-component-definition': 'error',
      
      // code style rules:
      '@stylistic/js/arrow-parens': ['error', 'as-needed'],
      '@stylistic/js/arrow-spacing': ['error', { before: false, after: false }],
      '@stylistic/js/block-spacing': ['error', 'always'],
      '@stylistic/js/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      '@stylistic/js/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'always-multiline',
        functions: 'never',
      }],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/comma-style': ['error', 'last'],
      '@stylistic/js/computed-property-spacing': ['error', 'never'],
      '@stylistic/js/dot-location': ['error', 'property'],
      '@stylistic/js/eol-last': ['error', 'always'],
      '@stylistic/js/function-call-spacing': ['error', 'never'],
      '@stylistic/js/function-call-argument-newline': 'off',
      '@stylistic/js/function-paren-newline': 'off',
      '@stylistic/js/generator-star-spacing': 'off',
      '@stylistic/js/implicit-arrow-linebreak': 'off',
      '@stylistic/js/indent': ["error", 2, { MemberExpression: 0, ignoreComments: false }],
      '@stylistic/js/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/js/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      '@stylistic/js/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/lines-around-comment': 'off',
      '@stylistic/js/lines-between-class-members': 'off',
      '@stylistic/js/max-len': ['error', { code: 120, tabWidth: 2 }],
      '@stylistic/js/max-statements-per-line': 'off',
      '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/js/new-parens': ['error', 'always'],
      '@stylistic/js/newline-per-chained-call': ['error', { ignoreChainWithDepth: 5 }],
      '@stylistic/js/no-confusing-arrow': 'off',
      //'@stylistic/js/no-extra-parens': ['error'],
      '@stylistic/js/no-extra-semi': 'error',
      '@stylistic/js/no-floating-decimal': 'error',
      //'@stylistic/js/no-mixed-operators': 'error',
      '@stylistic/js/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/js/no-multi-spaces': 'error',
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 4, maxBOF: 4, maxEOF: 4 }],
      '@stylistic/js/no-tabs': 'error',
      '@stylistic/js/no-trailing-spaces': 'off',
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/nonblock-statement-body-position': 'off',
      '@stylistic/js/object-curly-newline': 'off',
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/object-property-newline': ["error", { allowAllPropertiesOnSameLine: true }],
      '@stylistic/js/one-var-declaration-per-line': 'off',
      '@stylistic/js/operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
      '@stylistic/js/padded-blocks': 'off',
      '@stylistic/js/padding-line-between-statements': 'off',
      '@stylistic/js/quote-props': 'off',
      '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      '@stylistic/js/rest-spread-spacing': ['error', 'never'],
      '@stylistic/js/semi': ['error', 'never'],
      '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/semi-style': ['error', 'first'],
      '@stylistic/js/space-before-blocks': [
        'error',
        { functions: 'never', keywords: 'always', classes: 'always' }
      ],
      '@stylistic/js/space-before-function-paren': ['error', 'never'],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/space-infix-ops': 'off',
      '@stylistic/js/space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
      '@stylistic/js/spaced-comment': 'off',
      '@stylistic/js/switch-colon-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/template-curly-spacing': ['error', 'never'],
      '@stylistic/js/template-tag-spacing': ['error', 'never'],
      '@stylistic/js/wrap-iife': 'off',
      '@stylistic/js/wrap-regex': 'off',
      '@stylistic/js/yield-star-spacing': 'off',
    },
  },
  // !!! ignores must be in a standalone object to work globally
  {
    ignores: ['dist', 'dev-dist', 'eslint.config.mjs'],
  }
]
