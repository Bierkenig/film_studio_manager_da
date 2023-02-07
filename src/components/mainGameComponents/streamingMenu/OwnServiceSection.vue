<template>
  <background-tile id="ownServiceSection" title="Information">
    <streaming-info-element
        :streaming-info-title="streamingService._name"
        :icon="this.$store.getters.getCurrentLogo"
        :popularity="streamingService._popularity"
        :subscribers="currencyFormatDE(this.streamingService._subscribers)"
        :revenue="currencyFormatDE(this.streamingService._profit)"
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
    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    }
  }
}
</script>

<style scoped>
</style>