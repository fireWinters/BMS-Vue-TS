import type { RouteRecordRaw } from 'vue-router'
import type { ChildrenRoute, ParentRoute, BaseRoute, Route } from './type'

export class Shunt {
  // path地图
  protected routeMap = new Map<
    string,
    {
      path: string
      title: string
    }
  >()

  // 扁平的一级路由
  protected equalityRoute: Array<ChildrenRoute | ParentRoute> = []

  constructor(protected route: Route) {
    this.equalityRoute = this.touchEqualityRoute(route)
    this.touchPathMap()
  }

  /** 接受一个name返回对应的path路径 */
  getPathByName(name: string) {
    const { path } = this.routeMap.get(name) || {}
    return path || '/404'
  }

  /** 接受一个name返回对应的title */
  getTitleByName(name: string) {
    const { title } = this.routeMap.get(name) || {}
    return title
  }

  /** 断言函数: 这是一个父路由 */
  protected isParent(route: any): route is ParentRoute {
    return route.isParent
  }

  /** 断言函数: 这是一个子路由 */
  protected isChildren(route: any): route is ChildrenRoute {
    return route.isParent === false
  }

  /** 生成path地图 */
  private touchPathMap() {
    const { routeMap, equalityRoute } = this
    equalityRoute.forEach((route) => {
      const { name, path, title } = route
      if (routeMap.has(name)) {
        throw new TypeError(`Routes with the same name：${name}`)
      }
      routeMap.set(name, { path, title })
    })
  }

  /**
   * 多级路由拉平至一级路由
   */
  private touchEqualityRoute(route: Route) {
    const container: Array<ParentRoute | ChildrenRoute> = []
    this.shuntRouter(route, '', container)
    return container
  }

  /**
   * 遍历并归纳路由
   */
  private shuntRouter(route: Route, prefix: string, container: Array<ParentRoute | ChildrenRoute>) {
    const { path, name, title, icon, component } = route
    const codePath = `${prefix}/${path}`.replace(/\/+/, '/')
    const baseRoute = { name, icon, component, title, path: codePath }

    this.withParent(route, baseRoute, container)
    this.withChilren(route, baseRoute, container)

    return container
  }

  // 父路由
  private withParent(
    route: Route,
    baseRoute: BaseRoute,
    container: Array<ParentRoute | ChildrenRoute>
  ) {
    /** 有子集 */
    if (route.children.length !== 0) {
      const firstChildrenName = route.children[0].name
      const parentRoute: ParentRoute = { ...baseRoute, isParent: true, firstChildrenName }
      container.push(parentRoute)
      // 继续处理子集
      route.children.forEach((element) => this.shuntRouter(element, parentRoute.path, container))
    }
  }

  // 子路由
  private withChilren(
    route: Route,
    baseRoute: BaseRoute,
    container: Array<ParentRoute | ChildrenRoute>
  ) {
    if (route.children.length === 0) {
      const { component } = baseRoute
      if (component === undefined) {
        throw new TypeError(`route name:${route.name} => component is undefined`)
      }

      const childrenRoute: ChildrenRoute = { ...baseRoute, isParent: false, component }
      container.push(childrenRoute)
    }
  }
}
