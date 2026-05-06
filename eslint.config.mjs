import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      radix: 'off',
      'one-var': 'off',
      'no-bitwise': 'off',
      'prettier/prettier': 'error',
      'no-console': 'error',
      'react/prop-types': 'off',
      'react/button-has-type': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      'no-underscore-dangle': 'off',
      'react/no-danger': 'off',
      'no-undef': ['error'],
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
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-function-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'import/prefer-default-export': 'off',
      'no-use-before-define': ['error', { functions: false, classes: false }],
      'no-nested-ternary': 'off',
      'no-plusplus': 'off',
      'no-shadow': 'off',
      'no-useless-constructor': 'off',
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'no-restricted-syntax': 'off',
      'no-continue': 'off',
      'no-multi-assign': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'consistent-return': 'off',
      'import/no-cycle': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),
]);

export default eslintConfig;
