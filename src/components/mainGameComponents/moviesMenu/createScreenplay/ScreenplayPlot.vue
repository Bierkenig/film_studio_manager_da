<template>
  <div id="screenplayPlotMainDiv">
    <div>
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
    </div>

    <div class="screenplayPlotBackground">
      <h1 class="screenplayPlotHeader">{{ $t('screenplayPlot') }}</h1>

      <div id="dropZones">
        <div
            class="drop-zone"
            @drop="onDrop($event,1)"
            @dragenter.prevent
            @dragover.prevent>
          <h2 class="screenplayPlotHeader">{{ $t('act1') }}</h2>
          <div v-if="this.$store.getters.getCurrentLanguage === 'en'">
            <div
                v-for="item in getList(1)"
                :key="item.id"
                class="drag-el"
                draggable="true"
                @dragstart="startDrag($event, item)">
              {{ item.textEn }}
            </div>
          </div>
          <div v-else>
            <div
                v-for="item in getList(1)"
                :key="item.id"
                class="drag-el"
                draggable="true"
                @dragstart="startDrag($event, item)">
              {{ item.textDe }}
            </div>
          </div>
        </div>
        <div
            class="drop-zone"
            @drop="onDrop($event,2)"
            @dragenter.prevent
            @dragover.prevent>
          <h2 class="screenplayPlotHeader">{{ $t('act2') }}</h2>
          <div v-if="this.$store.getters.getCurrentLanguage === 'en'">
            <div
                v-for="item in getList(2)"
                :key="item.id"
                class="drag-el"
                draggable="true"
                @dragstart="startDrag($event, item)">
              {{ item.textEn }}
            </div>
          </div>
          <div v-else>
            <div
                v-for="item in getList(2)"
                :key="item.id"
                class="drag-el"
                draggable="true"
                @dragstart="startDrag($event, item)">
              {{ item.textDe }}
            </div>
          </div>
        </div>
        <div
            class="drop-zone"
            @drop="onDrop($event,3)"
            @dragenter.prevent
            @dragover.prevent>
          <h2 class="screenplayPlotHeader">{{ $t('act3') }}</h2>
          <div v-if="this.$store.getters.getCurrentLanguage === 'en'">
            <div
                v-for="item in getList(3)"
                :key="item.id"
                class="drag-el"
                draggable="true"
                @dragstart="startDrag($event, item)">
              {{ item.textEn }}
            </div>
          </div>
          <div v-else>
            <div
                v-for="item in getList(3)"
                :key="item.id"
                class="drag-el"
                draggable="true"
                @dragstart="startDrag($event, item)">
              {{ item.textDe }}
            </div>
          </div>
        </div>
      </div>

      <p id="screenplayPlotWarningMsg" :hidden="this.hideInfoMessage">{{ $t('warningMsgScreenplayPlot') }}</p>

      <div id="screenplayPlotButtonDiv">
        <div id="screenplayPlotButtonInnerDiv">
          <custom-button
              id="addCharacterMomentButton"
              class="screenplayPlotAddButtons"
              :dark="false"
              size="small"
              :disabled="this.disableAddCharacterMomentButton"
              @clicked="characterMomentButtonClick">{{ $t('addCharacterMoment') }}</custom-button>
          <custom-button
              id="addSettingButton"
              class="screenplayPlotAddButtons"
              :dark="false"
              size="small"
              :disabled="this.disableAddSettingButton"
              @clicked="settingButtonClick">{{ $t('addLocation') }}</custom-button>
          <custom-button
              id="addTimePeriodButton"
              class="screenplayPlotAddButtons"
              :dark="false"
              size="small"
              :disabled="this.disableAddTimePeriodButton"
              @clicked="timePeriodButtonClick">{{ $t('addTimePeriod') }}</custom-button>
        </div>
      </div>
    </div>

    <info-line id="screenplayPlotHint">{{ $t('plotHint') }}</info-line>

    <div>
      <icon-button
          v-if="this.$store.getters.getCurrentScreenplay.rewritingStatus"
          id="screenplayPlotBackButton"
          icon="simple-arrow-left"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack"/>
      <custom-button
          id="screenplayPlotContinueButton"
          :dark="false"
          size="medium"
          :disabled="this.disableContinueButton"
          @click="clickButton">{{ $t('continue')}}</custom-button>
    </div>

    <div
        id="delete-zone"
        @drop="onDropDelete($event)"
        @dragenter.prevent
        @dragover.prevent
        hidden>
      <h2 class="screenplayPlotHeader">{{ $t('deleteItem') }}</h2>
      <custom-icon class="screenplayPlotDeleteButton"
                   size="60px"
                   theme="white"
                   icon="paperbin"
                   :shadow="false"
                   :invert-theme="false"/>
    </div>
  </div>
