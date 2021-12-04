<template>
  <div>
    <input type="file" @change="handleFileChange">
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
const SIZE = 10 * 1024 * 1024
const URL = 'http://localhost:8008'

export default {
  name: 'Upload',
  data () {
    return {
      container: {
        file: null
      },
      data: []
    }
  },
  computed: {
    uploadPercentage () {
      if (!this.container.file || !this.data.length) return 0
      const loaded = this.data
        .map(item => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur)
      return parseInt((loaded / this.container.file.size).toFixed(2))
    }
  },
  methods: {
    handleFileChange (e) {
      const [file] = e.target.files
      if (!file) return
      // 重置data
      Object.assign(this.$data, this.$options.data())
      this.container.file = file
    },
    // 上传文件
    async handleUpload () {
      if (!this.container.file) return
      const fileChunkList = this.createFileChunk(this.container.file)
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        index,
        hash: this.container.file.name + '-' + index, // 文件名 + 数组下标
        percentage: 0
      }))
      await this.uploadChunks()
    },
    // 生成切片文件
    createFileChunk (file, size = SIZE) {
      const fileChunkList = []
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) })
        cur += size
      }
      return fileChunkList
    },
    // 上传切片
    async uploadChunks () {
      const requestList = this.data
        .map(({ chunk, hash, index }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', hash)
          formData.append('filename', this.container.file.name)
          return { formData, index }
        })
        .map(({ formData, index }) => () => this.request({
          url: URL,
          data: formData,
          onProgress: this.createProgressHandler(this.data[index])
        }))
      await Promise.all(requestList) // 并发切片
      await this.mergeRequest()
    },
    // 合并切片
    async mergeRequest () {
      await this.request({
        url: URL + '/merge',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          size: SIZE,
          filename: this.container.file.name
        })
      })
    },
    // 请求方法
    request ({
      url,
      method = 'post',
      data,
      headers = {},
      onProgress = e => e,
      requestList
    }) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.upload.onprogress = onProgress
        xhr.open(method, url)
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key])
        })
        xhr.send(data)
        xhr.onload = res => {
          resolve({ data: res.target.response })
        }
        xhr.error = e => {
          reject(e)
        }
      })
    },
    createProgressHandler (item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100))
      }
    }
  }
}
</script>

<style>

</style>
