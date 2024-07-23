<template>
  <el-row :gutter="20">
    <el-col class="mb-5" :span="16" :xs="{ span: 24 }" :md="{ span: 14 }">
      <TodayOrderCount class="mb-5" />
      <DiscountedGraph class="mb-5" />
      <NewOrder class="mb-5" />
    </el-col>
    <el-col class="mb-5" :span="8" :xs="{ span: 24 }" :md="{ span: 10 }">
      <NewProduct class="mb-5" />
      <NewStore class="mb-5" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import TodayOrderCount from './component/TodayOrderCount.vue'
import DiscountedGraph from './component/DiscountedGraph.vue'
import NewOrder from './component/NewOrders.vue'
import NewStore from './component/NewStore.vue'
import NewProduct from './component/NewProduct.vue'
</script>
