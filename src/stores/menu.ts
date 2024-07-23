import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { menus, getMenuByName } from '@/router/modules'
import type { RouteLocationNormalized } from 'vue-router'

export const useMenuStore = defineStore('menu', () => {
  /** 顶部导航 */
  const topEq = ref(0)
  const topMenu = ref(menus)
  const switchTop = (n: number) => {
    topEq.value = n
    leftMenuOneEq.value = 0
  }

  /** 左侧一级 */
  const leftMenuOne = ref<typeof menus>([])
  const leftMenuOneEq = ref(0)
  const switchLeftMenuOne = (n: number) => {
    leftMenuOneEq.value = n
  }
  watchEffect(() => {
    if (topMenu.value[topEq.value]) {
      const switchLeftMenu = topMenu.value[topEq.value]?.children
      leftMenuOne.value = switchLeftMenu
    }
  })

  /** 左侧二级 */
  const leftMenuTwo = ref<typeof menus>([])
  const leftMenuTwoEq = ref(0)
  watchEffect(() => {
    if (leftMenuOne.value && leftMenuOne.value[leftMenuOneEq.value]?.children) {
      const switchLeftMenu = leftMenuOne.value[leftMenuOneEq.value].children ?? []

      leftMenuTwo.value = switchLeftMenu
    }
  })

  /** 左侧三级菜单 */
  const leftThreeEq = ref(0)

  /** 当前路由信息 */
  const currentName = ref('')
  const currentPath = ref('')
  const switchCurrent = (route: RouteLocationNormalized) => {
    currentName.value = <string>(route.name || '')
    currentPath.value = <string>(route.fullPath || '')
    codeTreeEq(route.name!)
  }

  const codeTreeEq = (name: string | symbol) => {
    const menu = getMenuByName(name)
    let eqs: number[] = []
    let cur: any = menu
    while (cur) {
      eqs.push(cur.index)
      cur = cur.parent
    }

    const map = [topEq, leftMenuOneEq, leftMenuTwoEq, leftThreeEq]
    eqs.reverse().forEach((eq, index) => {
      const curEq = map[index]
      if (curEq) {
        curEq.value = eq
      }
    })
  }

  return {
    /** 顶部导航菜单 */
    topMenu,
    topEq,
    switchTop,
    setTopMenu(menuList: typeof menus) {
      topMenu.value = menuList
    },

    /** 左侧一级菜单 */
    leftMenuOne,
    leftMenuOneEq,

    /** 左侧二级菜单 */
    switchLeftMenuOne,
    leftMenuTwoEq,
    leftMenuTwo,

    /** 左侧三级菜单 */
    leftThreeEq,

    /**  当前路由信息 */
    currentName,
    currentPath,
    switchCurrent
  }
})
