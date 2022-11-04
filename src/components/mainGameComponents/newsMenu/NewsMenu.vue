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
      <div v-for="(el, index) in sortedNews" :key="index">{{el.getTitle}} / {{el.getPerson().getLastName().isNull() ? "" : el.getPerson().getLastName()}} / {{el.getMovie().isNull() ? "" : el.getMovie()}} / {{el.getAward().isNull() ? "" : el.getAward().getDesc()}}</div>
    </div>

    <div>
      <select>
        <option value="name">{{$t('newsData.name')}}</option>
        <option value="age">{{$t('newsData.age')}}</option>
        <option value="gender">{{$t('newsData.gender')}}</option>
        <option value="values">{{$t('newsData.values')}}</option>
      </select>
      <!-- TODO print People -->
      <div v-for="(el, index) in allPeople" :key="index"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsMenu",

  data() {
    return {
      selectedNews: "",
      sortedNews: [],
      selectedEarnings: "",
      sortedEarnings: [],
      allPeople: [],
    }
  },

  methods: {
    sortEarnings() {
      switch (this.selectedEarnings) {
        case "week":
          //TODO
          break
        case "month":
          this.sortedEarnings.sort((a,b) => {
            return a.date.getMonth() - b.date.getMonth()
          })
          break
        case "year":
          this.sortedEarnings.sort((a,b) => {
            return a.date.getYear() - b.date.getYear()
          })
          break
      }
    },

    sortNews() {
      switch (this.selectedNews) {
        case "person":
          this.sortedNews.sort((a,b) => {
            return b[1] - a[1]
          })
          break;
        case "movie":
          this.sortedNews.sort((a,b) => {
            return b[2] - a[2]
          })
          break;
        case "award":
          this.sortedNews.sort((a,b) => {
            return b[3] - a[3]
          })
          break
      }
    }
  },

  mounted() {
    this.sortedNews = this.$store.getters.getCurrentNews;
    this.sortedEarnings = this.$store.getters.getEarnings

    this.allPeople.push(this.$store.getters.getAllActors)
    this.allPeople.push(this.$store.getters.getAllDirectors)
    this.allPeople.push(this.$store.getters.getAllWriters)
  }
}
</script>

<style scoped>

</style>