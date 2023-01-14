<template>
  <div id="earningSection">
    <h1 id="earningsHeading">{{ $t('newsData.earnings') }}</h1>

    <!--    <div>-->
    <!--      <select-->
    <!--          v-model="selectedTime">-->
    <!--        <option value="Week">{{ $t('week') }}</option>-->
    <!--        <option value="Month">{{ $t('month') }}</option>-->
    <!--      </select>-->
    <!--    </div>-->

    <div>
      <tile-pages-nav class="earningNavigation" :pages='["This Week","This Month"]' :gradient='true'>
        <div class="earningTextSection scroll verticalScroll">
          <div v-for="(it, index) in this.weekEarnings.sort(function(a,b)
            {return new Date(b.date) - new Date(a.date);})"
               :key="index">
            <earning-element class="earningElement" movie-title="Movie Title" :movie-earnings="'$ ' + it.value"/>
          </div>
        </div>
        <div class="earningTextSection scroll verticalScroll">
          <div v-for="(it, index) in this.monthEarnings.sort(function(a,b)
            {return new Date(b.date) - new Date(a.date);})"
               :key="index">
            <earning-element class="earningElement" movie-title="Movie Title" :movie-earnings="'$ ' + it.value"/>
          </div>
        </div>
      </tile-pages-nav>
    </div>
  </div>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import EarningElement from "@/components/kitchenSink/EarningElement";

export default {
  name: "EarningsSection",
  components: {EarningElement, TilePagesNav},
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
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  color: white;
}

.earningTextSection {
  width: 100%;
  overflow-y: scroll;
}

#earningsHeading {
  font-size: 28px;
  color: var(--fsm-pink-1);
  margin-top: 0.7em;
  margin-left: 0.7em;
  margin-bottom: 0
}

.scroll {
  height:255px
}
.earningElement {
  margin-bottom: 5px;
}

.earningNavigation {
  margin: 15px
}
</style>