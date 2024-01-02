import axios from 'axios'
import {getTokenData} from './localStores'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    token: ""
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
    return Promise.reject(err)
  }
)

export default axiosInstance
