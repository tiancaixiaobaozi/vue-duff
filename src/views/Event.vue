<template>
  <div class="remark" @click="tapParent">
    <p>ComponentFather</p>
    <p>A-id>{{ id }}</p>
    <p>A-name>{{ name }}</p>
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
    },
    tapParent() {
      console.log(this.$children)
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
