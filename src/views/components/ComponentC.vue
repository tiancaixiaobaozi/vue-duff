<template>
  <div class="component-b" @click.stop="tapChild">
    <p>ComponentC</p>
    <p>C-id:::{{ $attrs.id }}</p>
    <p>C-name:::{{ $attrs.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'ComponentB',
  methods: {
    tapChild () {
      console.log('C:::', this.$listeners)
      console.log('C:::', this.$attrs)
      this.$emit('chan', 'C-change:')
    }
  }
}
</script>

<style scoped>
.component-b {
  width: 120px;
  border: solid 2px #f6b810;
}
</style>
