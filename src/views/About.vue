<template>
  <div class="about">
    <button @click="getData">获取数据</button>
    <div v-if="false" class="box-wrap">
      <div class="box-1-wrap">
        <div class="main-box main-box-1">
          <div v-for="i in 12" :key="i" class="item">
            {{ i }}
            <div class="line"></div>
            <div class="bottom-line"></div>
          </div>
        </div>
      </div>
      <div class="main-box main-box-2">
        <div v-for="i in 12" :key="i" class="item"></div>
      </div>
      <div class="main-box main-box-3">
        <div v-for="i in 12" :key="i" class="item">{{ i }}</div>
      </div>
    </div>
    <div>
      <p>{{ content }}</p>
      <ul v-show="false">
        <li v-for="item in dataList" :key="item.id" style="text-align: left;">
          <span>{{ item.name }}</span> -
          <span>{{ item.age }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTestData } from '@/api/base'
import { getData } from '@/api/yy'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters(['dataList'])
  },
  watch: {
    'dataList': {
      handler: function (val) {
        console.log('watach:::', val)
      },
      deep: true,
      immediate: false
    }
  },
  mounted () {
    this.changeListAction()
  },
  methods: {
    ...mapActions(['changeListAction']),
    async getData () {
      const { data } = await getData({
        cat: 'a'
      })
      this.content = data
    }
  }
}
</script>

<style lang="scss" scoped>
.box-wrap {
  padding: 0 30px;
  overflow: hidden;
}
.main-box {
  margin: 30px auto;
  width: 600px;
  .item {
    height: 150px;
    line-height: 150px;
    background: #42b983;
    .line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      &:before, &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 1px;
        background: linear-gradient(180deg,rgba(229,54,51,0),rgba(230,26,109,.62));
        opacity: 0;
        transition: background-position .15s ease-out;
      }
      &:after {
        left: auto;
        right: -1px;
      }
    }
    .bottom-line {
      padding: 0!important;
      position: absolute;
      bottom: 0;
      left: 0;
      right: -1px;
      height: 1px;
      opacity: 0;
      z-index: 3;
      background: linear-gradient(90deg,#e45c31,#ed2162);
      transition: all .2s;
    }
    &:hover {
      background: linear-gradient(180deg, rgba(229, 54, 51, 0), rgba(230, 26, 109, 0.1));
      .bottom-line {
        opacity: 1;
      }
      .line {
        &:before, &:after {
          opacity: 1;
        }
      }
    }
  }
}
.box-1-wrap {
  overflow: hidden;
}
.main-box-1 {
  padding-right: 1px;
  background: lightblue;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  .item {
    box-sizing: border-box;
    width: 20%;
    position: relative;
    &::before {
      content: '';
      height: 1px;
      width: 150vw;
      position: absolute;
      bottom: 0;
      left: -25vw;
      background: #2c3e50;
    }
    /* :nth-child(n+0) 选中从第0个开始子元素 */
    /* :nth-child(-n+5) 选中从第1个到第5个子元素 */
    /* :nth-child(n+0):nth-child(-n+5) 选中第0-5个子元素 */
    &:nth-child(n+0):nth-child(-n+5):after {
      content: "";
      width: 1px;
      height: 10000px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      background: #2c3e50;
    }
    /* :nth-child(n+5) 选中从第5个开始子元素 */
    /* :nth-child(-n+10) 选中从第1个到第10个子元素 */
    /* :nth-child(n+5):nth-child(-n+10) 选中第5-10个子元素 */
    &:nth-child(n+5):nth-child(-n+10):after {
      content: "";
      width: 1px;
      height: 10000px;
      position: absolute;
      right: -1px;
      left: auto;
      top: -2000px;
      z-index: 1;
      background: #2c3e50;
    }
  }
}
.main-box-2 {
  background: #cee6ad;
  display: flex;
  flex-wrap: wrap;
  .item {
    box-sizing: border-box;
    width: 20%;
    border: solid 1px #2c3e50;
    counter-increment: add;
    &::after {
      content: counter(add);
    }
  }
}
.main-box-3 {
  background: #e6ccad;
  display: grid;
  /* grid-template-columns：20% 20% 20% 20% 20%; */
  /* grid-template-columns：repeat(5, 20%) */
  /* grid-template-columns：repeat(auto-fill, 20%) */
  grid-template-columns: repeat(auto-fill, 20%); /* 行数 */
  grid-template-rows: repeat(auto-fill, 150px);  /* 列数 */
  grid-gap: 0 0;  /* 行列间距(row, column) */
  .item {
    border: solid 1px #2c3e50;
  }
}
</style>
