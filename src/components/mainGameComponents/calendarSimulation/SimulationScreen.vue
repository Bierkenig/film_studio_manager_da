<template>
  <div class="simulationScreenMainDiv">
    <div class="simulationScreenElementDiv">
      <Transition name="slide-fade" id="transition">
        <animation-element v-if="show" :date="currentDate" @stop-animate="stopAnimate"/>
        <animation-element v-else :date="currentDate" @stop-animate="stopAnimate"/>
      </Transition>
    </div>

    <custom-button
        id="stopSimulationButton"
        :dark="false"
        size="medium"
        :disabled="stopButtonDisabled"
        @click="stopAnimate">Stop</custom-button>
  </div>
</template>

<script>
import AnimationElement from "@/components/mainGameComponents/calendarSimulation/AnimationElement";
import CustomButton from "@/components/kitchenSink/CustomButton";
import simulate from "@/simulation/simulation";
export default {
  name: "SimulationScreen",
  components: {CustomButton, AnimationElement},


  data(){
    return {
      show: true,
      currentDate: this.$store.getters.getCurrentDate,
      animationStatus: false,
      interval: null,
      stopButtonDisabled: false,
    }
  },

  mounted() {
    this.stopButtonDisabled = false;
    this.interval = setInterval(() => {
      this.animate()
    }, 4000)
  },

  methods: {
    stopAnimate(){
      this.stopButtonDisabled = true;
      clearInterval(this.interval)
      setTimeout(() => {
        this.$router.go(-1);
      }, 4000)
    },

    animate(){
      this.show = !this.show;
      this.currentDate = new Date(this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          this.currentDate.getDate() + 1);
      simulate();
      this.$store.commit('updateCurrentDate');
    }
  }
}
</script>

<style scoped>
.simulationScreenMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.simulationScreenElementDiv {
  display: flex;
  flex-direction: row;
}

#stopSimulationButton {
  margin-top: 15px;
  width: 300px;
}

.slide-fade-enter-active {
  transition: all 1s ease-in;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.slide-fade-enter-from{
  transform: translateX(50px);
  opacity: 0;
}
</style>