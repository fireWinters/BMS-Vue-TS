import { request } from '@/helper/request'

export const apiLogin = (data: { name: string; password: string }) => {
  return request<{ token: string }>({
    url: 'v1/auth/login',
    method: 'POST',
    data
  })
}

export const apiLogout = () => {
  return request<UserData>({
    url: 'v1/auth/logout',
    method: 'post'
  })
}

export const apiUserCurrent = () => {
  return request<UserData>({
    url: 'v1/user/self'
  })
}

export const apiUpUserCurrent = (data: { avatar: number; email: string }) => {
  return request<{ message: string }>({
    url: 'v1/user/self',
    method: 'patch',
    data
  })
}

export const apiUpPassCurrent = (data: {
  current_password: string
  password: string
  password_confirmation: string
}) => {
  return request<{ message: string }>({
    url: 'v1/user/self/re_password',
    method: 'patch',
    data
  })
}

export const apiUserRouters = () => {
  return request<string[]>({
    url: 'v1/menu/options/self'
  })
}
