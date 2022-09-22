/**
 * @business {} axios请求配置
 * @author {JC}
 * @data {2022-08-22}
 * **/

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
const request = axios.create({
  baseURL: "/api",
  timeout: 30000,
})
//请求拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {

    config.headers.token = sessionStorage.getItem('token') || ''
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use((config: AxiosResponse) => {
  if (config.headers) {
    sessionStorage.setItem("token", config.headers.authorization)
  } else {
    if (config.data && config.data.token) {
      sessionStorage.setItem("token", config.data.token)
    }
  }
  if (config.status === 200) {
    return config
  }
}, (error: any) => {

  const { config } = error
  if (config) {
    return Promise.reject(config.data)
  } else {
    ElMessage.warning("网络连接异常，请稍后再试")
  }
})

export default request