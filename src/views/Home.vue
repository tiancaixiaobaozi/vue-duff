<template>
  <div class="home">
    <p>This is Home</p>
    <!--<gb-input>
      <div slot="label">姓名：</div>
    </gb-input>-->
    <button @click="getList">重新获取</button>
    <div class="image-container">
      <el-image
        v-for="data in dataSource"
        :key="data.id"
        :src="getImages(data.image_urls.square_medium)"
        :preview-src-list="[data.image_urls.square_medium]"
        style="width: 100px; height: 100px"
      />
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/pixiv'

export default {
  name: 'home',
  data () {
    return {
      name: '张三',
      dataSource: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      const params = {
        type: 'rank'
      }
      let res = await getData(params)
      this.dataSource = res.data.illusts
      console.log(res)
    },
    getImages (_url) {
      if (_url !== undefined) {
        let _u = _url.substring(20)
        // return 'https://images.weserv.nl/?url=' + _u
        return '/img/' + _u
      }
    }
  }
}
</script>

<style scoped>
  /deep/ .el-image {
    margin: 10px;
  }
</style>
