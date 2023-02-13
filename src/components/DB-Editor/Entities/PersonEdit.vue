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
    <input id="age" v-model="birthday">
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
      birthday: null,
      gender: null,
      nationality: null,
      ethnicity: null,
    }
  },
  mounted() {
    this.first_name = this.person._first_name
    this.last_name = this.person._last_name
    this.birthday = this.person._age
    this.gender = this.person._gender
    this.nationality = this.person._nationality
    this.ethnicity = this.person._ethnicity
  },
  methods: {
    writeDB(person) {
      //TODO slot mitübergeben damit extra db für jeden speicherslot gemacht werden kann
      //TODO muss dann mit speicherstand gespeichert, geladen, geupdated und gelöscht werden -> wenn spielstand neu belegt wird muss default db verwendet werden
      //TODO Änderungen müssen auch im Store übernommen werden
      window.ipcRenderer.send('editDB', "UPDATE people SET first_name = '" + this.first_name + "', last_name = '" + this.last_name + "', birthday = '" + this.birthday + "', gender = '" + this.gender + "', nationality = '" + this.nationality + "', ethnicity = '" + this.ethnicity + "' WHERE pk_personID = " + person._id)
      console.log(this.$store.state.editPerson._id)
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>

</style>