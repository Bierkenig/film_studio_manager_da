<template>
  <div id="earningSection">
    <background-tile :title="$t('newsData.earnings')">
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
}

.earningTextSection {
  width: 100%;
  overflow-y: scroll;
}

.scroll {
  height:170px
}
.earningElement {
  margin-bottom: 5px;
}

.earningNavigation {
  margin: 15px
}
</style>