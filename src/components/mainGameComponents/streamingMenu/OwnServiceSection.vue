<template>
  <div id="ownServiceSection">
    <h1>{{ $t('ownServiceHeader') }}</h1>
    <div id="ownServiceSectionInformation">
      <div>{{ $t('subscribers') }} {{ roundBudget(this.streamingService._subscribers) }}</div>
      <div>Profit {{ roundBudget(this.streamingService._profit) }}</div>
    </div>
    <div>
      {{ $t('price') }}
      <span class="minus" @click="subtractPrice">-</span>
      <span class="num">{{ this.streamingService._price.toFixed(2) }}</span>
      <span class="plus" @click="addPrice">+</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OwnServiceSection",

  data(){
    return {
      streamingService: this.$store.getters.getOwnStreamingService,
    }
  },

  methods: {
    addPrice(){
      this.streamingService._price = this.streamingService._price + 0.5;
    },

    subtractPrice(){
      if(this.streamingService._price > 0){
        this.streamingService._price = this.streamingService._price - 0.5;
      }
    },

    roundBudget(labelValue){
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
#ownServiceSection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}

#ownServiceSectionInformation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

span {
  width: 80%;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

span.num {
  pointer-events: none;
}

.minus, .plus {
  background-color: #FF4655;
  border-radius: 50%;
}

.minus {
  margin-right: 0.5em;
}

.plus {
  margin-left: 0.5em;
}
</style>