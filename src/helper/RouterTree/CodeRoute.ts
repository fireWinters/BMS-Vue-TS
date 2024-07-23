import type { RouteRecordRaw } from 'vue-router'
import { Shunt } from './Shunt'
import type { Route } from './type'

export class CodeRoute extends Shunt {
  constructor(protected route: Route) {
    super(route)
  }

  toRouters() {
    const { equalityRoute } = this

    const router: RouteRecordRaw[] = equalityRoute.map((curRoute) => {
      const route = {
        name: curRoute.name,
        path: curRoute.path
      } as RouteRecordRaw

      if (this.isParent(curRoute)) {
        route.redirect = this.getPathByName(curRoute.firstChildrenName)
      }

      if (this.isChildren(curRoute)) {
        route.component = curRoute.component
      }

      return route
    })

    return router
  }
}
