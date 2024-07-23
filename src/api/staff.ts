import { request } from '@/helper/request'

export const apiStaffList = (params: PageParams) => {
  return request<
    PageResult<{
      id: number
      avatar: number | null
      name: string
      email: string
      group_id: number
      group_text: string
      avatar_path: null | string
      created_at: string
      updated_at: string
    }>
  >({
    url: 'v1/user/list',
    method: 'get',
    params
  })
}

export const apiStaffUpdate = (
  id: string | number,
  data: {
    avatar: number
    group_id: number
    email: string
  }
) => {
  return request<MessageResult>({
    url: `v1/user/${id}`,
    method: 'patch',
    data
  })
}

export const apiStaffGroup = (params: PageParams) => {
  return request<
    PageResult<{
      id: number
      name: string
    }>
  >({
    url: 'v1/user_group/list',
    params
  })
}

export const apiStaffGroupPush = (data: { name: string }) => {
  return request<MessageResult>({
    url: 'v1/user_group/create',
    method: 'post',
    data
  })
}

export const apiStaffGroupEdit = (id: number | string, data: { name: string }) => {
  return request<MessageResult>({
    url: `v1/user_group/${id}`,
    method: 'patch',
    data
  })
}

export const apiStaffGroupRemove = (id: number | string) => {
  return request<MessageResult>({
    url: `v1/user_group/${id}`,
    method: 'delete'
  })
}

export const apiStaffGroupAll = () => {
  return request<
    PageResult<{
      id: number
      name: string
    }>
  >({
    url: 'v1/user_group/list',
    params: {
      pageSize: 999
    }
  }).then((res) => res.data)
}

export const apiStaffStore = (data: {
  name: string
  avatar: number
  email: string
  group_id: number
}) => {
  return request<MessageResult>({
    url: 'v1/user/create',
    method: 'POST',
    data
  })
}

export const apiStaffRePass = (staffID: number | string) => {
  return request<MessageResult>({
    url: `v1/user/${staffID}/re_password`,
    method: 'patch'
  })
}
