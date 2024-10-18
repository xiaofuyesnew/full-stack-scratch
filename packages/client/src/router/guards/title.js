export default function createTitleGuard(router) {
  const baseTitle = import.meta.env.VITE_TITLE

  router.beforeEach((to) => {
    const title = to.meta?.title
    if (title) {
      document.title = `${title} - ${baseTitle}`
    }
    else {
      document.title = baseTitle
    }
  })
}
