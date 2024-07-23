<template>
  <el-form size="large" label-width="80px">
    <el-form-item>
      <UploadAvatar :src="formData.avatar_path" @success="(res) => (formData.avatar = res.id)" />
    </el-form-item>
    <el-form-item label="登录名">
      <el-input v-model="formData.name" disabled />
    </el-form-item>
    <el-form-item label="分组">
      <el-select v-model="formData.group_id">
        <el-option
          v-for="group in groups"
          :key="group.id"
          :label="group.name"
          :value="group.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formData.email" disabled />
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" type="primary" @click="sumbit">提交</el-button>
      <el-button @click="props.close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { apiStaffUpdate } from '@/api'
import UploadAvatar from '@/components/staff/UploadAvatar.vue'
import { tailError, filterEmpty, success } from '@/helper/common'
import { defineProps, defineEmits, reactive, watchEffect, ref } from 'vue'
import { useStaffGroupStore } from '@/stores/group'

const props = defineProps(['close', 'fromData'])
const emit = defineEmits(['success'])

const { groups } = useStaffGroupStore()
const loading = ref(false)
const formData = reactive({ id: 0, avatar: 0, avatar_path: '', name: '', group_id: 0, email: '' })

const sumbit = () => {
  loading.value = true
  apiStaffUpdate(formData.id, filterEmpty(formData))
    .then((res) => {
      emit('success')
      success(res, props.close)
    })
    .catch(tailError)
    .finally(() => {
      loading.value = false
    })
}

watchEffect(() => {
  Object.assign(formData, props.fromData ?? {})
})
</script>
