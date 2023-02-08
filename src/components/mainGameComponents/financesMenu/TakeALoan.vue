<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-body">
            <slot name="body">
              <div>
                <div v-if="loansAvailable">
                  <h3>{{$t('takeALoan.title')}}</h3>
                  <div v-if="this.$store.getters.getStudio.budget >= 1">
                    <div>{{$t('takeALoan.low')}}</div>
                    <div>$ {{low.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
                    <div>{{low.interests}}% {{$t('takeALoan.Interests')}}</div>
                    <button @click="takeLoan(50000000)">{{$t('takeALoan.take')}}</button>
                  </div>
                  <div v-if="this.$store.getters.getStudio.budget >= 1">
                    <div>{{$t('takeALoan.medium')}}</div>
                    <div>$ {{medium.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
                    <div>{{medium.interests}}% {{$t('takeALoan.interests')}}</div>
                    <button @click="takeLoan(250000000)">{{$t('takeALoan.take')}}</button>
                  </div>
                  <div v-if="this.$store.getters.getStudio.budget >= 1">
                    <div>{{$t('takeALoan.high')}}</div>
                    <div>$ {{high.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
                    <div>{{high.interests}}% {{$t('takeALoan.interests')}}</div>
                    <button @click="takeLoan(1000000000)">{{$t('takeALoan.take')}}</button>
                  </div>
                </div>
                <div v-if="!loansAvailable">
                  <div>{{$t('takeALoan.errMsg')}}</div>
                </div>
                <div>
                  <h3>{{$t('takeALoan.title2')}}</h3>
                  <div>
                    <div v-for="(el, index) in currentLoans" :key="index">
                      <div>{{el.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
                      <div>{{el.date.toLocaleString('default', { month: 'long' })}}, {{el.date.getFullYear()}}</div>
                      <button @click="repayLoan(el.id)" :disabled="!dateDiff(el)">{{$t('takeALoan.repay')}}</button>
                    </div>
                  </div>
                </div>
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
  name: "TakeALoan",

  data() {
    return {
      low: {
        value: 50000000,
        interests: 5,
      },
      medium: {
        value: 250000000,
        interests: 12
      },
      high: {
        value: 1000000000,
        interests: 25
      },
      currentLoans: this.$store.getters.getCurrentLoans,
      loansAvailable: false
    }
  },

  methods: {
    takeLoan(value) {
      //calc balance
      this.$store.commit('subtractBalance', value)
      //add to loans
      this.$store.commit('addCurrentLoan', {id: this.$store.getters.getCurrentLoans.length + 1, value: value, date: this.$store.getters.getCurrentDate})
      console.log(this.$store.currentLoans)
    },

    repayLoan(id) {
      const loanObject = this.$store.getters.getCurrentLoans.filter((el) => {
        el.id = id
      })
      //Repaying
      this.$store.commit('subtractBalance', loanObject.value)
      this.$store.commit('changeDateOfLoan', loanObject.id)
    },

    dateDiff(el) {
      el.date.setFullYear(el.date.getFullYear() + 5)
      return this.$store.getters.getCurrentDate.getTime() !== el.date.getTime()
    }
  }
}
</script>

<style scoped>
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
  width: 300px;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
  text-align: center;
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