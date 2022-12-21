<template>
  <div id="earningSection">
    <h1>{{ $t('earnings') }}</h1>

    <div>
      <select
          v-model="selectedTime">
        <option value="Week">{{ $t('week') }}</option>
        <option value="Month">{{ $t('month') }}</option>
      </select>
    </div>

    <div id="earningTextSection">
      <div v-for="(it, index) in this.showEarnings.sort(function(a,b)
            {return new Date(b.date) - new Date(a.date);})"
           :key="index">
        {{ it.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EarningsSection",

  data(){
    return {
      showEarnings: [],
      selectedTime: "Week",
    }
  },

  watch: {
    selectedTime(){
      this.changeEarnings();
    }
  },

  methods: {
    getLastWeeksDate() {
      const now = this.$store.getters.getCurrentDate;

      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    },

    getLastMonthDate() {
      const now = this.$store.getters.getCurrentDate;

      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    },

    changeEarnings(){
      let allEarning = this.$store.getters.getEarnings;
      this.showEarnings = allEarning.filter(item => {
        if(this.selectedTime === 'Week'){
          return item.date > this.getLastWeeksDate();
        } else {
          return item.date > this.getLastMonthDate();
        }
      });
    }
  },

  mounted() {
    this.changeEarnings();
  }
}
</script>

<style scoped>
#earningSection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}

#earningTextSection {
  background-color: #2c3e50;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-button {
  height: 1.5em;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1C222F;
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(226, 226, 226);
  border-radius: 20px;
}
</style>