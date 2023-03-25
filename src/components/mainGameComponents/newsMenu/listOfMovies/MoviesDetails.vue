<template>
  <div v-if="movie !== null">
    <background-tile class="moviesDetailsContentTile" :title="$t('movieDetailsElement.general.heading')">
      <div class="moviesDetailsGeneral">
        <div class="moviesDetailsGeneralTopInfo">
          <div class="moviesDetailsGeneralTopInfoLeft">
            <div class="moviesDetailsMovieTitle">{{ movie._preProduction.screenplay.title }}</div>
            <div class="moviesDetailsDescription">{{ movie._preProduction.screenplay.description }}</div>
          </div>
          <div class="moviesDetailsGeneralTopInfoRight">
            <div class="moviesDetailsInfoCircles">
              <div v-if="movie._status === 'Finished' || movie._status === 'Released'" class="moviesDetailsInfoCirclesTop">
                <info-circle class="moviesDetailsInfoCircle" :text="Math.round(movie.quality).toString()" size="60px" :data-title="$t('quality')" large-font/>
                <info-circle class="moviesDetailsInfoCircle" :text="Math.round(movie._release.popularityFormula).toString()" size="60px" :data-title="$t('popularity')" large-font/>
              </div>
              <div v-else class="moviesDetailsInfoCirclesTop">
                <info-circle class="moviesDetailsInfoCircle" text="Q" size="60px" large-font/>
                <info-circle class="moviesDetailsInfoCircle" text="P" size="60px" large-font/>
              </div>
              <div class="moviesDetailsInfoCirclesBottom">
                <info-circle class="moviesDetailsInfoCircle"
                             :text="movie._preProduction.screenplay.ageRating.substring(movie._preProduction.screenplay.ageRating.indexOf('/') + 1)"
                             size="60px" large-font/>
                <info-circle class="moviesDetailsInfoCircle"
                             :icon="movie._preProduction.screenplay.genre.genreName.toLowerCase()"
                             size="60px"/>
              </div>
            </div>
            <div class="moviesDetailsPoster">
              <poster-element height="160px" width="120px" :poster-name="movie._preProduction.screenplay.genre.genreName.toLowerCase() + 'MoviePoster'"/>
            </div>
          </div>
        </div>
        <div class="moviesDetailsGeneralBottomInfo">
          <div v-if="movie._status === 'Finished' || movie._status === 'Released'" class="moviesDetailsGeneralBottomInfoLeft">
            <div class="moviesDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.children') }}</div>
              <input type="range" min="1" max="100" step="1" :value="movie._release.childrenMoviePopularity" disabled>
            </div>
            <div class="moviesDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.teenagers') }}</div>
              <input type="range" min="1" max="100" step="1" :value="movie._release.teenagersMoviePopularity" disabled>
            </div>
            <div class="moviesDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.adults') }}</div>
              <input type="range" min="1" max="100" step="1" :value="movie._release.adultsMoviePopularity" disabled>
            </div>
          </div>
          <div v-if="movie._status !== 'Finished' && movie._status !== 'Released'" class="moviesDetailsGeneralBottomInfoLeft">
            <div class="moviesDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.children') }}</div>
              <input type="range" min="1" max="100" step="1" :value="0" disabled>
            </div>
            <div class="moviesDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.teenagers') }}</div>
              <input type="range" min="1" max="100" step="1" :value="0" disabled>
            </div>
            <div class="moviesDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.adults') }}</div>
              <input type="range" min="1" max="100" step="1" :value="0" disabled>
            </div>
          </div>
          <div class="moviesDetailsGeneralBottomInfoRight">
            <div class="moviesDetailsGeneralInfoLine">
              <div>Status</div>
              <div>{{ movie._status }}</div>
            </div>
            <div class="moviesDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.writer') }}</div>
              <div>{{ movie._preProduction.screenplay.writer.getFullName() }}</div>
            </div>
            <div class="moviesDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.director') }}</div>
              <div>{{ movie._preProduction.hiredDirector.getFullName() }}</div>
            </div>
          </div>
        </div>
        <div class="moviesDetailsGeneralInfoLine">
          <div>{{ $t('movieDetailsElement.general.topics') }}</div>
          <div>
              <span v-for="(it, index) in movieTopics" :key="index">
                {{ it.topicName }}<span v-if="index !== movieTopics.length - 1">, </span>
              </span>
          </div>
        </div>
      </div>
      <div class="moviesDetailsFinancesHeading">{{ $t('movieDetailsElement.finances.heading') }}</div>
      <div class="moviesDetailsFinances">
        <div class="moviesDetailsFinancesLeft">
          <div class="noMargin moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.productionBudget') }}</div>
            <div>{{ roundBudget(movie._preProduction.budget.production) }}</div>
          </div>
          <div v-if="movie._postProduction === null" class="moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
            <div>$ 0</div>
          </div>
          <div v-if="movie._postProduction !== null" class="moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
            <div>{{ roundBudget(movie._postProduction.marketingPrint + movie._postProduction.marketingInternet + movie._postProduction.marketingCommercial) }}</div>
          </div>
          <div class="moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.totalCost') }}</div>
            <div>{{ roundBudget(movie._totalCosts) }}</div>
          </div>
        </div>
        <div v-if="movie._status === 'Finished' || movie._status === 'Released'" class="moviesDetailsFinancesRight">
          <div class="noMargin moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.openingWeek') }}</div>
            <div>{{ roundBudget(movie._release.openingWeekGross) }}</div>
          </div>
          <div class="moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.cinemaGross') }}</div>
            <div>{{ roundBudget(movie._release.cinemaGross) }}</div>
          </div>
          <div class="moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.dvdGross') }}</div>
            <div>{{ roundBudget(movie._release.dvdGross) }}</div>
          </div>
        </div>
        <div v-if="movie._status !== 'Finished' && movie._status !== 'Released'" class="moviesDetailsFinancesRight">
          <div class="noMargin moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.openingWeek') }}</div>
            <div>$ 0</div>
          </div>
          <div class="moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.cinemaGross') }}</div>
            <div>$ 0</div>
          </div>
          <div class="moviesDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.dvdGross') }}</div>
            <div>$ 0</div>
          </div>
        </div>
      </div>
    </background-tile>
  </div>
  <div v-else id="moviesDetailsEmptyBackground" class="moviesDetailsBackground">

  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import PosterElement from "@/components/kitchenSink/PosterElement.vue";

