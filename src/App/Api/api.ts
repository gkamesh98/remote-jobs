import axios, { AxiosPromise } from 'axios'

const apiUrl = 'https://remotive.io/api'

export const axiosInstance = axios.create()

type ApiRequest = {
  endpoint: string
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch'
  params?: Record<string, unknown>
  data?: Record<string, unknown>
}

export const axiosRequest = ({
  endpoint,
  method,
  params,
  data,
}: ApiRequest): AxiosPromise => {
  console.log('check')
  return axiosInstance({
    url: apiUrl + endpoint,
    method,
    params,
    data,
  })
}
