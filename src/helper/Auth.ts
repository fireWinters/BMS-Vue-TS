import { useAuthStore } from '@/stores/auth'
import { Hash } from './Hash'
import { apiUserCurrent, apiUserRouters } from '@/api'

import Layout from '@/layout/Index.vue'
import router from '@/router'
import { routes, menus } from '@/router/modules'
import { useMenuStore } from '@/stores/menu'

export class Auth {
  private constructor() {
    this.upLocal()
  }

  static ins = new Auth()

  protected token = Hash.mask('token')

  protected local: string | null = null

  protected memory: string | null = null

  protected udata!: UserData
  protected routers: string[] = []

  private upLocal() {
    this.local = window.localStorage.getItem(this.token)
    this.memory = this.local
  }

  get isSuper() {
    return this.udata && this.udata.group_id === 1
  }

  saveToLocal(val: string) {
    window.localStorage.setItem(this.token, val)
    this.memory = this.local
  }

  isNothing() {
    return this.local === null && this.memory === null
  }

  clear() {
    this.memory = null
    this.local = null
    window.localStorage.removeItem(this.token)
  }

  getToken() {
    if (this.memory === null && this.local) {
      this.memory = this.local
    }

    return `Bearer ${this.memory}`
  }

  async triggerOne() {
    if (this.isNothing()) return false

    try {
      const udata = await apiUserCurrent()
      const authStore = useAuthStore()
      authStore.setUserData(udata)
      this.udata = udata

      const routers = await apiUserRouters()
      this.routers = routers

      this.addAsyncRouter()
      this.filterMenu()

      this.triggerOne = () => Promise.resolve(false)
      return true
    } catch {}

    return false
  }

  private filterMenu() {
    const { routers, isSuper } = this
    if (isSuper) {
      return
    }

    const menuStore = useMenuStore()
    const filterInRouters = (list: typeof menus) => {
      return list
        .filter((item) => {
          const state = routers.includes(<string>item.name)
          if (state && item.children.length) {
            item.children = filterInRouters(item.children)
          }
          return state
        })
        .map((item, index) => {
          item.index = index
          return item
        })
    }

    const topMenu = filterInRouters(menus)
    menuStore.setTopMenu(topMenu)
  }

  private addAsyncRouter() {
    const { routers, isSuper } = this
    const children = isSuper ? routes : routes.filter((i) => routers.includes(<string>i.name))
    router.addRoute({
      path: '/',
      name: 'layout',
      component: Layout,
      children: children
    })

    router.addRoute({
      path: '/:pathMatch(.*)',
      name: 'Miss',
      component: () => import('@/views/state/NotFound.vue')
    })
  }
}
