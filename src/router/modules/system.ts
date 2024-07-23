/**
 * 基础模块
 */
import { RouterTree } from '@/helper/RouterTree'
import { HomeFilled, UserFilled, Menu } from '@element-plus/icons-vue'

export const systemModules = new RouterTree({
  name: 'System',
  title: '系统管理',
  path: 'system',
  children: [
    {
      name: 'SystemHome',
      icon: HomeFilled,
      title: '首页',
      path: 'home',
      component: () => import('@/views/home/Index.vue'),
      children: []
    },
    {
      name: 'SystemStaff',
      title: '员工',
      path: 'staff',
      icon: UserFilled,
      children: [
        {
          name: 'SystemStaffGroup',
          title: '员工分组',
          path: 'group',
          component: () => import('@/views/staff/Group.vue'),
          children: []
        }
      ]
    },
    {
      name: 'SystemMenu',
      title: '菜单',
      path: 'menu',
      icon: Menu,
      children: [
        {
          name: 'SystemMenuShow',
          title: '菜单管理',
          path: 'show',
          component: () => import('@/views/menu/Show.vue'),
          children: []
        }
      ]
    }
  ]
})
