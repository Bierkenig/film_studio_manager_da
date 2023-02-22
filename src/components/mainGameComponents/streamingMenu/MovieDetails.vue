<template>
  <div v-if="movie !== null">
    <background-tile class="movieDetailsContentTile" :title="$t('movieDetailsElement.general.heading')">
      <div class="movieDetailsGeneral">
        <div class="movieDetailsGeneralTopInfo">
          <div class="movieDetailsGeneralTopInfoLeft">
            <div class="movieDetailsMovieTitle">{{ movie._preProduction.screenplay.title }}</div>
            <div class="movieDetailsDescription">{{ movie._preProduction.screenplay.description }}</div>
          </div>
          <div class="movieDetailsGeneralTopInfoRight">
            <div class="movieDetailsInfoCircles">
              <div v-if="movie._status === 'Finished' || movie._status === 'Released'" class="movieDetailsInfoCirclesTop">
                <info-circle class="movieDetailsInfoCircle" :text="Math.round(movie.quality).toString()" :data-title="$t('quality')" size="60px" large-font/>
                <info-circle class="movieDetailsInfoCircle" :text="Math.round(movie._release.popularityFormula).toString()" :data-title="$t('popularity')" size="60px" large-font/>
              </div>
              <div v-else class="movieDetailsInfoCirclesTop">
                <info-circle class="movieDetailsInfoCircle" text="Q" size="60px" large-font/>
                <info-circle class="movieDetailsInfoCircle" text="P" size="60px" large-font/>
              </div>
              <div class="movieDetailsInfoCirclesBottom">
                <info-circle class="movieDetailsInfoCircle"
                             :text="movie._preProduction.screenplay.ageRating.substring(movie._preProduction.screenplay.ageRating.indexOf('/') + 1)"
                             size="60px" large-font/>
                <info-circle class="movieDetailsInfoCircle"
                             :icon="movie._preProduction.screenplay.genre.genreName.toLowerCase()"
                             size="60px"/>
              </div>
            </div>
            <div class="movieDetailsPoster"/>
          </div>
        </div>
        <div class="movieDetailsGeneralBottomInfo">
          <div v-if="movie._status === 'Finished' || movie._status === 'Released'" class="movieDetailsGeneralBottomInfoLeft">
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.children') }}</div>
              <input type="range" min="1" max="100" step="1" :value="movie._release.childrenMoviePopularity" disabled>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.teenagers') }}</div>
              <input type="range" min="1" max="100" step="1" :value="movie._release.teenagersMoviePopularity" disabled>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.adults') }}</div>
              <input type="range" min="1" max="100" step="1" :value="movie._release.adultsMoviePopularity" disabled>
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
            <div v-if="listType !== 'Sale' && (movie._status === 'Finished' || movie._status === 'Released')" class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.release') }}</div>
              <div>{{ movie._preProduction.releaseDate.getFullYear() }}</div>
            </div>
            <div v-if="listType !== 'Sale' && (movie._status !== 'Finished' && movie._status !== 'Released')" class="movieDetailsGeneralInfoLine">
              <div>Status</div>
              <div>{{ movie._status }}</div>
            </div>
            <div v-if="listType === 'Sale'" class="movieDetailsGeneralInfoLine">
              <div>{{ $t('price') }}</div>
              <div>$ {{ roundBudget(movie._totalCosts) }}</div>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.writer') }}</div>
              <div>{{ movie._preProduction.screenplay.writer.getFullName() }}</div>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.director') }}</div>
              <div>{{ movie._preProduction.hiredDirector.getFullName() }}</div>
            </div>
          </div>
        </div>
        <div class="movieDetailsGeneralInfoLine">
          <div>{{ $t('movieDetailsElement.general.topics') }}</div>
          <div>
              <span v-for="(it, index) in movieTopics" :key="index">
                {{ it.topicName }}<span v-if="index !== movieTopics.length - 1">, </span>
              </span>
          </div>
        </div>
      </div>
      <div class="movieDetailsFinancesHeading">{{ $t('movieDetailsElement.finances.heading') }}</div>
      <div class="movieDetailsFinances">
        <div class="movieDetailsFinancesLeft">
          <div class="noMargin movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.productionBudget') }}</div>
            <div>$ {{ currencyFormatDE(movie._preProduction.budget.production) }}</div>
          </div>
          <div v-if="movie._postProduction === null" class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
            <div>0</div>
          </div>
          <div v-if="movie._postProduction !== null" class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
            <div>$ {{ currencyFormatDE(movie._postProduction.marketingPrint + movie._postProduction.marketingInternet + movie._postProduction.marketingCommercial) }}</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.totalCost') }}</div>
            <div>$ {{ currencyFormatDE(movie._totalOutgoings) }}</div>
          </div>
        </div>
        <div v-if="movie._status === 'Finished' || movie._status === 'Released'" class="movieDetailsFinancesRight">
          <div class="noMargin movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.openingWeek') }}</div>
            <div>$ {{ currencyFormatDE(movie._release.openingWeekGross) }}</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.cinemaGross') }}</div>
            <div>$ {{ currencyFormatDE(movie._release.cinemaGross) }}</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.dvdGross') }}</div>
            <div>$ {{ currencyFormatDE(movie._release.dvdGross) }}</div>
          </div>
        </div>
        <div v-if="movie._status !== 'Finished' && movie._status !== 'Released'" class="movieDetailsFinancesRight">
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
      <div class="movieDetailsBuySection">
        <select
            class="movieDetailsContractSelect"
            v-model="selectedContract"
        >
          <option :value="null" disabled selected hidden>{{ $t('contract') }}</option>
          <option :value="1">1 {{ $t('newsData.year') }}</option>
          <option :value="3">3 {{ $t('years') }}</option>
          <option :value="5">5 {{ $t('years') }}</option>
        </select>
        <custom-button
            class="movieDetailsButton"
            id="movieDetailsBuyButton"
            :dark="false"
            size="small"
            :disabled="checkBalance || !selectedContract || !movie"
            @clicked="showBuyMovieRightsModal = true">{{ $t('buyRights') }}</custom-button>
      </div>
    </background-tile>
  </div>
  <div v-else id="movieDetailsEmptyBackground" class="movieDetailsBackground">

  </div>

  <transition name="modal">
    <buy-modal
        v-if="showBuyMovieRightsModal"
        headline="buyRights"
        @buyRights="buyRights"
        @close="showBuyMovieRightsModal = false">
      <template v-slot:header>
        <h3>custom header</h3>
      </template>
    </buy-modal>
  </transition>
