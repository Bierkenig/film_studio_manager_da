<template>
  <div class="takeALoanMainDiv">
    <div class="takeALoanSubDiv">
      <icon-button
          id="takeALoanBackButton"
          icon="simple-arrow-left"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"
      />
      <background-tile class="takeALoanBackground" :title="$t('takeALoan.title')">
        <loan-element v-if="this.$store.getters.getStudio.budget >= 1"
                      :title="'$ ' + roundBudget(low.value)"
                      :description="low.interests + '% ' + $t('takeALoan.interests') + ', ' + durationYears + ' ' + $t('takeALoan.yearsDuration')"
                      :button-text="$t('takeALoan.take')"
                      @button-clicked="takeLoan(50000000, low.interests)"
                      :button-disabled="this.$store.getters.getCurrentLoans.length >= 5"
        />
        <loan-element v-if="this.$store.getters.getStudio.budget >= 1"
                      :title="'$ ' + roundBudget(medium.value)"
                      :description="medium.interests + '% ' + $t('takeALoan.interests') + ', ' + durationYears + ' ' + $t('takeALoan.yearsDuration')"
                      :button-text="$t('takeALoan.take')"
                      @button-clicked="takeLoan(250000000, medium.interests)"
                      :button-disabled="this.$store.getters.getCurrentLoans.length >= 5"
        />
        <loan-element v-if="this.$store.getters.getStudio.budget >= 1"
                      :title="'$ ' + roundBudget(high.value)"
                      :description="high.interests + '% ' + $t('takeALoan.interests') + ', ' + durationYears + ' ' + $t('takeALoan.yearsDuration')"
                      :button-text="$t('takeALoan.take')"
                      @button-clicked="takeLoan(1000000000, high.interests)"
                      :button-disabled="this.$store.getters.getCurrentLoans.length >= 5"
        />
        <div id="takeALoanHeading">
          {{ $t('takeALoan.title2') }}
        </div>
        <info-line v-if="currentLoans.length === 0">{{ $t('takeALoan.noLoans') }}</info-line>
        <div v-else id="currentLoansList" class="verticalScroll">
          <loan-element v-for="(el, index) in currentLoans"
                        :key="index"
                        :title="'$ ' + roundBudget(Math.floor((el.value * (1 + el.interest / 100))))"
                        :description="$t('takeALoan.initialLoan') + ' $ ' + roundBudget(el.value.toString()) + ' ' + $t('takeALoan.with') + ' ' + el.interest + '% ' + $t('takeALoan.interests')"
                        :button-text="$t('takeALoan.repay')"
                        :button-disabled="dateDiff(el)"
                        @button-clicked="repayLoan(el)"
          />
        </div>
      </background-tile>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import Loan from "@/classes/Loan";
import LoanElement from "@/components/kitchenSink/LoanElement.vue";
import InfoLine from "@/components/kitchenSink/InfoLine.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "TakeALoan",
  components: {InfoLine, LoanElement, BackgroundTile, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

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
      durationYears: 5,
    }
  },

  methods: {
    takeLoan(value, interest) {
      //calc balance
      this.$store.commit('addBalance', value)
      //add to loans
      this.$store.commit('addCurrentLoan', new Loan(this.$store.getters.getCurrentLoans.length + 1, value, this.$store.getters.getCurrentDate, interest))
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

    repayLoan(el2) {
      let loanObject = this.$store.getters.getCurrentLoans.filter(el => el.id === el2.id)[0]

      let allLoans = this.$store.getters.getCurrentLoans.filter(el => el.id !== el2.id)
      //Repaying
      this.$store.commit('subtractBalance', Math.floor((loanObject.value * (1 + loanObject.interest / 100))))
      this.$store.commit('setCurrentLoans', allLoans)

      this.currentLoans = this.$store.getters.getCurrentLoans
    },

    dateDiff(el) {
      let date = new Date(el.date.getFullYear() + this.durationYears, el.date.getMonth(), el.date.getDate())
      return this.$store.getters.getCurrentDate.getTime() !== date.getTime()
    },

    goBack() {
      this.$router.push({name: 'finances'})
    },
  },
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

.takeALoanSubDiv {
  width: 50%;
}

.takeALoanBackground {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  max-height: 80vh;
}

#takeALoanHeading {
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
  font-size: 28px;
}

#takeALoanBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#currentLoansList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}
</style>