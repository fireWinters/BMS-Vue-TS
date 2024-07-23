<template>
  <section>
    <section
      class="text-center py-3 cursor-pointer hover:text-[var(--el-menu-active-color)]"
      v-for="(menu, eq) in menuStore.leftMenuOne"
      :style="{ color: eq === menuStore.leftMenuOneEq ? 'var(--el-menu-active-color)' : '' }"
      :key="menu.name"
      @click="onSwitch(eq, menu)"
    >
      <ElIcon :size="24" v-if="menu.icon">
        <component :is="menu.icon"></component>
      </ElIcon>
      <h2>{{ menu.title ?? '' }}</h2>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElIcon } from 'element-plus'
import { useMenuStore } from '@/stores/menu'
import type { Menu } from '@/helper/RouterTree/type'

const router = useRouter()
const menuStore = useMenuStore()

const onSwitch = (eq: number, link: Menu) => {
  if (link.children.length === 0) {
    router.push({ name: link.name })
  }

  menuStore.switchLeftMenuOne(eq)
}
</script>
