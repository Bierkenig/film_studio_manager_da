<template>
  <div>
    <FullCalendar :options="calendarOptions"/>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
//import $ from "jquery";

export default {
  name: 'CalendarMenu',
  components: {FullCalendar},
  data(){
    return{
      calendarOptions: {
        plugins: [DayGridPlugin, InteractionPlugin, ListPlugin, TimeGridPlugin],
        initialView: 'dayGridMonth',
        initialDate: this.$store.getters.getCurrentDate,
        headerToolbar: {
          start: 'prev',
          center: 'title',
          end: 'next'
        },
        height: 550,
        validRange: {
          start: '2023-01-01'
        },
        events: [
          {
            title  : 'event2',
            start  : '2023-01-05',
            end    : '2023-01-07'
          },
        ],
        selectable: true,
        dateClick: this.handleDateClick,
      }
    }
  },

  methods: {
    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr)
    }
  }

  /*mounted(){
    function addClassByDate(date) {
      let dataAttr = getDataAttr(date);
      $("[data-date='" + dataAttr + "']").addClass("today");
    }

    function getDataAttr(date) {
      return date.getFullYear() + "-" + (date.getMonth().toString.length === 2 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) + "-" + (date.getDate().toString().length === 2 ? date.getDate() : "0" + date.getDate());
    }

    addClassByDate(this.$store.getters.getCurrentDate)
  }*/
}
</script>

<style>
.fc-day-today {
  background-color: inherit !important;
}

.today {
  background-color: blue;
}
</style>