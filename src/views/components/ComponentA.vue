<template>
  <div class="component-a" @click="tapChild">
    <p>ComponentA</p>
    <p>A-id:::{{ $attrs.id }}</p>
    <p>A-name:::{{ $attrs.name }}</p>
    <!--
      v-bind="obj"
      等价于
      v-bind:id="obj.id"
      v-bind:name="obj.name"
    -->
    <component-b v-bind="$attrs" />
  </div>
</template>

<script>
import ComponentB from './ComponentB'

export default {
  name: 'ComponentA',
  components: { ComponentB },
  mounted () {
    console.log(this.$listeners)
    console.log(this.$attrs)
  },
  methods: {
    tapChild () {
      this.$listeners.chan()
    }
  }
}
</script>

<style scoped>
.component-a {
  width: 300px;
  padding: 20px;
  border: solid 2px #42b983;
}
</style>
