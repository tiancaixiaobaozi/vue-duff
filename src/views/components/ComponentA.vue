<template>
  <div class="component-a" @click.stop="tapChild">
    <p>ComponentA</p>
    <p>A-id>>{{ $attrs.id }}</p>
    <p>A-name>>{{ $attrs.name }}</p>
    <!--
      v-bind="obj"
      等价于
      v-bind:id="obj.id"
      v-bind:name="obj.name"
    -->
    <component-b v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import ComponentB from './ComponentB'

export default {
  name: 'ComponentA',
  components: { ComponentB },
  methods: {
    tapChild () {
      console.log('A:::', this.$listeners)
      console.log('A:::', this.$attrs)
      // this.$listeners.chan()
    }
  }
}
</script>

<style scoped>
.component-a {
  width: 500px;
  padding: 20px;
  border: solid 2px #42b983;
}
</style>
