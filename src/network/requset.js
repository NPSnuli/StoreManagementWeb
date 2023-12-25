import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 5000
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return new Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return new Promise.reject(err)
  }
)

export default axiosInstance
