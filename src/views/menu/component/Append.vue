<template>
  <el-form label-position="right" label-width="80px">
    <el-form-item label="添加至">
      <el-input :value="parent.label" disabled />
    </el-form-item>
    <el-form-item label="Title">
      <el-input v-model="formData.title" />
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" type="primary" @click="sumbit">提交</el-button>
      <el-button @click="props.close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { apiTreeAppend } from '@/api'
import { success, tailError } from '@/helper/common'
import { defineProps, defineEmits, reactive, ref, watchEffect } from 'vue'

const props = defineProps(['top', 'close'])
const emit = defineEmits(['success'])
const loading = ref(false)

const parent = reactive<TreeItem>({ id: 0, label: '', name: '' })
const formData = reactive({
  pid: parent.id,
  name: '',
  title: ''
})

const sumbit = () => {
  loading.value = true
  apiTreeAppend(formData)
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
  Object.assign(parent, props.top)
  formData.pid = parent.id
})
</script>
