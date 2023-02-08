<template>
  <div>
    <div v-if="this.dateOfDay === this.currentDateString" class="animationBodyCurrentDate">
      <div class="animationElementCurrentDate">
        {{ dateOfDay }}
      </div>
      <div v-if="this.dayEvents.length === 0" class="animationElementIconsBox" id="animationElementNoEvents">
        {{ $t('noEvents') }}
      </div>
      <div v-else-if="this.dayEvents.length <= 3" class="animationElementEventBox">
        <div v-for="(it, index) in dayEvents"
             :key="index"
             class="animationElementIconsBox">
          <img
              :class="'eventIconElements ' + icons[it][1] + 'Events'"
              :src="require('../../../assets/icons/' + icons[it][0] + '.svg')"
              :alt="icons[it][0].replace('-','') + 'Icon'"/>
          <div class="animationElementTitle">
            {{ $t('events.' + it + '.title') }}
          </div>
        </div>
      </div>
      <div v-else class="animationElementEventBox">
        <div v-for="pos in 2"
             :key="pos"
             class="animationElementIconsBox">
          <img
              :class="'eventIconElements ' + icons[this.dayEvents[pos - 1]][1] + 'Events'"
              :src="require('../../../assets/icons/' + icons[this.dayEvents[pos - 1]][0] + '.svg')"
              :alt="icons[this.dayEvents[pos - 1]][0].replace('-','') + 'Icon'"/>
          <div class="animationElementTitle">
            {{ $t('events.' + this.dayEvents[pos - 1] + '.title') }}
          </div>
        </div>
        <div class="animationElementAdditionalEvents">
          <div>
            {{ $t('additional') }}
          </div>
          <div class="animationElementAdditionalEventsIcons">
            <div
                v-for="pos in 4"
                :key="pos + 1">
              <img
                  v-if="(pos + 2) <= this.dayEvents.length"
                  :class="'eventIconElements ' + icons[this.dayEvents[pos + 1]][1] + 'Events'"
                  :src="require('../../../assets/icons/' + icons[this.dayEvents[pos + 1]][0] + '.svg')"
                  :alt="icons[this.dayEvents[pos + 1]][0].replace('-','') + 'Icon'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="animationBodyNotCurrentDate">
      <div class="animationElementNotCurrentDate">
        {{ dateOfDay }}
      </div>
      <div v-if="this.dayEvents.length === 0" class="animationElementIconsBox" id="animationElementNoEvents">
        {{ $t('noEvents') }}
      </div>
      <div v-else-if="this.dayEvents.length <= 3" class="animationElementEventBox">
        <div v-for="(it, index) in dayEvents"
             :key="index"
             class="animationElementIconsBox">
          <img
              :class="'eventIconElements ' + icons[it][1] + 'Events'"
              :src="require('../../../assets/icons/' + icons[it][0] + '.svg')"
              :alt="icons[it][0].replace('-','') + 'Icon'"/>
          <div class="animationElementTitle">
            {{ $t('events.' + it + '.title') }}
          </div>
        </div>
      </div>
      <div v-else class="animationElementEventBox">
        <div v-for="pos in 2"
             :key="pos"
             class="animationElementIconsBox">
          <img
              :class="'eventIconElements ' + icons[this.dayEvents[pos - 1]][1] + 'Events'"
              :src="require('../../../assets/icons/' + icons[this.dayEvents[pos - 1]][0] + '.svg')"
              :alt="icons[this.dayEvents[pos - 1]][0].replace('-','') + 'Icon'"/>
          <div class="animationElementTitle">
            {{ $t('events.' + this.dayEvents[pos - 1] + '.title') }}
          </div>
        </div>
        <div class="animationElementAdditionalEvents">
          <div>
            {{ $t('additional') }}
          </div>
          <div class="animationElementAdditionalEventsIcons">
            <div
                v-for="pos in 4"
                :key="pos + 1">
              <img
                  v-if="(pos + 2) <= this.dayEvents.length"
                  :class="'eventIconElements ' + icons[this.dayEvents[pos + 1]][1] + 'Events'"
                  :src="require('../../../assets/icons/' + icons[this.dayEvents[pos + 1]][0] + '.svg')"
                  :alt="icons[this.dayEvents[pos + 1]][0].replace('-','') + 'Icon'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from "dateformat";
