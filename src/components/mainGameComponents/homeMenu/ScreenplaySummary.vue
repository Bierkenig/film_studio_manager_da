<template>
  <div id="screenplaySummaryMainDiv">
    <div>
      <icon-button
          id="screenplaySummaryBackButton"
          icon="simple-arrow-left"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"/>
    </div>
    <div id="screenplaySummaryBackground">
      <div>
        <h2 class="screenplaySummaryHeading">Information</h2>
        <div id="screenplaySummaryInformationContainer">
          <div class="screenplaySummaryInfoFlex">
            <div class="screenplaySummaryInfoFlexLeft">
              <div id="screenplaySummaryTitle">{{ screenplayTitle }}</div>
              <div id="screenplaySummaryDesc">{{ screenplayDesc }}</div>
              <div class="screenplaySummaryText" id="screenplaySummaryWriter">
                <div>
                  {{ $t('writer') }}
                </div>
                <div>
                  {{ screenplayWriter }}
                </div>
              </div>
            </div>
            <div class="screenplaySummaryInfoFlexRight">
              <div id="screenplaySummaryInfoCircleContainer">
                <info-circle class="screenplaySummaryInfoCircle" :icon="screenplayGenre.toLowerCase()" data-title="Genre" size="50px"/>
                <info-circle class="screenplaySummaryInfoCircle" :text="RegExp('\\+\\d+$').exec(screenplayAgeRating)[0]" data-title="Age Rating" size="50px"/>
              </div>
              <div id="screenplaySummaryInfoIcon">

              </div>
            </div>
          </div>
          <div id="screenplaySummaryMoreInfoContainer">
            <div class="screenplaySummaryInfoFlex">
              <div class="screenplaySummaryText">
                <div>
                  {{ $t('quality') }}
                </div>
                <input class="writerDetailsRangeSlider"
                       type="range"
                       :min="0"
                       :max="100"
                       :step="1"
                       v-model="screenplayRating" disabled>
              </div>
              <div class="screenplaySummaryText">
                <div>
                  {{ $t('price') }}
                </div>
                <div>
                  {{ roundSalary(screenplayPrice) }}
                </div>
              </div>
            </div>
            <div class="screenplaySummaryInfoFlex">
              <div class="screenplaySummaryText">
                <div>
                  Type
                </div>
                <div>
                  {{ screenplayType }}
                </div>
              </div>
              <div class="screenplaySummaryText">
                <div>
                  {{ $t('topics') }}
                </div>
                <div>
                  <span v-for="(it, index) in screenplayTopics" :key="index" class="screenplaySummaryTopicValues">
                    {{ it }}<span v-if="(screenplayTopics['firstTopic'] !== undefined && screenplayTopics['secondTopic'] !== undefined) ||
                                        (screenplayTopics['secondTopic'] !== undefined && screenplayTopics['thirdTopic'] !== undefined) ||
                                        (screenplayTopics['firstTopic'] !== undefined && screenplayTopics['thirdTopic'] !== undefined)">, </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="screenplaySummaryHeading">{{ $t('characters') }}</h2>
        <div id="screenplaySummaryInformationContainer">
          <div id="screenplaySummaryCharacterContainer" class="verticalScroll">
            <div class="screenplaySummaryCharacter" v-for="(it, index) in screenplayRoles['main']" :key="index">
              <div class="screenplaySummaryCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplaySummaryCharacterElementCenter">
                {{ $t('character') }} {{ index + 1 }}
              </div>
              <div class="screenplaySummaryCharacterElementRight">
                {{ $t('main') }} {{ $t('role') }}
              </div>
            </div>
            <div class="screenplaySummaryCharacter" v-for="(it, index) in screenplayRoles['support']" :key="index">
              <div class="screenplaySummaryCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplaySummaryCharacterElementCenter">
                {{ $t('character') }} {{ index + 1 }}
              </div>
              <div class="screenplaySummaryCharacterElementRight">
                {{ $t('support') }} {{ $t('role') }}
              </div>
            </div>
            <div class="screenplaySummaryCharacter" v-for="(it, index) in screenplayRoles['minor']" :key="index">
              <div class="screenplaySummaryCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplaySummaryCharacterElementCenter">
                {{ $t('character') }} {{ index + 1 }}
              </div>
              <div class="screenplaySummaryCharacterElementRight">
                Minor {{ $t('role') }}
              </div>
            </div>
            <div class="screenplaySummaryCharacter" v-for="(it, index) in screenplayRoles['cameo']" :key="index">
              <div class="screenplaySummaryCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplaySummaryCharacterElementCenter">
                {{ $t('character') }} {{ index + 1 }}
              </div>
              <div class="screenplaySummaryCharacterElementRight">
                Cameo {{ $t('role') }}
              </div>
            </div>
            <div class="screenplaySummaryCharacter" v-for="(it, index) in screenplayRoles['voiceOver']" :key="index">
              <div class="screenplaySummaryCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplaySummaryCharacterElementCenter">
                {{ $t('character') }} {{ index + 1 }}
              </div>
              <div class="screenplaySummaryCharacterElementRight">
                {{ $t('voiceOver') }} {{ $t('role') }}
              </div>
            </div>
          </div>
        </div>
        <custom-button
            id="screenplaySummaryRewriteButton"
            :dark="false"
            size="small"
            :disabled="this.$store.getters.getCurrentScreenplay.rewritingValue === 0"
            @clicked="rewrite">{{ $t('rewrite') }}</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "ScreenplaySummary",
  components: {CustomButton, InfoCircle, IconButton},

  data(){
    return {
      screenplayTitle: this.$store.getters.getCurrentScreenplay.title,
      screenplayDesc: this.$store.getters.getCurrentScreenplay.description,
      screenplayGenre: this.$store.getters.getCurrentScreenplay.genre,
      screenplayAgeRating: this.$store.getters.getCurrentScreenplay.ageRating,
      screenplayType: this.$store.getters.getCurrentScreenplay.type,
      screenplayPrice: this.$store.getters.getCurrentScreenplay.price,
      screenplayRating: this.$store.getters.getCurrentScreenplay.rating,
      screenplayTopics: this.$store.getters.getCurrentScreenplay.topics,
      screenplayRoles: this.$store.getters.getCurrentScreenplay.roles,
      screenplayWriter: this.$store.getters.getCurrentScreenplay.writer._first_name + ' ' + this.$store.getters.getCurrentScreenplay.writer._last_name,
    }
  },

  methods: {
    rewrite(){
      this.$store.getters.getCurrentScreenplay.setRewritingStatus(true);
      this.$router.push({name: 'newScreenplay'});
    },

    goBack(){
      this.$router.push({name: 'home'})
    },

    roundSalary(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
    },
  }
}
</script>

