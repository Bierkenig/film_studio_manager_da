<template>
  <div class="newsMenuMainDiv">
    <div class="newsMenuLeftBox">
      <action-section headline="listOfMovies" info-text="listOfMoviesInfoText" button-text="open" icon="movies"/>
      <action-section headline="listOfPeople" info-text="listOfPeopleInfoText" button-text="open" icon="subscriber"/>
      <action-section headline="listOfAwards" info-text="listOfAwardsInfoText" button-text="open" icon="trophy"/>
    </div>
    <div class="newsMenuCenterBox">
      <background-tile class="newsMenuCenterBoxBackground" :title="$t('earningStatistics')">
          <tile-pages-nav class="newsMenuNavigation"
                          :pages='[$t("thisWeek"),$t("thisMonth"), $t("thisYear"), $t("allTime")]' :gradient='true'>
            <div class="newsMenuCenterBoxContent verticalScroll">
              <div
                  v-for="(it, index) in allMovies"
                  :key="index">
                <movie-earning-element :genre="it._preProduction.screenplay.genre.genreName" :movie-title="it._preProduction.screenplay.title" :opening-week-gross="it._release.openingWeekGross"
                                       :current-time-title="$t('thisWeek')" :current-time-gross="getWeekEarnings(it)"/>
              </div>
            </div>
            <div class="newsMenuCenterBoxContent verticalScroll">
              <div
                  v-for="(it, index) in allMovies"
                  :key="index">
                <movie-earning-element :genre="it._preProduction.screenplay.genre.genreName" :movie-title="it._preProduction.screenplay.title" :opening-week-gross="it._release.openingWeekGross"
                                       :current-time-title="$t('thisMonth')"
                                       :current-time-gross="getMonthEarnings(it)"/>
              </div>
            </div>
            <div class="newsMenuCenterBoxContent verticalScroll">
              <div
                  v-for="(it, index) in allMovies"
                  :key="index">
                <movie-earning-element :genre="it._preProduction.screenplay.genre.genreName" :movie-title="it._preProduction.screenplay.title" :opening-week-gross="it._release.openingWeekGross"
                                       :current-time-title="$t('thisYear')" :current-time-gross="getYearEarnings(it)"/>
              </div>
            </div>
            <div class="newsMenuCenterBoxContent verticalScroll">
              <div
                  v-for="(it, index) in allMovies"
                  :key="index">
                <movie-earning-element :genre="it._preProduction.screenplay.genre.genreName" :movie-title="it._preProduction.screenplay.title" :opening-week-gross="it._release.openingWeekGross"
                                       :current-time-title="$t('allTime')"
                                       :current-time-gross="getAllTimeEarnings(it)"/>
              </div>
            </div>
          </tile-pages-nav>
      </background-tile>
    </div>
    <div class="newsMenuRightBox">
      <background-tile class="newsMenuRightBoxBackground" :title="$t('news2')">
          <tile-pages-nav class="newsMenuNavigation" :pages='[$t("people"),$t("movies"), "Studios"]' :gradient='true'>
            <div class="newsTextSection verticalScroll">
              <div v-for="(it, index) in this.peopleNews" :key="index">
                <news-element :avatar="it._person._avatar" :heading-text="it._title"
                              :info-text="it._description" type="People" class="newsElement"/>
              </div>
            </div>

            <div class="newsTextSection verticalScroll">
              <div v-for="(it, index) in this.movieNews" :key="index">
                <news-element :heading-text="it._title"
                              :info-text="it._description" :genre="it._movie._preProduction.screenplay.genre.genreName.toLowerCase()"
                              type="Movie" class="newsElement"/>
              </div>
            </div>

            <div class="newsTextSection verticalScroll">
              <div v-for="(it, index) in this.studioNews" :key="index">
                <news-element :heading-text="it._title"
                              :info-text="it._description"
                              type="Studio" class="newsElement"/>
              </div>
            </div>
          </tile-pages-nav>
      </background-tile>
    </div>
  </div>
</template>

