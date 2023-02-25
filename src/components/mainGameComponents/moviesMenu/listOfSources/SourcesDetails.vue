<template>
  <div>
    <div v-if="sourceType === 'Screenplay' && source !== null" class="screenplayDetailsContent">
      <background-tile class="screenplayDetailsContentTile" title="Information">
        <div class="screenplayDetailsInformationContainer">
          <div class="screenplayDetailsInfoFlex">
            <div class="screenplayDetailsInfoFlexLeft">
              <div class="screenplayDetailsScreenplayTitle">{{ source.title }}</div>
              <div class="screenplayDetailsDescription">{{ source.description }}</div>
            </div>
            <div class="screenplayDetailsInfoFlexRight">
              <div id="screenplayDetailsInfoCircleContainer">
                <info-circle class="screenplayDetailsInfoCircle" :icon="this.source.genre.genreName.toLowerCase()" data-title="Genre" size="60px"/>
                <info-circle class="screenplayDetailsInfoCircle" :text="RegExp('\\+\\d+$').exec(source.ageRating)[0]" data-title="Age Rating" size="60px" large-font/>
              </div>
              <div class="screenplayDetailsPoster"/>
            </div>
          </div>
          <div id="screenplayDetailsMoreInfoContainer">
            <div class="screenplayDetailsInfoFlex">
              <div class="screenplayDetailsGeneralInfoLine">
                <div>
                  {{ $t('writer') }}
                </div>
                <div>
                  {{ source.writer._first_name + ' ' + source.writer._last_name}}
                </div>
              </div>
              <div class="screenplayDetailsGeneralInfoLine" style="background-color: inherit">

              </div>
            </div>
            <div class="screenplayDetailsInfoFlex">
              <div class="screenplayDetailsGeneralInfoLine">
                <div>
                  {{ $t('quality') }}
                </div>
                <input type="range"
                       :min="0"
                       :max="100"
                       :step="1"
                       v-model="sourceRating" disabled>
              </div>
              <div class="screenplayDetailsGeneralInfoLine">
                <div>
                  {{ $t('price') }}
                </div>
                <div>
                  $ {{ roundBudget(source.price) }}
                </div>
              </div>
            </div>
            <div class="screenplayDetailsInfoFlex">
              <div class="screenplayDetailsGeneralInfoLine">
                <div>
                  Type
                </div>
                <div>
                  {{ source.type }}
                </div>
              </div>
              <div class="screenplayDetailsGeneralInfoLine">
                <div>
                  {{ $t('topics') }}
                </div>
                <div>
                  <span v-for="(it, index) in sourceTopics" :key="index" class="screenplayDetailsTopicValues">
                    {{ it.topicName }}<span v-if="index !== sourceTopics.length - 1">, </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 class="screenplayDetailsHeading">{{ $t('characters') }}</h2>
          <div class="screenplayDetailsInformationContainer">
            <div id="screenplayDetailsCharacterContainer" class="verticalScroll">
              <div class="screenplayDetailsCharacter" v-for="(it, index) in source.roles['main']" :key="index">
                <div class="screenplayDetailsCharacterElementLeft">
                  {{ it.name }}
                </div>
                <div class="screenplayDetailsCharacterElementCenter">
                  {{ $t('character') }} {{ characterIndex[index] }}
                </div>
                <div class="screenplayDetailsCharacterElementRight">
                  {{ $t('main') }} {{ $t('role') }}
                </div>
              </div>
              <div class="screenplayDetailsCharacter" v-for="(it, index) in source.roles['support']" :key="index">
                <div class="screenplayDetailsCharacterElementLeft">
                  {{ it.name }}
                </div>
                <div class="screenplayDetailsCharacterElementCenter">
                  {{ $t('character') }} {{ characterIndex[source.roles['main'].length + index] }}
                </div>
                <div class="screenplayDetailsCharacterElementRight">
                  {{ $t('support') }} {{ $t('role') }}
                </div>
              </div>
              <div class="screenplayDetailsCharacter" v-for="(it, index) in source.roles['minor']" :key="index">
                <div class="screenplayDetailsCharacterElementLeft">
                  {{ it.name }}
                </div>
                <div class="screenplayDetailsCharacterElementCenter">
                  {{ $t('character') }} {{ characterIndex[source.roles['main'].length + source.roles['support'].length + index] }}
                </div>
                <div class="screenplayDetailsCharacterElementRight">
                  Minor {{ $t('role') }}
                </div>
              </div>
              <div class="screenplayDetailsCharacter" v-for="(it, index) in source.roles['cameo']" :key="index">
                <div class="screenplayDetailsCharacterElementLeft">
                  {{ it.name }}
                </div>
                <div class="screenplayDetailsCharacterElementCenter">
                  {{ $t('character') }} {{ characterIndex[source.roles['main'].length + source.roles['support'].length + source.roles['minor'].length + index] }}
                </div>
                <div class="screenplayDetailsCharacterElementRight">
                  Cameo {{ $t('role') }}
                </div>
              </div>
            </div>
          </div>
          <custom-button
              v-if="listType === 'Sale'"
              id="screenplayDetailsBuyButton"
              :dark="false"
              size="small"
              :disabled="checkBalance"
              @click="showBuyScreenplayModal = true">{{ $t('buyScreenplaySection.buy') }}</custom-button>
        </div>
      </background-tile>
    </div>
    <div v-else-if="sourceType === 'Movie' && source !== null" class="movieDetailsContent">
      <background-tile class="movieDetailsContentTile" :title="$t('movieDetailsElement.general.heading')">
        <div class="movieDetailsGeneral">
          <div class="movieDetailsGeneralTopInfo">
            <div class="movieDetailsGeneralTopInfoLeft">
              <div class="movieDetailsMovieTitle">{{ source._preProduction.screenplay.title }}</div>
              <div class="movieDetailsDescription">{{ source._preProduction.screenplay.description }}</div>
            </div>
            <div class="movieDetailsGeneralTopInfoRight">
              <div class="movieDetailsInfoCircles">
                <div v-if="source._status === 'Finished' || source._status === 'Released'" class="movieDetailsInfoCirclesTop">
                  <info-circle class="movieDetailsInfoCircle" :text="Math.round(source.quality).toString()" :data-title="$t('quality')" size="60px" large-font/>
                  <info-circle class="movieDetailsInfoCircle" :text="Math.round(source._release.popularityFormula).toString()" :data-title="$t('popularity')" size="60px" large-font/>
                </div>
                <div v-else class="movieDetailsInfoCirclesTop">
                  <info-circle class="movieDetailsInfoCircle" text="Q" size="60px" large-font/>
                  <info-circle class="movieDetailsInfoCircle" text="P" size="60px" large-font/>
                </div>
                <div class="movieDetailsInfoCirclesBottom">
                  <info-circle class="movieDetailsInfoCircle"
                               :text="source._preProduction.screenplay.ageRating.substring(source._preProduction.screenplay.ageRating.indexOf('/') + 1)"
                               size="60px" large-font/>
                  <info-circle class="movieDetailsInfoCircle"
                               :icon="source._preProduction.screenplay.genre.genreName.toLowerCase()"
                               size="60px"/>
                </div>
              </div>
              <div class="movieDetailsPoster"/>
            </div>
          </div>
          <div class="movieDetailsGeneralBottomInfo">
            <div v-if="source._status === 'Finished' || source._status === 'Released'" class="movieDetailsGeneralBottomInfoLeft">
              <div class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.children') }}</div>
                <input type="range" min="1" max="100" step="1" :value="source._release.childrenMoviePopularity" disabled>
              </div>
              <div class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.teenagers') }}</div>
                <input type="range" min="1" max="100" step="1" :value="source._release.teenagersMoviePopularity" disabled>
              </div>
              <div class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.adults') }}</div>
                <input type="range" min="1" max="100" step="1" :value="source._release.adultsMoviePopularity" disabled>
              </div>
            </div>
            <div v-else class="movieDetailsGeneralBottomInfoLeft">
              <div class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.children') }}</div>
                <input type="range" min="1" max="100" step="1" :value="0" disabled>
              </div>
              <div class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.teenagers') }}</div>
                <input type="range" min="1" max="100" step="1" :value="0" disabled>
              </div>
              <div class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.adults') }}</div>
                <input type="range" min="1" max="100" step="1" :value="0" disabled>
              </div>
            </div>
            <div class="movieDetailsGeneralBottomInfoRight">
              <div v-if="listType !== 'Sale' && (source._status === 'Finished' || source._status === 'Released')" class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.release') }}</div>
                <div>{{ source._preProduction.releaseDate.getFullYear() }}</div>
              </div>
              <div v-if="listType !== 'Sale' && (source._status !== 'Finished' && source._status !== 'Released')" class="movieDetailsGeneralInfoLine">
                <div>Status</div>
                <div>{{ source._status }}</div>
              </div>
              <div v-if="listType === 'Sale' && source._contract === null" class="movieDetailsGeneralInfoLine">
                <div>{{ $t('price') }}</div>
                <div>$ {{ roundBudget(source._totalCosts) }}</div>
              </div>
              <div v-else class="movieDetailsGeneralInfoLine">
                <div>{{ $t('contract') }}</div>
                <div>{{ source._contract }} {{ $t('year') }}</div>
              </div>
              <div class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.writer') }}</div>
                <div>{{ source._preProduction.screenplay.writer.getFullName() }}</div>
              </div>
              <div class="movieDetailsGeneralInfoLine">
                <div>{{ $t('movieDetailsElement.general.director') }}</div>
                <div>{{ source._preProduction.hiredDirector.getFullName() }}</div>
              </div>
            </div>
          </div>
          <div class="movieDetailsGeneralInfoLine">
            <div>{{ $t('movieDetailsElement.general.topics') }}</div>
            <div>
              <span v-for="(it, index) in sourceTopics" :key="index">
                {{ it.topicName }}<span v-if="index !== sourceTopics.length - 1">, </span>
              </span>
            </div>
          </div>
        </div>
        <div class="movieDetailsFinancesHeading">{{ $t('movieDetailsElement.finances.heading') }}</div>
        <div class="movieDetailsFinances">
          <div class="movieDetailsFinancesLeft">
            <div class="noMargin movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.productionBudget') }}</div>
              <div>$ {{ roundBudget(source._preProduction.getTotalBudget()) }}</div>
            </div>
            <div v-if="source._postProduction === null" class="movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
              <div>0</div>
            </div>
            <div v-if="source._postProduction !== null" class="movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
              <div>$ {{ roundBudget(source._postProduction.marketingPrint + source._postProduction.marketingInternet + source._postProduction.marketingCommercial) }}</div>
            </div>
            <div class="movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.totalCost') }}</div>
              <div>$ {{ roundBudget(source._totalOutgoings) }}</div>
            </div>
          </div>
          <div v-if="source._status === 'Finished' || source._status === 'Released'" class="movieDetailsFinancesRight">
            <div class="noMargin movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.openingWeek') }}</div>
              <div>$ {{ roundBudget(source._release.openingWeekGross) }}</div>
            </div>
            <div class="movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.cinemaGross') }}</div>
              <div>$ {{ roundBudget(source._release.cinemaGross) }}</div>
            </div>
            <div class="movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.dvdGross') }}</div>
              <div>$ {{ roundBudget(source._release.dvdGross) }}</div>
            </div>
          </div>
          <div v-if="source._status !== 'Finished' && source._status !== 'Released'" class="movieDetailsFinancesRight">
            <div class="noMargin movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.openingWeek') }}</div>
              <div>0</div>
            </div>
            <div class="movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.cinemaGross') }}</div>
              <div>0</div>
            </div>
            <div class="movieDetailsFinancesInfoLine">
              <div>{{ $t('movieDetailsElement.finances.dvdGross') }}</div>
              <div>0</div>
            </div>
          </div>
        </div>
        <div class="movieDetailsButtons">
          <custom-button
              v-if="listType === 'Sale' && source._contract === null"
              class="movieDetailsButton"
              id="movieDetailsBuyButton"
              :dark="false"
              size="small"
              :disabled="checkBalance"
              @click="showBuyMovieModal = true">{{ $t('buyScreenplaySection.buy') }}</custom-button>
        </div>
      </background-tile>
    </div>
    <div v-else id="sourceDetailsEmptyBackground" class="sourceDetailsBackground">

    </div>

    <transition name="modal">
      <buy-modal
          v-if="showBuyScreenplayModal"
          headline="buyScreenplay"
          @buyScreenplay="buyScreenplay"
          @close="showBuyScreenplayModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </buy-modal>
    </transition>

    <transition name="modal">
      <buy-modal
          v-if="showBuyMovieModal"
          headline="buyMovie"
          @buyMovie="buyMovie"
          @close="showBuyMovieModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </buy-modal>
    </transition>
  </div>
