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
import financeMixin from "@/mixins/financeMixin";
import DayEvents from "@/components/mainGameComponents/calendarMenu/DayEvents";
import {i18next} from "@/translation/i18n";

export default {
  name: 'CalendarMenu',
  components: {DayEvents, FullCalendar},

  mixins: [financeMixin()],

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
      arg.borderColor = 'var(--fsm-dark-blue-4)';

      if(arg.event._def.extendedProps.type === 'productionFinished'){
        return {html: '<img ' +
              ' class="eventIconElements productionFinishedEvents"' +
              ' src="' + require('../../../assets/icons/simple-tick.svg') + '" ' +
              ' alt="productionFinishedIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'featureFilm'){
        return {html: '<img ' +
              ' class="eventIconElements featureFilmEvents"' +
              ' src="' + require('../../../assets/icons/rising-chart.svg') + '" ' +
              ' alt="featureFilmIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'blockbuster'){
        return {html: '<img ' +
              ' class="eventIconElements blockbusterEvents"' +
              ' src="' + require('../../../assets/icons/rising-chart.svg') + '" ' +
              ' alt="blockbusterIcon"/>'}
      } else if(arg.event._def.extendedProps.type === 'award'){
        return {html: '<img ' +
              ' class="eventIconElements awardEvents"' +
              ' src="' + require('../../../assets/icons/award.svg') + '" ' +
              ' alt="awardIcon"/>'}
      }
    }
  },
}
</script>

<style>
.fc-day-today {
  background-color: var(--fsm-dark-blue-4) !important;
}

.fc-day {
  background-color: var(--fsm-dark-blue-4);
}

.fc-button {
  background-color: var(--fsm-dark-blue-4) !important;
  border-style: none !important;
  box-shadow: none !important
}

.fc-day-other, .fc-day-disabled {
  background-color: var(--fsm-dark-blue-5) !important;
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
  background-color: #1C222F;
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
  background-color: var(--fsm-dark-blue-3);
  width: 70%;
  padding: 1em;
  border-radius: var(--fsm-m-border-radius);
}

#dayEventsElement {
  width: 30%;
}

.calendarContainer {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 15px;
}

.eventIconElements {
  width: var(--fsm-l-border-radius);
  height: var(--fsm-l-border-radius);
  border-radius: var(--fsm-l-border-radius);
  padding: 5px
}

.awardEvents {
  background-color: var(--fsm-light-yellow)
}

.blockbusterEvents {
  background-color: var(--fsm-light-blue)
}

.featureFilmEvents {
  background-color: var(--fsm-light-green)
}

.productionFinishedEvents {
  background-color: var(--fsm-pink-1)
}
</style>