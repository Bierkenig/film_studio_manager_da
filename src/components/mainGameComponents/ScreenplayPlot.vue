<template>
  <div>
    <div
        class="drop-zone"
        @drop="onDrop($event,1)"
        @dragenter.prevent
        @dragover.prevent>
      <h2>Act 1</h2>
      <div
          v-for="item in getList(1)"
          :key="item.id"
          class="drag-el"
          draggable="true"
          @dragstart="startDrag($event, item)">
        {{ item.title }}
      </div>
    </div>
    <div
        class="drop-zone"
        @drop="onDrop($event,2)"
        @dragenter.prevent
        @dragover.prevent>
      <h2>Act 2</h2>
      <div
          v-for="item in getList(2)"
          :key="item.id"
          class="drag-el"
          draggable="true"
          @dragstart="startDrag($event, item)">
        {{ item.title }}
      </div>
    </div>
    <div
        class="drop-zone"
        @drop="onDrop($event,3)"
        @dragenter.prevent
        @dragover.prevent>
      <h2>Act 3</h2>
      <div
          v-for="item in getList(3)"
          :key="item.id"
          class="drag-el"
          draggable="true"
          @dragstart="startDrag($event, item)">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "ScreenplayPlot",

  setup(){
    const items = ref([
      {id: 0, title: 'Item A', list: 1},
      {id: 1, title: 'Item B', list: 2},
    ]);

    const getList = (list) => {
      return items.value.filter((item) => item.list == list)
    };

    const startDrag = (event, item) => {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID',item.id);
    };

    const onDrop = (event, list) => {
      const itemId = event.dataTransfer.getData('itemID');
      const item = items.value.find((item) => item.id == itemId);
      item.list = list
    }

    return {
      getList,
      startDrag,
      onDrop
    }
  }

}
</script>

<style scoped>
.drop-zone {
  width: 50%;
  margin: 50px auto;
  background-color: #42b983;
  padding: 10px;
  min-height: 10px;
}

.drag-el {
  background-color: brown;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
}

.drag-e:nth-last-of-type(1){
  margin-bottom: 0;
}
</style>