</template>

<script>
import TimePeriodModal from "@/components/mainGameComponents/moviesMenu/createScreenplay/TimePeriodModal";
import CharacterMomentsModal from "@/components/mainGameComponents/moviesMenu/createScreenplay/CharacterMomentsModal";
import SettingModal from "@/components/mainGameComponents/moviesMenu/createScreenplay/SettingModal";
import {i18next} from '@/translation/i18n'
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";
import InfoLine from "@/components/kitchenSink/InfoLine.vue";


export default {
  name: "ScreenplayPlot",
  components: {InfoLine, CustomIcon, IconButton, CustomButton, SettingModal, CharacterMomentsModal, TimePeriodModal},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data(){
    return {
      showTimePeriodModal: false,
      showCharacterMomentsModal: false,
      showSettingModal: false,
      items: [],
      disableAddCharacterMomentButton: false,
      disableAddTimePeriodButton: false,
      disableAddSettingButton: false,
      disableContinueButton: true,
      hideInfoMessage: false,
    }
  },

  mounted() {
    if(this.$store.getters.getCurrentScreenplay.getActs().length !== 0){
      this.$store.getters.getCurrentScreenplay.acts.act1.forEach((i) => this.items.push(i));
      this.$store.getters.getCurrentScreenplay.acts.act2.forEach((i) => this.items.push(i));
      this.$store.getters.getCurrentScreenplay.acts.act3.forEach((i) => this.items.push(i));

      this.items.sort((a,b) => a.id - b.id);
      this.disableAddButton(this.items,'setting','addSettingButton');
      this.disableAddButton(this.items,'timePeriod','addTimePeriodButton');
      this.disableAddButton(this.items,'characterMoment','addCharacterMomentButton');
      this.checkStatusOfLists();
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
      this.addElementToItems(this.items,actNumber,timePeriod, timePeriod,'timePeriod','Time Period: ', 'Zeitspanne: ');
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
          textDe: 'Charakter Ereignis: ' + this.checkMoment(characterMoment[0],i18next.t(characterMoment[1],{lng: 'de'}),characterMoment[2]),
          textEn: 'Character Moment: ' + this.checkMoment(characterMoment[0],i18next.t(characterMoment[1],{lng: 'en'}),characterMoment[2]),
          list: actNumber,
          type: 'characterMoment'
        });
      } else {
        this.items.push({
          id: this.items[this.items.length - 1].id + 1,
          characterOne: characterMoment[0],
          characterMoment: characterMoment[1],
          characterTwo: characterMoment[2],
          textDe: 'Charakter Ereignis: ' + this.checkMoment(characterMoment[0],i18next.t(characterMoment[1],{lng: 'de'}),characterMoment[2]),
          textEn: 'Character Moment: ' + this.checkMoment(characterMoment[0],i18next.t(characterMoment[1],{lng: 'en'}),characterMoment[2]),
          list: actNumber,
          type: 'characterMoment'
        });
      }
      this.disableAddButton(this.items,'characterMoment','addCharacterMomentButton');
      this.checkStatusOfLists();
    },

    addSetting(setting, actNumber) {
      this.addElementToItems(this.items,actNumber,setting, setting,'setting', 'Setting: ','Ort: ');
      this.disableAddButton(this.items,'setting','addSettingButton');
      this.checkStatusOfLists();
    },

    addElementToItems(item, act, elementType, element, typeString, titleStringEn, titleStringDe) {
      if(item.length === 0){
        item.push({
          id: 0,
          value: element,
          textDe: titleStringDe + i18next.t(elementType,{lng: 'de'}),
          textEn: titleStringEn + i18next.t(elementType,{lng: 'en'}),
          list: act,
          type: typeString
        });
      } else {
        item.push({
          id: item[item.length - 1].id + 1,
          value: element,
          textDe: titleStringDe + i18next.t(elementType,{lng: 'de'}),
          textEn: titleStringEn + i18next.t(elementType,{lng: 'en'}),
          list: act,
          type: typeString
        });
      }
    },

    disableAddButton(item,type,buttonId)  {
      if(buttonId === 'addCharacterMomentButton'){
        this.disableAddCharacterMomentButton = item.filter((i) => i.type === type).length === 3;
      } else if(buttonId === 'addTimePeriodButton'){
        this.disableAddTimePeriodButton = item.filter((i) => i.type === type).length === 3;
      } else if(buttonId === 'addSettingButton'){
        this.disableAddSettingButton = item.filter((i) => i.type === type).length === 3;
      }
    },

    checkStatusOfLists() {
      let listOne = this.getList(1);
      let listTwo = this.getList(2);
      let listThree = this.getList(3);

      this.disableContinueButton =
          (!((listTwo.filter((i) => i.type === 'setting').length === 1
                  && listOne.filter((i) => i.type === 'setting').length === 1
                  && listThree.filter((i) => i.type === 'setting').length === 1) &&
              (listTwo.filter((i) => i.type === 'timePeriod').length === 1
                  && listOne.filter((i) => i.type === 'timePeriod').length === 1
                  && listThree.filter((i) => i.type === 'timePeriod').length === 1) &&
              (listTwo.filter((i) => i.type === 'characterMoment').length === 1
                  && listOne.filter((i) => i.type === 'characterMoment').length === 1
                  && listThree.filter((i) => i.type === 'characterMoment').length === 1)));

      this.hideInfoMessage = !this.disableContinueButton;
    },

    checkMoment(chOne, chMoment, chTwo){
      let realMessage = chOne + ' ';
      if(chTwo === ''){
        realMessage += chMoment;
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
      this.$store.getters.getCurrentScreenplay.setAct1(this.getList(1));
      this.$store.getters.getCurrentScreenplay.setAct2(this.getList(2));
      this.$store.getters.getCurrentScreenplay.setAct3(this.getList(3));
      this.$router.push({name: 'hireWriter'});
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

    goBack(){
      this.$router.push({name: 'newScreenplay'})
    }
  }
}
</script>

