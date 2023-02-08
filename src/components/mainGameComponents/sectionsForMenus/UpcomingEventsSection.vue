<template>
  <div id="eventsSection">
    <background-tile :title="$t('upcomingEvents')">
      <div class="scroll verticalScroll">
        <div>
          <h2 class="date">{{ $t('today') }}</h2>
          <div class="event" v-for="(it,index) in todayEvents" :key="index">
            <event-element :type="it.type" :movie-title="it.movie" @open-clicked="goToEvent(it.type)" status="open"/>
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

    <transition name="modal">
      <pre-production-event
          v-if="showPreProductionModal"
          :type="chosenType"
          @close="showPreProductionModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </pre-production-event>
    </transition>

    <transition name="modal">
      <prod-event-modal
          v-if="showProductionModal"
          @close="showProductionModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </prod-event-modal>
    </transition>

    <transition name="modal">
      <post-prod-modal
          v-if="showPostProductionModal"
          @close="showPostProductionModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </post-prod-modal>
    </transition>
  </div>
</template>

<script>
import EventElement from "@/components/kitchenSink/EventElement";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import PreProductionEvent from "@/components/mainGameComponents/preProduction/modals/preProductionEvent.vue";
import ProdEventModal from "@/components/mainGameComponents/currentProduction/prodEventModal.vue";
import PostProdModal from "@/components/mainGameComponents/postProduction/postProdEventModal.vue";
export default {
  name: "UpcomingEventsSection",
  components: {PostProdModal, ProdEventModal, PreProductionEvent, BackgroundTile, EventElement},
  data(){
    return {
      todayEvents: [],
      weekEvents: [],
      monthEvents: [],
      showPreProductionModal: false,
      showProductionModal: false,
      showPostProductionModal: false,
      chosenType: '',
    }
  },

  methods: {
    goToEvent(type){
      if(type === 'dropOut' || type === 'recast' || type === 'creative' || type === 'difficulty' || type === 'extend'){
        this.showPreProductionModal = true;
        this.chosenType = type;
      } else if(type === 'weather' || type === 'castMember' || type === 'budgetForCostumes' || type === 'equipment'
                || type === 'budget' || type === 'breakdown' || type === 'duration' || type === 'directorLeaves'
                || type === 'changes' || type === 'injured'){
        this.$store.commit('setCurrentProdEventType',type)
        this.showProductionModal = true;
      } else if(type === 'sound' || type === 'postProductionProblem' || type === 'visualEffects' || type === 'visualQuality'
          || type === 'reshooting'){
        this.$store.commit('setCurrentPostProdEventType',type)
        this.showPostProductionModal = true;
      }
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