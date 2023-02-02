<template>
<div class="movieDetails">
  <div class="movieDetailsHeader">
    <icon-button icon="simple-arrow-left" dark @click="$router.go(-1)"/>
    <settings-header/>
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
              <div class="movieDetailsInfoCirclesTop">
                <info-circle class="movieDetailsInfoCircle" text="P" size="60px" large-font/>
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
          <div class="movieDetailsGeneralBottomInfoLeft">
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.children') }}</div>
              <input type="range" min="1" max="100" step="1" :value="50" disabled>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.teenagers') }}</div>
              <input type="range" min="1" max="100" step="1" :value="50" disabled>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.adults') }}</div>
              <input type="range" min="1" max="100" step="1" :value="50" disabled>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.setting') }}</div>
              <div>Placeholder</div>
            </div>
          </div>
          <div class="movieDetailsGeneralBottomInfoRight">
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.release') }}</div>
              <div>{{ movie._release }}</div>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.writer') }}</div>
              <div>{{ movie._preProduction.screenplay.writer.getFullName() }}</div>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.director') }}</div>
              <div>{{ movie.director.getFullName() }}</div>
            </div>
            <div class="movieDetailsGeneralInfoLine">
              <div>{{ $t('movieDetailsElement.general.era') }}</div>
              <div>Placeholder</div>
            </div>
          </div>
        </div>
        <div class="movieDetailsGeneralInfoLine">
          <div>{{ $t('movieDetailsElement.general.topics') }}</div>
          <div>Placeholder, Placeholder, Placeholder</div>
        </div>
      </div>
      <div class="movieDetailsFinancesHeading">{{ $t('movieDetailsElement.finances.heading') }}</div>
      <div class="movieDetailsFinances">
        <div class="movieDetailsFinancesLeft">
          <div class="noMargin movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.productionBudget') }}</div>
            <div>Placeholder</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.marketingBudget') }}</div>
            <div>Placeholder</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.totalCost') }}</div>
            <div>{{ movie._totalCosts }}</div>
          </div>
        </div>
        <div class="movieDetailsFinancesRight">
          <div class="noMargin movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.openingWeek') }}</div>
            <div>Placeholder</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.cinemaGross') }}</div>
            <div>Placeholder</div>
          </div>
          <div class="movieDetailsFinancesInfoLine">
            <div>{{ $t('movieDetailsElement.finances.dvdGross') }}</div>
            <div>Placeholder</div>
          </div>
        </div>
      </div>
      <div class="movieDetailsButtons">
        <custom-button v-show="movie._status !== 'wennDerButtonVerstecktWerdenSoll'" class="movieDetailsButton">
          {{ $t('movieDetailsElement.newMovie') }}
        </custom-button>
        <custom-button v-show="movie._status !== 'wennDerButtonVerstecktWerdenSoll'" class="movieDetailsButton">
          {{ $t('movieDetailsElement.newFranchise') }}
        </custom-button>
      </div>
    </background-tile>
  </div>
</div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import SettingsHeader from "@/components/startComponents/SettingsHeader.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "MovieDetails",
  components: {CustomButton, InfoCircle, BackgroundTile, SettingsHeader, IconButton},
  data() {
    return {
      movie: this.$store.getters.getCurrentMovieDetails,
      moviePosterSVG: 'none',
    }
  },
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