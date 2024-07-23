<template>
  <nav
    class="w-[100px] flex h-full border-r-1 nav px-0 overflow-hidden"
    :class="{
      '!w-[260px]': menuStore.leftMenuTwo.length
    }"
  >
    <!-- 左侧一级 -->
    <section class="w-[100px] h-full text-base border-r-1 flex-shrink-0">
      <LevelOne />
    </section>

    <!-- 左侧二级 -->
    <section class="w-[160px] h-full border-transparent text-sm flex-shrink-0">
      <LevelTwo />
    </section>
  </nav>
</template>

<script lang="ts" setup>
import LevelOne from './LevelOne.vue'
import LevelTwo from './LevelTwo.vue'

import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
</script>

<style scoped>
.nav {
  --el-menu-text-color: #9ba1b2;
  color: var(--el-menu-text-color);
  height: calc(100vh - var(--height, 60px));
  -webkit-transition: width 0.3s;
  transition: width 0.3s;
}
</style>
