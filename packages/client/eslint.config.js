import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'
// import UnoCSS from '@unocss/eslint-config/flat'

const compat = new FlatCompat()

export default antfu(
  {
    vue: true,
    unocss: true,
    rules: {
      'no-console': 'warn',
    },
  },
  ...compat.config(
    {
      extends: [
        './.eslintrc-auto-import.json',
      ],
    },
  ),
)
