<script setup>
import Settings from '@/components/Settings.vue'
import { useAppStore } from '@/store'
import AnotherLayout from './layouts/AnotherLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

defineOptions({
  name: 'Layout',
})

const appStore = useAppStore()

const layouts = {
  default: DefaultLayout,
  another: AnotherLayout,
}
</script>

<template>
  <component :is="layouts[appStore.layout]">
    <router-view />
  </component>
  <Settings />
</template>
