<template>
  <div class="dayEventsContainer">
    <div>
      <h3 id="dateHeader" v-if="clickedDay !== null">{{ clickedDay.toDateString() }}</h3>
      <div id="dayEventsAllItems" v-if="event.length !== 0" >
        <event-element v-for="it in event" :key="it.id" :type="it.type" movie-title="Movie Title Name One" hide-open-icon/>
      </div>
      <div id="dayEventsNoEventsMessage" v-else>
        <div>No Events on this day!</div>
      </div>
    </div>
  </div>
</template>

<script>

import EventElement from "@/components/kitchenSink/EventElement";
export default {
  name: "DayEvents",
  components: {EventElement},
  props: {
    event: Object,
    clickedDay: Date
  },

  watch: {
    clickedDay: function(){

    }
  }
}
</script>

<style scoped>
.dayEventsContainer {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

#dateHeader {
  margin-left: 20px;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

#dayEventsAllItems {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-right: 20px;
  margin-left: 20px;
}

#dayEventsNoEventsMessage {
  text-align: center;
}
</style>