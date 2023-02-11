<template>
  <div class="calendarContainer">
    <FullCalendar
        id="calendar"
        :options="calendarOptions"
        ref="fullCalendar"/>

    <day-events id="dayEventsElement" :event="this.eventProp" :clicked-day="this.clickedDay"/>

    <!--<transition name="modal">
      <event-modal v-if="showModal" :event="eventProp" @close="showModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </event-modal>
    </transition>-->
    <!--<day-information
        id="dayInformationElement"
        :event="this.eventProp"
        :clicked-day="this.clickedDay"/>-->
  </div>
</template>

<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import {mapGetters} from 'vuex'
//import EventModal from "@/components/mainGameComponents/calendarMenu/EventModal";
import DayEvents from "@/components/mainGameComponents/calendarMenu/DayEvents";
import {i18next} from "@/translation/i18n";

export default {
  name: 'CalendarMenu',
  components: {DayEvents, FullCalendar},

  data(){
    return{
      calendarOptions: {
        plugins: [DayGridPlugin, InteractionPlugin, ListPlugin, TimeGridPlugin],
        initialView: 'dayGridMonth',
        initialDate: this.$store.getters.getCurrentDate,
        firstDay: 1,
        locale: this.$store.getters.getCurrentLanguage,
        headerToolbar: {
          start: 'prev title next',
          center: '',
          end: ''
        },
        validRange: {
          start: '2023-01-01'
        },
        contentHeight: 400,
        selectable: true,
        events: this.$store.getters.getCalendarEvents,
        eventContent: this.checkEvent,
        dateClick: this.handleClick,
      },
      showModal: false,
      eventProp: Object,
      clickedDay: null,
      lastClickedDay: null,
      counter: 0
    }
  },

  computed: {
    ...mapGetters(["getCalendarEvents"]),
    ...mapGetters({currentDate: 'getCurrentDate'})
  },

  watch: {
    currentDate: function(){
      this.$refs.fullCalendar.calendar.gotoDate(this.currentDate)
    }
  },

  mounted(){
    document.getElementsByClassName('fc-next-button')[0].setAttribute('data-title',i18next.t('nextMonth'));
    document.getElementsByClassName('fc-next-button')[0].removeAttribute('title');
    document.getElementsByClassName('fc-prev-button')[0].setAttribute('data-title',i18next.t('previousMonth'));
    document.getElementsByClassName('fc-prev-button')[0].removeAttribute('title');

    window.ipcRenderer.send("updateDiscordDetails", "In Game: Calender Menu")

  },

  methods: {
    handleClick(arg) {
      let eventsOfDay = [];
      let yourDate = arg.date;

      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - (offset*60*1000));

      yourDate = yourDate.toISOString().split('T')[0];

      for(const [index] in this.$store.getters.getCalendarEvents){
        let start = this.$store.getters.getCalendarEvents[index].start;
        let end = this.$store.getters.getCalendarEvents[index].end;
        if (yourDate >= start && yourDate < end) {
          eventsOfDay.push(this.$store.getters.getCalendarEvents[index]);
        }
      }

      if(arg !== this.lastClickedDay && this.lastClickedDay !== null){
        this.lastClickedDay.dayEl.style.boxShadow = 'none';
        this.lastClickedDay.dayEl.children[0].children[0].children[0].style.color = 'inherit';
        this.lastClickedDay.dayEl.children[0].children[0].children[0].style.fontWeight = 'var(--fsm-fw-medium)';
      }
      arg.dayEl.style.boxShadow = 'inset 0px 0px 0px 4px var(--fsm-pink-1)'

      arg.dayEl.children[0].children[0].children[0].style.color = 'var(--fsm-pink-1)';
      arg.dayEl.children[0].children[0].children[0].style.fontWeight = 'var(--fsm-fw-bold)';
      arg.dayEl.children[0].children[0].children[0].style.float = 'left'


      this.clickedDay = arg.date;
      this.lastClickedDay = arg;
      this.eventProp = eventsOfDay;
      this.showModal = true;
    },

    checkEvent(arg){
      arg.backgroundColor = 'inherit';
      arg.borderColor = 'var(--fsm-dark-blue-2)';

      if(arg.event._def.extendedProps.type === 'dropOut' || arg.event._def.extendedProps.type === 'recast'
        || arg.event._def.extendedProps.type === 'creative' || arg.event._def.extendedProps.type === 'difficulty'
        || arg.event._def.extendedProps.type === 'extend'){
        return {html: '<img ' +
              ' class="eventIconElements preProductionEvents"' +
              ' src="' + require('../../../assets/icons/action.svg') + '" ' +
              ' alt="preProductionIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'preProductionFinished') {
        return {html: '<img ' +
              ' class="eventIconElements preProductionEvents"' +
              ' src="' + require('../../../assets/icons/simple-tick.svg') + '" ' +
              ' alt="preProductionIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'weather' || arg.event._def.extendedProps.type === 'castMember'
          || arg.event._def.extendedProps.type === 'budgetForCostumes' || arg.event._def.extendedProps.type === 'equipment'
          || arg.event._def.extendedProps.type === 'budget' || arg.event._def.extendedProps.type === 'breakdown'
          || arg.event._def.extendedProps.type === 'duration' || arg.event._def.extendedProps.type === 'directorLeavesProduction'
          || arg.event._def.extendedProps.type === 'changes' || arg.event._def.extendedProps.type === 'injured') {
        return {html: '<img ' +
              ' class="eventIconElements productionEvents"' +
              ' src="' + require('../../../assets/icons/action.svg') + '" ' +
              ' alt="productionIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'productionFinished'){
        return {html: '<img ' +
              ' class="eventIconElements productionEvents"' +
              ' src="' + require('../../../assets/icons/simple-tick.svg') + '" ' +
              ' alt="productionIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'testScreening' || arg.event._def.extendedProps.type === 'sound'
          || arg.event._def.extendedProps.type === 'postProductionProblem' || arg.event._def.extendedProps.type === 'visualEffects'
          || arg.event._def.extendedProps.type === 'visualQuality' || arg.event._def.extendedProps.type === 'reshooting') {
        return {html: '<img ' +
              ' class="eventIconElements postProductionEvents"' +
              ' src="' + require('../../../assets/icons/action.svg') + '" ' +
              ' alt="postProductionIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'postProductionFinished'){
        return {html: '<img ' +
              ' class="eventIconElements postProductionEvents"' +
              ' src="' + require('../../../assets/icons/simple-tick.svg') + '" ' +
              ' alt="postProductionIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'internationalAward' || arg.event._def.extendedProps.type === 'independentAward'
          || arg.event._def.extendedProps.type === 'audienceAward'){
        return {html: '<img ' +
              ' class="eventIconElements remainingEvents"' +
              ' src="' + require('../../../assets/icons/award.svg') + '" ' +
              ' alt="remainingEventsIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'beforeRelease' || arg.event._def.extendedProps.type === 'afterReleaseWithCinemaRun'
          || arg.event._def.extendedProps.type === 'afterRelease'){
        return {html: '<img ' +
              ' class="eventIconElements remainingEvents"' +
              ' src="' + require('../../../assets/icons/documentary.svg') + '" ' +
              ' alt="remainingEventsIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'studioTakeover'){
        return {html: '<img ' +
              ' class="eventIconElements remainingEvents"' +
              ' src="' + require('../../../assets/icons/studio.svg') + '" ' +
              ' alt="remainingEventsIcon"/>'}
      }
    }
  },
}
</script>

<style>
.fc-day-today {
  background-color: var(--fsm-dark-blue-2) !important;
}

.fc-day {
  background-color: var(--fsm-dark-blue-2);
}

.fc-button {
  background-color: var(--fsm-dark-blue-2) !important;
  border-style: none !important;
  box-shadow: none !important
}

.fc-day-other, .fc-day-disabled {
  background-color: var(--fsm-dark-blue-3) !important;
}

.fc td, .fc th {
  border-style: none;
  border-radius: var(--fsm-m-border-radius);
}

.fc table {
  border-collapse: separate;
  border-spacing: 10px; /* cellspacing*/
}

.fc td {
  border-spacing: 0 !important;
  border-collapse: unset !important;
  overflow: hidden;
}

.fc-scrollgrid {
  border: none !important;
}

.fc-scroller {
  overflow: hidden !important;
}

.fc-scroller-liquid-absolute {
  overflow: hidden scroll !important;
}

@media screen and (min-height: 975px) {
  .fc-scroller-liquid-absolute {
    overflow: hidden !important;
  }
}

.fc-col-header-cell {
  text-align: center;
  height: 30px;
  align-items: center;
}

.fc-daygrid-day-frame {
  padding: 5px;
}

.fc-toolbar-chunk {
  display: flex;
  flex-direction: row;
  background-color: var(--fsm-dark-blue-2);
  border-radius: var(--fsm-m-border-radius);
}

.fc-toolbar {
  margin-left: 20px;
}

.fc-highlight {
  display: none;
}

.fc-daygrid-day-events {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 0 5px 3px;
}

#calendar {
  width: 70%;
  padding: 1em;
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);
}

#dayEventsElement {
  width: 30%;
}

.calendarContainer {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.eventIconElements {
  width: var(--fsm-l-border-radius);
  height: var(--fsm-l-border-radius);
  border-radius: var(--fsm-l-border-radius);
  padding: 5px
}

.remainingEvents {
  background-color: var(--fsm-light-yellow)
}

.preProductionEvents {
  background-color: var(--fsm-light-blue)
}

.postProductionEvents {
  background-color: var(--fsm-light-green)
}

.productionEvents {
  background-color: var(--fsm-pink-1)
}
</style>