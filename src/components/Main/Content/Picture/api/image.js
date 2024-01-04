import axios from '@/network/requset.js'

//获取图片列表
export function getImageList(id, page = 1) {
  return axios.get(`/image_class/${id}/image/${page}`)
}

//
export function updateImage(id, name) {
  return axios.post(`/image/${id}`, { name })
}

// 删除图片
export function deleteImage(ids) {
  return axios.post(`/image/delete_all`, { ids })
}

// 上传图片
export const uploadImageAction = '/image/upload'