<script>
import ActionSection from "@/components/mainGameComponents/moviesMenu/ActionSection.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import TilePagesNav from "@/components/kitchenSink/TilePagesNav.vue";
import NewsElement from "@/components/kitchenSink/NewsElement.vue";

import soundeffectMixin from "@/mixins/soundeffectMixin";
import MovieEarningElement from "@/components/kitchenSink/MovieEarningElement.vue";

export default {
  name: "NewsMenu",
  components: {MovieEarningElement, NewsElement, TilePagesNav, BackgroundTile, ActionSection},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      allMovies: this.$store.getters.getFinishedMovies.concat(this.$store.getters.getCreatedMovies),

      peopleNews: [],
      movieNews: [],
      studioNews: [],

      currentDate: this.$store.getters.getCurrentDate,
    }
  },

  mounted() {
    this.loadData();
    window.ipcRenderer.send("updateDiscordDetails", "In Game: News Menu")

  },

  methods: {
    getWeekEarnings(movie) {
      let weekEarningsOfMovie = 0;
      let startDateOfWeek = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - this.currentDate.getDay());
      let endDateOfWeek = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - this.currentDate.getDay() + 6);

      for (let i = 0; i < movie._earnings.length; i++) {
        if (movie._earnings[i].date.getTime() >= startDateOfWeek.getTime() && movie._earnings[i].date.getTime() <= endDateOfWeek.getTime()) {
          weekEarningsOfMovie += movie._earnings[i].amount;
        }
      }

      return weekEarningsOfMovie;
    },

    getMonthEarnings(movie) {
      let monthEarningsOfMovie = 0;
      let startDateOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      let endDateOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

      for (let i = 0; i < movie._earnings.length; i++) {
        if (movie._earnings[i].date.getTime() >= startDateOfMonth.getTime() && movie._earnings[i].date.getTime() <= endDateOfMonth.getTime()) {
          monthEarningsOfMovie += movie._earnings[i].amount;
        }
      }

      return monthEarningsOfMovie;
    },

    getYearEarnings(movie) {
      let yearEarningsOfMovie = 0;
      let startDateOfYear = new Date(this.currentDate.getFullYear(), 0, 1);
      let endDateOfYear = new Date(this.currentDate.getFullYear(), 11, 31);

      for (let i = 0; i < movie._earnings.length; i++) {
        if (movie._earnings[i].date.getTime() >= startDateOfYear.getTime() && movie._earnings[i].date.getTime() <= endDateOfYear.getTime()) {
          yearEarningsOfMovie += movie._earnings[i].amount;
        }
      }

      return yearEarningsOfMovie;
    },

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
    },

    getAllTimeEarnings(movie) {
      let allTimeEarningsOfMovie = 0;

      if(movie._earnings.length !== 0){
        for (let i = 0; i < movie._earnings.length; i++) {
          allTimeEarningsOfMovie += movie._earnings[i].amount;
        }
      } else {
        allTimeEarningsOfMovie = movie.allTotalEarings
      }

      return allTimeEarningsOfMovie;
    },

    loadData() {
      let sourceData = this.$store.getters.getCurrentNews;
      sourceData.sort((a, b) => b._date - a._date)
      for (let i = 0; i < sourceData.length; i++) {
        if (sourceData[i]._type === 'People') {
          this.peopleNews.push(sourceData[i])
        }
        if (sourceData[i]._type === 'Movies') {
          this.movieNews.push(sourceData[i])
        }
        if (sourceData[i]._type === 'Studios') {
          this.studioNews.push(sourceData[i])
        }
        if (i === 29) {
          break;
        }
      }
    }
  },
}
</script>

<style scoped>
.newsMenuMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.newsMenuLeftBox {
  flex-grow: 4;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.newsMenuCenterBox {
  flex-grow: 7;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.newsMenuRightBox {
  flex-grow: 4;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.newsMenuCenterBoxBackground {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.newsMenuRightBoxBackground {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.newsTextSection {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.newsMenuNavigation {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
}

.newsMenuCenterBoxContent {
  flex-grow: 1;
  flex-basis: 0;
}

.newsElement {
  margin-bottom: 10px;
}
</style>