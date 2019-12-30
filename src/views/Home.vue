<template>
  <div class="home">
    <p>This is Home</p>
    <button @click="getList">获取列表</button>
  </div>
</template>

<script>
import { getStoreList } from '@/api/classify'
export default {
  name: 'home',
  methods: {
    async getList () {
      let res = await getStoreList()
      console.log(res)
      console.log(process.env)
    }
  }
}
</script>
