<script setup>
import { useAppStore } from '@/store'
import { Menu, Moon, Setting, Sunny } from '@element-plus/icons-vue'

const appStore = useAppStore()
console.log(appStore.isDark)
</script>

<template>
  <header pt-4>
    <el-button text :icon="Menu" size="small" />
    <el-button :type="appStore.isDark ? 'info' : 'primary'" circle :icon="appStore.isDark ? Moon : Sunny" @click="appStore.toggleDark()" />
    <el-button type="primary" circle :icon="Setting" @click="appStore.toggleSettings()">
      {{ appStore.settingsVisible ? '关' : '开' }}
    </el-button>
  </header>
</template>
