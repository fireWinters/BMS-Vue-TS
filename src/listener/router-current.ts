/**
 * 监听当前路由位置
 */
import router from '@/router'
import { useMenuStore } from '@/stores/menu'

// 页面切换后
router.afterEach((target) => {
  const store = useMenuStore()
  store.switchCurrent(target)
})
