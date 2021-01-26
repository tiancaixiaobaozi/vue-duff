<template>
  <div class="component-c">组件</div>
</template>

<script>
  export default {
    name: "CompEventListener",
    mounted() {
      window.addEventListener('resize', this.listenerFoo)
      // 利用hook监听组件卸载
      this.$once('hook:beforeDestroy', () => {
        console.log('组件c已卸载')
        window.removeEventListener('resize', this.listenerFoo)
      })
    },
    methods: {
      listenerFoo() {
        console.log('窗口监听')
      }
    },
  }
</script>

<style scoped>
.component-c {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 16px;
  color: #e45c31;
  background: #2c3e50;
}
</style>
