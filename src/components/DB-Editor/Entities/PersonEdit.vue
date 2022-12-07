<template>
  <div>
    <label for="firstname">First Name</label>
    <input id="firstname" v-model="first_name">
  </div>

  <br/>

  <div>
    <label for="lastname">Last Name</label>
    <input id="lastname" v-model="last_name">
  </div>

  <br/>

  <div>
    <label for="age">Age</label>
    <input id="age" v-model="age">
  </div>

  <br/>

  <div>
    <label for="gender">Gender</label>
    <input id="gender" v-model="gender">
  </div>

  <br/>

  <div>
    <label for="nationality">Nationality</label>
    <input id="nationality" v-model="nationality">
  </div>

  <br/>

  <div>
    <label for="ethnicity">Ethnicity</label>
    <input id="ethnicity" v-model="ethnicity">
  </div>

  <br/>

  <div>
    <label for="performance">Performance</label>
    <input id="performance" v-model="performance">
  </div>

  <br/>

  <div>
    <label for="experience">Experience</label>
    <input id="experience" v-model="experience">
  </div>

  <br/>

  <div>
    <label for="depth">Depth</label>
    <input id="depth" v-model="depth">
  </div>

  <br/>

  <div>
    <label for="craft">Craft</label>
    <input id="craft" v-model="craft">
  </div>

  <br/>

  <div>
    <label for="talent">Talent</label>
    <input id="talent" v-model="talent">
  </div>

  <br/>

  <div>
    <label for="popularity">Popularity</label>
    <input id="popularity" v-model="popularity">
  </div>

  <br/>

  <div>
    <label for="rating">Rating</label>
    <input id="rating" v-model="rating">
  </div>

  <br/>

  <div>
    <label for="salary">Salary</label>
    <input id="salary" v-model="salary">
  </div>

  <br/>

  <div>
    <label for="isActor">is Actor</label>
    <input id="isActor" v-model="isActor">
  </div>

  <br/>

  <div>
    <label for="isDirector">is Director</label>
    <input id="isDirector" v-model="isDirector">
  </div>

  <br/>

  <div>
    <label for="isWriter">is Writer</label>
    <input id="isWriter" v-model="isWriter">
  </div>

  <br/>

  <div>
    <label for="genre">Genre</label>
    <input id="genre" v-model="genre">
  </div>


  <button id="backButton" class="buttonStyle" @click="this.$router.go(-1)">Back</button>
  <button id="saveButton" class="buttonStyle" @click="writeDB(person)">Save</button>

</template>

<script>

export default {
  name: "PersonEdit",

  data() {
    return {
      person: this.$store.state.editPerson,
      first_name: null,
      last_name: null,
      age: null,
      gender: null,
      nationality: null,
      ethnicity: null,
      performance: null,
      experience: null,
      depth: null,
      craft: null,
      talent: null,
      popularity: null,
      rating: null,
      salary: null,
      isActor: null,
      isDirector: null,
      isWriter: null,
      genre: null
    }
  },
  mounted() {
    this.first_name = this.person._first_name
    this.last_name = this.person._last_name
    this.age = this.person._age
    this.gender = this.person._gender
    this.nationality = this.person._nationality
    this.ethnicity = this.person._ethnicity
    this.performance = this.person._performance
    this.experience = this.person._experience
    this.depth = this.person._depth
    this.craft = this.person._craft
    this.talent = this.person._talent
    this.popularity = this.person._popularity
    this.rating = this.person._rating
    this.salary = this.person._salary
    this.isActor = this.person._isActor
    this.isDirector = this.person._isDirector
    this.isWriter = this.person._isWriter
    this.genre = this.person._genre

  },
  methods: {
    writeDB(person) {
      //TODO slot mitübergeben damit extra db für jeden speicherslot gemacht werden kann
      //TODO muss dann mit speicherstand gespeichert, geladen, geupdated und gelöscht werden -> wenn spielstand neu belegt wird muss default db verwendet werden
      //TODO Änderungen müssen auch im Store übernommen werden
      window.ipcRenderer.send('editDB', "UPDATE people SET first_name = '" + this.first_name + "', last_name = '" + this.last_name + "', age = '" + this.age + "', gender = '" + this.gender + "', nationality = '" + this.nationality + "', ethnicity = '" + this.ethnicity + "', performance = '" + this.performance + "', experience = '" + this.experience + "', depth = '" + this.depth + "', craft = '" + this.craft + "', talent = '" + this.talent + "', popularity = '" + this.popularity + "', rating = '" + this.rating + "', salary = '" + this.salary + "', isActor = '" + this.isActor + "', isDirector = '" + this.isDirector + "', isWriter = '" + this.isWriter + "' WHERE pk_personID = " + person._id)
      console.log(this.$store.state.editPerson._id)
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>

</style>