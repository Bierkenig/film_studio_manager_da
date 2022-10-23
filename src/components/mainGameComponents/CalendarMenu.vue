<template>
  <div>
    <FullCalendar :options="calendarOptions"/>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import {reactive} from "vue";

const calendarOptions = reactive({
  plugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin, ListPlugin],
  initialView: 'dayGridMonth',
  initialDate: '2023-01-01',
});
</script>

<script>
export default {
  name: "CalendarMenu",
}
</script>

<style scoped>

</style>