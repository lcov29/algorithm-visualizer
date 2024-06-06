import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  eslintConfigPrettier,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'no-console': 'error',
      'no-unused-private-class-members': 'error',
    },
  },
  {
    ignores: ['node_modules', 'dist', 'build-utils', 'webpack.config.js'],
  },
];