export default {
  name: "MoviesDetails",
  components: {PosterElement, InfoCircle, BackgroundTile},

  props: {
    movie: Object,
  },

  data(){
    return {
      movieTopics: [],
    }
  },

  methods: {
    roundBudget(labelValue){
      if(this.$store.getters.getCurrentLanguage === 'en'){
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                    : Math.abs(Number(labelValue));
      } else {
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " Mrd"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " Mio"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " T"

                    : Math.abs(Number(labelValue));
      }
    }
  },

  watch: {
    movie: function(){
      if (this.movie !== null) {
        //TODO: Poster für Movie setzen: this.moviePosterSVG = this.
        this.movieTopics = [];
        let allTopics = this.movie._preProduction.screenplay.topics;

        Object.values(allTopics).forEach((i) => {
          if(i !== null) {
            this.movieTopics.push(i);
          }
        })
      }
    },
  },
}
</script>

<style scoped>
.moviesDetailsBackground {
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

#moviesDetailsEmptyBackground {
  height: 540px;
}

.moviesDetailsContentTile {
  text-align: left;
  width: 650px;
}

.moviesDetailsGeneral, .moviesDetailsFinances {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 20px;
}

.moviesDetailsGeneral {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
}

.moviesDetailsGeneralTopInfo, .moviesDetailsGeneralBottomInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.moviesDetailsGeneralTopInfo {
  margin-bottom: 10px;
}

.moviesDetailsGeneralTopInfoLeft {
  word-break: break-word;
}

.moviesDetailsGeneralTopInfoLeft, .moviesDetailsGeneralTopInfoRight, .moviesDetailsGeneralBottomInfoLeft, .moviesDetailsGeneralBottomInfoRight, .moviesDetailsFinancesLeft, .moviesDetailsFinancesRight {
  flex-basis: 0;
  flex-grow: 1;
}

.moviesDetailsGeneralTopInfoLeft, .moviesDetailsGeneralBottomInfoLeft, .moviesDetailsFinancesLeft {
  margin-right: 20px;
}

.moviesDetailsGeneralTopInfoRight {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.moviesDetailsMovieTitle {
  font-size: 28px;
  font-weight: var(--fsm-fw-bold);
  margin-bottom: 15px;
}

.moviesDetailsDescription {
  font-size: 14px;
  font-weight: var(--fsm-fw-semibold);
  color: var(--fsm-grey-font-color);
}

.moviesDetailsInfoCircles {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.moviesDetailsInfoCirclesTop, .moviesDetailsInfoCirclesBottom {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.moviesDetailsInfoCircle {
  margin: 10px;
  font-size: 28px;
  font-weight: var(--fsm-fw-bold);
}

.moviesDetailsPoster {
  height: 160px;
  border-radius: var(--fsm-s-border-radius);
  flex-basis: 120px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-size: 120px;
}

.moviesDetailsGeneralInfoLine, .moviesDetailsFinancesInfoLine {
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

.moviesDetailsFinancesHeading {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.moviesDetailsFinances {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.moviesDetailsFinancesLeft, .moviesDetailsFinancesRight {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.noMargin {
  margin: 0;
}
</style>