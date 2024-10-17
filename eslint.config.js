import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['./packages/client/**'],
    vue: true,
    unocss: true,
  },
)
