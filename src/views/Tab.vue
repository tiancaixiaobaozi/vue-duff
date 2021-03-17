<template>
  <div class="nav clear" @mouseleave="nowIndex=0">
    <div class="menu-context">
      <div class="li" @mouseenter.stop="nowIndex=0"><span>Tab One</span></div>
      <div class="li" @mouseenter.stop="nowIndex=1"><span>Tab Two</span></div>
      <div class="li" @mouseenter.stop="nowIndex=2"><span>Tab Three</span></div>
      <div class="li" @mouseenter.stop="nowIndex=3"><span>Tab four</span></div>
      <div class="li" @mouseenter.stop="nowIndex=4"><span>Tab five</span></div>
      <div class="li" @mouseenter.stop="nowIndex=5"><span>Tab six</span></div>
    </div>
    <div class="slider" :style="{'transform':'translate3d('+nowIndex*100+'px,0,0)'}"></div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      nowIndex: 0
    }
  }
}
</script>

<style scoped>
  .nav{
    margin: 40px;
    position: relative;
  }
  .menu-context {
    display: flex;
    flex-direction: row;
  }
  .nav .li{
    float: left;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    background: #09f;
    cursor: pointer;
    list-style: none;
  }
  .nav span{
    position: relative;
    z-index: 2;
  }
  .nav .slider{
    position: absolute;
    transition: all .5s cubic-bezier(0.4, -0.3, 0.57, 1.38);
    width: 100px;
    height: 40px;
    background: #f90;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>