<style scoped>
#screenplaySummaryMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#screenplaySummaryBackground {
  display: flex;
  flex-direction: column;

  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  width: 550px;
  padding: 10px 20px 10px 20px;
}

#screenplaySummaryBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

.screenplaySummaryHeading {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
  font-size: 24px;
}

#screenplaySummaryInformationContainer {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-l-border-radius);
  padding: 10px 20px 10px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.screenplaySummaryInfoFlex {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
}

.screenplaySummaryInfoFlexLeft {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.screenplaySummaryInfoFlexRight {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

#screenplaySummaryTitle {
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-white);
  font-size: 28px;
}

#screenplaySummaryDesc {
  margin-top: 20px;
  color: #848891;
  font-size: 14px;
}

.screenplaySummaryText {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
  margin-top: 10px;
}

#screenplaySummaryInfoCircleContainer {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 60%;
  gap: 10px;
}

.screenplaySummaryInfoCircle {
  margin-right: 15px;
  margin-left: auto;
  order: 2;
}

#screenplaySummaryInfoIcon {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  height: 100%;
  width: 40%;
}

#screenplaySummaryMoreInfoContainer {
  margin-top: 20px;
}

#screenplaySummaryWriter {
  width: 94%;
}

.screenplaySummaryTopicValues {
  font-size: 14px;
}

#screenplaySummaryCharacterContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 130px;
  width: 100%;
}

.screenplaySummaryCharacter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  width: 95%;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

#screenplaySummaryRewriteButton:disabled,
#screenplaySummaryRewriteButton[disabled] {
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}

.screenplaySummaryCharacterElementLeft {
  width: 33%;
  float: left;
}

.screenplaySummaryCharacterElementCenter {
  width: 33%;
  text-align: center;
}

.screenplaySummaryCharacterElementRight {
  width: 33%;
  float: right;
}
</style>