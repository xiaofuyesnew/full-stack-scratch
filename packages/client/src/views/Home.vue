<script setup>
import { getUserInfo } from '@/api'
import { local } from '@/utils'

const router = useRouter()

const userInfo = ref({})

getUserInfo().then((res) => {
  // console.log(res)
  userInfo.value = res.data
})

function logout() {
  local.remove('AccessToken')
  router.replace('/login')
}
</script>

<template>
  <div>
    <div v-for="key in Object.keys(userInfo)" :key="key">
      {{ key }}: {{ userInfo[key] }}
    </div>
    <button @click="logout">
      Logout
    </button>
  </div>
</template>
