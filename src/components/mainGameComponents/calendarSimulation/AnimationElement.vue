<template>
  <div>
    <div class="animationBody">
      <div class="animationElementDate">
        {{ ("0" + date.getDate()).slice(-2) }}
        {{ date.toLocaleString('en-US', {month: 'short'}) }},
        {{ date.getFullYear() }}
      </div>
      <div class="animationElementIcons">
        <div class="animationElementIconsBox verticalScroll">
          <img
              v-for="(it, index) in dayEvents"
              :key="index"
              :class="'eventIconElements ' + icons[it][1] + 'Events'"
              :src="require('../../../assets/icons/' + icons[it][0] + '.svg')"
              :alt="icons[it][0].replace('-','') + 'Icon'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimationElement",

  props: {
    date: Date,
  },

  data(){
    return {
      dayEvents: [],
      icons: {
        'actorDropsOut': ['action','preProduction'],
        'callForRecast': ['action','preProduction'],
        'directorDropsOutPreProduction': ['action','preProduction'],
        'directorWantsMoreBudget': ['action','preProduction'],
        'directorWantsExtendPhaseOut': ['action','preProduction'],
        'preProductionFinished': ['simple-tick','preProduction'],
        'badWeather': ['action','production'],
        'castMakesProblems': ['action','production'],
        'insufficientBudget': ['action','production'],
        'equipmentMalfunctions': ['action','production'],
        'budgetProblems': ['action','production'],
        'setBreakdown': ['action','production'],
        'insufficientProductionPhase': ['action','production'],
        'directorDropsOutProduction': ['action','production'],
        'directorWantsChanges': ['action','production'],
        'injuryOfCast': ['action','production'],
        'productionFinished': ['simple-tick','production'],
        'testScreening': ['action','postProduction'],
        'soundQualityProblem': ['action','postProduction'],
        'postProductionProblem': ['action','postProduction'],
        'visualEffectsProblem': ['action','postProduction'],
        'visualQualityProblem': ['action','postProduction'],
        'reshootingOfScenes': ['action','postProduction'],
        'postProductionFinished': ['simple-tick','postProduction'],
        'release': ['party','remaining'],
        'releaseSummary': ['documentary','remaining'],
        'dvdSummary': ['documentary','remaining'],
        'studioTakeover': ['studio','remaining'],
        'bankrupt': ['falling-chart','remaining'],
        'award': ['award','remaining']
      },
    }
  },

  mounted() {
    let allCalendarEvents = this.$store.getters.getCalendarEvents;
    let allEventsCompleted = null;
    for (let i = 0; i < allCalendarEvents.length; i++) {
      if(allCalendarEvents[i].start === this.formatDate(this.$store.getters.getCurrentDate.toDateString())){
        this.dayEvents.push(allCalendarEvents[i].type)
        if(allEventsCompleted === null || allEventsCompleted === true){
          allEventsCompleted = allCalendarEvents[i].completed;
        }
      }
    }
    if(this.dayEvents.length !== 0 && !allEventsCompleted){
      setTimeout(() => {
        this.$emit('stopAnimate')
      }, 2000)
      /*for (let i = 0; i < allCalendarEvents.length; i++) {
        allCalendarEvents[i].completed = true;
      }*/
    }
  },

  methods: {
    formatDate(date) {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
  }
}
</script>

<style scoped>
.animationBody {
  background-color: var(--fsm-dark-blue-2);
  border-radius: var(--fsm-m-border-radius);
  height: 250px;
  width: 300px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.animationElementDate {
  margin-top: 8px;
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  text-align: center;
}

.animationElementIcons {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);

  flex: 1;
  padding: 5px;
  margin: 5px;
}

.animationElementIconsBox {
  flex: 1;

  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
}

.eventIconElements {
  width: 15px;
  height: 15px;
  border-radius: var(--fsm-l-border-radius);
  padding: 5px
}

.remainingEvents {
  background-color: var(--fsm-light-yellow)
}

.preProductionEvents{
  background-color: var(--fsm-light-blue)
}

.postProductionEvents {
  background-color: var(--fsm-light-green)
}

.productionEvents {
  background-color: var(--fsm-pink-1)
}
</style>