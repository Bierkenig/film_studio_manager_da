<template>
  <div>
    <div>
      <button id="addCharacterMomentButton" class="buttonStyle" @click="characterMomentButtonClick">{{ $t('addCharacterMoment') }}</button>
      <button id="addSettingButton" class="buttonStyle" @click="settingButtonClick">{{ $t('addSetting') }}</button>
      <button id="addTimePeriodButton" class="buttonStyle" @click="timePeriodButtonClick">{{ $t('addTimePeriod') }}</button>
    </div>

    <transition name="modal">
      <time-period-modal
          v-if="showTimePeriodModal"
          @close="showTimePeriodModal = false"
          @send-time-period="addTimePeriod">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </time-period-modal>
    </transition>

    <div id="dropZones">
      <div
          class="drop-zone"
          @drop="onDrop($event,1)"
          @dragenter.prevent
          @dragover.prevent>
        <h2>{{ $t('act1') }}</h2>
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
        <h2>{{ $t('act2') }}</h2>
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
        <h2>{{ $t('act3') }}</h2>
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
  </div>
</template>

<script>
import { ref } from 'vue';
import TimePeriodModal from "@/components/mainGameComponents/moviesMenu/createScreenplay/TimePeriodModal";


export default {
  name: "ScreenplayPlot",
  components: {TimePeriodModal},
  data(){
    return {
      showTimePeriodModal: false,
    }
  },

  setup(){
    const items = ref([

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
    };

    const addTimePeriod = (timePeriod, actNumber) => {
      if(items.value.length === 0){
        items.value.push({
          id: 0,
          title: 'Time Period: ' + timePeriod,
          list: actNumber
        });
      } else {
        items.value.push({
          id: items.value[items.value.length - 1].id + 1,
          title: 'Time Period: ' + timePeriod,
          list: actNumber
        });
        //console.log(items.value);
      }
    };

    return {
      getList,
      startDrag,
      onDrop,
      addTimePeriod
    }
  },

  methods: {
    characterMomentButtonClick(){

    },

    settingButtonClick(){

    },

    timePeriodButtonClick(){
      this.showTimePeriodModal = true;
    },
  }

}
</script>

<style scoped>
#dropZones {
  display: flex;
  flex-direction: row;
  gap: 3em;
}

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