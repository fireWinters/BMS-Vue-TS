import type { Menu } from './type'
import { CodeRoute } from './CodeRoute'
import type { Route } from './type'
import { shallowRef } from 'vue'

export class CodeMenu extends CodeRoute {
  private menu: Menu
  private menuMap: Map<string, Menu> = new Map()

  constructor(protected route: Route) {
    super(route)
    this.menu = this.codeMenuByRoute(this.route, 0)
  }

  toMenu(index: number) {
    const menu = this.menu
    menu.index = index ?? 0
    return menu
  }

  appendTo(name: string, menu: Menu) {
    const parentMenu = this.menuMap.get(name)
    if (parentMenu === undefined) {
      throw new TypeError(`The name menu is undefined`)
    }

    parentMenu.children.push(menu)

    return this
  }

  private codeMenuByRoute(route: Route, index: number, parent?: Menu) {
    const { name, title, children, icon } = route
    const path = this.getPathByName(name)
    const menu: Menu = {
      name,
      title,
      path,
      index,
      icon: icon ? shallowRef(icon) : icon,
      parent,
      children: []
    }

    menu.children = children
      .filter((e) => e.hidden !== true)
      .map((element, eq) => this.codeMenuByRoute(element, eq, menu))

    this.menuMap.set(name, menu)

    return menu
  }
}
