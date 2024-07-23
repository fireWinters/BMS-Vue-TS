import { request } from '@/helper/request'

export const apiTreeAll = () => {
  return request<MenuItem[]>({
    url: 'v1/menu/tree'
  })
}

export const apiTreeAppend = (data: { pid: number; name: string; title: string }) => {
  return request<MessageResult>({
    url: 'v1/menu/create',
    method: 'post',
    data
  })
}

export const apiTreeEdit = (id: number, data: { name: string; title: string }) => {
  return request<MessageResult>({
    url: `v1/menu/${id}`,
    method: 'patch',
    data
  })
}

export const apiTreeRemove = (id: number) => {
  return request<MessageResult>({
    url: `v1/menu/${id}`,
    method: 'delete'
  })
}

export const apiTreeAuthByGorupID = (id: number) => {
  return request<string[]>({
    url: `v1/menu/options/${id}`
  })
}

export const apiTreeAuthPush = (id: number, data: { options: string[] }) => {
  return request<MessageResult>({
    url: `v1/menu/options/${id}`,
    method: 'post',
    data
  })
}
