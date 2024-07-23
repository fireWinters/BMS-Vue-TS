declare module 'md5' {
  export default (input: string) => string
}

declare type UserData = {
  id: number
  avatar: number
  avatar_path: null | string
  email: string
  group_id: number
  group_text: string
  name: string
  updated_at: null
  created_at: null | string
}

declare type PageParams = {
  page?: number | string
  pageSize?: number | string
  [p]?: unknown
}

declare type TableColumn<D extends any> = {
  label?: string
  width?: number
  prop: string
  fixed?: 'right' | 'left'
  render?: (data: D) => JSX.Element | string | number
}

declare type FormColumn<D extends any> = {
  width?: number
  name: string
  render: (data: D) => JSX.Element | string | number
}

declare type PageResult<R extends any> = {
  current_page: number
  first_page_url: string
  from: number
  next_page_url: null | string
  path: string
  per_page: number
  prev_page_url: null | string
  to: number
  data: Array<R>
}

declare type ReturnPageResultData<P extends PageResult> = ReturnType<P> extends Promise<{
  data: Array<infer R>
}>
  ? R
  : any

declare type PageResquestLike<R> = (p: PageParams) => Promise<PageResult<R>>

declare type MessageResult = {
  message: string
}

declare type MenuItem = {
  id: number
  name: string
  pid: number
  title: string
  created_at: string
  deleted_at: string | string
  updated_at: null | string
  children: MenuItem[]
}

declare type TreeItem = {
  id: number
  label: string
  name: string
  children?: TreeItem[]
}
