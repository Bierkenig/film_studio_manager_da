<template>
  <div class="loadingScreenMainDiv">
    <background-tile class="loadingScreenBG" :title="title">
      <div class="meterBox">
        <div class="meter">
          <span ref="bar" style="width:0"></span>
        </div>
      </div>
    </background-tile>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "LoadingScreen",
  components: {BackgroundTile},
  props: {
    nextRoute: String,
    title: String,
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