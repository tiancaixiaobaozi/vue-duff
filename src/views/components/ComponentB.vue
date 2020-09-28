<template>
  <div class="component-b" @click="tapChild">
    <p>ComponentB</p>
    <p>B-id:::{{ $attrs.id }}</p>
    <p>B-name:::{{ $attrs.name }}</p>
  </div>
</template>

<script>
  export default {
    name: "ComponentB",
    mounted() {
      console.log(this.$listeners)
      console.log(this.$attrs)
    },
    methods: {
      tapChild() {
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
