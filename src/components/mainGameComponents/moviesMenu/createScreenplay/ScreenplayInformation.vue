<template>
  <div>
    <h1>Screenplay Information</h1>
    <div>
      <p>Title: {{ screenplay.title }}</p>
      <p>Type: {{ screenplay.type }}</p>
      <p>Genre: {{ screenplay.genre }}</p>
      <p>Subgenre: {{ screenplay.subgenre }}</p>
      <p>Age Rating: {{ screenplay.ageRating }}</p>
      <p>Writer: {{ screenplay.writer.firstName }} {{ screenplay.writer.lastName }}</p>
      <p>Description: {{ screenplay.description }}</p>
      <p>Rating: {{ screenplay.rating }}</p>
      <p>Price: {{ screenplay.price }}</p>
      <p>Topics: <span v-for="(it, index) in screenplay.topics" :key="index">{{ it }}</span></p>
      <p>Roles: <span v-for="(it, index) in screenplay.roles" :key="index">{{ it }}</span></p>
      <p>Acts: <span v-for="(it, index) in screenplay.acts" :key="index">{{ it }}</span></p>
      <p>Details: {{ screenplay.details }}</p>
      <p>Age Rating Details: {{ screenplay.ageRatingDetails }}</p>
      <p>Length: {{ screenplay.length }}</p>
      <p>Writing Phase: {{ screenplay.writingPhase }}</p>
    </div>
    <router-link :to="{name: 'movies'}">
      <button @click="onButtonClick">Save Screenplay</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ScreenplayInformation",

  data(){
    return {
      screenplay: this.$store.getters.getCurrentScreenplay,
    }
  },

  methods: {
    onButtonClick(){
      this.$store.commit('addScreenplay', this.screenplay);
      this.$store.commit('subtractBalance', this.screenplay.price);
      console.log(this.$store.getters.getScreenplays);
    }
  }
}
</script>

<style scoped>
* {
  text-align: center;
}
</style>