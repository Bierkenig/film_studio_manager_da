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
        {{el.getFullName()}} / {{el.getSalary()}} / {{el.getGenres()}} / {{el.getAvatar()}} / {{el.getNationality()}} / {{el.getEthnicity()}} / {{el.getPopularity()}}
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
import {Movie} from "@/classes/Movie";
import {Screenplay} from "@/classes/Screenplay";
import {Studio} from "@/classes/Studio";
import Award from "@/classes/Award";

export default {
  name: "NewsMenu",

  data() {
    return {
      selectedNews: "person",
      sortedNews: [],
      selectedEarnings: "week",
      sortedEarnings: [],
      selectedPerson: "name",
      allPeople: [],
      selectedPeople: [],
      selectedMovie: "title",
      allMovies: [],
      selectedYear: this.$store.state.allYears[0],
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

    //TODO People
    sortPeople() {
      console.log('Calling People')
      switch (this.selectedPerson) {
        case "name":
          this.selectedPeople.sort((a,b) => {
            return a.getLastName().toLowerCase().localeCompare(b.getLastName().toLowerCase())
          })
          break
        case "age":
          this.selectedPeople.sort((a,b) => {
            return a.getAge() - b.getAge()
          })
          break
        case "gender":
          this.selectedPeople.sort((a,b) => {
            return a.getGender().toLowerCase().localeCompare(b.getGender().toLowerCase())
          })
          break
        case "values":
          this.selectedPeople.sort((a,b) => {
            return a.getRating() - b.getRating()
          })
          break
      }
    },

    sortMovies() {
      console.log('Calling Movies')
      switch (this.selectedMovie) {
        case "title":
          this.allMovies.sort((a,b) => {
            return a.getTitle().toLowerCase().localeCompare(b.getTitle().toLowerCase())
          })
          break
        case "year":
          this.allMovies.sort((a,b) => {
            return a.getYear() - b.getYear()
          })
          break
        case "studio":
          this.allMovies.sort((a,b) => {
            return a.getStudio().toLowerCase().localeCompare(b.getStudio().toLowerCase())
          })
          break
        case "earnings":
          this.allMovies.sort((a,b) => {
            return a.getEarnings() - b.getEarnings()
          })
          break
      }
    },

    sortAwards() {
      console.log('Calling Awards')
      this.sortedAwards = this.sortedAwards.filter((award) => award.getYear() === this.selectedYear)
    },
  },

  mounted() {
    //Call Methods once
    this.sortEarnings()
    this.sortNews()
    this.sortPeople()
    this.sortMovies()
    this.sortAwards()

    this.allMovies.push(
        new Movie(new Screenplay(0, null, null, null, null, null, null, null, null, null, null),
            new Studio('moin meister'),
            '2023',
            23344657))

    this.selectedPeople.push(this.$store.getters.getAllActors)
    this.selectedPeople.push(this.$store.getters.getAllDirectors)
    this.selectedPeople.push(this.$store.getters.getAllWriters)
    /*
    this.allMovies.push(this.$store.getters.getAllMovies)
    */

    /*
    this.allAwards.push(this.$store.getters.getAllAwards)
     */
    this.allAwards.push(new Award('Hallo cooler Award', 'international', 2022), new Award('Kein cooler Award', 'international', 2023))
  }
}
</script>

<style scoped>

</style>