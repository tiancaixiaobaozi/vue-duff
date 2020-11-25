<template>
  <div class="remark">
    <p>ComponentFather</p>
    <component-a :id="id" :name="name" @chan="handleChange" />
  </div>
</template>

<script>
import ComponentA from './components/ComponentA'
// import ArticleTitle from './components/ArticleTitle'

export default {
  name: 'Remark',
  components: { ComponentA },
  data () {
    return {
      id: 20200101,
      name: '张三'
    }
  },
  methods: {
    handleChange () {
      console.log('i m change...')
    }
  }
}
</script>

<style lang="scss" scoped>
.remark {
  border: solid 2px #e45c31;
  padding: 20px;
}
</style>
