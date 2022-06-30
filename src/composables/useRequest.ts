import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

declare interface codeMessageMapTypes {
  400: string
  401: string
  403: string
  404: string
  405: string
  500: string
  [key: string]: string
}

const codeMessageMap: codeMessageMapTypes = {
  400: '[400]:请求参数错误',
  401: '[401]:账户未登录',
  403: '[403]:拒绝访问',
  404: '[404]:请求路径错误',
  405: '[405]:请求方法错误',
  500: '[500]:服务器错误',
}

const showCodeMessage = (code: number | string): string => {
  return codeMessageMap[JSON.stringify(code)] || '网络连接异常,请稍后再试!'
}

// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: import.meta.env.VITE_API_BASEURL,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    config.headers = {
      'Authori-zation': `Bearer ${sessionStorage.getItem('token')}`,
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.request.responseType === 'blob') {
        return response.data
      }
      else if (response.data.status === 200 || response.data.code === 200) {
        return Promise.resolve(response.data)
      }
      else {
        Toast(response.data.msg || response.data.message)
        return Promise.reject(response.data)
      }
    }
  },
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      Toast(showCodeMessage(response.status))
      return Promise.reject(response.data)
    }
    Toast('网络连接异常,请稍后再试!')
    return Promise.reject(error)
  },
)

export const useRequest = {
  get<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get(url, { params: data, ...config })
  },

  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.put(url, data, config)
  },

  delete<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.delete(url, { params: data, ...config })
  },
}

