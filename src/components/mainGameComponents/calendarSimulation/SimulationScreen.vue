<template>
  <div class="simulationScreenMainDiv">
    <!--<div class="simulationScreenElementDiv">
      <Transition name="slide-fade" id="transition">
        <animation-element v-if="show" :date="currentDate" @stop-animate="stopAnimate"/>
        <animation-element v-else :date="currentDate" @stop-animate="stopAnimate"/>
      </Transition>
    </div>-->
    <div class="simulationScreenNewsBox">
      <background-tile :title="$t('news2')">
        <div class="simulationScreenNewsContainer">
          <div v-for="(it, index) in this.news" :key="index">
            <news-element svg-code="" :heading-text="it._title"
                          :info-text="it._description" class="newsElement"/>
          </div>
        </div>
      </background-tile>
    </div>

    <div class="simulationScreenCalendarBox">
      <div class="simulationScreenCalendarItemsBox">
        <div class="simulationScreenCalendarItems">
          <animation-element :date="currentDate" @stopAnimate="stopAnimate"/>
          <animation-element :date="currentDatePlusOne" @stopAnimate="stopAnimate"/>
          <animation-element :date="currentDatePlusTwo" @stopAnimate="stopAnimate"/>
          <animation-element :date="currentDatePlusThree" @stopAnimate="stopAnimate"/>
        </div>
        <div class="meterBox">
          <div class="meter">
            <span ref="simulationBar" style="width:0"></span>
          </div>
        </div>
      </div>
    </div>

    <custom-button
        id="stopSimulationButton"
        :dark="false"
        size="medium"
        :disabled="stopButtonDisabled"
        @clicked="stopAnimate">Stop</custom-button>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton";
import simulate from "@/simulation/simulation";
import NewsElement from "@/components/kitchenSink/NewsElement.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import AnimationElement from "@/components/mainGameComponents/calendarSimulation/AnimationElement.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "SimulationScreen",
  components: {AnimationElement, BackgroundTile, NewsElement, CustomButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],


  data(){
    return {
      currentDate: this.$store.getters.getCurrentDate,
      currentDatePlusOne: new Date(this.$store.getters.getCurrentDate.getFullYear(), this.$store.getters.getCurrentDate.getMonth(), this.$store.getters.getCurrentDate.getDate() + 1),
      currentDatePlusTwo: new Date(this.$store.getters.getCurrentDate.getFullYear(), this.$store.getters.getCurrentDate.getMonth(), this.$store.getters.getCurrentDate.getDate() + 2),
      currentDatePlusThree: new Date(this.$store.getters.getCurrentDate.getFullYear(), this.$store.getters.getCurrentDate.getMonth(), this.$store.getters.getCurrentDate.getDate() + 3),
      animationStatus: false,
      interval: null,
      stopButtonDisabled: false,
      news: [],
    }
  },

  watch: {
    "$store.state.news.length"() {
      this.loadData();
    },
    "$store.state.currentDate"() {
      this.currentDatePlusOne = new Date(this.$store.getters.getCurrentDate.getFullYear(), this.$store.getters.getCurrentDate.getMonth(), this.$store.getters.getCurrentDate.getDate() + 1);
      this.currentDatePlusTwo = new Date(this.$store.getters.getCurrentDate.getFullYear(), this.$store.getters.getCurrentDate.getMonth(), this.$store.getters.getCurrentDate.getDate() + 2);
      this.currentDatePlusThree = new Date(this.$store.getters.getCurrentDate.getFullYear(), this.$store.getters.getCurrentDate.getMonth(), this.$store.getters.getCurrentDate.getDate() + 3);

    },
  },

  mounted() {
    window.ipcRenderer.send("updateDiscordDetails", "In Game: Simulating...")

    this.loadData();
    setTimeout(this.animateBar, 10)
    setTimeout(this.resetBar,3490);
    this.stopButtonDisabled = false;

    this.interval = setInterval(() => {
      setTimeout(this.animateBar, 10)
      setTimeout(this.resetBar,3490);
      this.animate()
      setTimeout(function() {

      },500);
    }, 3500)
  },

  methods: {
    loadData() {
      this.news = [];
      let sourceData = this.$store.getters.getCurrentNews;
      sourceData.sort((a, b) => b._date - a._date)
      for (let i = 0; i < sourceData.length; i++) {
        this.news.push(sourceData[i])
        if(i === 2){
          break;
        }
      }
    },

    stopAnimate(){
      this.stopButtonDisabled = true;
      clearInterval(this.interval)
      setTimeout(() => {
        this.$router.go(-1);
      }, 3500)
    },

    animate(){
      this.currentDate = new Date(this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          this.currentDate.getDate() + 1);
      simulate();
      this.$store.commit('updateCurrentDate');
    },

    animateBar() {
      this.$refs.simulationBar.style.setProperty("transition", "width 2.5s ease-in-out")
      this.$refs.simulationBar.style.setProperty("width", "100%")
    },

    resetBar(){
      this.$refs.simulationBar.style.setProperty("transition", "none")
      this.$refs.simulationBar.style.setProperty("width", "0")
    }
  },
}
</script>

<style scoped>
.simulationScreenMainDiv {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.simulationScreenNewsBox {
  width: 85%;
}

.simulationScreenNewsContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  width: 100%;
  height: 150px;
}

.simulationScreenCalendarBox {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 20px;
}

.simulationScreenCalendarItemsBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-l-border-radius);

  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.simulationScreenCalendarItems {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  width: 100%;
}

#stopSimulationButton {
  position: absolute;
  float: right;
  right: 100px;
  bottom: 20px;
  width: 15%;
}

.newsElement {
  width: 100%;
}

.meterBox {
  padding: 5px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  text-align: center;
}

.meter {
  box-sizing: content-box;
  height: 10px;
  width: 100%;
  position: relative;

  background: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
}

.meter > span {
  display: block;
  height: 100%;
  border-radius: var(--fsm-l-border-radius);
  background-color: var(--fsm-pink-1);
  position: relative;
  overflow: hidden;
  transition: width 6s ease-in-out;
}
</style>