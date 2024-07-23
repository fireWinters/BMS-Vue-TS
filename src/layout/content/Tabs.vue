<template>
  <section>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      :closable="editableTabs.length > 1"
      class="page-tabs"
      @tab-remove="onRemove"
      @tab-click="onTap"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { usePageTabsStore } from '@/stores/page-tabs'
import { useRouter } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'

const router = useRouter()

const menuStore = useMenuStore()
const pageTabsStore = usePageTabsStore()

const editableTabs = ref<{ name: string; title: string }[]>([])
const editableTabsValue = ref('')

// 监听tabs列表项改变
watchEffect(() => {
  editableTabs.value = pageTabsStore.tabs.map((item) => ({
    title: item.title,
    name: item.path
  }))
})

// 监听当前页面路径变化
watchEffect(() => {
  editableTabsValue.value = menuStore.currentPath
})

/** 删除标签页 */
const onRemove = (path: string) => {
  pageTabsStore.removeByPath(path)
}

/** 点击切换路由 */
const onTap = (pane: TabsPaneContext) => {
  const { index } = pane
  if (index === undefined) {
    return null
  }

  const { name } = editableTabs.value[parseInt(index)]
  if (name === menuStore.currentPath) {
    return null
  }

  router.push(name)
}
</script>

<style scoped>
.page-tabs {
  --el-tabs-header-height: 45px;
  height: var(--el-tabs-header-height);
}
</style>