</template>

<script>
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import BuyModal from "@/components/mainGameComponents/moviesMenu/listOfSources/BuyModal.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import Earnings from "@/classes/Earnings";

export default {
  name: "SourcesDetails",
  components: {BackgroundTile, BuyModal, CustomButton, InfoCircle},

  props: {
    source: Object,
    sourceType: String,
    listType: String,
    checkBalance: Boolean
  },

  data(){
    return {
      sourcePrice: 0,
      sourceRating: 0,
      sourceTopics: [],
      characterIndex: ['A','B','C','D','E','F','G','H','I','J','K','L'],
      showBuyScreenplayModal: false,
      showBuyMovieModal: false,
      sourcePosterSVG: 'none',
    }
  },

  watch: {
    source: function(){
      if (this.source !== null) {
        this.sourceTopics = [];
        if(this.sourceType === 'Screenplay'){
          //TODO: Poster für Screenplay setzen: this.sourcePosterSVG = this.
          this.sourceRating = this.source.rating

          let allTopics = this.source.topics;

          Object.values(allTopics).forEach((i) => {
            if(i !== null) {
              this.sourceTopics.push(i);
            }
          })
        } else if(this.sourceType === 'Movie'){
          //TODO: Poster für Movie setzen: this.sourcePosterSVG = this.
          let allTopics = this.source._preProduction.screenplay.topics;

          Object.values(allTopics).forEach((i) => {
            if(i !== null) {
              this.sourceTopics.push(i);
            }
          })
        }
      }
    },
  },

  methods: {
    buyScreenplay(){
      let allOtherScreenplays = this.$store.getters.getScreenplaysFromWriters.concat(this.$store.getters.getAllScreenplays);
      let chosenScreenplay = null;
      for (let i = 0; i < allOtherScreenplays.length; i++) {
        if(allOtherScreenplays[i].id === this.source.id){
          chosenScreenplay = allOtherScreenplays[i];
        }
      }
      this.$store.commit('removeScreenplayFromWriters',chosenScreenplay)
      this.$store.commit('removeScreenplayFromAllScreenplays',chosenScreenplay);
      this.$store.commit('addBoughtScreenplay',chosenScreenplay)
      this.$store.commit('addEarnings',new Earnings(-chosenScreenplay.price, this.$store.getters.getCurrentDate))
      this.$store.commit('subtractBalance',chosenScreenplay.price)

      this.$router.push({name: 'movies'})
    },

    buyMovie(){
      let allOtherMovies = this.$store.getters.getMoviesFromOtherStudios.concat(this.$store.getters.getAllMovies);
      let chosenMovie = null;
      for (let i = 0; i < allOtherMovies.length; i++) {
        if(allOtherMovies[i]._preProduction.screenplay.id === this.source._preProduction.screenplay.id){
          chosenMovie = allOtherMovies[i];
        }
      }

      this.$store.commit('removeMovieFromOtherStudios',chosenMovie)
      this.$store.commit('removeMovieFromAllMovies',chosenMovie);
      this.$store.commit('addFinishedMovie',chosenMovie)
      chosenMovie._owner.budget += chosenMovie._totalCosts;
      chosenMovie._owner = this.$store.getters.getStudio;
      this.$store.commit('addEarnings',new Earnings(-chosenMovie._totalCosts, this.$store.getters.getCurrentDate))
      this.$store.commit('subtractBalance',chosenMovie._totalCosts)

      this.$router.push({name: 'movies'})
    },

    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    },

    roundBudget(labelValue){
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
.sourceDetailsBackground {
  display: flex;
  flex-direction: column;

  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  width: 550px;
  padding: 10px 20px 10px 20px;
}

#sourceDetailsEmptyBackground {
  height: 540px;
}

.screenplayDetailsHeading {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
  font-size: 24px;
}

.screenplayDetailsInformationContainer {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-l-border-radius);
  padding: 10px 20px 10px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.screenplayDetailsInfoFlex {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
}

.screenplayDetailsInfoFlexLeft {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.screenplayDetailsInfoFlexRight {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

#screenplayDetailsInfoCircleContainer {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 60%;
  gap: 10px;
}

.screenplayDetailsInfoCircle {
  margin-right: 15px;
  margin-left: auto;
  order: 2;
}

#screenplayDetailsMoreInfoContainer {
  margin-top: 20px;
}

.screenplayDetailsTopicValues {
  font-size: 14px;
}

#screenplayDetailsCharacterContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 130px;
  width: 100%;
}

