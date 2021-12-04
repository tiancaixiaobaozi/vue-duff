<template>
  <div class="home">
    <p>This is Home</p>
    <button @click="getList" style="margin-bottom: 30px">重新获取</button>
    <div class="image-container">
      <el-image
        v-for="data in dataSource"
        :key="data.id"
        :src="imgProxy(data.image_urls.square_medium)"
        :preview-src-list="[imgProxy(data.image_urls.square_medium)]"
        style="width: 100px; height: 100px"
      />
    </div>
    <img
      style="width: 200px;height: 200px"
      src="https://api.imjad.cn/interface/img/imagefilter.php?
      text=%E6%AD%A4%E5%86%85%E5%AE%B9%E4%B8%8D%E9%80%82%E5%90%88%E6%89%80%E6%9C%89%E5%B9%B4%E9%BE%84%E6%AE%B5%5cn%E6%88%96%E4%B8%8D%E5%AE%9C%E5%9C%A8%E5%B7%A5%E4%BD%9C%E6%9C%9F%E9%97%B4%E8%AE%BF%E9%97%AE
      &url=https://api.imjad.cn/interface/img/PixivProxy.php?url=https://i.pximg.net/c/540x540_70/img-master/img/2020/03/29/22/15/48/80436956_p0_master1200.jpg"
      alt="123"
    >
  </div>
</template>

<script>
import { getData } from '@/api/pixiv'

export default {
  name: 'home',
  data () {
    return {
      name: '张三',
      dataSource: []
    }
  },
  mounted () {
    // this.getList()
  },
  methods: {
    async getList () {
      const params = {
        type: 'rank',
        mode: 'week_original'
      }
      this.dataSource = []
      let res = await getData(params)
      this.dataSource = res.data.illusts
      console.log(res)
    },
    imgProxy (url) {
      let result = url.replace(/i.pximg.net/g, 'pximg.pixiv-viewer.workers.dev')
      const isSupportWebP = () => {
        const elem = document.createElement('canvas')
        if (elem.getContext && elem.getContext('2d')) {
          // was able or not to get WebP representation
          return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
        }
        // very old browser like IE 8, canvas not supported
        return false
      }
      if (!isSupportWebP) {
        result = result.replace(/_10_webp/g, '_70')
        result = result.replace(/_webp/g, '')
      }
      return result
    }
  }
}
</script>

<style scoped>
  ::v-deep .el-image {
    margin: 10px;
  }
</style>
