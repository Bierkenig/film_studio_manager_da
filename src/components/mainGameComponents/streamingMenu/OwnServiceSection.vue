<template>
  <div id="ownServiceSection">
    <h1>Information on own service</h1>
    <div id="ownServiceSectionInformation">
      <div>Subscribers {{ this.streamingService._subscribers }}</div>
      <div>Profit {{ this.streamingService._profit }}</div>
    </div>
    <div>
      Price
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
    }
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