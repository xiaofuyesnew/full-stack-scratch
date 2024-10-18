import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    vue: true,
  },
  ...compat.config({
    extends: [
      './packages/client/.eslintrc-auto-import.json',
    ],
  }),
  {
    files: ['./packages/client/**'],
    unocss: true,
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['./packages/server/**'],
    rules: {
      'no-console': 'off',
    },
  },
)
