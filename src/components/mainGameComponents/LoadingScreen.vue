<template>
  <video v-if="this.$store.state.currentLanguage === 'de'" class="videoPlay" autoplay>
    <source src="../../../src/animation/FSM_Hintergrundanimation_ger_v3.mp4">
  </video>

  <video v-if="this.$store.state.currentLanguage === 'en'" class="videoPlay" autoplay>
    <source src="../../../src/animation/FSM_Hintergrundanimation_eng_v3.mp4">
  </video>
</template>

<script>

export default {
  name: "LoadingScreen",
  components: {},
  props: {
    nextRoute: String,
    title: String,
    duration: String
  },
  mounted() {
    setTimeout(this.animateBar, 10)
    setTimeout(() => this.$router.push({name: this.nextRoute}), 4000)
  },
  methods: {
    animateBar() {
      this.$refs.bar.style.setProperty("transition", "width " +  this.duration + "s ease-in-out")
      this.$refs.bar.style.setProperty("width", "100%")
    }
  },
}
</script>

<style scoped>
.videoPlay {
  width: 100%;
  height: 100%;
  margin-left: 0.01%;
}
.loadingScreenMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loadingScreenBG {
  width: 50%;
}

.meterBox {
  padding: 20px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
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