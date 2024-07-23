/**
 * 登录校验
 */
import { Auth } from '@/helper/Auth'
import router from '@/router'
import { useRouter } from 'vue-router'

// 页面切换前
router.beforeEach((to) => {
  const router = useRouter()
  // 如果发现未登录，则跳到登录页面
  if (to.name !== 'Login' && Auth.ins.isNothing()) {
    router.push({ name: 'Login' })
  }
})
