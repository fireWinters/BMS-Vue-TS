import { RouterTree } from '@/helper/RouterTree'
import { House, Setting, User } from '@element-plus/icons-vue'

export const CRMModules = new RouterTree({
  name: 'CRM',
  title: '后台管理',
  path: 'crm',
  children: [
    {
      name: 'CRMHome',
      icon: House,
      title: '首页',
      path: 'home',
      component: () => import('@/views/home/Index.vue'),
      children: []
    },
    {
      name: 'CRMStaff',
      title: '员工',
      path: 'staff',
      icon: User,
      children: [
        {
          name: 'CRMStaffIndex',
          title: '员工列表',
          path: 'index',
          component: () => import('@/views/staff/Index.vue'),
          children: []
        }
      ]
    },
    {
      name: 'CRMSelf',
      icon: Setting,
      title: '我的',
      path: 'self',
      children: [
        {
          name: 'CRMSelfSet',
          title: '设置',
          path: 'set',
          children: [
            {
              name: 'CRMSelfShow',
              title: '个人信息',
              path: 'profile',
              component: () => import('@/views/self/Show.vue'),
              children: []
            },
            {
              name: 'CRMSelfRePass',
              title: '重置密码',
              path: 'repass',
              component: () => import('@/views/self/RePass.vue'),
              children: []
            }
          ]
        }
      ]
    }
  ]
})
