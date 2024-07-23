import { ElMessage } from 'element-plus'

/**
 * 抛出异常
 * @param err 错误信息
 */
export const tailError = (err: unknown) => {
  let errMsg = '网络异常'
  if (err === null) {
    console.error('未知异常', err)
  } else if (typeof err === 'object') {
    if (Reflect.has(err, 'message')) {
      errMsg = Reflect.get(err, 'message')
    }

    if (Reflect.has(err, 'msg')) {
      errMsg = Reflect.get(err, 'msg')
    }
  }

  ElMessage.error(errMsg)
}

/**
 * 成功操作
 */
export const success = (option: { message: string; duration?: number }, callback?: () => void) => {
  let duration = option.duration ?? 3000
  ElMessage.success({ ...option, duration })
  callback && setTimeout(callback, duration)
}

/**
 * 过滤空数据
 */
export const filterEmpty = <D extends Record<string, unknown>>(data: D): D => {
  return Object.fromEntries(Object.entries(data).filter(([name, value]) => value)) as D
}

/**
 * menu数据接口转 tree 结构
 */
export const menuDataToTree = (menus: MenuItem[]) => {
  return menus.map((menu) => {
    const tree: TreeItem = {
      id: menu.id,
      label: menu.title,
      name: menu.name
    }

    if (menu.children && menu.children.length) {
      tree.children = menuDataToTree(menu.children)
    }

    return tree
  })
}
