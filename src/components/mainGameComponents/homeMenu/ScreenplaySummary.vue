<template>
  <div>
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
    <div class="screenplaySummaryContent">
      <background-tile class="screenplaySummaryContentTile" title="Information">
        <div class="screenplaySummaryInformationContainer">
          <div class="screenplaySummaryInfoFlex">
            <div class="screenplaySummaryInfoFlexLeft">
              <div class="screenplaySummaryScreenplayTitle">{{ screenplayTitle }}</div>
              <div class="screenplaySummaryDescription">{{ screenplayDesc }}</div>
            </div>
            <div class="screenplaySummaryInfoFlexRight">
              <div id="screenplaySummaryInfoCircleContainer">
                <info-circle class="screenplaySummaryInfoCircle" :icon="screenplayGenre.genreName.toLowerCase()" data-title="Genre" size="60px"/>
                <info-circle class="screenplaySummaryInfoCircle" :text="RegExp('\\+\\d+$').exec(screenplayAgeRating)[0]" data-title="Age Rating" size="60px" large-font/>
              </div>
              <div class="screenplaySummaryPoster"/>
            </div>
          </div>
          <div id="screenplaySummaryMoreInfoContainer">
            <div class="screenplaySummaryInfoFlex">
              <div class="screenplaySummaryGeneralInfoLine">
                <div>
                  {{ $t('writer') }}
                </div>
                <div>
                  {{ screenplayWriter }}
                </div>
              </div>
              <div class="screenplaySummaryGeneralInfoLine" style="background-color: inherit">

              </div>
            </div>
            <div class="screenplaySummaryInfoFlex">
              <div class="screenplaySummaryGeneralInfoLine">
                <div>
                  {{ $t('quality') }}
                </div>
                <input type="range"
                       :min="0"
                       :max="100"
                       :step="1"
                       v-model="screenplayRating" disabled>
              </div>
              <div class="screenplaySummaryGeneralInfoLine">
                <div>
                  {{ $t('price') }}
                </div>
                <div>
                  $ {{ currencyFormatDE(screenplayPrice) }}
                </div>
              </div>
            </div>
            <div class="screenplaySummaryInfoFlex">
              <div class="screenplaySummaryGeneralInfoLine">
                <div>
                  Type
                </div>
                <div>
                  {{ screenplayType }}
                </div>
              </div>
              <div class="screenplaySummaryGeneralInfoLine">
                <div>
                  {{ $t('topics') }}
                </div>
                <div>
                  <span v-for="(it, index) in screenplayTopics" :key="index" class="screenplaySummaryTopicValues">
                    {{ it.topicName }}<span v-if="index !== screenplayTopics.length - 1">, </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 class="screenplaySummaryHeading">{{ $t('characters') }}</h2>
          <div class="screenplaySummaryInformationContainer">
            <div id="screenplaySummaryCharacterContainer" class="verticalScroll">
              <div class="screenplaySummaryCharacter" v-for="(it, index) in screenplayRoles['main']" :key="index">
                <div class="screenplaySummaryCharacterElementLeft">
                  {{ it.name }}
                </div>
                <div class="screenplaySummaryCharacterElementCenter">
                  {{ $t('character') }} {{ characterIndex[index] }}
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
                  {{ $t('character') }} {{ characterIndex[screenplayRoles['main'].length + index] }}
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
                  {{ $t('character') }} {{ characterIndex[screenplayRoles['main'].length + screenplayRoles['support'].length + index] }}
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
                  {{ $t('character') }} {{ characterIndex[screenplayRoles['main'].length + screenplayRoles['support'].length + screenplayRoles['minor'].length + index] }}
                </div>
                <div class="screenplaySummaryCharacterElementRight">
                  Cameo {{ $t('role') }}
                </div>
              </div>
            </div>
          </div>
          <custom-button
              id="screenplaySummaryRewriteButton"
              v-if="this.$store.getters.getCurrentScreenplay.rewritingValue !== 0 || this.checkIfScreenplayIsInUse !== true"
              :dark="false"
              size="small"
              @clicked="rewrite">{{ $t('rewrite') }}</custom-button>
        </div>
      </background-tile>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "ScreenplaySummary",
  components: {BackgroundTile, CustomButton, InfoCircle, IconButton},

  data(){
    return {
      screenplayTitle: this.$store.getters.getCurrentScreenplay.title,
      screenplayDesc: this.$store.getters.getCurrentScreenplay.description,
      screenplayGenre: this.$store.getters.getCurrentScreenplay.genre,
      screenplayAgeRating: this.$store.getters.getCurrentScreenplay.ageRating,
      screenplayType: this.$store.getters.getCurrentScreenplay.type,
      screenplayPrice: this.$store.getters.getCurrentScreenplay.price,
      screenplayRating: this.$store.getters.getCurrentScreenplay.rating,
      screenplayTopics: [],
      screenplayRoles: this.$store.getters.getCurrentScreenplay.roles,
      screenplayWriter: this.$store.getters.getCurrentScreenplay.writer._first_name + ' ' + this.$store.getters.getCurrentScreenplay.writer._last_name,
      characterIndex: ['A','B','C','D','E','F','G','H','I','J','K','L'],
      screenplayPosterSVG: 'none',

      checkIfScreenplayIsInUse: false,
    }
  },

  mounted() {
    let allTopics = this.$store.getters.getCurrentScreenplay.topics;

    Object.values(allTopics).forEach((i) => {
      if(i !== null) {
        this.screenplayTopics.push(i);
      }
    })

    let allMovies = this.$store.getters.getInProductionMovies.concat(this.$store.getters.getCreatedMovies,this.$store.getters.getFinishedMovies, this.$store.getters.getMoviesFromOtherStudios, this.$store.getters.getBoughtMovies, this.$store.getters.getBoughtMovieRights);
    for (let i = 0; i < allMovies.length; i++) {
      if(allMovies._preProduction.screenplay === this.$store.getters.getCurrentScreenplay){
        this.checkIfScreenplayIsInUse = true;
      }
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

    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    }
  }
}
</script>

<style scoped>
#screenplaySummaryBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}


#screenplaySummaryRewriteButton:disabled,
#screenplaySummaryRewriteButton[disabled] {
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}

.screenplaySummaryHeading {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
  font-size: 24px;
}

.screenplaySummaryInformationContainer {
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

#screenplaySummaryMoreInfoContainer {
  margin-top: 20px;
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
  padding: 7px 10px 7px 10px;
  font-size: 14px;
  height: 20px;
  width: 96%;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

.screenplaySummaryCharacterElementLeft {
  width: 15%;
  float: left;
}

.screenplaySummaryCharacterElementCenter {
  width: 30%;
  text-align: center;
}

.screenplaySummaryCharacterElementRight {
  width: 21%;
}

.screenplaySummaryContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.screenplaySummaryContentTile {
  text-align: left;
  width: 650px;
}

.screenplaySummaryScreenplayTitle {
   font-size: 28px;
   font-weight: var(--fsm-fw-bold);
   margin-bottom: 15px;
}

.screenplaySummaryDescription {
  font-size: 14px;
  font-weight: var(--fsm-fw-semibold);
  color: var(--fsm-grey-font-color);
}

.screenplaySummaryPoster {
  height: 160px;
  border-radius: var(--fsm-s-border-radius);
  flex-basis: 120px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('screenplayPosterSVG');
  background-size: 120px;
  background-position: center;
  background-repeat: no-repeat;
}

.screenplaySummaryGeneralInfoLine {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  padding: 0 10px 0 10px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: var(--fsm-fw-semibold);
}
</style>