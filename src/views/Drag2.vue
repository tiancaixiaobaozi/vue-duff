<template>
  <div class="color-list">
    <div
      class="color-item"
      :style="`background:${color.text};`"
      v-for="color in colors"
      v-dragging="{ item: color, list: colors, group: 'colors' }"
      :key="color.text"
    >{{color.text}}</div>
  </div>
</template>

<script>

export default {
  name: 'Drag2',
  components: {},
  mounted () {
    this.$dragging.$on('dragged', (e) => {
      console.log('正在拖动：：：', e)
    })
    this.$dragging.$on('dragend', (e) => {
      console.log('拖动结束：：：', e)
    })
  },
  data () {
    return {
      cardList: [
        {
          positionNum: 1,
          name: '演示卡片1',
          id: 'card1'
        },
        {
          positionNum: 2,
          name: '演示卡片2',
          id: 'card2'
        },
        {
          positionNum: 3,
          name: '演示卡片3',
          id: 'card3'
        },
        {
          positionNum: 4,
          name: '演示卡片4',
          id: 'card4'
        }
      ],
      colors: [{
        text: 'Aquamarine',
        value: 1
      }, {
        value: 2,
        text: 'Hotpink'
      }, {
        value: 3,
        text: 'Gold'
      }, {
        value: 4,
        text: 'Crimson'
      }, {
        value: 5,
        text: 'Blueviolet'
      }, {
        value: 6,
        text: 'Lightblue'
      }, {
        value: 7,
        text: 'Cornflowerblue'
      }, {
        value: 8,
        text: 'Skyblue'
      }, {
        value: 9,
        text: 'Burlywood'
      }]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.color-list {
  display: flex;
  width: 420px;
  flex-wrap: wrap;
  border: 4px darkolivegreen solid;
}
.color-item {
  width: 60px;
  height: 60px;
  font-size: 12px;
  margin: 6px;
}
</style>
