export type Route = {
  title: string
  name: string
  icon?: DefineComponent
  path?: string
  hidden?: boolean
  component?: RouteComponent
  children: Array<Route>
}

export type BaseRoute = {
  name: string
  title: string
  path: string
  icon?: DefineComponent
  component?: RouteComponent
}
export type ParentRoute = BaseRoute & {
  isParent: true
  firstChildrenName: string
}
export type ChildrenRoute = BaseRoute & {
  isParent: false
  component: RouteComponent
}

export type Menu = {
  name: string | symbol
  title: string
  index: number
  parent?: Menu
  icon?: DefineComponent
  path?: string
  children: Array<Menu>
}
