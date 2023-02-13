<template>
  <div class="newsMenuMainDiv">
    <div class="newsMenuLeftBox">
      <action-section headline="listOfMovies" info-text="listOfMoviesInfoText" button-text="open" icon="movies"/>
      <action-section headline="listOfPeople" info-text="listOfPeopleInfoText" button-text="open" icon="placeholder"/>
      <action-section headline="listOfAwards" info-text="listOfAwardsInfoText" button-text="open" icon="settings"/>
    </div>
    <div class="newsMenuCenterBox">
      <background-tile class="newsMenuCenterBoxBackground" title="Earning Statistics">
        <div>
          <tile-pages-nav class="newsMenuNavigation" :pages='[$t("thisWeek"),$t("thisMonth"), $t("thisYear"), $t("allTime")]' :gradient='true'>
            <div class="scroll verticalScroll">
              <div
                  v-for="(it, index) in allMovies"
                  :key="index">
                <movie-earning-element :movie-title="it._title" :opening-week-gross="it._release.openingWeekGross" :current-time-title="$t('thisWeek')" :current-time-gross="getWeekEarnings(it)"/>
              </div>
            </div>
            <div class="scroll verticalScroll">
              <div
                  v-for="(it, index) in allMovies"
                  :key="index">
                <movie-earning-element :movie-title="it._title" :opening-week-gross="it._release.openingWeekGross" :current-time-title="$t('thisMonth')" :current-time-gross="getMonthEarnings(it)"/>
              </div>
            </div>
            <div class="scroll verticalScroll">
              <div
                  v-for="(it, index) in allMovies"
                  :key="index">
                <movie-earning-element :movie-title="it._title" :opening-week-gross="it._release.openingWeekGross" :current-time-title="$t('thisYear')" :current-time-gross="getYearEarnings(it)"/>
              </div>
            </div>
            <div class="scroll verticalScroll">
              <div
                  v-for="(it, index) in allMovies"
                  :key="index">
                <movie-earning-element :movie-title="it._title" :opening-week-gross="it._release.openingWeekGross" :current-time-title="$t('allTime')" :current-time-gross="getAllTimeEarnings(it)"/>
              </div>
            </div>
          </tile-pages-nav>
        </div>
      </background-tile>
    </div>
    <div class="newsMenuRightBox">
      <background-tile class="newsMenuRightBoxBackground" title="News">
        <div>
          <tile-pages-nav class="newsMenuNavigation" :pages='["People","Movie", "Studios"]' :gradient='true'>
            <div class="newsTextSection scroll verticalScroll">
              <div v-for="(it, index) in this.peopleNews" :key="index">
                <news-element svg-code="" :heading-text="it._title"
                              :info-text="it._description" class="newsElement"/>
              </div>
            </div>

            <div class="newsTextSection scroll verticalScroll">
              <div v-for="(it, index) in this.movieNews" :key="index">
                <news-element svg-code="" :heading-text="it._title"
                              :info-text="it._description" class="newsElement"/>
              </div>
            </div>

            <div class="newsTextSection scroll verticalScroll">
              <div v-for="(it, index) in this.studioNews" :key="index">
                <news-element svg-code="" :heading-text="it._title"
                              :info-text="it._description" class="newsElement"/>
              </div>
            </div>
          </tile-pages-nav>
        </div>
      </background-tile>
    </div>
  </div>
</template>

<script>
import ActionSection from "@/components/mainGameComponents/moviesMenu/ActionSection.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import TilePagesNav from "@/components/kitchenSink/TilePagesNav.vue";
import NewsElement from "@/components/kitchenSink/NewsElement.vue";
import MovieEarningElement from "@/components/kitchenSink/MovieEarningElement.vue";

export default {
  name: "NewsMenu",
  components: {MovieEarningElement, NewsElement, TilePagesNav, BackgroundTile, ActionSection},

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
    getWeekEarnings(movie){
      let weekEarningsOfMovie = 0;
      let startDateOfWeek = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay()));
      let endDateOfWeek = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay()+6));

      for (let i = 0; i < movie._earnings.length; i++) {
        if(this.currentDate.getTime() >= startDateOfWeek.getTime() && this.currentDate.getTime() <= endDateOfWeek.getTime()){
          weekEarningsOfMovie += movie._earnings[i].amount;
        }
      }

      return weekEarningsOfMovie;
    },

    getMonthEarnings(movie){
      let monthEarningsOfMovie = 0;
      let startDateOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
      let endDateOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

      for (let i = 0; i < movie._earnings.length; i++) {
        if(this.currentDate.getTime() >= startDateOfMonth.getTime() && this.currentDate.getTime() <= endDateOfMonth.getTime()){
          monthEarningsOfMovie += movie._earnings[i].amount;
        }
      }

      return monthEarningsOfMovie;
    },

    getYearEarnings(movie){
      let yearEarningsOfMovie = 0;
      let startDateOfYear = new Date(this.currentDate.getFullYear(), 0, 1);
      let endDateOfYear = new Date(this.currentDate.getFullYear(), 11, 31);

      for (let i = 0; i < movie._earnings.length; i++) {
        if(this.currentDate.getTime() >= startDateOfYear.getTime() && this.currentDate.getTime() <= endDateOfYear.getTime()){
          yearEarningsOfMovie += movie._earnings[i].amount;
        }
      }

      return yearEarningsOfMovie;
    },

    getAllTimeEarnings(movie){
      let allTimeEarningsOfMovie = 0;

      for (let i = 0; i < movie._earnings.length; i++) {
        allTimeEarningsOfMovie += movie._earnings[i].amount;
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
        if(i === 29){
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
  flex: 1;
}

.newsMenuLeftBox {
  display: flex;
  flex-direction: column;
  width: 25%;
  gap: 20px;
}

.newsMenuCenterBox {
  width: 48%;
}

.newsMenuRightBox {
  width: 25%;
}

.newsMenuRightBoxBackground, .newsMenuCenterBoxBackground {
  height: 100%;
}

.newsTextSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.newsElement{
  margin-bottom: 10px;
}

.scroll{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;
  height: auto;
  box-sizing: border-box;
  flex-grow: 1;
}

.newsMenuNavigation {
  margin: 15px 0 15px 0;
}
</style>