.screenplayDetailsCharacter {
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

.screenplayDetailsCharacterElementLeft {
  width: 15%;
  float: left;
}

.screenplayDetailsCharacterElementCenter {
  width: 30%;
  text-align: center;
}

.screenplayDetailsCharacterElementRight {
  width: 21%;
}


/*Movie Section*/
.movieDetailsContent, .screenplayDetailsContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.movieDetailsContentTile, .screenplayDetailsContentTile {
  text-align: left;
  width: 650px;
}

.movieDetailsGeneral, .movieDetailsFinances {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 20px;
}

.movieDetailsGeneral {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
}

.movieDetailsGeneralTopInfo, .movieDetailsGeneralBottomInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.movieDetailsGeneralTopInfo {
  margin-bottom: 10px;
}

.movieDetailsGeneralTopInfoLeft, .movieDetailsGeneralTopInfoRight, .movieDetailsGeneralBottomInfoLeft, .movieDetailsGeneralBottomInfoRight, .movieDetailsFinancesLeft, .movieDetailsFinancesRight {
  flex-basis: 0;
  flex-grow: 1;
}

.movieDetailsGeneralTopInfoLeft, .movieDetailsGeneralBottomInfoLeft, .movieDetailsFinancesLeft {
  margin-right: 20px;
}

.movieDetailsGeneralTopInfoRight {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.movieDetailsMovieTitle, .screenplayDetailsScreenplayTitle {
  font-size: 28px;
  font-weight: var(--fsm-fw-bold);
  margin-bottom: 15px;
}

.movieDetailsDescription, .screenplayDetailsDescription {
  font-size: 14px;
  font-weight: var(--fsm-fw-semibold);
  color: var(--fsm-grey-font-color);
}

.movieDetailsInfoCircles {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.movieDetailsInfoCirclesTop, .movieDetailsInfoCirclesBottom {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.movieDetailsInfoCircle {
  margin: 10px;
  font-size: 28px;
  font-weight: var(--fsm-fw-bold);
}

.movieDetailsPoster, .screenplayDetailsPoster {
  height: 160px;
  border-radius: var(--fsm-s-border-radius);
  flex-basis: 120px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('sourcePosterSVG');
  background-size: 120px;
  background-position: center;
  background-repeat: no-repeat;
}

.movieDetailsGeneralInfoLine, .movieDetailsFinancesInfoLine, .screenplayDetailsGeneralInfoLine {
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

.movieDetailsFinancesHeading {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.movieDetailsFinances {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.movieDetailsFinancesLeft, .movieDetailsFinancesRight {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.movieDetailsButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

.noMargin {
  margin: 0;
}
</style>
