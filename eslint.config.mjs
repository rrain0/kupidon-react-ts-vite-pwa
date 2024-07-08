import { FlatCompat } from '@eslint/eslintrc'
import * as url from 'url'

// yarn add --dev globals
import globals from 'globals'

// yarn add --dev eslint @eslint/js @types/eslint__js typescript typescript-eslint
import js from '@eslint/js'
import ts from 'typescript-eslint'

// yarn add --dev @stylistic/eslint-plugin
import stylistic from '@stylistic/eslint-plugin'

// yarn add --dev eslint-plugin-react
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'

// yarn add --dev eslint-plugin-react-hooks
import reactHooks from 'eslint-plugin-react-hooks'

// yarn add --dev eslint-plugin-import eslint-import-resolver-alias eslint-import-resolver-typescript
import importPlugin from 'eslint-plugin-import'

// yarn add --dev eslint-plugin-promise
import promise from 'eslint-plugin-promise'

// yarn add --dev eslint-plugin-react-refresh
import reactRefresh from 'eslint-plugin-react-refresh'

// yarn add --dev eslint-plugin-jsx-a11y
import jsxA11y from 'eslint-plugin-jsx-a11y'

// https://github.com/prettier/eslint-plugin-prettier
//import prettierConfigRecommended from 'eslint-plugin-prettier/recommended'
//import prettier from 'eslint-plugin-prettier'



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
  
  // typescript config
  ...ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    {
      rules: {
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
      },
    }
  ),
  
  
  // react config
  // https://www.npmjs.com/package/eslint-plugin-react
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...reactRecommended,
    // must be after react recommended config
    ...reactJsxRuntime,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      'react/display-name': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/function-component-definition': 'off',
      'react/prop-types': 'off',
      // for emotion css property
      'react/no-unknown-property': ['error', { 'ignore': ['css'] }],
    },
  },
  
  
  // https://www.npmjs.com/package/eslint-plugin-react-hooks
  // Legacy error: TypeError: context.getSource is not a function
  //...compat.extends('plugin:react-hooks/recommended'),
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
    
    },
  },
  
  
  // react-refresh config
  // https://www.npmjs.com/package/eslint-plugin-react-refresh
  // Validates that your components can safely be updated with fast refresh.
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  
  
  // @stylistic/eslint-plugin config
  // code style rules
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        tuples: 'only-multiline',
        enums: 'always-multiline',
        objects: 'always-multiline',
        imports: 'only-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
        generics: 'only-multiline',
      }],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/computed-property-spacing': ['error', 'never'],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-call-argument-newline': 'off',
      '@stylistic/function-paren-newline': 'off',
      '@stylistic/generator-star-spacing': 'off',
      '@stylistic/implicit-arrow-linebreak': 'off',
      /*'@stylistic/indent': ['error', 2, {
        MemberExpression: 0,
        ignoreComments: true,
      }],*/
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      //'@stylistic/linebreak-style': ['error', 'unix'], // doesn't matter what linebreak style - git fixes it
      '@stylistic/linebreak-style': 'off',
      '@stylistic/lines-around-comment': 'off',
      '@stylistic/lines-between-class-members': 'off',
      '@stylistic/max-len': ['error', { code: 120, tabWidth: 2 }],
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/new-parens': ['error', 'always'],
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 5 }],
      '@stylistic/no-confusing-arrow': 'off',
      //'@stylistic/no-extra-parens': ['error'],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
      //'@stylistic/no-mixed-operators': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true }],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 4, maxBOF: 4, maxEOF: 4 }],
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'off',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/nonblock-statement-body-position': 'off',
      '@stylistic/object-curly-newline': 'off',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/one-var-declaration-per-line': 'off',
      '@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
      '@stylistic/padded-blocks': 'off',
      '@stylistic/padding-line-between-statements': 'off',
      '@stylistic/quote-props': 'off',
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/semi-style': ['error', 'first'],
      '@stylistic/space-before-blocks': [
        'error',
        { functions: 'always', keywords: 'always', classes: 'always' },
      ],
      '@stylistic/space-before-function-paren': 'off',
      '@stylistic/space-in-parens': 'off',
      '@stylistic/space-infix-ops': 'off',
      '@stylistic/space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
      '@stylistic/spaced-comment': 'off',
      '@stylistic/switch-colon-spacing': ['error', { before: false, after: true }],
      '@stylistic/template-curly-spacing': ['error', 'never'],
      '@stylistic/template-tag-spacing': ['error', 'never'],
      '@stylistic/wrap-iife': 'off',
      '@stylistic/wrap-regex': 'off',
      '@stylistic/yield-star-spacing': 'off',
    },
  },
  
  
  // Legacy error
  //...compat.extends('plugin:import/errors'),
  //...compat.extends('plugin:import/warnings'),
  /*{
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
    files: ['**!/!*.{ts,cts,mts,tsx,d.ts,js,cjs,mjs,jsx}'],
    plugins: {
      'import': importPlugin,
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
      // import rules
      // 'import/order': ['error', {
      //   groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      //   'newlines-between': 'always',
      // }],
      
    },
  },*/
  
  
  // https://www.npmjs.com/package/eslint-plugin-promise
  // works
  ...compat.extends('plugin:promise/recommended'),
  {
    plugins: {
      'promise': promise,
    },
    rules: {
      // just example, it is already turned on
      //'promise/always-return': 'error'
    },
  },
  
  
  // jsx-a11y config
  // https://www.npmjs.com/package/eslint-plugin-jsx-a11y
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...jsxA11y.flatConfigs.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      'jsx-a11y/tabindex-no-positive': 'off',
    },
  },
  
  
  // prettier must be last
  // I don't like empty lines collapsing cause code becomes harder to read:
  // https://prettier.io/docs/en/rationale.html#empty-lines
  //prettierConfigRecommended, // works
  
  
  // !!! 'ignores' must be in a standalone object to work globally
  { ignores: ['dist', 'dev-dist'] },
]
