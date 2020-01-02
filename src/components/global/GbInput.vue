<template>
  <div class="gb-input">
    <slot name="label"></slot>
    <label>
      <input type="text" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'GbInput',
  props: {}
}
</script>

<style lang="scss" scoped>
.gb-input {
  display: inline-flex;
  align-items: center;
  .gb-label {
    min-width: 60px;
    color: #2c3e50;
    font-size: 18px;
  }
}
input {
  padding: 0 8px;
  width: 180px;
  height: 25px;
  border: yellowgreen solid 2px;
}
</style>
