<template>
  <div class="dayEventsContainer">
    <div class="dayEventsInnerContainer">
      <div v-if="clickedDay !== null">
        <background-tile :title="clickedDay.toLocaleDateString(this.$store.getters.getCurrentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })">
          <div id="dayEventsAllItems" v-if="event.length !== 0" >
            <event-element v-for="it in event" :key="it.id" :type="it.type" :movie-title="it.movie" hide-open-icon/>
          </div>
          <div class="dayEventsNoEventsMessage" v-else>
            <div>{{ $t('noEventsMsg') }}</div>
          </div>
        </background-tile>
      </div>
      <div v-else>
        <background-tile :title="$t('dateInformation')">
          <div class="dayEventsNoEventsMessage">
            <div>{{ $t('emptyDateInformation') }}</div>
          </div>
        </background-tile>
      </div>
    </div>
  </div>
</template>

<script>
import EventElement from "@/components/kitchenSink/EventElement";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "DayEvents",
  components: {BackgroundTile, EventElement},
  props: {
    event: Object,
    clickedDay: Date,
  },
}
</script>

<style scoped>
.dayEventsInnerContainer {
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
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
  margin-top: 25px;
}
</style>