<template>
  <section>
    <!-- 顶部搜索表单 -->
    <section>
      <slot name="search"></slot>
    </section>

    <!-- 按钮组插槽 -->
    <section class="my-5">
      <slot name="action"></slot>
    </section>

    <!-- 表格主体 -->
    <el-table class="w-full" :data="tableData" :page-size="10" max-height="250" border>
      <el-table-column prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small"> Remove </el-button>
        </template>
      </el-table-column>
    </el-table>

    <section class="my-5">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="currentPageSize"
        :page-sizes="pageSizes"
        background
        layout="sizes, prev, pager, next, jumper, total"
        :total="total"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import { tailError } from '@/helper/common'
import { ref, defineProps, watchEffect } from 'vue'

const currentPage = ref(1)
const currentPageSize = ref(10)
const pageSizes = [10, 20, 50, 100]
const total = ref(0)
const tableData = ref([])
const columns = ref([])
const { loadData } = defineProps(['loadData'])

const withPageParams = () => ({
  page: currentPage.value,
  pageSize: currentPageSize.value
})

watchEffect(async () => {
  if (!(loadData instanceof Function)) {
    return null
  }

  try {
    const { to, data } = await loadData(withPageParams())
    total.value = to
    tableData.value = data
  } catch (err) {
    tailError(err)
  }
})

// const tableData = ref([
//   {
//     date: '2016-05-01',
//     name: 'Tom',
//     state: 'California',
//     city: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//     zip: 'CA 90036'
//   },
//   {
//     date: '2016-05-02',
//     name: 'Tom',
//     state: 'California',
//     city: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//     zip: 'CA 90036'
//   },
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     state: 'California',
//     city: 'Los Angeles',
//     address: 'No. 189, Grove St, Los Angeles',
//     zip: 'CA 90036'
//   }
// ])
</script>
