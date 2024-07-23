<template>
  <el-card>
    <template #header>
      <h2 class="font-bold">消费趋势</h2>
    </template>
    <div>
      <canvas class="w-full h-full" ref="canvas"></canvas>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { OptionCategoryValue } from '@/helper/OptionCategoryValue'
import { init as eacharsInit } from 'echarts'
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()

const createEachart = (canvas: HTMLElement) => {
  const myChart = eacharsInit(canvas)

  const orderCount = {
    name: '订单数',
    list: new Array(7)
      .fill(0)
      .map((v, i) => ({ value: ~~(Math.random() * 1000), from: `01.${i + 1}` }))
  }
  const amountCount = {
    name: '消费金额',
    list: new Array(7)
      .fill(0)
      .map((v, i) => ({ value: ~~(Math.random() * 1000), from: `01.${i + 1}` }))
  }
  const peopleCount = {
    name: '消费人数',
    list: new Array(7)
      .fill(0)
      .map((v, i) => ({ value: ~~(Math.random() * 1000), from: `01.${i + 1}` }))
  }
  const option = new OptionCategoryValue([amountCount], [orderCount, peopleCount]).toJSON()
  myChart.setOption(option)
}

onMounted(() => {
  if (canvas.value !== undefined) {
    const canvaDom = canvas.value
    const { clientHeight, clientWidth } = canvaDom
    canvaDom.width = clientWidth
    canvaDom.height = clientHeight
    createEachart(canvas.value)
  }
})
</script>
