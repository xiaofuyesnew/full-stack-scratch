<script setup>
const width = ref(220)

function toggleMenu() {
  if (width.value === 220) {
    width.value = 110
  }
  else {
    width.value = 220
  }
}
</script>

<template>
  <aside :style="{ width: `${width}px` }" transition="all 300 ease-in-out">
    <el-button type="primary" @click="toggleMenu">
      collapse
    </el-button>
  </aside>
</template>
