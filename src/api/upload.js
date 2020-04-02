import service from '@/utils/request'

// 封装文件上传
export const uploadFile = formData => {
  return service.request({
    method: 'post',
    url: '/upload',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
// 文件上传调用方式
// async uploadFile (e) {
//   const file = document.getElementById('file').files[0]
//   const formData = new FormData()
//   formData.append('file', file)
//   await uploadFile(formData)
// }
