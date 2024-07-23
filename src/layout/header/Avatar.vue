<template>
  <section class="flex items-center">
    <el-avatar :size="32" :src="user.avatar_path" v-if="user.avatar_path" />
    <el-avatar :size="32" v-else>U</el-avatar>
    <el-button link class="font-600 mr-2 flex-shrink-0">{{ user.name }}</el-button>
    <el-button
      @click="logout"
      circle
      type="danger"
      :icon="SwitchButton"
      :loading="logoutState"
    ></el-button>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { SwitchButton } from '@element-plus/icons-vue'
import { apiLogout } from '@/api'
import { Auth } from '@/helper/Auth'
import { success, tailError } from '@/helper/common'

const { user } = useAuthStore()
const logoutState = ref(false)
const logout = () => {
  logoutState.value = true
  apiLogout()
    .then(() => Auth.ins.clear())
    .then(() => {
      success({ message: '已退出登录' }, () => {
        window.location.href = '/'
      })
    })
    .catch(tailError)
    .finally(() => (logoutState.value = true))
}
</script>
