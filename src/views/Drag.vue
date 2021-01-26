<template>
  <div class="drag">
    <card-dragger
      :data="cardList"
      :colNum="2"
      :cardOutsideWidth="300"
      :cardInsideWidth="260"
      :cardOutsideHeight="310"
      :cardInsideHeight="240"
      @startDrag="startDrag"
      @swicthPosition="switchPosition"
      @finishDrag="finishDrag"
    >
      <template v-slot:header="slotProps">
        <div class="topMenuBox" >
          <div class="menuTitle" v-if="slotProps.item.name">{{slotProps.item.name}}</div>
          <div class="menuTitle" v-else> 默认标题 </div>
        </div>
      </template>
      <template v-slot:content="slotProps">
        <div class="insideData">
          slot-content
        </div>
      </template>
    </card-dragger>
  </div>
</template>

<script>
import { cardDragger } from 'carddragger' // https://github.com/dwanda/dragComponent

export default {
  name: 'Drag',
  components: {
    cardDragger
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
      ]
    }
  },
  methods: {
    startDrag (e, id) {
      // 在点击卡片顶部标题栏的时候，触发此函数
      console.log('开始拖动')
    },
    switchPosition (oldPosition, newPosition, originItem) {
      // 在拖动一个卡片到另外一个卡片的位置的时候，触发此事件
      console.log('拖动到此位置')
    },
    finishDrag (oldPosition, newPosition, originItem) {
      // 松开鼠标
      console.log('结束拖动')
    }
  }
}
</script>

<style lang="scss" scoped>
.menuTitle {
  line-height: 60px;
  font-size: 14px;
  color: #cee6ad;
}
</style>
