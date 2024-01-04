import axios from '@/network/requset.js'

export function getImageClassList(page) {
  return axios.get('/image_class/' + page)
}

export function createImageClass(data) {
  return axios.post('/image_class', data)
}

export function updateImageClass(id, data) {
  return axios.post('/image_class/' + id, data)
}

export function deleteImageClass(id) {
  return axios.post(`/image_class/${id}/delete`)
}
