<template>
  <div>
    <div id="waterfall">
      <div
        v-for="(item, index) in list"
        :key="index" class="item"
        :style="`background: ${getRandomColor()}; height: ${getRandomHeight()};`"
        ref="item"
      >
        {{index}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Waterfall',
  data() {
    return {
      width: 230,
      gap: 16,
      loaded: 0,
      cols: 0,
      params: {
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      heights: [],
      isReq: false,
      // data
      list: []
    }
  },
  mounted () {
    this.init()

    window.addEventListener('scroll', this.lazyLoad)
    window.addEventListener('resize', this.debounce(this.resize, 50))
  },
  methods: {
    init() {
      if (this.isReq) return
      this.isReq = true
      this.request(this.params).then(res => {
        this.list = res.lists
        this.total = res.total
        this.isReq = false
        this.params.pageNo++
        this.$nextTick(() => {
          this.waterfall()
        })
      })
    },
    waterfall() {
      let cols = this.getCols()
      const items = this.$refs.item

      items.forEach((item, i) => {
        const height = item.offsetHeight
        if (i < cols) {
          item.style.top = 0
          item.style.left = i * (this.width + this.gap) + 'px'
          this.heights.push(height)
        } else {
          const minIndex = this.getMinIndex(this.heights)
          const top = this.heights[minIndex] + this.gap
          item.style.top = top + 'px'
          item.style.left = minIndex * (this.width + this.gap) + 'px'
          this.heights[minIndex] = top + height
        }
        this.loaded++
      })

      this.setWaterFallRect()
    },
    getCols() {
      return ~~((document.body.offsetWidth - 32 + this.gap) / (this.width + this.gap))
    },
    setWaterFallRect() {
      const wf = document.querySelector('#waterfall')
      const max = Math.max.apply(null, this.heights)

      wf.style.height = max + 'px'
      wf.style.width = this.width * this.cols + (this.cols - 1) * this.gap + 'px'
    },
    debounce(fn, delay) {
      delay = delay || 100
      let timer = null

      return function () {
        const args = Array.prototype.slice.apply(arguments)
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        timer = setTimeout(function () {
          fn.apply(this, args)
        }, delay)
      }
    },
    getMinIndex(array) {
      return array.indexOf(Math.min.apply(null, array))
    },
    lazyLoad() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var documentHeight = document.documentElement.scrollHeight
      var clientHeight = window.innerHeight

      // documentHeight - scrollTop - clientHeight < 0.5 * clientHeight
      if (documentHeight - scrollTop < 1.5 * clientHeight) {
        if (this.loaded >= this.total) {
          document.querySelector('#msg').innerText = '没有更多了'
          window.removeEventListener('scroll', this.lazyLoad)
          return
        }

        this.init()
      }
    },
    resize() {
      if (document.body.offsetWidth < 600) return

      this.loaded = 0
      this.heights = []
      this.waterfall()
    },
    // 请求
    request(params) {
      return new Promise((resolve, reject) => {
        this.$axios({
          url: '/loc/imgs',
          params: params
        }).then(res => {
          resolve(res.data)
        }).catch(e => {
          reject(e)
        })
      })
    },
    // 获取指定范围内的随机整数
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    // 获取随机高度，介于200到500之间
    getRandomHeight() {
      return this.getRandomInt(200, 500) + 'px'
    },
    // getRandomColor获取随机背景色，包括透明度，介于为0.1到1之间
    getRandomColor() {
      return 'rgba(' + this.getRandomInt(0, 255) + ', ' + this.getRandomInt(0, 255) + ', ' + this.getRandomInt(0, 255) + ', ' + this.getRandomInt(1, 10) / 10 + ')'
    },
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.lazyLoad)
    window.removeEventListener('resize', this.debounce)
  }
}
</script>

<style scoped>
#waterfall {
  position: relative;
}

.item {
  width: 230px;
  border-radius: 10px;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  color: #2c3e50;
  font-size: 22px;
  text-align: center;
  line-height: 10;
}

#msg {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  height: 80px;
  line-height: 80px;
  color: #3d3d3d;
}
</style>
