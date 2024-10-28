<script setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <el-drawer
    v-model="appStore.settingsVisible"
    title="I am the title"
  />
</template>
