<template>
  <div id="app2">
    <VirtualList :listData="list" :itemSize="100" />
<!--    <VirtualList :listData="list" :estimatedItemSize="100" v-slot="slotProps">-->
<!--      <Item :item="slotProps.item"/>-->
<!--    </VirtualList>-->
  </div>
</template>

<script>
import VirtualList from './components/VList'
import Item from './components/Item'

let d = []
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i })
}

export default {
  name: 'App',
  data() {
    return {
      list: d
    }
  },
  components: {
    VirtualList,
    Item
  }
}
</script>

<style scoped>
  html{
    height: 100%;
  }
  body{
    height: 100%;
    margin:0;
  }
  #app2{
    height:100%;
  }
</style>
