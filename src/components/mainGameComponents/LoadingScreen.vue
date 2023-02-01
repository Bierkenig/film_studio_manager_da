<template>
  <div class="loadingScreenMainDiv">
    <div class="loadingScreenBG">
      {{ $t('loading') }}
      <div class="meterBox">
        <div class="meter">
          <span ref="bar" style="width:0"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: {
    nextRoute: String,
  },
  mounted() {
    setTimeout(this.startBar, 500)
    setTimeout(() => this.$router.push({name: this.nextRoute}), 7000)
  },
  methods: {
    startBar: function () {
      this.$refs.bar.style.setProperty("width", "100%")
    }
  },
}
</script>

<style scoped>
.loadingScreenMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loadingScreenBG {
  display: inline-block;
  border-radius: var(--fsm-l-border-radius);
  padding: var(--fsm-l-border-radius);
  width: 50%;
  box-sizing: border-box;
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
}

.meterBox {
  margin: 10px;
  padding: 20px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
}

.meter {
  box-sizing: content-box;
  height: 10px;
  width: 100%;
  position: relative;

  background: var(--fsm-white);
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