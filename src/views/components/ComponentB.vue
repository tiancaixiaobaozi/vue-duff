<template>
  <div class="component-b" @click.stop="tapChild">
    <p>ComponentB</p>
    <p>B-id>>>{{ $attrs.id }}</p>
    <p>B-name>>>{{ $attrs.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'ComponentB',
  methods: {
    tapChild () {
      console.log('B:::', this.$listeners)
      console.log('B:::', this.$attrs)
    }
  }
}
</script>

<style scoped>
.component-b {
  width: 200px;
  padding: 20px;
  border: solid 2px #cee6ad;
}
</style>
