<template>
<div class="movieDetails">
  <div class="movieDetailsHeader">
    <icon-button icon="simple-arrow-left" dark @click="$router.go(-1)"/>
  </div>
  <div class="movieDetailsContent">
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
            <div v-if="movie._status === 'Finished' || movie._status === 'Released'" class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.release') }}</div>
              <div>{{ movie._preProduction.releaseDate.getFullYear() }}</div>
            </div>
            <div v-if="movie._status !== 'Finished' && movie._status !== 'Released'" class="movieDetailsGeneralInfoLine">
              <div>Status</div>
              <div>{{ movie._status }}</div>
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
            <div>$ {{ roundBudget(movie._preProduction.getTotalBudget()) }}</div>
          </div>
          <div v-if="movie._postProduction === null" class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
            <div>0</div>
          </div>
          <div v-if="movie._postProduction !== null" class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
            <div>$ {{ roundBudget(movie._postProduction.marketingPrint + movie._postProduction.marketingInternet + movie._postProduction.marketingCommercial) }}</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.totalCost') }}</div>
            <div>$ {{ roundBudget(movie._totalOutgoings) }}</div>
          </div>
        </div>
        <div v-if="movie._status === 'Finished' || movie._status === 'Released'" class="movieDetailsFinancesRight">
          <div class="noMargin movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.openingWeek') }}</div>
            <div>$ {{ roundBudget(movie._release.openingWeekGross) }}</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.cinemaGross') }}</div>
            <div>$ {{ roundBudget(movie._release.cinemaGross) }}</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.dvdGross') }}</div>
            <div>$ {{ roundBudget(movie._release.dvdGross) }}</div>
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
    </background-tile>
  </div>
</div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import {Movie} from "@/classes/Movie";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MovieDetails",
  components: {InfoCircle, BackgroundTile, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      movie: this.$store.getters.getCurrentMovieDetails,
      movieTopics: [],
      ownStudio: this.$store.getters.getStudio,
      moviePosterSVG: 'none',
      partOfFranchise: false,
    }
  },

  mounted() {
    if(this.movie._preProduction.screenplay.franchise !== null){
      this.partOfFranchise = true;
    }

    let allTopics = this.movie._preProduction.screenplay.topics;

    Object.values(allTopics).forEach((i) => {
      if(i !== null) {
        this.movieTopics.push(i);
      }
    })
  },

  methods: {
    createFranchise(){
      this.$router.push({name: 'createFranchise'})
    },

    createNewMovie(){
      this.$store.state.currentMovie = new Movie(this.$store.state.studio, null)
      this.$store.getters.getCurrentMovie._foundationDate = this.$store.getters.getCurrentDate;
      this.$router.push({name: 'screenplaySection'});
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
.movieDetails {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.movieDetailsHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.movieDetailsContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.movieDetailsContentTile {
  text-align: left;
  width: 720px;
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