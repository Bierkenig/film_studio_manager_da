<template>
  <background-tile id="ownServiceSection" title="Information">
    <streaming-info-element
        :streaming-info-title="streamingService._name"
        :icon="this.$store.getters.getCurrentLogo"
        :popularity="streamingService._popularity"
        :subscribers="roundBudget(this.streamingService._subscribers)"
        :revenue="this.streamingService._profit.toString()"
        :initial-price="this.streamingService._price"/>
  </background-tile>
</template>

<script>
import StreamingInfoElement from "@/components/kitchenSink/StreamingInfoElement.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "OwnServiceSection",
  components: {BackgroundTile, StreamingInfoElement},

  data() {
    return {
      streamingService: this.$store.getters.getOwnStreamingService,
    }
  },

  watch: {
    'this.$store.getters.getOwnStreamingService._price': function () {
      console.log(this.$store.getters.getOwnStreamingService._price)
    }
  },

  methods: {
    roundBudget(labelValue) {
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
  }
}
</script>

<style scoped>
</style>