<template>
  <div class="home">
    <p>This is Home</p>
    <div class="image-container">
      <p v-for="(l, k) in $store.state.dataList" :key="k">{{ l.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      name: '张三'
    }
  },
  mounted () {
    this.$store.dispatch('changeListAction')
  }
}
</script>

<style scoped>
  ::v-deep .el-image {
    margin: 10px;
  }
</style>
