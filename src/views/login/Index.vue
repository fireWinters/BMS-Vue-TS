<template>
  <section>
    <Bg />

    <aside class="login-from">
      <section class="win rounded">
        <h1 class="text-center pb-2 mb-6 mt-2 text-xl title">欢迎登录系统</h1>
        <el-form @submit.prevent="onsubmit">
          <el-form-item>
            <el-input
              placeholder="用户名"
              :prefix-icon="User"
              size="large"
              v-model="formData.name"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              placeholder="用户密码"
              :prefix-icon="Lock"
              size="large"
              v-model="formData.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox size="large" v-model="checked">记住登录状态</el-checkbox>
          </el-form-item>
          <el-form-item class="py-4">
            <el-button
              @click="onsubmit"
              :loading="loading"
              class="w-full"
              type="primary"
              size="large"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </section>
    </aside>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { apiLogin } from '@/api'
import { Auth } from '@/helper/Auth'
import { success } from '@/helper/common'
import Bg from './Bg.vue'

const checked = true
const loading = ref(false)
const formData = reactive({ name: '', password: '' })
const onSuccess = (token: string) => {
  Auth.ins.saveToLocal(token)

  success({ message: '登录成功！正在跳转' }, () => {
    window.location.href = '/'
  })
}

const onsubmit = () => {
  loading.value = true
  apiLogin(formData)
    .then((res) => onSuccess(res.token))
    .catch((err: any) => ElMessage.error(err.message ?? '登录信息有误'))
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.login-from .win {
  max-width: 400px;
  margin: 20vh auto;
  padding: 20px;
  background-color: white;
}
.login-from .title {
  position: relative;
}
.login-from .title::after {
  position: absolute;
  content: '';
  width: 2em;
  height: 2px;
  left: 50%;
  bottom: 0;
  margin-left: -1em;
  background-color: var(--el-color-primary);
}
</style>
