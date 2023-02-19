<template>
  <div class="testScreeningResultsMainDiv">
    <background-tile class="testScreeningResultsBackground" title="Test Screening Results">
      <div class="testScreeningResultsContainer verticalScroll">
        <div class="testScreeningResultsGeneralInfo">
          <div class="testScreeningResultsHeader">General</div>
          <div class="testScreeningResultsInfoElement">
            <div>Added Weeks</div>
            <div>{{this.addedWeeks}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>New Release Date</div>
            <div>{{this.releaseDate.toLocaleDateString('de-DE')}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>Old Release Date</div>
            <div>{{new Date(this.releaseDate.setDate(this.releaseDate.getDate() - 7 * this.addedWeeks)).toLocaleDateString('de-DE')}}</div>
          </div>
        </div>

        <!--<div>You can further postpone the release date in the movie details!</div>-->

        <div class="testScreeningResultsGeneralInfo" v-if="(this.flags % 3) === 1">
          <div class="testScreeningResultsHeader">Editing</div>
          <div class="testScreeningResultsInfoElement">
            <div>Editing Budget Increase</div>
            <div>{{JSON.parse(this.editingBudgetIncrease).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>Editing Budget Increase %</div>
            <div>{{JSON.parse(this.editingBudgetIncrease).percentage}}</div>
          </div>
        </div>
        <div v-if="(this.flags % 3) === 2">
          <div class="testScreeningResultsInfoElement">
            <div>Editing Consequence</div>
            <div>Director Morale went down</div>
          </div>
        </div>

        <div class="testScreeningResultsGeneralInfo" v-if="(Math.floor(this.flags / 3) % 3) === 1">
          <div class="testScreeningResultsHeader">Sound</div>
          <div class="testScreeningResultsInfoElement">
            <div>Sound Budget Increase</div>
            <div>{{JSON.parse(this.soundBudgetIncrease).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>Sound Budget Increase %</div>
            <div>{{JSON.parse(this.soundBudgetIncrease).percentage}}</div>
          </div>
        </div>
        <div v-if="(Math.floor(this.flags / 3) % 3) === 2">
          <div class="testScreeningResultsInfoElement">
            <div>Sound Consequence</div>
            <div>Director Morale went down</div>
          </div>
        </div>


        <div class="testScreeningResultsGeneralInfo" v-if="(Math.floor(this.flags / 9) % 3) === 1">
          <div class="testScreeningResultsHeader">VFX</div>
          <div class="testScreeningResultsInfoElement">
            <div>VFX Budget Increase</div>
            <div>{{JSON.parse(this.vfxBudgetIncrease).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>VFX Budget Increase %</div>
            <div>{{JSON.parse(this.vfxBudgetIncrease).percentage}}</div>
          </div>
        </div>
        <div v-if="(Math.floor(this.flags / 9) % 3) === 2">
          <div class="testScreeningResultsInfoElement">
            <div>VFX Consequence</div>
            <div>Director Morale went down</div>
          </div>
        </div>


        <div class="testScreeningResultsGeneralInfo" v-if="(Math.floor(this.flags / 27) % 3) === 1">
          <div class="testScreeningResultsHeader">Acting</div>
          <div class="testScreeningResultsInfoElement">
            <div>Whole Production Budget Increase</div>
            <div>{{JSON.parse(this.actingConsequence).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>Whole Production Budget Increase %</div>
            <div>{{JSON.parse(this.actingConsequence).percentage}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>Added time before Release (weeks)</div>
            <div>{{JSON.parse(this.actingConsequence).addedWeeks}}</div>
          </div>
          <div>Movie Hype went down</div>
        </div>
        <div v-if="(Math.floor(this.flags / 27) % 3) === 2">
          <div class="testScreeningResultsInfoElement">
            <div>Acting Consequence</div>
            <div>Director Morale went down</div>
          </div>
        </div>

        <div class="testScreeningResultsGeneralInfo" v-if="(Math.floor(this.flags / 81) % 3) === 1">
          <div class="testScreeningResultsHeader">Story</div>
          <div class="testScreeningResultsInfoElement">
            <div>Whole Production Budget Increase</div>
            <div>{{JSON.parse(this.storyConsequence).value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>Whole Production Budget Increase %</div>
            <div>{{JSON.parse(this.storyConsequence).percentage}}</div>
          </div>
          <div class="testScreeningResultsInfoElement">
            <div>Added time before Release (weeks)</div>
            <div>{{JSON.parse(this.storyConsequence).addedWeeks}}</div>
          </div>
          <div>Movie Hype went down</div>
        </div>
        <div v-if="(Math.floor(this.flags / 81) % 3) === 2">
          <div class="testScreeningResultsInfoElement">
            <div>Story Consequence</div>
            <div>Director Morale went down</div>
          </div>
        </div>
        <!--<div>{{(this.flags % 3)}}</div>
        <div>{{(~~(this.flags / 3) % 3)}}</div>
        <div>{{(((this.flags / 9)>>0) % 3)}}</div>
        <div>{{(((this.flags / 27) | 0) % 3)}}</div>
        <div>{{(Math.floor(this.flags / 81) % 3)}}</div>-->
      </div>
      <custom-button size="small" @clicked="closeTestScreening">Finish</custom-button>
    </background-tile>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "testScreeningResults",
  components: {CustomButton, BackgroundTile},
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
.testScreeningResultsMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.testScreeningResultsBackground {
  width: 500px;
}

.testScreeningResultsGeneralInfo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.testScreeningResultsInfoElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px;
  font-size: 15px;
}

.testScreeningResultsContainer {
  height: 250px;
  margin: 10px 0 15px 0;
}

.testScreeningResultsHeader {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 22px;
  margin-bottom: 0.25em;
  margin-top: 10px;
}
</style>