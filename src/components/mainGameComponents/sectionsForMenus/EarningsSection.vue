<template>
  <div id="earningSection">
    <background-tile id="earningSectionBgTile" :title="$t('newsData.earnings')">
      <tile-pages-nav class="earningNavigation" :pages='["This Week","This Month"]' :gradient='true'>
        <div class="earningTextSection verticalScroll">
          <div v-for="(it, index) in this.weekEarnings.sort(function(a,b)
            {return new Date(b.date) - new Date(a.date);})"
               :key="index">
            <earning-element class="earningElement" movie-title="" :movie-earnings="'$ ' + roundBudget(it.amount)"/>
          </div>
        </div>
        <div class="earningTextSection verticalScroll">
          <div v-for="(it, index) in this.monthEarnings.sort(function(a,b)
            {return new Date(b.date) - new Date(a.date);})"
               :key="index">
            <earning-element class="earningElement" movie-title="" :movie-earnings="'$ ' + roundBudget(it.amount)"/>
          </div>
        </div>
      </tile-pages-nav>
    </background-tile>
  </div>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import EarningElement from "@/components/kitchenSink/EarningElement";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "EarningsSection",
  components: {BackgroundTile, EarningElement, TilePagesNav},
  data() {
    return {
      weekEarnings: [],
      monthEarnings: [],
      selectedTime: "Week",
    }
  },

  watch: {
    selectedTime() {
      this.changeEarnings();
    },

    "$store.getters.getEarnings.length": function (){
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

    roundBudget(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
    },

    changeEarnings() {
      let allEarning = this.$store.getters.getEarnings;
      this.weekEarnings = allEarning.filter(item => {
        return item.date > this.getLastWeeksDate();
      });

      this.monthEarnings = allEarning.filter(item => {
        return item.date > this.getLastMonthDate();
      });
    },
  },
  mounted() {
    this.changeEarnings();
  }
}

</script>

<style scoped>
#earningSection {
  display: flex;
  flex-direction: column;
}

#earningSectionBgTile {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.earningNavigation {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
}

.earningTextSection {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.earningElement {
  margin-bottom: 10px;
}
</style>