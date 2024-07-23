<template>
  <section class="mb-2" v-if="menu">
    <!-- 存在下级菜单 -->
    <template v-if="menu.children.length !== 0">
      <h4 class="text-primary pl-3 pt-4 pb-2">{{ menu.title }}</h4>
      <RouterLink
        :to="link.path!"
        v-for="link in menu.children"
        :key="link.name"
        class="block text-[.725rem] pl-3 py-3 cursor-pointer link"
        :class="{ hover: link.name === currentName }"
      >
        {{ link.title }}
      </RouterLink>
    </template>

    <!-- 不存在下级菜单 -->
    <template v-if="menu.children.length === 0">
      <h4 class="text-primary pl-4 pt-3 pb-2">{{ menu.title }}</h4>
      <RouterLink
        :to="menu.path!"
        :key="menu.name"
        class="block text-[.725rem] pl-3 py-3 cursor-pointer link"
        :class="{ hover: menu.name === currentName }"
      >
        {{ menu.title }}
      </RouterLink>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const { menu } = defineProps({
  menu: Object,
  currentName: String
})
</script>

<style scoped>
.link:hover,
.link.hover {
  color: #fff;
  background-color: var(--el-color-primary);
}
</style>
