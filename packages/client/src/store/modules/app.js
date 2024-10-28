import { useDark, useToggle } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  // dark theme
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  // layouts
  const layout = ref('default')
  function setLayout(layout) {
    layout.value = layout
  }

  // App settings drawer visible
  const settingsVisible = ref(false)
  const toggleSettings = useToggle(settingsVisible)

  return {
    isDark,
    toggleDark,
    layout,
    setLayout,
    settingsVisible,
    toggleSettings,
  }
})
