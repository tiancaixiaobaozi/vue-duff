<template>
  <div>
    <p><a href="https://www.itxst.com/vue-draggable/tutorial.html" target="_blank">中文文档</a></p>
    <div class="main">
      <draggable
        v-model="array1"
        group="people"
        class="box1"
        @start="dragStart"
        @end="dragEnd"
      >
        <el-button v-for="element in array1" :key="element.id" plain>{{element.name}}</el-button>
        <button slot="footer" @click="addPeople">Add</button>
      </draggable>
      <draggable v-model="array2" group="people" class="box2">
        <el-button v-for="element in array2" :key="element.id" plain>{{element.name}}</el-button>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Drag3',
  components: {
    draggable
  },
  data() {
    return {
      array1: [
        {
          'name': 'aaa',
          'order': 1,
          'fixed': false
        },
        {
          'name': 'bbb',
          'order': 2,
          'fixed': false
        },
        {
          'name': 'ccc',
          'order': 3,
          'fixed': false
        },
        {
          'name': 'ddd',
          'order': 4,
          'fixed': false
        },
        {
          'name': 'eee',
          'order': 5,
          'fixed': false
        },
        {
          'name': 'fff',
          'order': 6,
          'fixed': false
        },
        {
          'name': 'ggg',
          'order': 7,
          'fixed': false
        }
      ],
      array2: []
    }
  },
  methods: {
    addPeople() {},
    dragStart(e) {
      console.log('拖拽start>>>', e)
    },
    dragEnd(e) {
      console.log('拖拽end>>>', e)
      console.log(this.array1)
      console.log(this.array2)
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
}
.box1 {
  min-height: 500px;
  width: 150px;
  display: flex;
  flex-direction: column;
  border: solid 1px #42b983;
  margin-right: 50px;
}
.box2 {
  min-height: 500px;
  width: 150px;
  display: flex;
  flex-direction: column;
  border: solid 1px #2c3e50;
}
</style>
