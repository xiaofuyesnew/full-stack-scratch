<script setup>
import { AppAside, AppFooter, AppHeader, AppMain } from '../components'
</script>

<template>
  <div h-full w-full flex>
    <div>
      <AppAside />
    </div>
    <div flex="~ col 1">
      <AppHeader />
      <AppMain>
        <slot />
      </AppMain>
      <AppFooter />
    </div>
  </div>
</template>
