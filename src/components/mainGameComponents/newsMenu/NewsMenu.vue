<template>
  <div>
    <div>
      <select v-model="selectedEarnings" @change="sortNews">
        <option value="week">{{$t('newsData.person')}}</option>
        <option value="month">{{$t('newsData.movie')}}</option>
        <option value="year">{{$t('newsData.award')}}</option>
      </select>
      <div v-for="(el, index) in this.$store.getters.getEarnings" :key="index">{{el.value}} / {{el.date.toDateString()}}</div>
    </div>


    <div>
      <select v-model="selectedNews" @change="sortNews">
        <option value="person">{{$t('newsData.person')}}</option>
        <option value="movie">{{$t('newsData.movie')}}</option>
        <option value="award">{{$t('newsData.award')}}</option>
      </select>
      <div v-for="(el, index) in sortedNews" :key="index">{{el.getTitle}} / {{el.getPerson.isNull() ? }}</div>
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
    }
  },

  methods: {
    sortNews() {
      switch (this.selectedNews) {
        case "person":
          this.sortedNews.sort((a,b) => {
            return b[1] - a[1]
          })
          break;
        case "movie":

          break;
        case "award":

          break
      }
    }
  },

  mounted() {
    this.sortedNews = this.$store.getters.getCurrentNews;
  }
}
</script>

<style scoped>

</style>