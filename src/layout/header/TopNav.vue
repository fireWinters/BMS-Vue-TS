<template>
  <section class="flex overflow-hidden">
    <el-button
      :type="menuStore.topEq === eq ? 'primary' : ''"
      round
      :text="menuStore.topEq !== eq"
      v-for="(menu, eq) in topMenu"
      :key="menu.name"
      @click="switchTop(eq)"
    >
      {{ menu.title }}
    </el-button>
  </section>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
const { topMenu, switchTop } = menuStore
</script>
