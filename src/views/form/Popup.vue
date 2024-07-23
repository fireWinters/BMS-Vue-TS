<template>
  <section class="container-white">
    <section>
      <el-button type="primary" @click="onOpen" :icon="Plus" plain>新增</el-button>
    </section>

    <Popup title="温馨提醒" width="500px">
      <el-form label-position="right" label-width="100px" style="max-width: 460px">
        <el-form-item label="Name">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="formLabelAlign.type" />
        </el-form-item>
        <el-form-item class="border-t-1 -mx-4 p-4">
          <section class="w-full flex -mb-10 justify-end">
            <el-button size="large" type="primary" @click="onClose"> 确定 </el-button>
            <el-button size="large" @click="onClose">取消</el-button>
          </section>
        </el-form-item>
      </el-form>
    </Popup>
  </section>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import { usePopup } from '@/components/Popup'
import { reactive } from 'vue'

const [Popup, onOpen, onClose] = usePopup()

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: ''
})
</script>
