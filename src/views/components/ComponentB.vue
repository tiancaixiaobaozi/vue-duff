<template>
  <div class="component-b" @click="tapChild">
    <p>ComponentB</p>
    <p>B-id:::{{ $attrs.id }}</p>
    <p>B-name:::{{ $attrs.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'ComponentB',
  methods: {
    tapChild () {
      console.log('B:::', this.$listeners)
      console.log('B:::', this.$attrs)
      this.$listeners.chan()
    }
  }
}
</script>

<style scoped>
.component-b {
  width: 150px;
  border: solid 2px #cee6ad;
}
</style>
