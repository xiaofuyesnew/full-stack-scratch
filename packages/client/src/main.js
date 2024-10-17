import { setupGlobalComponent } from '@/components'
import { setupI18n } from '@/locales'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'

import '@/style'

async function setupApp() {
  const app = createApp(App)

  setupStore(app)
  setupGlobalComponent(app)
  setupRouter(app)
  setupI18n(app)

  app.mount('#app')
}

setupApp()