</template>

<script>
import {Movie} from "@/classes/Movie";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import BuyModal from "@/components/mainGameComponents/moviesMenu/listOfSources/BuyModal.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import store from "@/services/store";
import Earnings from "@/classes/Earnings";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MovieDetails",
  components: {CustomButton, BuyModal, BackgroundTile, InfoCircle},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  props: {
    movie: Movie,
  },

  data(){
    return {
      selectedContract: null,
      price: 0,
      movieTopics: [],
      moviePosterSVG: 'none',
      checkBalance: true,
      showBuyMovieRightsModal: false
    }
  },

  watch: {
    movie: function (){
      if(this.movie !== null){
        //TODO: Poster für Movie setzen: this.moviePosterSVG = this.
        this.movieTopics = [];
        let allTopics = this.movie._preProduction.screenplay.topics;

        Object.values(allTopics).forEach((i) => {
          if(i !== null) {
            this.movieTopics.push(i);
          }
        })
      }

      if(this.selectedContract !== null){
        this.setMoviePrice();
        this.checkBalance = (this.$store.getters.getBalance - parseInt(this.price)) < 0;
      }
    },

    selectedContract: function (){
      if(this.movie !== null){
        this.setMoviePrice();
        this.checkBalance = (this.$store.getters.getBalance - parseInt(this.price)) < 0;
      }
    }
  },

  methods: {
    setMoviePrice(){
      //TODO: Quality ersetzen mit Audience Rating
      let percentage = 0;
      if(this.movie.quality < 50){
        percentage = (Math.floor(Math.random() * (75 - 25 + 1) + 25)) / 100;
      } else if(this.movie.quality >= 50 && this.movie.quality < 75){
        percentage = (Math.floor(Math.random() * (100 - 50 + 1) + 50)) / 100;
      } else {
        percentage = (Math.floor(Math.random() * (125 - 75 + 1) + 75)) / 100;
      }

      if(this.selectedContract === 3){
        percentage = percentage * 1.5;
      } else if(this.selectedContract === 5){
        percentage = percentage * 2;
      }

      this.price = this.movie._totalOutgoings * percentage;
    },

    buyRights(){
      let sendMovie = this.movie;
      sendMovie.contract = this.selectedContract;
      sendMovie._boughtRightDate = this.$store.getters.getCurrentDate;
      sendMovie._totalCosts = this.price;
      sendMovie._preProduction.hype = 100;
      sendMovie._owner.budget += this.price;
      this.$store.commit('addBoughtMovieRights',sendMovie);
      store.commit('addEarnings',new Earnings(this.price, store.getters.getCurrentDate))
      this.$store.commit('subtractBalance', this.price)
      this.$router.push({name: 'streaming'})
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
.movieDetailsBackground {
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

#movieDetailsEmptyBackground {
  height: 540px;
}

.movieDetailsContentTile {
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

.movieDetailsMovieTitle {
  font-size: 28px;
  font-weight: var(--fsm-fw-bold);
  margin-bottom: 15px;
}

.movieDetailsDescription {
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

.movieDetailsPoster {
  height: 160px;
  border-radius: var(--fsm-s-border-radius);
  flex-basis: 120px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('moviePosterSVG');
  background-size: 120px;
  background-position: center;
  background-repeat: no-repeat;
}

.movieDetailsGeneralInfoLine, .movieDetailsFinancesInfoLine {
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

.noMargin {
  margin: 0;
}

.movieDetailsButton {
  flex: 1;
}

.movieDetailsBuySection {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
}

.movieDetailsContractSelect {
  font-size: 15px;
  padding: 0.25em;
  width: 30%;
  border-radius: 10px;
  position: relative;
  background-color: var(--fsm-dark-blue-1);
  display: inline-block;
  visibility: visible;
  border-style: none;
  outline: none;
}
</style>