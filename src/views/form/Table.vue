<template>
  <section class="container-white">
    <FormTable>
      <template #search> </template>

      <template #action>
        <section>
          <el-button type="primary" :icon="Plus" plain>新增</el-button>
          <el-button type="success" :icon="Edit" plain>修改</el-button>
          <el-button type="warning" :icon="Upload" plain>导出</el-button>
          <el-button type="danger" :icon="Delete" plain>删除</el-button>
        </section>
      </template>
    </FormTable>
  </section>
</template>

<script setup lang="ts">
import { Plus, Delete, Edit, Upload } from '@element-plus/icons-vue'
import FormTable from '@/components/FormTable.vue'
</script>
