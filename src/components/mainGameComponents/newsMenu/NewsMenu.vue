<template>
  <div>
    <div>
      <select v-model="selectedEarnings" @change="sortEarnings">
        <option value="week">{{$t('newsData.week')}}</option>
        <option value="month">{{$t('newsData.month')}}</option>
        <option value="year">{{$t('newsData.year')}}</option>
      </select>
      <div v-for="(el, index) in sortedEarnings" :key="index">{{el.value}} / {{el.date.toDateString()}}</div>
    </div>

    <div>
      <select v-model="selectedNews" @change="sortNews">
        <option value="person">{{$t('newsData.person')}}</option>
        <option value="movie">{{$t('newsData.movie')}}</option>
        <option value="award">{{$t('newsData.award')}}</option>
      </select>
      <div v-for="(el, index) in sortedNews" :key="index">{{el._title}} / {{el._person === null ? "" : el._person._first_name / el._person._last_name}} / {{el._movie === null ? "" : el._movie}} / {{el._award === null ? "" : el._award.getDesc()}}</div>
    </div>

    <div>
      <select v-model="selectedPerson" @change="sortPeople">
        <option value="name">{{$t('newsData.name')}}</option>
        <option value="age">{{$t('newsData.age')}}</option>
        <option value="gender">{{$t('newsData.gender')}}</option>
        <option value="values">{{$t('newsData.values')}}</option>
      </select>
      <div v-for="(el, index) in selectedPeople" :key="index">
        <avatar-element :svg-code="el._avatar"></avatar-element>
        {{el._first_name}} / {{el._last_name}} / {{el.age}} / {{el.salary}} / {{el.genre}} / {{el.nationality}} / {{el.ethnicity}} / {{el.rating}}
      </div>
    </div>

    <div>
      <select v-model="selectedMovie" @change="sortMovies">
        <option value="title">{{$t('newsData.title')}}</option>
        <option value="year">{{$t('newsData.year')}}</option>
        <option value="studio">{{$t('newsData.studio')}}</option>
        <option value="earnings">{{$t('newsData.earnings')}}</option>
      </select>
      <div v-for="(el, index) in allMovies" :key="index">
        {{el._preProduction.screenplay.title}} / {{el._preProduction.hiredDirector._first_name / el._preProduction.hiredDirector._last_name}} / {{el._preProduction.screenplay.genre}} / {{el.screenplay.ageRatingDetails.violence}} / {{el.screenplay.ageRatingDetails.cursing}} / {{el.screenplay.ageRatingDetails.loveScenes}} / {{el.screenplay.description}}
      </div>
    </div>

    <div>
      <select v-model="selectedYear" @change="sortAwards">
        <option v-for="(el, index) in this.$store.getters.getAllYears" :key="index">{{el}}</option>
      </select>
      <div v-for="(el, index) in sortedAwards" :key="index">
        {{el.desc}} / {{el.type}}
      </div>
    </div>
  </div>
</template>

<script>
import AvatarElement from "@/components/kitchenSink/AvatarElement";
export default {
  name: "NewsMenu",
  components: {AvatarElement},
  data() {
    return {
      selectedNews: "person",
      sortedNews: [],
      selectedEarnings: "week",
      sortedEarnings: [],
      selectedPerson: "name",
      selectedPeople: [],
      selectedMovie: "title",
      allMovies: [],
      selectedYear: '2023',
      allAwards: [],
      sortedAwards: [],
    }
  },

  methods: {
    sortEarnings() {
      switch (this.selectedEarnings) {
        case "week":
          this.sortedEarnings = this.$store.getters.getEarnings
          this.sortedEarnings = this.sortedEarnings.filter((el) => this.getWeek(el.date) === this.getWeek(this.$store.getters.getCurrentDate))
          break
        case "month":
          this.sortedEarnings = this.$store.getters.getEarnings
          this.sortedEarnings.sort((a,b) => {
            return a.date.getMonth() - b.date.getMonth()
          })
          break
        case "year":
          this.sortedEarnings = this.$store.getters.getEarnings
          this.sortedEarnings.sort((a,b) => {
            return a.date.getYear() - b.date.getYear()
          })
          break
      }
    },

    getWeek(date) {
      const now = date
      const onejan = new Date(now.getFullYear(), 0, 1);
      return Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    },

    sortNews() {
      console.log('Calling News')
      switch (this.selectedNews) {
        case "person":
          this.sortedNews = this.$store.getters.getCurrentNews
          this.sortedNews.sort((a,b) => {
            console.log(a[1])
            return a.getPerson().getLastName().toLowerCase().localeCompare(b.getPerson().getLastName().toLowerCase())
          })
          break;
        case "movie":
          this.sortedNews = this.$store.getters.getCurrentNews
          this.sortedNews.sort((a,b) => {
            return a.getMovie().getTitle().toLowerCase().localeCompare(b.getMovie().getTitle().toLowerCase())
          })
          break;
        case "award":
          this.sortedNews = this.$store.getters.getCurrentNews
          this.sortedNews.sort((a,b) => {
            return a.getAward().getDesc().toLowerCase().localeCompare(b.getAward().getDesc().toLowerCase())
          })
          break
      }
    },

    sortPeople() {
      switch (this.selectedPerson) {
        case "name":
          this.selectedPeople.sort((a,b) => {
            return a._last_name.toLowerCase().localeCompare(b._last_name.toLowerCase())
          })
          break
        case "age":
          this.selectedPeople.sort((a,b) => {
            return a.age - b.age
          })
          break
        case "gender":
          this.selectedPeople.sort((a,b) => {
            return a.gender.localeCompare(b.gender)
          })
          break
        case "values":
          this.selectedPeople.sort((a,b) => {
            return a.rating - b.rating
          })
          break
      }
    },

    sortMovies() {
      switch (this.selectedMovie) {
        case "title":
          this.allMovies.sort((a,b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          })
          break
        case "year":
          this.allMovies.sort((a,b) => {
            return a.year - b.year
          })
          break
        case "studio":
          this.allMovies.sort((a,b) => {
            return a.studio.name.toLowerCase().localeCompare(b.studio.name.toLowerCase())
          })
          break
        case "earnings":
          this.allMovies.sort((a,b) => {
            return a.earnings - b.earnings
          })
          break
      }
    },

    sortAwards() {
      this.sortedAwards = this.$store.getters.getAllAwards
      this.sortedAwards = this.sortedAwards.filter((award) => award.year === this.selectedYear)
    },
  },

  mounted() {

    this.selectedPeople = this.$store.state.allPeople
    this.allMovies = this.$store.getters.getAllMovies
    this.allAwards = this.$store.getters.getAllAwards


    this.sortEarnings()
    this.sortNews()
    this.sortPeople()
    this.sortMovies()
    this.sortAwards()
  }
}
</script>

<style scoped>

</style>