/**
 * 监听页面切换的进度条
 */
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 页面切换前
router.beforeResolve(() => {
  nprogress.start()
})

// 页面切换后
router.afterEach(() => {
  nprogress.done()
})
