<template>
  <div></div>
</template>

<script>
import images from '@/mock/images'

export default {
  name: 'Waterfall',
  data() {
    this.list = images
    return {}
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style scoped>

</style>
