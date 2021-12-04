<template>
  <div>
    <div class="grid-wrapper">
      <div class="one item">1</div>
      <div class="two item">2</div>
      <div class="three item">3</div>
      <div class="four item">4</div>
      <div class="five item">5</div>
      <div class="six item">6</div>
    </div>
    <div class="note">
      <div class="note-block">
        <p class="note-title">声明3列的宽度，相同宽度简写：repeat(3, 100px)</p>
        <p>grid-template-columns: 100px 200px 300px;</p>
      </div>
      <div class="note-block">
        <p class="note-title">设置行高，两行分别的行高</p>
        <p>grid-template-rows: 100px 200px;</p>
      </div>
      <div class="note-block">
        <p class="note-title">间距</p>
        <p>grid-gap: 20px;</p>
        <p>grid-column-gap: 20px;</p>
        <p>grid-row-gap: 20px;</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grid'
}
</script>

<style scoped>
.note {
  text-align: left;
  padding: 20px;
  background: #2c3e50;
  color: #8CC7B5;
}
.note-title {
  padding-bottom: 6px;
  font-weight: bold;
  color: #42b983;
}
.note-block {
  padding: 20px;
}
.grid-wrapper {
  border: solid 2px #3d3d3d;
  /* grid 容器 */
  display: grid;

  /* 行/列 尺寸 */
  grid-template-columns: 100px 200px 300px; /* 声明3列的宽度，相同宽度简写：repeat(3, 100px) */
  grid-template-rows: 100px 200px;  /* 设置行高，两行分别的行高 */

  /* 行/列 间距 */
  grid-gap: 2px;
  /*grid-column-gap: 20px;*/
  /*grid-row-gap: 20px;*/
}
.item {
  text-align: center;
  font-size: 20px;
  color: #fff;
  padding: 20px;
}
.one {
  background: #19CAAD;
}
.two {
  background: #8CC7B5;
}
.three {
  background: #D1BA74;
}
.four {
  background: #BEE7E9;
}
.five {
  background: #E6CEAC;
}
.six {
  background: #ECAD9E;
}
</style>
