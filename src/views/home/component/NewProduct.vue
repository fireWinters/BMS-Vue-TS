<template>
  <el-card>
    <template #header>
      <h2 class="font-bold">最新产品</h2>
    </template>
    <el-table :data="tableData" height="300" style="width: 100%">
      <el-table-column width="200">
        <section class="flex items-center">
          <el-avatar
            shape="square"
            :size="50"
            fit="fill"
            class="mr-2"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          />
          <section class="flex-shrink-0">
            <h3 class="font-bold">产品名称</h3>
            <small class="text-gray-400">售出数量 1000</small>
          </section>
        </section>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
const tableData = [
  {
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>
