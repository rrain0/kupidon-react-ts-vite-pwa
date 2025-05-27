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
import react from 'eslint-plugin-react'

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
// package.json.devDependencies."eslint-plugin-prettier": "^5.2.1",
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
        'eslint no-unused-expressions': 'off',
        'no-async-promise-executor': 'off',
        'no-constant-binary-expression': 'warn',
        'no-constant-condition': 'off',
        'no-empty': 'off',
        'no-empty-pattern': 'off',
        'no-self-assign': 'off',
        'no-unexpected-multiline': 'off',
        'prefer-const': 'warn',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-expect-error': false }],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unsafe-function-type': 'off',
      },
    }
  ),
  
  
  // react config
  // https://www.npmjs.com/package/eslint-plugin-react
  react.configs.flat.recommended,
  // must be after react recommended config
  react.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
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
      'react/no-unescaped-entities': 'off',
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
  
  
  // https://eslint.style/packages/default
  // @stylistic/eslint-plugin config
  // code style rules
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/arrow-parens': 'off',
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/block-spacing': ['error', 'always'],
      //'@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      '@stylistic/brace-style': 'off',
      '@stylistic/comma-dangle': ['warn', {
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
      //'@stylistic/eol-last': ['error', 'always'],
      '@stylistic/eol-last': 'off',
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/function-call-argument-newline': 'off',
      '@stylistic/function-paren-newline': 'off',
      '@stylistic/generator-star-spacing': 'off',
      '@stylistic/implicit-arrow-linebreak': 'off',
      // https://eslint.style/rules/js/indent
      '@stylistic/indent': ['warn', 2, {
        // numbers are multipliers for base indent
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        StaticBlock: {
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        offsetTernaryExpressions: false,
        // https://eslint.org/docs/latest/extend/selectors
        // https://astexplorer.net/ config: lang: JavaScript, parser: @typescript-eslint/parser
        // Array of selectors with AST tokens
        ignoredNodes: ['TsModuleBlock > BlockStatement', 'TSMappedType > TSConditionalType'],
        ignoreComments: false,
        tabLength: 2,
      }],
      //'@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true/*, align: 'value'*/ }],
      '@stylistic/key-spacing': 'off',
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      //'@stylistic/linebreak-style': ['error', 'unix'], // doesn't matter what linebreak style - git fixes it
      '@stylistic/linebreak-style': 'off',
      '@stylistic/lines-around-comment': 'off',
      '@stylistic/lines-between-class-members': 'off',
      '@stylistic/max-len': ['warn', { code: 120, tabWidth: 2 }],
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/new-parens': ['error', 'always'],
      '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 5 }],
      '@stylistic/no-confusing-arrow': 'off',
      //'@stylistic/no-extra-parens': ['error'],
      '@stylistic/no-extra-semi': 'off',
      '@stylistic/no-floating-decimal': 'error',
      //'@stylistic/no-mixed-operators': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      //'@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true, exceptions: { Property: true } }],
      '@stylistic/no-multi-spaces': 'off',
      //'@stylistic/no-multiple-empty-lines': ['error', { max: 8, maxBOF: 8, maxEOF: 8 }],
      '@stylistic/no-multiple-empty-lines': 'off',
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'off',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/nonblock-statement-body-position': 'off',
      '@stylistic/object-curly-newline': 'off',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      //'@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/object-property-newline': 'off',
      '@stylistic/one-var-declaration-per-line': 'off',
      '@stylistic/operator-linebreak': 'off',
      //'@stylistic/operator-linebreak': ['error', 'before', { overrides: { '=': 'after' } }],
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
      
      // JSX rules
      '@stylistic/jsx-child-element-spacing': 'warn',
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      '@stylistic/jsx-closing-tag-location': ['error', 'line-aligned'],
      '@stylistic/jsx-curly-brace-presence': ['warn', {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      }],
      /*
        Disabled for
        {condition && (
          <Elem>
          .....
          </Elem>
        )}
      */
      '@stylistic/jsx-curly-newline': 'off',
      '@stylistic/jsx-curly-spacing': ['error', { when: 'never' }],
      '@stylistic/jsx-equals-spacing': ['error', 'never'],
      '@stylistic/jsx-first-prop-new-line': 'off', /*['error', 'multiline']*/
      '@stylistic/jsx-function-call-newline': 'off',
      '@stylistic/jsx-indent': ['warn', 2, {
        checkAttributes: true,
        indentLogicalExpressions: true,
      }],
      '@stylistic/jsx-indent-props': ['warn', 2],
      '@stylistic/jsx-max-props-per-line': 'off',
      '@stylistic/jsx-newline': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/jsx-pascal-case': ['error', { allowNamespace: true }],
      // it disallows empty lines between jsx props
      '@stylistic/jsx-props-no-multi-spaces': 'off',
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-self-closing-comp': 'warn',
      '@stylistic/jsx-sort-props': 'off',
      '@stylistic/jsx-tag-spacing': ['error', { beforeSelfClosing: 'never' }],
      '@stylistic/jsx-wrap-multilines': ['error', {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'ignore',
        propertyValue: 'parens-new-line',
      }],
    },
  },
  
  
  // https://www.npmjs.com/package/eslint-plugin-import
  // TypeError: context.getAncestors is not a function
  //importPlugin.flatConfigs.recommended,
  //importPlugin.flatConfigs.typescript,
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
  promise.configs['flat/recommended'],
  {
    /*plugins: {
      'promise': promise,
    },*/
    rules: {
      'promise/always-return': 'off',
      'promise/catch-or-return': 'off',
      'promise/no-callback-in-promise': 'off',
    },
  },
  
  
  // jsx-a11y config
  // https://www.npmjs.com/package/eslint-plugin-jsx-a11y
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    /*plugins: {
      'jsx-a11y': jsxA11y,
    },*/
    rules: {
      'jsx-a11y/alt-text': 'off',
      'jsx-a11y/tabindex-no-positive': 'off',
      'jsx-a11y/no-autofocus': 'off',
      // for now, I do not concern about accessibility
      'jsx-a11y/no-static-element-interactions': 'off',
      // for now, I do not concern about accessibility
      'jsx-a11y/click-events-have-key-events': 'off',
    },
  },
  
  
  // I do not use prettier because it formats my code in a strange non-configurable way.
  // Collapsing cause code becomes harder to read:
  // https://prettier.io/docs/en/rationale.html#empty-lines
  
  // prettier config - must be last
  //prettierConfigRecommended, // works
  
  
  // !!! 'ignores' must be in a standalone object to work globally
  { ignores: ['dist', 'dev-dist'] },
]
