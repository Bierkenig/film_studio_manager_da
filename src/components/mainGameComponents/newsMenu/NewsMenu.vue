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
      <div v-for="(el, index) in sortedNews" :key="index">{{el.getTitle()}} / {{el.getPerson() === null ? "" : el.getPerson().getLastName()}} / {{el.getMovie() === null ? "" : el.getMovie()}} / {{el.getAward() === null ? "" : el.getAward().getDesc()}}</div>
    </div>

    <div>
      <select v-model="selectedPerson" @change="sortPeople">
        <option value="name">{{$t('newsData.name')}}</option>
        <option value="age">{{$t('newsData.age')}}</option>
        <option value="gender">{{$t('newsData.gender')}}</option>
        <option value="values">{{$t('newsData.values')}}</option>
      </select>
      <div v-for="(el, index) in selectedPeople" :key="index">
        {{el.firstName}} / {{el.lastName}} / {{el.age}} / {{el.salary}} / {{el.genres}} / {{el.avatar}} / {{el.nationality}} / {{el.ethnicity}} / {{el.rating}}
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
        {{el.getScreenplay().getTitle()}} / {{el.getDirector().getFullName()}} / {{el.getScreenplay().getGenre()}} / {{el.getScreenplay().getAgeRating()}} / {{el.getScreenplay().getDescription()}}
      </div>
    </div>

    <div>
      <select v-model="selectedYear" @change="sortAwards">
        <option v-for="(el, index) in this.$store.getters.getAllYears" :key="index">{{el}}</option>
      </select>
      <div v-for="(el, index) in sortedAwards" :key="index">
        {{el.getDesc()}} / {{el.getType()}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsMenu",

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
      console.log(this.$store.getters.getAllActors)
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
            return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())
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

    this.selectedPeople = this.$store.state.people
    this.allMovies.push(this.$store.getters.getAllMovies)
    this.allAwards.push(this.$store.getters.getAllAwards)


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