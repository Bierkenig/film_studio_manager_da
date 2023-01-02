<template>
  <div id="eventsSection">
    <h1 id="eventHeading">{{ $t('upcomingEvents') }}</h1>
<div class="scroll verticalScroll">
    <div>
      <h2 class="date">{{ $t('today') }}</h2>
      <div class="event" v-for="(it,index) in todayEvents" :key="index">
        <event-element :type="it.type" :movie-title="it.movie" hide-open-icon/>
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
  </div>
</template>

<script>
import EventElement from "@/components/kitchenSink/EventElement";
export default {
  name: "UpcomingEventsSection",
  components: {EventElement},
  data(){
    return {
      todayEvents: [],
      weekEvents: [],
      monthEvents: [],
    }
  },

  methods: {
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
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  color: white;
}

#eventHeading{
  font-size: 28px;
  color: var(--fsm-pink-1);
  margin-top: 0.7em;
  margin-left: 0.7em;
  margin-bottom: 0
}

.date{
  margin-left: 0.7em
}

.scroll{
  height: 750px;
}

.event{
  margin: 0.7em
}
</style>