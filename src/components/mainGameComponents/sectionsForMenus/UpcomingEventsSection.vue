<template>
  <div id="eventsSection">
    <background-tile id="eventsSectionBgTile" :title="$t('upcomingEvents')">
      <div id="eventsSectionContent" class="verticalScroll">
        <div>
          <div class="date">{{ $t('today') }}</div>
          <div class="events">
            <div class="event" v-for="(it,index) in todayEvents" :key="index">
              <event-element v-if="it.type === 'beforeRelease'"
                             :type="it.type"
                             :movie-title="it.movie"
                             :studio="it.studio"
                             @open-clicked="goToEvent(it)"
                             :status="beforeReleaseCompleted"/>
              <event-element v-else
                             :type="it.type"
                             :movie-title="it.movie"
                             :studio="it.studio"
                             @open-clicked="goToEvent(it)"
                             :status="it.completed === false ? 'open' : 'done'"/>
            </div>
          </div>
        </div>
        <div>
          <div class="date">{{ $t('thisWeek') }}</div>
          <div class="events">
            <div class="event" v-for="(it,index) in weekEvents" :key="index">
              <event-element :type="it.type" :movie-title="it.movie" :studio="it.studio" hide-open-icon/>
            </div>
          </div>
        </div>
        <div>
          <div class="date">{{ $t('thisMonth') }}</div>
          <div class="events">
            <div class="event" v-for="(it,index) in monthEvents" :key="index">
              <event-element :type="it.type" :movie-title="it.movie" :studio="it.studio" hide-open-icon/>
            </div>
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
          @close="showContinuePostProdModal = false; showChooseMediumModal = true;">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </continue-post-prod>
    </transition>

    <!--MARKETING MODALS-->
    <transition name="modal">
      <choose-medium
          v-if="showChooseMediumModal"
          @close="showChooseMediumModal = false; showCinemaNegotiationModal = true;">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </choose-medium>
    </transition>

    <transition name="modal">
      <cinema-negotiation
          v-if="showCinemaNegotiationModal"
          @close="showCinemaNegotiationModal = false; showMarketingBudgetSelectModal = true;">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </cinema-negotiation>
    </transition>

    <transition name="modal">
      <marketing-budget-select
          v-if="showMarketingBudgetSelectModal"
          @close="showMarketingBudgetSelectModal = false;">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </marketing-budget-select>
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
      <after-release
          v-if="showAfterReleaseModal"
          :movie="this.$store.getters.getCurrentMovie"
          @close="showAfterReleaseModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </after-release>
    </transition>

    <!-- STUDIO TAKEOVER -->
    <transition name="modal">
      <studio-take-over-response
          v-if="showStudioTakeover"
          @close="showStudioTakeover = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </studio-take-over-response>
    </transition>

    <!-- AWARD NOMINATION LIST -->
    <transition name="modal">
      <award-nomination
          v-if="showAwardNomination"
          :type-of-award="awardType"
          @close="showAwardNomination = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </award-nomination>
    </transition>

    <!-- AWARD PRESENTATION LIST -->
    <transition name="modal">
      <award-presentation
          v-if="showAwardPresentation"
          :type-of-award="awardType"
          @close="showAwardPresentation = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </award-presentation>
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
import AfterRelease from "@/components/mainGameComponents/releaseMovie/afterRelease.vue";
import StudioTakeOverResponse from "@/components/mainGameComponents/financesMenu/StudioTakeOverResponse";
import AwardNomination from "@/components/mainGameComponents/awards/AwardNomination.vue";
import AwardPresentation from "@/components/mainGameComponents/awards/AwardPresentation.vue";
import ChooseMedium from "@/components/mainGameComponents/postProduction/mediums/chooseMedium.vue";
import CinemaNegotiation from "@/components/mainGameComponents/postProduction/mediums/cinemaNegotiation.vue";
import MarketingBudgetSelect from "@/components/mainGameComponents/postProduction/marketing/MarketingBudgetSelect.vue";

