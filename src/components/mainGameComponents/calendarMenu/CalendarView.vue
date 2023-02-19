<template>
  <div>
    <div v-for="(it, index) in months" :key="index">
      {{ it }} {{ getNumberOfWeeksInMonth(2026,index) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarView",

  data(){
    return {
      months: ['January', 'February', 'March','April','May','June','July','August','September', 'October', 'November','December'],
      monthStart: 1,
      monthEnd: 22,
    }
  },

  mounted() {

  },

  methods: {
    getNumberOfWeeksInMonth(year, month_number){
      var day = 0;
      var firstOfMonth = new Date(year, month_number, 1);
      var lastOfMonth = new Date(year, parseInt(month_number)+1, 0);

      if (firstOfMonth.getDay() == 0) {
        day = 2;
        firstOfMonth = firstOfMonth.setDate(day);
        firstOfMonth = new Date(firstOfMonth);
      } else if (firstOfMonth.getDay() != 1) {
        day = 9-(firstOfMonth.getDay());
        firstOfMonth = firstOfMonth.setDate(day);
        firstOfMonth = new Date(firstOfMonth);
      }

      var days = (lastOfMonth.getDate() - firstOfMonth.getDate())+1
      return Math.ceil( days / 7);
    }
  }
}
</script>

<style scoped>

</style>