module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:jsdoc/recommended-typescript-error',
      'plugin:sonarjs/recommended-legacy',
  ],
  root: true,
  env: {
      node: true,
      jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'src/cli/*', 'src/database/*', 'src/i18n/types/*'],
  rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      curly: 'error',
      'no-nested-ternary': 'error',
      'padding-line-between-statements': 'off',
      'object-shorthand': ['warn', 'always'],
      'no-param-reassign': ['error', { props: true }],
      'import/newline-after-import': 'error',
      'import/order': [
          'error',
          {
              groups: [['builtin', 'external'], 'parent', 'sibling', 'index'],
              'newlines-between': 'always',
          },
      ],
      'jsdoc/require-jsdoc': [
          'error',
          {
              contexts: ['TSInterfaceDeclaration', 'TSMethodSignature', 'TSPropertySignature'],
              publicOnly: { ancestorsOnly: true },
              require: {
                  ArrowFunctionExpression: true,
                  ClassDeclaration: false,
                  ClassExpression: true,
                  MethodDefinition: true,
                  FunctionDeclaration: true,
                  FunctionExpression: true,
              },
          },
      ],
      'jsdoc/tag-lines': ['error', 'any', { startLines: 1, tags: { param: { lines: 'never' } } }],
      'jsdoc/check-indentation': 'error',
      'jsdoc/no-multi-asterisks': 'off',
      'jsdoc/require-property': 'error',
      'jsdoc/require-throws': 'error',
      // 'jsdoc/require-description-complete-sentence': 'error',
      'jsdoc/require-hyphen-before-param-description': 'error',
      'jsdoc/match-description': [
          'error',
          {
              mainDescription: '[A-Z]*\\.',
              tags: {
                  param: true,
                  returns: true,
              },
              message:
                  'The description should begin with a capital letter and end with full stop.',
          },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      'require-await': 'off',
      'no-console': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/ban-types': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/naming-convention': [
          'error',
          { selector: ['class'], format: ['PascalCase'] },
          {
              selector: ['parameter'],
              format: ['camelCase'],
              leadingUnderscore: 'allow',
          },
          {
              selector: ['classProperty', 'classMethod'],
              format: ['camelCase'],
              leadingUnderscore: 'allow',
          },
          {
              selector: 'variable',
              types: ['boolean'],
              format: ['PascalCase'],
              prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
          },
      ],
      '@typescript-eslint/padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'return' },
          { blankLine: 'always', prev: '*', next: ['interface', 'type'] },
      ],
      'sonarjs/no-duplicate-string': 'off',
  },
  overrides: [
      {
          files: ['src/**/*.controller.ts'],
          rules: {
              'jsdoc/require-jsdoc': 'off',
          },
      },
  ],
};
