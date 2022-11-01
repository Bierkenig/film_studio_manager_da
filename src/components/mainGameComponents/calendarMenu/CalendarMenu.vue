<template>
  <div>
    <FullCalendar
        id="calendar"
        ref="calendar"
        :options="calendarOptions"/>

    <transition name="modal">
      <event-modal v-if="showModal" :event="eventProp" @close="showModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </event-modal>
    </transition>
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
//import $ from "jquery";

export default {
  name: 'CalendarMenu',
  components: {EventModal, FullCalendar},
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
        now: this.$store.getters.getCurrentDate,
      },
      showModal: false,
      eventProp: Object,
    }
  },

  computed: {
    ...mapGetters(["getEvents"])
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
    }
  },

  /*mounted(){
    function addClassByDate(date) {
      let dataAttr = getDataAttr(date);
      $("[data-date='" + dataAttr + "']").addClass("today");
    }

    function getDataAttr(date) {
      return date.getFullYear() + "-" + (date.getMonth().toString.length === 2 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) + "-" + (date.getDate().toString().length === 2 ? date.getDate() : "0" + date.getDate());
    }

    addClassByDate(this.$store.getters.getCurrentDate);
  }*/

  mounted() {
    //this.$root.calendar = this.$refs.calendar;
  }
}
</script>

<style>
.today {
  background-color: blue;
}
</style>