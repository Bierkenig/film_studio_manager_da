<template>
  <div id="eventsSection">
    <h1>{{ $t('upcomingEvents') }}</h1>

    <div>
      <h2>Today</h2>
      <div v-for="(it,index) in todayEvents" :key="index">
        {{ it.movie }}
      </div>
    </div>

    <div>
      <h2>This Week</h2>
      <div v-for="(it,index) in weekEvents" :key="index">
      {{ it.movie }}
      </div>
    </div>

    <div>
      <h2>This Month</h2>
      <div v-for="(it,index) in monthEvents" :key="index">
        {{ it.movie }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingEventsSection",

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
    let nextWeek = this.getNextWeeksDate;
    let nextMonth = this.getNextMonthDate;

    for (let i = 0; i < sourceData.length; i++) {
      if(sourceData[i].start === today){
        this.todayEvents.push(sourceData[i])
      } else if (sourceData[i].start > today
          && sourceData[i].start < nextWeek()){
        this.weekEvents.push(sourceData[i])
      } else if (sourceData[i].start >= nextWeek()
          && sourceData[i].start < nextMonth()){
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
  justify-content: center;
  background-color: black;
  color: white;
}
</style>