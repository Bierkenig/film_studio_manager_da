<template>
  <div class="calendarContainer">
    <FullCalendar
        id="calendar"
        :options="calendarOptions"
        ref="fullCalendar"/>

    <transition name="modal">
      <event-modal v-if="showModal" :event="eventProp" @close="showModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </event-modal>
    </transition>
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
import EventModal from "@/components/mainGameComponents/calendarMenu/EventModal";
import financeMixin from "@/mixins/financeMixin";

export default {
  name: 'CalendarMenu',
  components: {EventModal, FullCalendar},

  mixins: [financeMixin()],

  data(){
    return{
      calendarOptions: {
        plugins: [DayGridPlugin, InteractionPlugin, ListPlugin, TimeGridPlugin],
        initialView: 'dayGridMonth',
        initialDate: this.$store.getters.getCurrentDate,
        locale: this.$store.getters.getCurrentLanguage,
        headerToolbar: {
          start: 'prev',
          center: 'title',
          end: 'next'
        },
        height: 550,
        validRange: {
          start: '2023-01-01'
        },
        selectable: true,
        events: this.$store.getters.getEvents,
        dateClick: this.handleClick,
      },
      showModal: false,
      eventProp: Object,
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

      this.eventProp = eventsOfDay;
      this.showModal = true;
    },
  },
}
</script>

<style>
.fc-day-today {
  background-color: inherit !important;
}

/*.calendarContainer {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

#dayInformationElement {
  width: 20%;
}*/
</style>