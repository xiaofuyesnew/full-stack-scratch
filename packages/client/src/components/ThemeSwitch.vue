<script setup>
import { Moon, Sunny } from '@element-plus/icons-vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:value'])

function toggle() {
  console.log('toggle')
  emit('update:value', !props.value)
}
</script>

<template>
  <div class="switch" :class="value ? 'on' : 'off'" @click="toggle">
    <el-icon class="moon" size="12" color="#fff">
      <Moon />
    </el-icon>
    <el-icon class="sunny" size="12" color="#fff">
      <Sunny />
    </el-icon>
    <div class="ball" />
  </div>
</template>

<style lang="scss" scoped>
.switch {
  box-sizing: border-box;
  width: 42px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;

  .moon,
  .sunny {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    opacity: 0;
    transition: all 0.3s;
  }

  &.on {
    background-color: #666;
    justify-content: flex-end;
    .ball {
      left: calc(100% - 20px);
    }
    .moon {
      transform: translateX(-8px);
      opacity: 1;
    }
  }

  &.off {
    background-color: #409eff;
    justify-content: flex-start;
    .ball {
      left: 4px;
    }
    .sunny {
      transform: translateX(8px);
      opacity: 1;
    }
  }

  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.3s;
    position: absolute;
    top:0;
    bottom: 0;
    margin: auto;
  }
}
</style>
