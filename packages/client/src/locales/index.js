import en from './en/index.json'
import zh from './zh/index.json'

export const i18n = createI18n({
  locale: 'zh',
  messages: {
    zh,
    en,
  },
})

export function setupI18n(app) {
  app.use(i18n)
}
