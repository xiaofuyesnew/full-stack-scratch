import HelloWorld from './HelloWorld.vue'

const globalComponents = [
  HelloWorld,
]

export function setupGlobalComponents(app) {
  globalComponents.forEach((component) => {
    app.component(component.name, component)
  })
}
