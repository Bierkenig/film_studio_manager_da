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
      }
    }
  },
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