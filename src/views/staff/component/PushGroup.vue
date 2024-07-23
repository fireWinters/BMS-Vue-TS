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
import { apiStaffGroupPush } from '@/api'
import { tailError, success } from '@/helper/common'
import { defineProps, defineEmits, reactive, ref } from 'vue'

const props = defineProps(['close'])
const emit = defineEmits(['success'])

const loading = ref(false)
const formData = reactive({ name: '' })

const sumbit = () => {
  loading.value = true
  apiStaffGroupPush(formData)
    .then((res) => {
      emit('success')
      success(res, props.close)
    })
    .catch(tailError)
    .finally(() => {
      loading.value = false
    })
}
</script>
