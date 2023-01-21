<template>
  <div class="simulationScreenMainDiv">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <div class="simulationScreenElementDiv">
              <Transition name="slide-fade" id="transition">
                <animation-element v-if="show" :date="currentDate" @stop-animate="stopAnimate"/>
                <animation-element v-else :date="currentDate" @stop-animate="stopAnimate"/>
              </Transition>
            </div>
          </div>
          <custom-button
              id="stopSimulationButton"
              :dark="false"
              size="medium"
              @click="stopAnimate">Stop</custom-button>
        </div>
      </div>
    </div>
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
    }
  },

  mounted() {
    this.interval = setInterval(() => {
      this.animate()
    }, 5000)
  },

  methods: {
    stopAnimate(){
      clearInterval(this.interval)
      setTimeout(() => {
        this.$emit('close');
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

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>