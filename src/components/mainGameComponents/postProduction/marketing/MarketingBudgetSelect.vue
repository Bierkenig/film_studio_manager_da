<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile title="Marketing Budget">
                <div>
                  <div class="marketingBudgetSelectInfoBox">
                    <div class="marketingBudgetSelectInfoElement">
                      <div>Movie Type</div>
                      <div>{{ screenplayType }}</div>
                    </div>
                    <div class="marketingBudgetSelectInfoElement">
                      <div>Scope of Movie</div>
                      <div>{{ scope }}</div>
                    </div>
                  </div>

                  <div class="marketingBudgetSelectContainer" v-if="screenplayType === 'Feature'">
                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Print</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valuePrint)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valuePrint" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valuePrint" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valuePrint" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valuePrint" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valuePrint" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                      </div>
                    </div>

                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Internet</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valueInternet)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valueInternet" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valueInternet" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valueInternet" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valueInternet" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valueInternet" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                      </div>
                    </div>

                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Commercial</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valueCommercial)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valueCommercial" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valueCommercial" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valueCommercial" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valueCommercial" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valueCommercial" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                      </div>
                    </div>
                  </div>

                  <div class="marketingBudgetSelectContainer" v-if="screenplayType === 'Indie'">
                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Print</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valuePrint)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valuePrint" class="slide" type="range" :min="100000" :max="1000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valuePrint" class="slide" type="range" :min="1000000" :max="2500000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valuePrint" class="slide" type="range" :min="2500000" :max="5000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valuePrint" class="slide" type="range" :min="5000000" :max="7500000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valuePrint" class="slide" type="range" :min="7500000" :max="10000000" :step="100">
                      </div>
                    </div>

                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Internet</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valueInternet)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valueInternet" class="slide" type="range" :min="100000" :max="1000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valueInternet" class="slide" type="range" :min="1000000" :max="2500000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valueInternet" class="slide" type="range" :min="2500000" :max="5000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valueInternet" class="slide" type="range" :min="5000000" :max="7500000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valueInternet" class="slide" type="range" :min="7500000" :max="10000000" :step="100">
                      </div>
                    </div>

                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Commercial</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valueCommercial)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valueCommercial" class="slide" type="range" :min="100000" :max="1000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valueCommercial" class="slide" type="range" :min="1000000" :max="2500000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valueCommercial" class="slide" type="range" :min="2500000" :max="5000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valueCommercial" class="slide" type="range" :min="5000000" :max="7500000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valueCommercial" class="slide" type="range" :min="7500000" :max="10000000" :step="100">
                      </div>
                    </div>
                  </div>

                  <div class="marketingBudgetSelectContainer" v-if="screenplayType === 'Animation'">
                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Print</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valuePrint)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valuePrint" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valuePrint" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valuePrint" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valuePrint" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valuePrint" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                      </div>
                    </div>

                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Internet</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valueInternet)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valueInternet" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valueInternet" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valueInternet" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valueInternet" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valueInternet" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                      </div>
                    </div>

                    <div class="marketingBudgetSelectContainerElement">
                      <div class="marketingBudgetSelectContainerHeader">Commercial</div>
                      <div class="marketingBudgetSelectValue">{{roundBudget(valueCommercial)}}</div>
                      <div v-show="!disableInputRange">
                        <input v-if="scope === 'Little'" v-model="valueCommercial" class="slide" type="range" :min="1000000" :max="5000000" :step="100">
                        <input v-if="scope === 'Small'" v-model="valueCommercial" class="slide" type="range" :min="5000000" :max="10000000" :step="100">
                        <input v-if="scope === 'Normal'" v-model="valueCommercial" class="slide" type="range" :min="10000000" :max="20000000" :step="100">
                        <input v-if="scope === 'Large'" v-model="valueCommercial" class="slide" type="range" :min="20000000" :max="40000000" :step="100">
                        <input v-if="scope === 'Epic'" v-model="valueCommercial" class="slide" type="range" :min="40000000" :max="75000000" :step="100">
                      </div>
                    </div>
                  </div>

                  <custom-button class="marketingBudgetSelectButton" size="small" @clicked="setBudget">Set Marketing Budget</custom-button>
                </div>
              </background-tile>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import Earnings from "@/classes/Earnings";

export default {
  name: "MarketingBudgetSelect",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      screenplayType: this.$store.getters.getCurrentMovie._preProduction.screenplay.type,
      scope: this.$store.getters.getCurrentMovie._preProduction.screenplay.details.scope,
      valuePrint: 0,
      valueInternet: 0,
      valueCommercial: 0,
      disableInputRange: false
    }
  },
  methods:{
    setBudget(){
      this.$store.getters.getCurrentMovie._postProduction.marketingPrint = parseInt(this.valuePrint)
      this.$store.getters.getCurrentMovie._postProduction.marketingInternet = parseInt(this.valueInternet)
      this.$store.getters.getCurrentMovie._postProduction.marketingCommercial = parseInt(this.valueCommercial)

      this.$store.getters.getCurrentMovie._earnings.push(new Earnings(-(parseInt(this.valuePrint) + parseInt(this.valueInternet) + parseInt(this.valueCommercial)),
        this.$store.getters.getCurrentDate, 'Marketing'))

      this.$store.commit('addEarnings', new Earnings(-(parseInt(this.valuePrint) + parseInt(this.valueInternet) + parseInt(this.valueCommercial)),
          this.$store.getters.getCurrentDate, 'Marketing'))

      this.$store.getters.getCurrentMovie._totalOutgoings += parseInt(this.$store.getters.getCurrentMovie._postProduction.marketingPrint)
      this.$store.getters.getCurrentMovie._totalOutgoings += parseInt(this.$store.getters.getCurrentMovie._postProduction.marketingInternet)
      this.$store.getters.getCurrentMovie._totalOutgoings += parseInt(this.$store.getters.getCurrentMovie._postProduction.marketingCommercial)

      this.$emit('close')
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
  },
  mounted() {
    if (this.screenplayType === 'Feature' || this.screenplayType === 'Animation') {
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

    let sumOfMarketing = this.$store.getters.getCurrentMovie._preProduction.getTotalBudget() + this.valuePrint + this.valueInternet + this.valueCommercial;
    if(sumOfMarketing > this.$store.getters.getStudio.budget){
      let possibleBudget = this.$store.getters.getStudio.budget - this.$store.getters.getCurrentMovie._preProduction.getTotalBudget();
      this.valueInternet = Math.round(possibleBudget / 3) - 1;
      this.valueCommercial = Math.round(possibleBudget / 3) - 1;
      this.valuePrint = Math.round(possibleBudget / 3) - 1;
      this.disableInputRange = true;
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
  width: 550px;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
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

input[type='range'] {
  background-color: var(--fsm-dark-blue-2);
}

.marketingBudgetSelectInfoBox {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.marketingBudgetSelectInfoElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 15px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
}

.marketingBudgetSelectContainer {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 15px;
}

.marketingBudgetSelectContainerElement {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  font-size: 15px;
  flex: 1;
  text-align: center;
}

.marketingBudgetSelectContainerHeader {
  font-size: 18px;
  font-weight: var(--fsm-fw-bold);
}

.marketingBudgetSelectButton {
  margin-top: 15px;
}
</style>