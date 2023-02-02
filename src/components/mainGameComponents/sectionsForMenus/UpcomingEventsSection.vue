<template>
  <div id="eventsSection">
    <background-tile :title="$t('upcomingEvents')">
      <div class="scroll verticalScroll">
        <div>
          <h2 class="date">{{ $t('today') }}</h2>
          <div class="event" v-for="(it,index) in todayEvents" :key="index">
            <event-element v-if="it.type === 'productionFinished'" :type="it.type" :movie-title="it.movie" @open-clicked="goToEvent" status="open"/>
          </div>
          <div class="event" v-for="(it,index) in todayEvents" :key="index">
            <event-element v-if="it.type === 'featureFilm' || it.type === 'blockbuster'" :type="it.type" :movie-title="it.movie" status="done"/>
          </div>
          <div class="event" v-for="(it,index) in todayEvents" :key="index">
            <event-element v-if="it.type === 'award'" :type="it.type" :movie-title="it.movie"/>
          </div>
        </div>

        <div>
          <h2 class="date">{{ $t('thisWeek') }}</h2>
          <div class="event" v-for="(it,index) in weekEvents" :key="index">
            <event-element :type="it.type" :movie-title="it.movie" hide-open-icon/>
          </div>
        </div>

        <div>
          <h2 class="date">{{ $t('thisMonth') }}</h2>
          <div class="event" v-for="(it,index) in monthEvents" :key="index">
            <event-element :type="it.type" :movie-title="it.movie" hide-open-icon/>
          </div>
        </div>
      </div>
    </background-tile>
  </div>
</template>

<script>
import EventElement from "@/components/kitchenSink/EventElement";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
export default {
  name: "UpcomingEventsSection",
  components: {BackgroundTile, EventElement},
  data(){
    return {
      todayEvents: [],
      weekEvents: [],
      monthEvents: [],
    }
  },

  methods: {
    goToEvent(){
      //TODO: ZU Movie gehen
      this.$router.push('calendar')
    },

    getNextWeeksDate() {
      const now = this.$store.getters.getCurrentDate;

      return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    },

    getNextMonthDate() {
      const now = this.$store.getters.getCurrentDate;

      return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    },
  },

  mounted(){
    this.todayEvents = [];
    this.weekEvents = [];
    this.monthEvents = [];

    let sourceData = this.$store.getters.getCalendarEvents;
    let today = this.$store.getters.getCurrentDate;
    today.setHours(1,0,0)
    let nextWeek = this.getNextWeeksDate;
    let nextMonth = this.getNextMonthDate;

    for (let i = 0; i < sourceData.length; i++) {
      let dateCheck = new Date(sourceData[i].start);
      if(dateCheck.getTime() === today.getTime()){
        this.todayEvents.push(sourceData[i])
      } else if (dateCheck > today && dateCheck < nextWeek()){
        this.weekEvents.push(sourceData[i])
      } else if (dateCheck >= nextWeek() && dateCheck < nextMonth()){
        this.monthEvents.push(sourceData[i])
      }
    }
  },
}
</script>

<style scoped>
#eventsSection {
  display: flex;
  flex-direction: column;
}


.date{
  margin-left: 0.7em
}

.scroll{
  height: 649px;
}

.event{
  margin: 0.7em
}
</style>