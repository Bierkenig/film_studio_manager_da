<template>

  AddedWeeks:
  {{this.addedWeeks}}
  <br>
  New Release Date:
  <br>
  {{this.releaseDate}}
  <br>
  Old Release Date:
  <br>
  {{new Date(this.releaseDate.setDate(this.releaseDate.getDate() - 7 * this.addedWeeks))}}
  <br>
  You can further postpone the release date in the movie details!
  <br>
  <div v-if="(this.flags % 3) === 1">
  Editing Budget Increase:
  {{JSON.parse(this.editingBudgetIncrease).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
  Editing Budget Increase %:
  {{JSON.parse(this.editingBudgetIncrease).percentage}}
  </div>
  <div v-if="(this.flags % 3) === 2">
    Editing Consequence: Director Morale went down
  </div>

  <div v-if="(Math.floor(this.flags / 3) % 3) === 1">
  Sound Budget Increase:
  {{JSON.parse(this.soundBudgetIncrease).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
  Sound Budget Increase %:
  {{JSON.parse(this.soundBudgetIncrease).percentage}}
  </div>
  <div v-if="(Math.floor(this.flags / 3) % 3) === 2">
    Sound Consequence: Director Morale went down
  </div>


  <div v-if="(Math.floor(this.flags / 9) % 3) === 1">
  VFX Budget Increase:
  {{JSON.parse(this.vfxBudgetIncrease).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
  VFX Budget Increase %:
  {{JSON.parse(this.vfxBudgetIncrease).percentage}}
  </div>
  <div v-if="(Math.floor(this.flags / 9) % 3) === 2">
    VFX Consequence: Director Morale went down
  </div>


  <div v-if="(Math.floor(this.flags / 27) % 3) === 1">
  Whole Production Budget Increase:
  {{JSON.parse(this.actingConsequence).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
    <br>
    Whole Production Budget Increase %:
  {{JSON.parse(this.actingConsequence).percentage}}
    <br>
    Added time before Release (weeks):
  {{JSON.parse(this.actingConsequence).addedWeeks}}
    <br>
    Movie Hype went down
  </div>
  <div v-if="(Math.floor(this.flags / 27) % 3) === 2">
    Acting Consequence: Director Morale went down
  </div>

  <div v-if="(Math.floor(this.flags / 81) % 3) === 1">
  Whole Production Budget Increase:
  {{JSON.parse(this.storyConsequence).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
    <br>
  Whole Production Budget Increase %:
  {{JSON.parse(this.storyConsequence).percentage}}
    <br>
    Added time before Release (weeks):
  {{JSON.parse(this.storyConsequence).addedWeeks}}
    <br>
    Movie Hype went down
  </div>
  <div v-if="(Math.floor(this.flags / 81) % 3) === 2">
    Story Consequence: Director Morale went down
  </div>
  {{(this.flags % 3)}}
  {{(~~(this.flags / 3) % 3)}}
  {{(((this.flags / 9)>>0) % 3)}}
  {{(((this.flags / 27) | 0) % 3)}}
  {{(Math.floor(this.flags / 81) % 3)}}

  <button @click="closeTestScreening">Finish</button>

</template>

<script>
export default {
  name: "testScreeningResults",
  props: {
    addedWeeks: Number,
    editingBudgetIncrease: String,
    soundBudgetIncrease: String,
    vfxBudgetIncrease: String,
    actingConsequence: String,
    storyConsequence: String,
    flags: Number
  },
  data(){
    return{
      releaseDate: this.$store.getters.getCurrentMovie._preProduction.releaseDate,
      date: new Date(),
      oldReleaseDate:  this.date?.setDate(this.releaseDate.getDate() - 7 * this.addedWeeks)

    }
  },

  methods: {
    closeTestScreening(){
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].id === currentCalendarEvent.id){
          allCalendarEvents[i].completed = true;
        }
      }

      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style scoped>

</style>