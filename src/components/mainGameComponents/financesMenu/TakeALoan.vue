<template>
  <div class="takeALoanMainDiv">
    <div class="takeALoanSubDiv">
      <icon-button
          id="takeALoanBackButton"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"/>
      <div class="takeALoanBackground">
        <background-tile :title="$t('takeALoan.title')">
          <div>
            <div v-if="this.$store.getters.getStudio.budget >= 1">
              <div>{{$t('takeALoan.low')}}</div>
              <div>$ {{low.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
              <div>{{low.interests}}% {{$t('takeALoan.interests')}}</div>
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
          <div>
            <h2 class="takeALoanHeading">
              {{ $t('takeALoan.title2') }}
            </h2>
            <div>
              <div v-for="(el, index) in currentLoans" :key="index">
                <div>{{el.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
                <div>{{el.date.toLocaleString('default', { month: 'long' })}}, {{el.date.getFullYear()}}</div>
                <button @click="repayLoan(el)" :disabled="dateDiff(el)">{{$t('takeALoan.repay')}}</button>
              </div>
            </div>
          </div>
        </background-tile>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import Loan from "@/classes/Loan";

export default {
  name: "TakeALoan",
  components: {BackgroundTile, IconButton},

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
    }
  },

  methods: {
    takeLoan(value) {
      //calc balance
      this.$store.commit('addBalance', value)
      //add to loans
      this.$store.commit('addCurrentLoan', new Loan(this.$store.getters.getCurrentLoans.length + 1, value, this.$store.getters.getCurrentDate))
    },

    repayLoan(el2) {
      let loanObject = this.$store.getters.getCurrentLoans.filter(el => el.id === el2.id)[0]

      let allLoans = this.$store.getters.getCurrentLoans.filter(el => el.id !== el2.id)
      //Repaying
      this.$store.commit('subtractBalance', loanObject.value)
      this.$store.commit('setCurrentLoans', allLoans)

      this.currentLoans = this.$store.getters.getCurrentLoans
    },

    dateDiff(el) {
      let date = new Date(el.date.getFullYear() + 5, el.date.getMonth(), el.date.getDate())
      return this.$store.getters.getCurrentDate.getTime() !== date.getTime()
    },

    goBack(){
      this.$router.push({name: 'finances'})
    },
  }
}
</script>

<style scoped>
.takeALoanMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.takeALoanBackground {
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 10px 20px 10px 20px;
}

.takeALoanHeading {
  margin-top: 10px !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

#takeALoanBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>