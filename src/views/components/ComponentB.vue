<template>
  <div class="component-b" @click.stop="tapChild">
    <p>ComponentB</p>
    <p>B-id:::{{ $attrs.id }}</p>
    <p>B-name:::{{ $attrs.name }}</p>
    <component-c v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import ComponentC from './ComponentC'

export default {
  name: 'ComponentB',
  components: { ComponentC },
  methods: {
    tapChild () {
      console.log('B:::', this.$listeners)
      console.log('B:::', this.$attrs)
      // this.$listeners.chan('B-change:')  // 也可调用
      this.$emit('chan', 'B-change:')
    }
  }
}
</script>

<style scoped>
.component-b {
  width: 200px;
  border: solid 2px #cee6ad;
  padding: 20px;
}
</style>
