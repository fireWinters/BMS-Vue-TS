<template>
  <section class="h-full">
    <h3 class="text-sm text-primary p-3 border-b-1 font-medium">
      {{ menuStore.leftMenuOne[menuStore.leftMenuOneEq].title }}
    </h3>

    <section class="level-children">
      <!-- 如果还存在下级菜单 -->
      <LevelTwoChildrenVue
        :menu="menu"
        v-for="menu in menuStore.leftMenuTwo"
        :key="menu.name"
        :current-name="menuStore.currentName"
      />
    </section>
  </section>
</template>

<script lang="ts" setup>
import LevelTwoChildrenVue from './LevelTwoChildren.vue'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
</script>

<style scoped>
.level-children {
  height: 100%;
  overflow: hidden;
}
</style>
