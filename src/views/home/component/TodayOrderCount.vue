<template>
  <el-card>
    <template #header>
      <h2 class="font-bold">当日消费</h2>
    </template>
    <div class="flex justify-between">
      <div class="flex items-center">
        <el-button color="#3647ff" circle size="large">
          <el-icon color="#ffffff" :size="20"> <UserFilled /> </el-icon>
        </el-button>
        <div class="ml-2 leading-none">
          <small class="text-xs text-gray-400">消费人数</small>
          <p class="font-bold text-2xl">1000</p>
        </div>
      </div>
      <div class="flex items-center">
        <el-button color="#f06439" circle size="large">
          <el-icon color="#ffffff" :size="20"> <UserFilled /> </el-icon>
        </el-button>
        <div class="ml-2 leading-none">
          <small class="text-xs text-gray-400">消费总金额</small>
          <p class="font-bold text-2xl">1000</p>
        </div>
      </div>
      <div class="flex items-center">
        <el-button color="#3ba26e" circle size="large">
          <el-icon color="#ffffff" :size="20"> <UserFilled /> </el-icon>
        </el-button>
        <div class="ml-2 leading-none">
          <small class="text-xs text-gray-400">订单总数</small>
          <p class="font-bold text-2xl">1000</p>
        </div>
      </div>
      <div class="flex items-center">
        <el-button color="#a952e0" circle size="large">
          <el-icon color="#ffffff" :size="20"> <UserFilled /> </el-icon>
        </el-button>
        <div class="ml-2 leading-none">
          <small class="text-xs text-gray-400">消费总金额</small>
          <p class="font-bold text-2xl">1000</p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
</script>
