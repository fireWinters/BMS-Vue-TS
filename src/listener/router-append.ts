/**
 * 添加异步路由
 */

import { Auth } from '@/helper/Auth'
import router from '@/router'

// 页面切换后
router.beforeEach(async (to) => {
  const state = await Auth.ins.triggerOne()
  if (state) return to
})
