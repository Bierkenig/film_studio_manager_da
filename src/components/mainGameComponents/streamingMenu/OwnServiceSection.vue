<template>
  <background-tile id="ownServiceSection" title="Information">
    <streaming-info-element
        :streaming-info-title="streamingService._name"
        :icon="this.$store.getters.getCurrentLogo"
        :popularity="streamingService._popularity"
        :subscribers="roundBudget(this.streamingService._subscribers)"
        :revenue="roundBudget(this.streamingService._profit)"
        :initial-price="this.streamingService._price"/>
  </background-tile>
</template>

<script>
import StreamingInfoElement from "@/components/kitchenSink/StreamingInfoElement.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "OwnServiceSection",
  components: {BackgroundTile, StreamingInfoElement},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      streamingService: this.$store.getters.getOwnStreamingService,
    }
  },

  watch: {
    'this.$store.getters.getOwnStreamingService._price': function () {
    }
  },

  methods: {
    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    },

    roundBudget(labelValue){
      let result = '';
      if (labelValue.toString().charAt(0) === '-') {
        result += '-';
      }
      if(this.$store.getters.getCurrentLanguage === 'en'){
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? result + (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? result + (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? result + (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                    : result + Math.abs(Number(labelValue));
      } else {
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? result + (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " Mrd"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? result + (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " Mio"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? result + (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " T"

                    : result + Math.abs(Number(labelValue));
      }
    },
  }
}
</script>

<style scoped>
</style>