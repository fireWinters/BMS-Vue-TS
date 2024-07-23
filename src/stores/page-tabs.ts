/**
 * 保存已开启的router信息
 */

import { getTitleByName } from '@/router/modules'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter, type RouteLocationNormalized } from 'vue-router'

type Tab = {
  title: string
  path: string
  name: string
}
export const usePageTabsStore = defineStore('pageTabs', () => {
  const router = useRouter()

  /** 保存已开始的标签栏 */
  const tabs = reactive<Array<Tab>>([])

  /** 限制最大tabs数量 */
  const maxTabs = ref(15)
  const onSubTabs = () => {
    if (tabs.length > maxTabs.value) {
      tabs.splice(0, tabs.length - maxTabs.value)
    }
  }

  /** 检测路由是否已经存在 */
  const onHasTab = (path: string) => {
    return tabs.find((search) => search.path === path) === undefined
  }

  /**
   * 添加新的标签栏
   * @param route
   */
  const push = (route: RouteLocationNormalized) => {
    const title = getTitleByName(<string>route.name)

    if (onHasTab(route.fullPath)) {
      tabs.push({
        title,
        path: route.fullPath,
        name: route.name as string
      })
      onSubTabs()
    }
  }

  /**
   * 删除指定标签页
   */
  const removeByPath = (path: string) => {
    const index = tabs.findIndex((e) => e.path === path)
    if (index !== -1) {
      const closeRoute = tabs[index]
      tabs.splice(index, 1)

      // 如果关闭选中的标签页，自动切换到下一页
      if (closeRoute.path === router.currentRoute.value.fullPath) {
        const nextIndex = Math.min(index, tabs.length - 1)
        router.push(tabs[nextIndex].path)
      }
    }
  }

  return { tabs, maxTabs, push, removeByPath }
})
