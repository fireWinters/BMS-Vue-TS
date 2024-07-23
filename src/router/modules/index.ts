/**
 * 批量导出多模块
 */
import { memoize } from 'lodash'
import type { RouteRecordRaw } from 'vue-router'
import { CRMModules } from './crm'
import { systemModules } from './system'

export const modules = [CRMModules, systemModules]

// all route
export const routes: Array<RouteRecordRaw> = Reflect.apply(
  Array.prototype.concat,
  [],
  modules.map((m) => m.toRouters())
)

// all menu
export const menus = modules.map((m, index) => m.toMenu(index))
type Menus = typeof menus

const _getTitleByName = (name: string, orName = '') => {
  let cur = 0,
    max = modules.length
  let findName = undefined
  while (cur < max && findName === undefined) {
    findName = modules[cur++]!.getTitleByName(name)
  }

  return findName || orName
}
/**
 * 传入唯一的name获取
 * @param name
 * @param orName
 * @returns string
 */
export const getTitleByName = memoize(_getTitleByName)

/**
 * 接受 name 返回对应的menu数据结构
 */
export const getMenuByName = (name: string | symbol) => {
  const each = (menus: Menus) => {
    for (let i = 0, len = menus.length; i < len; i++) {
      const menu = menus[i]
      if (menu.name === name) {
        throw menu
      }

      menu.children && menu.children.length && each(menu.children)
    }
  }

  try {
    each(menus)
  } catch (menu: unknown) {
    return menu as Menus[number]
  }

  return null
}
