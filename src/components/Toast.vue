<template>
  <div class="toast">
    <button v-toast="show">显示Toast</button>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  directives: {
    toast: {
      // 钩子函数，被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
      inserted (el) {
        console.log('inserted')
      },
      // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
      bind () {
        console.log('bind')
      },
      update () {
        console.log('update')
      }
    }
  },
  methods: {
    show () {
      alert('Toast已显示~')
    }
  }
}
</script>
