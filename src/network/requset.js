import axios from 'axios'
import { getTokenData, clearTokenData } from './localStores'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    token: ''
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.token = getTokenData()
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    const data = err.response.data
    if (data && data.msg && data.msg.includes('非法token')) {
      clearTokenData()
    }
    return Promise.reject(err)
  }
)

export default axiosInstance
