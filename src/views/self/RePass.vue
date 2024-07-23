<template>
  <section class="container-white">
    <section class="mb-12">
      <el-divider content-position="right">
        <span class="text-xl">Re:Pass</span>
      </el-divider>
    </section>
    <el-form size="large" label-width="120px">
      <el-form-item label="原密码">
        <el-input
          v-model="form.current_password"
          type="password"
          show-password
          placeholder="请输入原登录密码"
        />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          placeholder="请输入新登录密码"
        />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          v-model="form.password_confirmation"
          type="password"
          show-password
          placeholder="确认新登录密码"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { apiUpPassCurrent } from '@/api'
import { success, tailError } from '@/helper/common'

const form = reactive({ current_password: '', password: '', password_confirmation: '' })

// 提交表单
const onSubmit = () => {
  apiUpPassCurrent(form)
    .then((res) => success({ message: res.message }))
    .catch(tailError)
}
</script>
