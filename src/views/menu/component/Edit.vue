<template>
  <el-form label-position="right" label-width="80px">
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
import { apiTreeEdit } from '@/api'
import { success, tailError } from '@/helper/common'
import { defineProps, defineEmits, reactive, ref, watchEffect } from 'vue'

const props = defineProps(['current', 'close'])
const emit = defineEmits(['success'])
const loading = ref(false)

const formData = reactive({
  name: '',
  title: ''
})

const sumbit = () => {
  loading.value = true
  apiTreeEdit(props.current.id, formData)
    .then((res) => {
      emit('success')
      props.current.label = formData.title
      props.current.name = formData.name
      success(res, props.close)
    })
    .catch(tailError)
    .finally(() => {
      loading.value = false
    })
}

watchEffect(() => {
  formData.title = props.current.label
  formData.name = props.current.name
})
</script>
