export const pinia = createPinia()

export function setupStore(app) {
  app.use(pinia)
}

export * from './modules'
