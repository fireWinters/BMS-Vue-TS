import { CodeMenu } from './CodeMenu'
import type { Route } from './type'

export class RouterTree extends CodeMenu {
  constructor(protected route: Route) {
    super(route)
  }
}
