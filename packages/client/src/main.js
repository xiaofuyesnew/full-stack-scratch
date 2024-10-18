import { setupI18n } from '@/locales'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

import App from './App.vue'

import '@/styles'

async function setupApp() {
  const app = createApp(App)

  setupStore(app)
  setupRouter(app)
  setupI18n(app)

  app.mount('#app')
}

setupApp()