import { i18n } from "dateformat";
export default {
  name: "AnimationElement",

  props: {
    date: Date,
  },

  data(){
    return {
      dateOfDay: '',
      currentDateString: '',
      dayEvents: [],
      icons: {
        'dropOut': ['action','preProduction'],
        'recast': ['action','preProduction'],
        'creative': ['action','preProduction'],
        'difficulty': ['action','preProduction'],
        'extend': ['action','preProduction'],
        'preProductionFinished': ['simple-tick','preProduction'],
        'weather': ['action','production'],
        'castMember': ['action','production'],
        'budgetForCostumes': ['action','production'],
        'equipment': ['action','production'],
        'budget': ['action','production'],
        'breakdown': ['action','production'],
        'duration': ['action','production'],
        'changes': ['action','production'],
        'injured': ['action','production'],
        'directorLeavesProduction': ['action','production'],
        'productionFinished': ['simple-tick','production'],
        'testScreening': ['action','postProduction'],
        'sound': ['action','postProduction'],
        'postProductionProblem': ['action','postProduction'],
        'visualEffects': ['action','postProduction'],
        'visualQuality': ['action','postProduction'],
        'reshooting': ['action','postProduction'],
        'postProductionFinished': ['simple-tick','postProduction'],
        'beforeRelease': ['documentary','remaining'],
        'afterReleaseWithCinemaRun': ['documentary','remaining'],
        'afterRelease': ['documentary','remaining'],
        'studioTakeover': ['studio','remaining'],
        'internationalAward': ['award','remaining'],
        'independentAward': ['award','remaining'],
        'audienceAward': ['award','remaining']
      },
    }
  },

  watch: {
    date: function (){
      this.updateDate();
    }
  },

  mounted() {
    this.updateDate();
  },

  methods: {
    updateDate(){
      if(this.$store.getters.getCurrentLanguage === 'en'){
        i18n.dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
        i18n.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      } else {
        i18n.dayNames = ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam",];
        i18n.monthNames = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
      }

      this.currentDateString = dateFormat(this.$store.getters.getCurrentDate, 'ddd, d mmm')
      this.dateOfDay = dateFormat(this.date, 'ddd, d mmm')

      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let allEventsCompleted = null;
      this.dayEvents = [];

      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].start === this.formatDate(this.date.toDateString())){
          this.dayEvents.push(allCalendarEvents[i].type)
          if(allEventsCompleted === null || allEventsCompleted === true){
            allEventsCompleted = allCalendarEvents[i].completed;
          }
        }
      }

      if((this.dayEvents.length !== 0 && allEventsCompleted === false) && this.date.getTime() === this.$store.getters.getCurrentDate.getTime()){
        setTimeout(() => {
          this.$emit('stopAnimate')
        }, 500)
      }
    },

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
.animationBodyNotCurrentDate, .animationBodyCurrentDate {
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  height: 215px;
  width: 300px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.animationBodyCurrentDate {
  background-color: var(--fsm-dark-blue-3) !important;
}

.animationElementCurrentDate, .animationElementNotCurrentDate {
  margin: 8px 10px 0 10px;
  font-weight: var(--fsm-fw-bold);
  font-size: 22px;
}

.animationElementNotCurrentDate {
  color: var(--fsm-white);
}

.animationElementCurrentDate {
  color: var(--fsm-pink-1);
}

.animationElementEventBox {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 10px 0 10px;
}

.animationElementIconsBox, .animationElementAdditionalEvents {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px;
}

.animationElementAdditionalEvents {
  margin-top: 10px;
  padding: 0 !important;
}

.animationElementAdditionalEventsIcons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
}

.animationElementIconsBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
}

#animationElementNoEvents {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 10px;
}

.animationElementTitle {
  flex: 1;
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