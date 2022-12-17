<template>
  <div class="dayEventsContainer">
    <div class="dayEventsInnerContainer">
      <div v-if="clickedDay !== null">
        <h3 class="dateHeader" v-if="clickedDay !== null">
          {{ clickedDay.toLocaleDateString(this.$store.getters.getCurrentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
        </h3>
        <div id="dayEventsAllItems" v-if="event.length !== 0" >
          <event-element v-for="it in event" :key="it.id" :type="it.type" :movie-title="it.movie" hide-open-icon/>
        </div>
        <div class="dayEventsNoEventsMessage" v-else>
          <div>{{ $t('noEventsMsg') }}</div>
        </div>
      </div>
      <div v-else>
        <h3 class="dateHeader" >
          {{ $t('dateInformation') }}
        </h3>
        <div class="dayEventsNoEventsMessage">
          <div>{{ $t('emptyDateInformation') }}</div>
        </div>
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
    clickedDay: Date,
  },
}
</script>

<style scoped>
.dayEventsInnerContainer {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);

  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
}

.dateHeader {
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

.dayEventsNoEventsMessage {
  text-align: center;
}
</style>