import axios, { type AxiosRequestConfig } from 'axios'
import { Auth } from './Auth'

const instance = axios.create({
  baseURL: '/api'
})
const withLoginPage = () => {
  const { pathname } = window.location
  if (pathname !== '/login') {
    window.location.href = '/login'
  }
}

instance.interceptors.request.use((config) => {
  config.headers.set('Authorization', Auth.ins.getToken())
  config.headers.set('Accept', 'application/json')

  return config
})

instance.interceptors.response.use(
  (res) => res?.data,
  (err) => {
    if (err?.response?.status === 401) {
      Auth.ins.clear()
      withLoginPage()
    }

    return Promise.reject(err?.response?.data)
  }
)

export const request = <R>(config: AxiosRequestConfig<any>) => {
  return instance.request(config) as Promise<R>
}
