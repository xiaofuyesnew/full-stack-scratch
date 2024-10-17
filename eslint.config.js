import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    rules: {
      'no-console': 'warn',
    },
  },
  ...compat.config({
    extends: [
      './packages/client/.eslintrc-auto-import.json',
    ],
  }),
  {
    files: ['./packages/client/**'],
    vue: true,
    unocss: true,
  },
)
