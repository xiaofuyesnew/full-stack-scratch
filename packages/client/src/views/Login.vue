<script setup>
import { login } from '@/api'
import { local } from '@/utils'

const router = useRouter()

const captcha = ref('')

function genCaptcha() {
  const timeStamp = dayjs().valueOf()
  captcha.value = `/api/auth/captcha?timeStamp=${timeStamp}`
}

genCaptcha()

const formData = ref({
  username: null,
  password: null,
  captcha: null,
})

function submit() {
  login(formData.value).then((res) => {
    console.log(res)
    if (res.code === 200) {
      const { accessToken } = res.data
      local.set('AccessToken', accessToken)
      router.push('/')
    }
  }).catch((e) => {
    console.log(e)
  })
}
</script>

<template>
  <div w="[400px]" h="[450px]" flex="~ col">
    <input v-model="formData.username" w="[240px]" h="[30px]" mb-10 type="text">
    <input v-model="formData.password" w="[240px]" h="[30px]" mb-10 type="password">
    <div w="[240px]" h="[30px]" mb-30 flex items-center justify-between>
      <input v-model="formData.captcha" w="[120px]" h-full type="text">
      <img h-full w-auto :src="captcha" alt="captcha" @click="genCaptcha">
    </div>
    <button w="[240px]" h="[40px]" @click="submit">
      登录
    </button>
  </div>
</template>
