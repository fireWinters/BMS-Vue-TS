/**
 * 监听页面标签栏
 */
import router from '@/router'
import { usePageTabsStore } from '@/stores/page-tabs'

// 页面切换后
router.afterEach((to) => {
  const pageTabsStore = usePageTabsStore()
  pageTabsStore.push(to)
})
