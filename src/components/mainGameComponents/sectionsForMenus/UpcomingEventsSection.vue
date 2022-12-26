<template>
  <div id="eventsSection">
    <h1>{{ $t('upcomingEvents') }}</h1>

    <div>
      <h2>{{ $t('today') }}</h2>
      <div v-for="(it,index) in todayEvents" :key="index">
        {{ it.movie }}
      </div>
    </div>

    <div>
      <h2>{{ $t('thisWeek') }}</h2>
      <div v-for="(it,index) in weekEvents" :key="index">
      {{ it.movie }}
      </div>
    </div>

    <div>
      <h2>{{ $t('thisMonth') }}</h2>
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
  justify-content: center;
  background-color: black;
  color: white;
}
</style>