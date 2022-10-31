<template>
  <div>
    <div>
      <button id="addCharacterMomentButton" class="buttonStyle" @click="characterMomentButtonClick">{{ $t('addCharacterMoment') }}</button>
      <button id="addSettingButton" class="buttonStyle" @click="settingButtonClick">{{ $t('addLocation') }}</button>
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

    <transition name="modal">
      <character-moments-modal
          v-if="showCharacterMomentsModal"
          @close="showCharacterMomentsModal = false"
          @send-character-moments="addCharacterMoments">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </character-moments-modal>
    </transition>

    <transition name="modal">
      <setting-modal
          v-if="showSettingModal"
          @close="showSettingModal = false"
          @send-setting="addSetting">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </setting-modal>
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

    <p id="warningMsg">{{ $t('warningMsgScreenplayPlot') }}</p>
    <button id="continueButton" :disabled="true">{{ $t('continue') }}</button>

    <div
        id="delete-zone"
        @drop="onDropDelete($event)"
        @dragenter.prevent
        @dragover.prevent
        hidden>
      <img src="../../../../assets/paperbin.png" alt="writer" style="width: 50px; height: 50px" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import TimePeriodModal from "@/components/mainGameComponents/moviesMenu/createScreenplay/TimePeriodModal";
import CharacterMomentsModal from "@/components/mainGameComponents/moviesMenu/createScreenplay/CharacterMomentsModal";
import SettingModal from "@/components/mainGameComponents/moviesMenu/createScreenplay/SettingModal";


export default {
  name: "ScreenplayPlot",
  components: {SettingModal, CharacterMomentsModal, TimePeriodModal},
  data(){
    return {
      showTimePeriodModal: false,
      showCharacterMomentsModal: false,
      showSettingModal: false
    }
  },

  setup(){
    const items = ref([]);

    const getList = (list) => {
      return items.value.filter((item) => item.list == list)
    };

    const startDrag = (event, item) => {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID',item.id);

      document.getElementById('delete-zone').hidden = false;
    };

    const onDrop = (event, list) => {
      const itemId = event.dataTransfer.getData('itemID');
      const item = items.value.find((item) => item.id == itemId);
      item.list = list;

      checkStatusOfLists();
    };

    const onDropDelete = (event) => {
      const itemId = event.dataTransfer.getData('itemID');
      const item = items.value.find((item) => item.id == itemId);

      items.value.splice(items.value.indexOf(item),1);
      document.getElementById('delete-zone').hidden = true;

      checkStatusOfLists();
      disableAddButton(items,'timePeriod','addTimePeriodButton');
      disableAddButton(items,'characterMoment','addCharacterMomentButton');
      disableAddButton(items,'setting','addSettingButton');
    };

    const addTimePeriod = (timePeriod, actNumber) => {
      addElementToItems(items,actNumber,timePeriod, 'timePeriod','Time Period: ');
      disableAddButton(items,'timePeriod','addTimePeriodButton');
      checkStatusOfLists();
    };

    const addCharacterMoments = (characterMoment, actNumber) => {
      addElementToItems(items,actNumber,characterMoment, 'characterMoment','Character Moment: ');
      disableAddButton(items,'characterMoment','addCharacterMomentButton');
      checkStatusOfLists();
    };

    const addSetting = (setting, actNumber) => {
      addElementToItems(items,actNumber,setting, 'setting', 'Setting: ');
      disableAddButton(items,'setting','addSettingButton');
      checkStatusOfLists();
    };

    const addElementToItems = (item, act, elementType, typeString, titleString) => {
      if(item.value.length === 0){
        item.value.push({
          id: 0,
          title: titleString + elementType,
          list: act,
          type: typeString
        });
      } else {
        item.value.push({
          id: item.value[item.value.length - 1].id + 1,
          title: titleString + elementType,
          list: act,
          type: typeString
        });
      }
    };

    const disableAddButton = (item,type,buttonId) => {
      document.getElementById(buttonId).disabled = item.value.filter((i) => i.type === type).length === 3;
    };

    const checkStatusOfLists = () => {
      let listOne = getList(1);
      let listTwo = getList(2);
      let listThree = getList(3);

      document.getElementById('continueButton').disabled =
          !((listTwo.filter((i) => i.type === 'setting').length === 1
                  && listOne.filter((i) => i.type === 'setting').length === 1
                  && listThree.filter((i) => i.type === 'setting').length === 1) &&
              (listTwo.filter((i) => i.type === 'timePeriod').length === 1
                  && listOne.filter((i) => i.type === 'timePeriod').length === 1
                  && listThree.filter((i) => i.type === 'timePeriod').length === 1) &&
              (listTwo.filter((i) => i.type === 'characterMoment').length === 1
                  && listOne.filter((i) => i.type === 'characterMoment').length === 1
                  && listThree.filter((i) => i.type === 'characterMoment').length === 1));

      document.getElementById('warningMsg').hidden = !document.getElementById('continueButton').disabled;
    }

    return {
      getList,
      startDrag,
      onDrop,
      onDropDelete,
      addTimePeriod,
      addCharacterMoments,
      addSetting
    }
  },

  methods: {
    characterMomentButtonClick(){
      this.showCharacterMomentsModal = true;
    },

    settingButtonClick(){
      this.showSettingModal = true;
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

#delete-zone {
  background-color: red;
}
</style>