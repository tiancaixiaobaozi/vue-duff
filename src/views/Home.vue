<template>
  <div class="home">
    <p>This is Home</p>
    <gb-input>
      <div slot="label">姓名：</div>
    </gb-input>
    <h4>{{ name | nameFilter }}</h4>
    <button @click="getList">获取列表</button>
  </div>
</template>

<script>
import { getStoreList } from '@/api/classify'

export default {
  name: 'home',
  data () {
    return {
      name: '张三'
    }
  },
  filters: {
    nameFilter: function (val) {
      return '伞兵一号：' + val
    }
  },
  methods: {
    async getList () {
      let res = await getStoreList()
      console.log(res)
    }
  }
}
</script>
