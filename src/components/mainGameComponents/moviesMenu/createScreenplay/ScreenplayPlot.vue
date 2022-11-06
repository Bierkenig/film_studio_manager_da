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
    <router-link :to="{name: 'screenplayDetails'}">
      <button id="continueButton" :disabled="true" @click="clickButton">{{ $t('continue') }}</button>
    </router-link>

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
      showSettingModal: false,
      items: [],
    }
  },

  methods: {
    getList(list) {
      return this.items.filter((item) => item.list == list)
    },

    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID',item.id);

      document.getElementById('delete-zone').hidden = false;
    },

    onDrop(event, list) {
      const itemId = event.dataTransfer.getData('itemID');
      const item = this.items.find((item) => item.id == itemId);
      item.list = list;

      this.checkStatusOfLists();
      document.getElementById('delete-zone').hidden = true;
    },

    onDropDelete(event) {
      const itemId = event.dataTransfer.getData('itemID');
      const item = this.items.find((item) => item.id == itemId);

      this.items.splice(this.items.indexOf(item),1);
      document.getElementById('delete-zone').hidden = true;

      this.checkStatusOfLists();
      this.disableAddButton(this.items,'timePeriod','addTimePeriodButton');
      this.disableAddButton(this.items,'characterMoment','addCharacterMomentButton');
      this.disableAddButton(this.items,'setting','addSettingButton');
    },

    addTimePeriod(timePeriod, actNumber) {
      this.addElementToItems(this.items,actNumber,this.$t(timePeriod), timePeriod,'timePeriod','Time Period: ');
      this.disableAddButton(this.items,'timePeriod','addTimePeriodButton');
      this.checkStatusOfLists();
    },

    addCharacterMoments(characterMoment, actNumber) {
      if(this.items.length === 0){
        this.items.push({
          id: 0,
          characterOne: characterMoment[0],
          characterMoment: characterMoment[1],
          characterTwo: characterMoment[2],
          title: 'Character Moment: ' + this.checkMoment(characterMoment[0],this.$t(characterMoment[1]),characterMoment[2]),
          list: actNumber,
          type: 'characterMoment'
        });
      } else {
        this.items.push({
          id: this.items[this.items.length - 1].id + 1,
          characterOne: characterMoment[0],
          characterMoment: characterMoment[1],
          characterTwo: characterMoment[2],
          title: 'Character Moment: ' + this.checkMoment(characterMoment[0],this.$t(characterMoment[1]),characterMoment[2]),
          list: actNumber,
          type: 'characterMoment'
        });
      }
      this.disableAddButton(this.items,'characterMoment','addCharacterMomentButton');
      this.checkStatusOfLists();
    },

    addSetting(setting, actNumber) {
      this.addElementToItems(this.items,actNumber,this.$t(setting), setting,'setting', 'Setting: ');
      this.disableAddButton(this.items,'setting','addSettingButton');
      this.checkStatusOfLists();
    },

    addElementToItems(item, act, elementType, element, typeString, titleString) {
      if(item.length === 0){
        item.push({
          id: 0,
          value: element,
          title: titleString + elementType,
          list: act,
          type: typeString
        });
      } else {
        item.push({
          id: item[item.length - 1].id + 1,
          value: element,
          title: titleString + elementType,
          list: act,
          type: typeString
        });
      }
    },

    disableAddButton(item,type,buttonId)  {
      document.getElementById(buttonId).disabled = item.filter((i) => i.type === type).length === 3;
    },

    checkStatusOfLists() {
      let listOne = this.getList(1);
      let listTwo = this.getList(2);
      let listThree = this.getList(3);

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
    },

    checkMoment(chOne, chMoment, chTwo){
      let realMessage = chOne + ' ';
      if(chTwo === ''){
        realMessage += this.$t(chMoment);
      } else if(chMoment === 'lets ... go') {
        realMessage += 'lets ' + chTwo + ' go';
      } else if(chMoment === 'lasst ... gehen'){
        realMessage += 'lasst ' + chTwo + ' gehen';
      } else if(chMoment === 'sends ... on a mission') {
        realMessage += 'sends ' + chTwo + ' on a mission';
      } else if(chMoment === 'schickt ... auf eine Mission'){
        realMessage += 'schickt ' + chTwo + ' auf eine Mission';
      } else if(chMoment === 'fordert ... heraus'){
        realMessage += 'fordert ' + chTwo + ' heraus';
      } else {
        realMessage += chMoment + ' ' + chTwo;
      }
      return realMessage;
    },

    clickButton() {
      this.$store.getters.getCurrentScreenplay.addAct1(this.getList(1));
      this.$store.getters.getCurrentScreenplay.addAct2(this.getList(2));
      this.$store.getters.getCurrentScreenplay.addAct3(this.getList(3));
    },

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