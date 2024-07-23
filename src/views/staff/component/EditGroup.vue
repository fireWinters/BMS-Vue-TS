<template>
  <el-form size="large" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" type="primary" @click="sumbit">提交</el-button>
      <el-button @click="props.close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { apiStaffGroupEdit } from '@/api'
import { tailError, filterEmpty, success } from '@/helper/common'
import { defineProps, defineEmits, reactive, watchEffect, ref } from 'vue'

const props = defineProps(['close', 'fromData'])
const emit = defineEmits(['success'])

const loading = ref(false)
const formData = reactive({ id: 0, name: '' })

const sumbit = () => {
  loading.value = true
  apiStaffGroupEdit(formData.id, filterEmpty(formData))
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
  console.log(formData, props.fromData)
})
</script>
