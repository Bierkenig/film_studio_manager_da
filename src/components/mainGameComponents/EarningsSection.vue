<template>
  <div id="earningSection">
    <h1>{{ $t('earnings') }}</h1>
    <div>
      <div>
        <input id="week" v-model="timeEarnings" type="radio" class="time" value="week" v-on:change="changeEarnings"/>
        <label for="week" class="labelRadio">{{ $t('week') }}</label>
      </div>
      <div>
        <input id="month" v-model="timeEarnings" type="radio" class="time" value="month" v-on:change="changeEarnings"/>
        <label for="month" class="labelRadio">{{ $t('month') }}</label>
      </div>
    </div>
    <div id="earningTextSection">
      <div v-for="(it, index) in this.showEarnings" :key="index">
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
      timeEarnings: "week",
    }
  },

  methods: {
    getLastWeeksDate() {
      const now = new Date();

      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    },

    changeEarnings(){
      let allEarning = this.$store.getters.getEarnings;
      this.showEarnings = allEarning.filter(item => {
        if(this.timeEarnings === 'week'){
          return item.date > this.getLastWeeksDate();
        } else {
          return item.date < this.getLastWeeksDate();
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
  margin: 3em;
  background-color: #2c3e50;
  overflow-y: scroll;
  width: 80%;
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