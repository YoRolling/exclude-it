/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint. 
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/semi': ['off'],
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        enforceForClassMembers: true,
        getWithoutSet: false,
      },
    ],
    'array-bracket-newline': 'off',
    'array-bracket-spacing': ['off', 'never'],
    'array-callback-return': [
      'error',
      {
        allowImplicit: false,
        checkForEach: false,
      },
    ],
    'array-element-newline': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'arrow-spacing': [
      'off',
      {
        before: true,
        after: true,
      },
    ],
    'block-spacing': ['off', 'always'],
    'brace-style': [
      'off',
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    camelcase: [
      'error',
      {
        allow: ['^UNSAFE_'],
        properties: 'never',
        ignoreGlobals: true,
        ignoreDestructuring: false,
        ignoreImports: false,
      },
    ],
    'comma-dangle': [
      'off',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'comma-spacing': [
      'off',
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': ['off', 'last'],
    'computed-property-spacing': [
      'off',
      'never',
      {
        enforceForClassMembers: true,
      },
    ],
    'constructor-super': 'error',
    curly: 'warn',
    'default-case-last': 'error',
    'dot-location': ['off', 'property'],
    'dot-notation': [
      'error',
      {
        allowKeywords: true,
        allowPattern: '',
      },
    ],
    'eol-last': 'off',
    eqeqeq: ['warn', 'always'],
    'func-call-spacing': ['off', 'never'],
    'function-call-argument-newline': 'off',
    'function-paren-newline': 'off',
    'generator-star': 'off',
    'generator-star-spacing': [
      'off',
      {
        before: true,
        after: true,
      },
    ],
    'implicit-arrow-linebreak': 'off',
    'import/export': 'error',
    'import/first': 'error',
    'import/no-absolute-path': [
      'error',
      {
        esmodule: true,
        commonjs: true,
        amd: false,
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',
    'import/no-webpack-loader-syntax': 'error',
    indent: [
      'off',
      2,
      {
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
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: [
          'TemplateLiteral *',
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
        offsetTernaryExpressions: true,
      },
    ],
    'indent-legacy': 'off',
    'jsx-quotes': 'off',
    'key-spacing': [
      'off',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'keyword-spacing': [
      'off',
      {
        before: true,
        after: true,
      },
    ],
    'linebreak-style': 'off',
    'lines-around-comment': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'max-len': 'off',
    'multiline-ternary': ['off', 'always-multiline'],
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        properties: true,
      },
    ],
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-array-constructor': 'error',
    'no-arrow-condition': 'off',
    'no-async-promise-executor': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-comma-dangle': 'off',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-confusing-arrow': 'off',
    'no-const-assign': 'error',
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-parens': ['off', 'functions'],
    'no-extra-semi': 'off',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'off',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-import-assign': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-labels': [
      'error',
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    'no-lone-blocks': 'error',
    'no-loss-of-precision': 'error',
    'no-misleading-character-class': 'error',
    'no-mixed-operators': [
      'off',
      {
        groups: [
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'no-mixed-spaces-and-tabs': 'off',
    'no-multi-spaces': 'off',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': [
      'off',
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-prototype-builtins': 'error',
    'no-redeclare': 'warn',
    'no-regex-spaces': 'error',
    'no-reserved-keys': 'off',
    'no-return-assign': ['error', 'except-parens'],
    'no-self-assign': [
      'error',
      {
        props: true,
      },
    ],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-space-before-semi': 'off',
    'no-spaced-func': 'off',
    'no-sparse-arrays': 'error',
    'no-tabs': 'off',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'warn',
    'no-trailing-spaces': 'off',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-unexpected-multiline': 'off',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': [
      'error',
      {
        defaultAssignment: false,
      },
    ],
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    'no-useless-backreference': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'warn',
    'no-void': 'error',
    'no-whitespace-before-property': 'off',
    'no-with': 'error',
    'no-wrap-func': 'off',
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-callback-literal': 'error',
    'node/no-deprecated-api': 'error',
    'node/no-exports-assign': 'error',
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
    'node/process-exit-as-throw': 'error',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': [
      'off',
      {
        multiline: true,
        consistent: true,
      },
    ],
    'object-curly-spacing': ['off', 'always'],
    'object-property-newline': [
      'off',
      {
        allowMultiplePropertiesPerLine: true,
        allowAllPropertiesOnSameLine: false,
      },
    ],
    'one-var': [
      'error',
      {
        initialized: 'never',
      },
    ],
    'one-var-declaration-per-line': 'off',
    'operator-linebreak': [
      'off',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
          '|>': 'before',
        },
      },
    ],
    'padded-blocks': [
      'off',
      {
        blocks: 'never',
        switches: 'never',
        classes: 'never',
      },
    ],
    'prefer-arrow-callback': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ],
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': [
      'error',
      {
        disallowRedundantWrapping: true,
      },
    ],
    'prettier/prettier': 'error',
    'promise/param-names': 'error',
    'quote-props': ['off', 'as-needed'],
    quotes: [
      'off',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
    'rest-spread-spacing': ['off', 'never'],
    'semi-spacing': [
      'off',
      {
        before: false,
        after: true,
      },
    ],
    'semi-style': 'off',
    'space-after-function-name': 'off',
    'space-after-keywords': 'off',
    'space-before-blocks': ['off', 'always'],
    'space-before-function-paren': ['off', 'always'],
    'space-before-function-parentheses': 'off',
    'space-before-keywords': 'off',
    'space-in-brackets': 'off',
    'space-in-parens': ['off', 'never'],
    'space-infix-ops': 'off',
    'space-return-throw-case': 'off',
    'space-unary-ops': [
      'off',
      {
        words: true,
        nonwords: false,
      },
    ],
    'space-unary-word-ops': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['*package', '!', '/', ',', '='],
        },
        block: {
          balanced: true,
          markers: ['*package', '!', ',', ':', '::', 'flow-include'],
          exceptions: ['*'],
        },
      },
    ],
    'switch-colon-spacing': 'off',
    'symbol-description': 'error',
    'template-curly-spacing': ['off', 'never'],
    'template-tag-spacing': ['off', 'never'],
    'unicode-bom': ['off', 'never'],
    'use-isnan': [
      'error',
      {
        enforceForSwitchCase: true,
        enforceForIndexOf: true,
      },
    ],
    'valid-typeof': [
      'error',
      {
        requireStringLiterals: true,
      },
    ],
    'wrap-iife': [
      'off',
      'any',
      {
        functionPrototypeMethods: true,
      },
    ],
    'wrap-regex': 'off',
    'yield-star-spacing': ['off', 'both'],
    yoda: ['error', 'never'],
  },
  globals: {
    Thenable: true,
  },
}