export default {
  name: "UpcomingEventsSection",
  components: {
    MarketingBudgetSelect,
    CinemaNegotiation,
    ChooseMedium,
    AwardPresentation,
    AwardNomination,
    StudioTakeOverResponse,
    AfterRelease,
    AfterReleaseWithCinemaRun,
    BeforeRelease,
    PostProductionSummary,
    ContinuePostProd,
    ProductionSummary,
    ContinueProd,
    PreProductionSummary,
    PostProdModal,
    ProdEventModal,
    PreProductionEvent,
    BackgroundTile,
    EventElement
  },
  data() {
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

      // data for showing marketing modals
      showChooseMediumModal: false,
      showCinemaNegotiationModal: false,
      showMarketingBudgetSelectModal: false,

      // data for showing continue modals
      showContinuePostProdModal: false,
      showContinueProdModal: false,

      // data for showing release modals
      showBeforeReleaseModal: false,
      showAfterReleaseWithCinemaRunModal: false,
      showAfterReleaseModal: false,

      // data for showing studio takeover
      showStudioTakeover: false,

      // data for showing award modals
      showAwardNomination: false,
      showAwardPresentation: false,

      awardType: '',

      chosenType: '',
      chosenEvent: null,
      beforeReleaseCompleted: 'none',
    }
  },

  watch: {
    '$store.getters.getCalendarEvents.length': function () {
      this.updateShowingEvents();
    }
  },

  methods: {
    goToEvent(event) {
      let allMoviesNotFinished = this.$store.getters.getInProductionMovies.concat(this.$store.getters.getCreatedMovies);
      if (event.movie !== '') {
        for (let i = 0; i < allMoviesNotFinished.length; i++) {
          if (allMoviesNotFinished[i]._preProduction.screenplay.title === event.movie) {
            this.$store.commit('setNewCurrentMovie', allMoviesNotFinished[i]);
          }
        }
      }
      if (event.type === 'dropOut' || event.type === 'recast' || event.type === 'creative' || event.type === 'difficulty' || event.type === 'extend') {
        this.showPreProductionModal = true;
        this.chosenType = event.type;
        this.chosenEvent = event;
      } else if (event.type === 'weather' || event.type === 'castMember' || event.type === 'budgetForCostumes' || event.type === 'equipment'
          || event.type === 'budget' || event.type === 'breakdown' || event.type === 'duration' || event.type === 'directorLeaves'
          || event.type === 'changes' || event.type === 'injured') {
        this.$store.commit('setCurrentProdEventType', event.type)
        this.showProductionModal = true;
        this.chosenEvent = event;
      } else if (event.type === 'sound' || event.type === 'postProductionProblem' || event.type === 'visualEffects' || event.type === 'visualQuality'
          || event.type === 'reshooting') {
        this.$store.commit('setCurrentPostProdEventType', event.type)
        this.showPostProductionModal = true;
        this.chosenEvent = event;
      } else if (event.type === 'preProductionFinished') {
        this.showPreProductionSummaryModal = true;
        console.log(this.$store.getters.getCurrentMovie)
      } else if (event.type === 'productionFinished') {
        this.showProductionSummaryModal = true;
        console.log(this.$store.getters.getCurrentMovie)
      } else if (event.type === 'postProductionFinished') {
        this.showPostProductionSummaryModal = true;
        console.log(this.$store.getters.getCurrentMovie)
        this.beforeReleaseCompleted = 'open';
      } else if (event.type === 'beforeRelease') {
        this.showBeforeReleaseModal = true;
        this.beforeReleaseCompleted = 'done';
      } else if (event.type === 'afterReleaseWithCinemaRun') {
        this.showAfterReleaseWithCinemaRunModal = true;
      } else if (event.type === 'afterRelease') {
        this.showAfterReleaseModal = true;
      } else if (event.type === 'studioTakeover') {
        this.showStudioTakeover = true
      } else if (event.type === 'internationalAwardNomination' || event.type === 'independentAwardNomination' || event.type === 'audienceAwardNomination') {
        this.showAwardNomination = true;
        this.awardType = event.type;
      } else if (event.type === 'internationalAwardPresentation' || event.type === 'independentAwardPresentation' || event.type === 'audienceAwardPresentation') {
        this.showAwardPresentation = true;
        this.awardType = event.type;
      } else if (event.type === 'testScreening') {
        this.$store.commit('setCurrentCalendarEvent', event);
        this.$router.push({name: 'testScreening'});
      }

      this.$store.commit('setCurrentCalendarEvent', event);
    },

    updateShowingEvents() {
      this.todayEvents = [];
      this.weekEvents = [];
      this.monthEvents = [];

      let sourceData = this.$store.getters.getCalendarEvents;
      let today = new Date(this.$store.getters.getCurrentDate.getFullYear(), this.$store.getters.getCurrentDate.getMonth(), this.$store.getters.getCurrentDate.getDate());
      today.setHours(1, 0, 0)
      let copiedToday = new Date(this.$store.getters.getCurrentDate.getFullYear(), this.$store.getters.getCurrentDate.getMonth(), this.$store.getters.getCurrentDate.getDate());
      let startDateOfWeek = new Date(copiedToday.setDate(copiedToday.getDate() - copiedToday.getDay()));
      let endDateOfWeek = new Date(copiedToday.setDate(copiedToday.getDate() - copiedToday.getDay() + 6));
      let startDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      let endDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      for (let i = 0; i < sourceData.length; i++) {
        let dateCheck = new Date(sourceData[i].start);
        dateCheck.setHours(1, 0, 0);
        if (dateCheck.getTime() === today.getTime()) {
          this.todayEvents.push(sourceData[i])
        } else if (dateCheck > startDateOfWeek && dateCheck < endDateOfWeek && dateCheck > today) {
          this.weekEvents.push(sourceData[i])
        } else if (dateCheck >= startDateOfMonth && dateCheck < endDateOfMonth && dateCheck > today) {
          this.monthEvents.push(sourceData[i])
        }
      }
    }
  },

  mounted() {
    this.updateShowingEvents();
  },
}
</script>

<style scoped>
#eventsSection {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#eventsSectionBgTile {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#eventsSectionContent {
  flex-grow: 1;
  flex-basis: 0;
  margin-top: 10px;
}

.date {
  font-size: 22px;
  margin-bottom: 10px;
}

.events {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}
</style>