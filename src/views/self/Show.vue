<template>
  <section class="container-white">
    <section class="mb-12">
      <el-divider content-position="right">
        <span class="text-xl">Your Profile</span>
      </el-divider>
    </section>
    <el-form size="large" label-width="120px">
      <el-form-item label="头像">
        <section>
          <UploadAvatar :src="user.avatar_path" @success="(res) => (form.avatar = res.id)" />
        </section>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input :value="user.name" disabled />
      </el-form-item>
      <el-form-item label="分组">
        <el-input :value="user.group_text" disabled />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { reactive, watchEffect } from 'vue'
import UploadAvatar from '@/components/staff/UploadAvatar.vue'
import { apiUpUserCurrent } from '@/api'
import { success, tailError } from '@/helper/common'

const { user, upUser } = useAuthStore()
const form = reactive({ avatar: 0, email: '' })

watchEffect(() => {
  form.avatar = user.avatar
  form.email = user.email
})

// 提交表单
const onSubmit = () => {
  apiUpUserCurrent(form)
    .then((res) => success({ message: res.message }))
    .then(upUser)
    .catch(tailError)
}
</script>
