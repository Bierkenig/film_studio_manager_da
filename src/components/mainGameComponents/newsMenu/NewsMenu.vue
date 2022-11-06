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
      <div v-for="(el, index) in sortedNews" :key="index">{{el.getTitle}} / {{el.getPerson() === null ? "" : el.getPerson().getLastName()}} / {{el.getMovie() === null ? "" : el.getMovie()}} / {{el.getAward() === null ? "" : el.getAward().getDescription()}}</div>
    </div>

    <div>
      <select v-model="selectedPerson" @change="sortPeople">
        <option value="name">{{$t('newsData.name')}}</option>
        <option value="age">{{$t('newsData.age')}}</option>
        <option value="gender">{{$t('newsData.gender')}}</option>
        <option value="values">{{$t('newsData.values')}}</option>
      </select>
      <div v-for="(el, index) in allPeople" :key="index">
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
      <select v-for="(el, index) in this.$store.getters.getAllYears" :key="index" v-model="selectedYear" @change="sortAwards">
        <option value="el">{{el}}</option>
      </select>
      <div v-for="(award, index) in sortedAwards" :key="index">
        {{award.getDescription()}} / {{award.getType()}}
      </div>
    </div>
  </div>
</template>

<script>
import Actor from "@/classes/Actor";
import {Director} from "@/classes/Director";
import {Movie} from "@/classes/Movie";
import {Screenplay} from "@/classes/Screenplay";
import {Studio} from "@/classes/Studio";
import Award from "@/classes/Award";

export default {
  name: "NewsMenu",

  data() {
    return {
      selectedNews: "",
      sortedNews: [],
      selectedEarnings: "",
      sortedEarnings: [],
      selectedPerson: "",
      allPeople: [],
      selectedMovie: "",
      allMovies: [],
      selectedYear: 0,
      allAwards: [],
      sortedAwards: [],
    }
  },

  methods: {
    sortEarnings() {
      switch (this.selectedEarnings) {
        case "week":
          //this.sortedEarnings.filter((el) => this.getWeek(el.date) === this.$store.state.currentWeek)
          break
        case "month":
          this.sortedEarnings.sort((a,b) => {
            return b.date.getMonth() - a.date.getMonth()
          })
          break
        case "year":
          this.sortedEarnings.sort((a,b) => {
            return b.date.getYear() - a.date.getYear()
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
      switch (this.selectedNews) {
        case "person":
          this.sortedNews.sort((a,b) => {
            return b[1].getLastName().toLowerCase().localeCompare(a[1].getLastName().toLowerCase())
          })
          break;
        case "movie":
          this.sortedNews.sort((a,b) => {
            return b[2].getScreenplay().getTitle().toLowerCase().localeCompare(a[2].getScreenplay().getTitle().toLowerCase())
          })
          break;
        case "award":
          this.sortedNews.sort((a,b) => {
            return b[3].getDesc().toLowerCase().localeCompare(a[3].getDesc().toLowerCase())
          })
          break
      }
    },

    sortPeople() {
      switch (this.selectedPerson) {
        case "name":
          this.allPeople.sort((a,b) => {
            return b.getLastName().toLowerCase().localeCompare(a.getLastName().toLowerCase())
          })
          break
        case "age":
          this.allPeople.sort((a,b) => {
            return b.getAge() - a.getAge()
          })
          break
        case "gender":
          this.allPeople.sort((a,b) => {
            return b.getGender().toLowerCase().localeCompare(a.getGender().toLowerCase())
          })
          break
        case "values":
          this.allPeople.sort((a,b) => {
            return b.getRating() - a.getRating()
          })
          break
      }
    },

    sortMovies() {
      switch (this.selectedMovie) {
        case "title":
          this.allMovies.sort((a,b) => {
            return b.getTitle().toLowerCase().localeCompare(a.getTitle().toLowerCase())
          })
          break
        case "year":
          this.allMovies.sort((a,b) => {
            return b.getYear() - a.getYear()
          })
          break
        case "studio":
          this.allMovies.sort((a,b) => {
            return b.getStudio().toLowerCase().localeCompare(a.getStudio().toLowerCase())
          })
          break
        case "earnings":
          this.allMovies.sort((a,b) => {
            return b.getEarnings() - a.getEarnings()
          })
          break
      }
    },

    sortAwards() {
      this.sortedAwards = this.allAwards
      this.sortedAwards.filter((award) => award.getYear() === this.selectedYear)
    },
  },

  mounted() {
    this.sortedNews = this.$store.getters.getCurrentNews;
    this.sortedEarnings = this.$store.getters.getEarnings

    this.allPeople.push(
        new Actor(1, 'Jakob', 'lastName', 23, 23, 350498, 123456, 'male', null, 3, 'arabian', 4, 'austrian', 4, 5),
        new Director(0, 'Jakob', 'lastName', 23, 23, 350498, 123456, 'male', null, 3, 'arabian', 4, 'austrian', 4, 5))
    /*
    this.allPeople.push(this.$store.getters.getAllActors)
    this.allPeople.push(this.$store.getters.getAllDirectors)
    this.allPeople.push(this.$store.getters.getAllWriters)
     */

    this.allMovies.push(new Movie(new Screenplay(0, null, null, null, null, null, null, null, null, null, null), new Studio('moin meister'), '2023', 23344657))
    /*
    this.allMovies.push(this.$store.getters.getAllMovies)
    */

    /*
    this.allAwards.push(this.$store.getters.getAllAwards)
     */
    this.allAwards.push(new Award('Hallo cooler Award', 'international', 2023), new Award('Kein cooler Award'), 'international', 2023)
    this.sortedAwards = [...this.allAwards]
  }
}
</script>

<style scoped>

</style>