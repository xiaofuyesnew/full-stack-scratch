import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['packages/client/**/*'],

  },
  {
    files: ['packages/server/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },
)
