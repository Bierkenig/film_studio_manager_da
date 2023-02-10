<template>
  <div id="eventsSection">
    <background-tile :title="$t('upcomingEvents')">
      <div class="scroll verticalScroll">
        <div>
          <h2 class="date">{{ $t('today') }}</h2>
          <div class="event" v-for="(it,index) in todayEvents" :key="index">
            <event-element v-if="it.type === 'beforeRelease'"
                           :type="it.type"
                           :movie-title="it.movie"
                           @open-clicked="goToEvent(it)"
                           :status="beforeReleaseCompeted"/>
            <event-element v-else
                           :type="it.type"
                           :movie-title="it.movie"
                           @open-clicked="goToEvent(it)"
                           :status="it.completed === false ? 'open' : 'done'"/>
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

    <!--EVENTS DURING PRE PRODUCTION-->
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

    <!--EVENTS DURING PRODUCTION-->
    <transition name="modal">
      <prod-event-modal
          v-if="showProductionModal"
          @close="showProductionModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </prod-event-modal>
    </transition>

    <!--EVENTS DURING POST PRODUCTION-->
    <transition name="modal">
      <post-prod-modal
          v-if="showPostProductionModal"
          @close="showPostProductionModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </post-prod-modal>
    </transition>

    <!--PRE PRODUCTION SUMMARY WITH CONTINUE PRODUCTION MODAL-->
    <transition name="modal">
      <pre-production-summary
          v-if="showPreProductionSummaryModal"
          @close="showPreProductionSummaryModal = false; showContinueProdModal = true;">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </pre-production-summary>
    </transition>

    <transition name="modal">
      <continue-prod
          v-if="showContinueProdModal"
          @close="showContinueProdModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </continue-prod>
    </transition>

    <!--PRODUCTION SUMMARY WITH CONTINUE POST PRODUCTION MODAL-->
    <transition name="modal">
      <production-summary
          v-if="showProductionSummaryModal"
          @close="showProductionSummaryModal = false; showContinuePostProdModal = true;">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </production-summary>
    </transition>

    <transition name="modal">
      <continue-post-prod
          v-if="showContinuePostProdModal"
          @close="showContinuePostProdModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </continue-post-prod>
    </transition>

    <!--POST PRODUCTION SUMMARY-->
    <transition name="modal">
      <post-production-summary
          v-if="showPostProductionSummaryModal"
          @close="showPostProductionSummaryModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </post-production-summary>
    </transition>

    <!--BEFORE RELEASE MODAL-->
    <transition name="modal">
      <before-release
          v-if="showBeforeReleaseModal"
          @close="showBeforeReleaseModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </before-release>
    </transition>

    <!--AFTER RELEASE WITH CINEMA RUN MODAL-->
    <transition name="modal">
      <after-release-with-cinema-run
          v-if="showAfterReleaseWithCinemaRunModal"
          @close="showAfterReleaseWithCinemaRunModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </after-release-with-cinema-run>
    </transition>

    <!--AFTER RELEASE MODAL-->
    <transition name="modal">
      <after-release-with-cinema-run
          v-if="showAfterReleaseModal"
          @close="showAfterReleaseModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </after-release-with-cinema-run>
    </transition>
  </div>
</template>

<script>
import EventElement from "@/components/kitchenSink/EventElement";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import PreProductionEvent from "@/components/mainGameComponents/preProduction/modals/preProductionEvent.vue";
import ProdEventModal from "@/components/mainGameComponents/currentProduction/prodEventModal.vue";
import PostProdModal from "@/components/mainGameComponents/postProduction/postProdEventModal.vue";
import PreProductionSummary from "@/components/mainGameComponents/preProduction/preProductionSummary.vue";
import ContinueProd from "@/components/mainGameComponents/currentProduction/continueProduction.vue";
import ProductionSummary from "@/components/mainGameComponents/currentProduction/productionSummary.vue";
import ContinuePostProd from "@/components/mainGameComponents/postProduction/continueProductionPost.vue";
import PostProductionSummary from "@/components/mainGameComponents/postProduction/postProductionSummary.vue";
import BeforeRelease from "@/components/mainGameComponents/releaseMovie/beforeRelease.vue";
import AfterReleaseWithCinemaRun from "@/components/mainGameComponents/releaseMovie/afterReleaseWithCinemaRun.vue";
export default {
  name: "UpcomingEventsSection",
  components: {
    AfterReleaseWithCinemaRun,
    BeforeRelease,
    PostProductionSummary,
    ContinuePostProd, ProductionSummary, ContinueProd, PreProductionSummary, PostProdModal, ProdEventModal, PreProductionEvent, BackgroundTile, EventElement},
  data(){
    return {
      todayEvents: [],
      weekEvents: [],
      monthEvents: [],

      // data for showing events during each production phase
      showPreProductionModal: false,
      showProductionModal: false,
      showPostProductionModal: false,

      // data for showing summaries
      showPreProductionSummaryModal: false,
      showProductionSummaryModal: false,
      showPostProductionSummaryModal: false,

      // data for showing continue modals
      showContinuePostProdModal: false,
      showContinueProdModal: false,

      // data for showing release modals
      showBeforeReleaseModal: false,
      showAfterReleaseWithCinemaRunModal: false,
      showAfterReleaseModal: false,

      chosenType: '',
      beforeReleaseCompeted: 'none',
    }
  },

  methods: {
    goToEvent(event){
      if(event.type === 'dropOut' || event.type === 'recast' || event.type === 'creative' || event.type === 'difficulty' || event.type === 'extend'){
        this.showPreProductionModal = true;
        this.chosenType = event.type;
      } else if(event.type === 'weather' || event.type === 'castMember' || event.type === 'budgetForCostumes' || event.type === 'equipment'
          || event.type === 'budget' || event.type === 'breakdown' || event.type === 'duration' || event.type === 'directorLeaves'
          || event.type === 'changes' || event.type === 'injured'){
        this.$store.commit('setCurrentProdEventType',event.type)
        this.showProductionModal = true;
      } else if(event.type === 'sound' || event.type === 'postProductionProblem' || event.type === 'visualEffects' || event.type === 'visualQuality'
          || event.type === 'reshooting'){
        this.$store.commit('setCurrentPostProdEventType',event.type)
        this.showPostProductionModal = true;
      } else if(event.type === 'preProductionFinished'){
        this.showPreProductionSummaryModal = true;
      } else if(event.type === 'productionFinished'){
        this.showProductionSummaryModal = true;
      } else if(event.type === 'postProductionFinished'){
        this.showPostProductionSummaryModal = true;
        this.beforeReleaseCompeted = 'open';
      } else if(event.type === 'beforeRelease'){
        this.showBeforeReleaseModal = true;
        this.beforeReleaseCompeted = 'done';
      } else if(event.type === 'afterReleaseWithCinemaRun'){
        this.showAfterReleaseWithCinemaRunModal = true;
      } else if(event.type === 'afterRelease'){
        this.showAfterReleaseModal = true;
      }

      this.$store.commit('setCurrentCalendarEvent',event);
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