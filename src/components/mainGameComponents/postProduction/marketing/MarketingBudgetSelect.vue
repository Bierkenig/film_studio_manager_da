<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <div>
                {{ screenplayType }}
                {{ scope }}

                <div v-if="screenplayType === 'Feature'">
                  <div>Print</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valuePrint" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valuePrint" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valuePrint" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valuePrint" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valuePrint" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                  {{valuePrint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}


                  <div>Internet</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valueInternet" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valueInternet" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valueInternet" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valueInternet" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valueInternet" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                  {{valueInternet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                  <div>Commercial</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valueCommercial" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valueCommercial" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valueCommercial" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valueCommercial" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valueCommercial" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                  {{valueCommercial.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                </div>

                <div v-if="screenplayType === 'Indie'">
                  <div>Print</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valuePrint" class="slide" type="range" :min="100000" :max="1000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valuePrint" class="slide" type="range" :min="1000000" :max="2500000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valuePrint" class="slide" type="range" :min="2500000" :max="5000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valuePrint" class="slide" type="range" :min="5000000" :max="7500000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valuePrint" class="slide" type="range" :min="7500000" :max="10000000" :step="100">

                  {{valuePrint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}

                  <div>Internet</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valueInternet" class="slide" type="range" :min="100000" :max="1000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valueInternet" class="slide" type="range" :min="1000000" :max="2500000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valueInternet" class="slide" type="range" :min="2500000" :max="5000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valueInternet" class="slide" type="range" :min="5000000" :max="7500000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valueInternet" class="slide" type="range" :min="7500000" :max="10000000" :step="100">
                  {{valueInternet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}

                  <div>Commercial</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valueCommercial" class="slide" type="range" :min="100000" :max="1000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valueCommercial" class="slide" type="range" :min="1000000" :max="2500000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valueCommercial" class="slide" type="range" :min="2500000" :max="5000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valueCommercial" class="slide" type="range" :min="5000000" :max="7500000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valueCommercial" class="slide" type="range" :min="7500000" :max="10000000" :step="100">
                  {{valueCommercial.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}

                </div>

                <div v-if="screenplayType === 'Animation'">
                  <div>Print</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valuePrint" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valuePrint" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valuePrint" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valuePrint" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valuePrint" class="slide" type="range" :min="40000000" :max="75000000" :step="100">

                  <div>Internet</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valueInternet" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valueInternet" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valueInternet" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valueInternet" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valueInternet" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                  {{valueInternet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                  <div>Commercial</div>
                  <br>
                  <input v-if="scope === 'Little'" v-model="valueCommercial" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                  <input v-if="scope === 'Small'" v-model="valueCommercial" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                  <input v-if="scope === 'Normal'" v-model="valueCommercial" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                  <input v-if="scope === 'Large'" v-model="valueCommercial" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                  <input v-if="scope === 'Epic'" v-model="valueCommercial" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                  {{valueCommercial.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}

                </div>

                <button @click="setBudget">Set Marketing Budget</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarketingBudgetSelect",

  data() {
    return {
      screenplayType: this.$store.getters.getCurrentMovie._preProduction.screenplay.type,
      scope: this.$store.getters.getCurrentMovie._preProduction.screenplay.details.scope,
      valuePrint: 0,
      valueInternet: 0,
      valueCommercial: 0
    }
  },
  methods:{
    setBudget(){
      this.$store.getters.getCurrentMovie._postProduction.marketingPrint = this.valuePrint
      this.$store.getters.getCurrentMovie._postProduction.marketingInternet = this.valueInternet
      this.$store.getters.getCurrentMovie._postProduction.marketingCommercial = this.valueCommercial
      this.$emit('close')
    }
  },
  mounted() {
    this.$store.getters.getCurrentMovie.setPostProduction()
    if (this.screenplayType === 'Feature' | this.screenplayType === 'Animation') {
      switch (this.scope) {
        case "Little":
          this.valuePrint = 1000000
          this.valueCommercial = 1000000
          this.valueInternet = 1000000
          break
        case "Small":
          this.valuePrint = 5000000
          this.valueCommercial = 5000000
          this.valueInternet = 5000000
          break
        case "Normal":
          this.valuePrint = 10000000
          this.valueCommercial = 10000000
          this.valueInternet = 10000000
          break
        case "Large":
          this.valuePrint = 20000000
          this.valueCommercial = 20000000
          this.valueInternet = 20000000
          break
        case "Epic":
          this.valuePrint = 40000000
          this.valueCommercial = 40000000
          this.valueInternet = 40000000
          break
      }
    } else {
      switch (this.scope) {
        case "Little":
          this.valuePrint = 100000
          this.valueCommercial = 100000
          this.valueInternet = 100000
          break
        case "Small":
          this.valuePrint = 1000000
          this.valueCommercial = 1000000
          this.valueInternet = 1000000
          break
        case "Normal":
          this.valuePrint = 2500000
          this.valueCommercial = 2500000
          this.valueInternet = 2500000
          break
        case "Large":
          this.valuePrint = 5000000
          this.valueCommercial = 5000000
          this.valueInternet = 5000000
          break
        case "Epic":
          this.valuePrint = 7500000
          this.valueCommercial = 7500000
          this.valueInternet = 7500000
          break
      }
    }
  }
}
</script>

<style scoped>
.slide {
  max-height: 10px
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>