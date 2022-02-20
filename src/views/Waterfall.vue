<template>
  <div>
    <input type="file" @change="fileChange">
  </div>
</template>

<script>
import images from '@/mock/images'

export default {
  name: 'Waterfall',
  data() {
    this.list = images
    return {}
  },
  methods: {
    fileChange(e) {
      const [file] = e.target.files
      const chunks = this.sliceFile(file)
    },
    sliceFile(file) {
      const size = 50 * 1024 * 1024
      let current = 0
      let chunkList = []
      while (current < file.size) {
        chunkList.push(file.slice(current, current + size))
        current += size
      }
      return chunkList
    }
  }
}
</script>