<style scoped>
#screenplayPlotMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 40px;
}

.screenplayPlotBackground {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  width: 100%;
}

#screenplayPlotHint {
  width: fit-content;
}

#dropZones {
  display: flex;
  flex-direction: row;
  gap: 3em;
  width: 100%;
}

.drop-zone {
  width: 100%;
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 25px;
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);
  padding: 0 10px 10px 10px;
  min-height: 10px;
}

.screenplayPlotHeader {
  margin-top: 10px !important;
  text-align: center;
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

.drag-el {
  background-color: var(--fsm-dark-blue-1);
  border-radius: var(--fsm-s-border-radius);
  padding: 5px;
  margin-bottom: 10px;
}

.drag-e:nth-last-of-type(1){
  margin-bottom: 0;
}

#delete-zone {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  width: 30%;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 15px;
}

#screenplayPlotButtonDiv {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;
}

#screenplayPlotButtonInnerDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  width: 50%;
}

#screenplayPlotWarningMsg {
  text-align: center;
  margin-top: 0 !important;
}

#screenplayPlotBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#screenplayPlotContinueButton {
  position: absolute;
  float: right;
  right: 100px;
  bottom: 20px;
  width: 15%;
}

.screenplayPlotDeleteButton {
  margin: 0 auto;
}
</style>