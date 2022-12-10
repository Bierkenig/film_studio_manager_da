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
        locale: this.$store.getters.getCurrentLanguage,
        headerToolbar: {
          start: 'prev title next',
          center: '',
          end: ''
        },
        height: 550,
        validRange: {
          start: '2023-01-01'
        },
        selectable: true,
        events: this.$store.getters.getEvents,
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
    ...mapGetters(["getEvents"]),
    ...mapGetters({currentDate: 'getCurrentDate'})
  },

  watch: {
    currentDate: function(){
      this.$refs.fullCalendar.calendar.gotoDate(this.currentDate)
    }
  },

  methods: {
    handleClick(arg) {
      let eventsOfDay = [];
      let yourDate = arg.date;

      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - (offset*60*1000));

      yourDate = yourDate.toISOString().split('T')[0];

      for(const [index] in this.$store.getters.getEvents){
        let start = this.$store.getters.getEvents[index].start;
        let end = this.$store.getters.getEvents[index].end;
        if (yourDate >= start && yourDate < end) {
          eventsOfDay.push(this.$store.getters.getEvents[index]);
        }
      }

      if(arg !== this.lastClickedDay && this.lastClickedDay !== null){
        this.lastClickedDay.dayEl.style.borderStyle = 'none';
      }
      arg.dayEl.style.border = '4px solid #ff4655'
      arg.dayEl.style.boxShadow = 'rgba(255, 58, 77, 0.5)'

      this.clickedDay = arg.date;
      this.lastClickedDay = arg;
      this.eventProp = eventsOfDay;
      this.showModal = true;
    },

    checkEvent(arg){
      if(arg.event._def.extendedProps.type === 'productionFinished'){
       arg.backgroundColor = '#FF4655';
       arg.borderColor = '#FF4655';
       // arg.backgroundColor = 'inherit';
       // arg.borderRight = 'none';
       // element.find("div.fc-content").prepend("<img src='" + event.imageurl +"' width='12' height='12'>");

      } else if(arg.event._def.extendedProps.type === 'featureFilm'){
        arg.backgroundColor = '#46FF54';
        arg.borderColor = '#46FF54';
      } else if(arg.event._def.extendedProps.type === 'blockbuster'){
        arg.backgroundColor = '#46AEFF';
        arg.borderColor = '#46AEFF';
      } else if(arg.event._def.extendedProps.type === 'award'){
        arg.backgroundColor = '#FFED46';
        arg.borderColor = '#FFED46';
      }
    }
  },
}
</script>

<style>
.fc-day-today {
  background-color: inherit !important;
}

.fc-day {
  background-color: var(--fsm-dark-blue-4);
}

.fc-button {
  background-color: var(--fsm-dark-blue-4) !important;
  border-style: none !important;
}

.fc-day-other {
  background-color: var(--fsm-dark-blue-5);
}

.fc td, .fc th {
  border-style: none;
  border-radius: var(--fsm-m-border-radius);
  /*border-collapse: separate;
  border-spacing: 10px; /* cellspacing */
}

.fc table {
  border-collapse: separate;
  border-spacing: 10px; /* cellspacing*/
}

.fc td {
  border-spacing: 0 !important;
  border-collapse: unset !important;
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

.fc-toolbar-chunk {
  display: flex;
  flex-direction: row;
  background-color: #1C222F;
  border-radius: var(--fsm-m-border-radius);
}

.fc-toolbar {
  margin-left: 20px;
}

#calendar {
  background-color: var(--fsm-dark-blue-3);
  width: 70%;
  padding: 1em;
  border-radius: var(--fsm-m-border-radius);
}

.fc {
  min-height: 100%;
}

#dayEventsElement {
  width: 30%;
}

.calendarContainer {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

</style>