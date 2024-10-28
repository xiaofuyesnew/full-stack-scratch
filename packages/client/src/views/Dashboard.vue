<script setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <div>dashboard{{ appStore.layout }}</div>
</template>
