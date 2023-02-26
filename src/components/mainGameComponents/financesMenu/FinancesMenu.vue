<template>
  <div class="financesMenu">
    <div class="financesMenuLeftSide">
      <background-tile class="loanTile" :title="$t('labelTakeCredit')" content-color="grey" icon="price">
        {{ $t('descCredit') }}
        <custom-button class="loanButton" @click="this.$router.push({name: 'TakeALoan'})">{{
            $t('takeCredit')
          }}
        </custom-button>
      </background-tile>
      <background-tile class="buyStudioTile" :title="$t('labelBuyStudio')" content-color="grey" icon="studio">
        {{ $t('descStudio') }}
        <custom-button class="buyStudioButton" @click="this.$router.push({name: 'BuyAStudio'})">{{
            $t('buyStudio')
          }}
        </custom-button>
      </background-tile>
    </div>
    <div class="financesMenuCenter">
      <background-tile class="fiscalPerformanceTile" :title="$t('fiscalPerformance.name')">
        <div id="fiscalPerformance">
          <div id="fiscalPerformanceSorts">
            <select v-model="selectedMonth" @change="updateFiscalPerformance()">
              <option disabled :value="-1">{{ $t('month') }}</option>
              <option v-for="(el, index) in availableMonths" :key="index" :value="el">
                {{ $t('dates.' + el) }}
              </option>
            </select>
            <select v-model="selectedYear" @change="calcMonths(); updateFiscalPerformance()">
              <option disabled :value="-1">{{ $t('year') }}</option>
              <option v-for="(el, index) in availablePerformanceYears" :key="index" :value="el">
                {{ el }}
              </option>
            </select>
          </div>
          <div id="fiscalPerformanceListHeaderContainer">
            <finance-element id="fiscalPerformanceListHeader"
                             :accumulated="$t('fiscalPerformance.accumulated')"
                             :outgoing="$t('fiscalPerformance.outgoing')"
                             :incoming="$t('fiscalPerformance.incoming')"
                             :area="$t('fiscalPerformance.area')"
                             :color-incoming="false"
                             :color-outgoing="false"
                             :color-accumulated="false"
            />
          </div>
          <div id="fiscalPerformanceList" class="verticalScroll">
            <div v-for="(element, index) in fiscalPerformanceData" :key="index" class="fiscalPerformanceListElement">
              <finance-element
                  :accumulated="roundBudget(element.accumulated.toString())"
                  :outgoing="roundBudget(element.outgoing.toString())"
                  :incoming="roundBudget(element.incoming.toString())"
                  :area="$t(element.name)"
              />
            </div>
          </div>
        </div>
      </background-tile>
      <background-tile class="marketShareTile" :title="$t('marketShare.name')">
        <select id="marketShareSort" v-model="selectedMarketYear" @change="updateMarketShare">
          <option disabled :value="-1">{{ $t('year') }}</option>
          <option v-for="year in availableMarketYears" :key="year" :value="year">{{ year }}</option>
        </select>
        <div id="marketShareListHeaderContainer">
          <market-share-element id="marketShareListHeader"
                                :studio="$t('marketShare.studio')"
                                :revenue="$t('marketShare.revenue')"
                                :profit="$t('marketShare.profit')"
                                :share="$t('marketShare.share')"
                                :change="$t('marketShare.change')"
                                no-change-color
          />
        </div>
        <div class="marketShareList verticalScroll">
          <div v-for="(el, index) in otherStudios" :key="index" class="marketShareListElement">
            <market-share-element icon="placeholder"
                                  :studio="el.name"
                                  :revenue="roundBudget((el.marketShare[selectedMarketYear] !== undefined ? el.calcRevenue() : 0).toString())"
                                  :profit="roundBudget((el.marketShare[selectedMarketYear] !== undefined ? el.calcProfit() : 0).toString())"
                                  :share="((el.marketShare[selectedMarketYear] !== undefined || !isNaN(el.marketShare[selectedMarketYear]) ? el.marketShare[selectedMarketYear] : 0) + '%').toString()"
                                  :change="(((el.marketShare[selectedMarketYear] !== undefined && !isNaN(el.marketShare[selectedMarketYear]) ? el.marketShare[selectedMarketYear] : 0) - (el.marketShare[selectedMarketYear - 1] !== undefined || !isNaN(el.marketShare[selectedMarketYear - 1]) ? el.marketShare[selectedMarketYear - 1] : 0)) + '%').toString()"
            />
          </div>
        </div>
      </background-tile>
    </div>
    <div class="financesMenuRightSide">
      <background-tile id="financesMenuFinancialHistory" :title="$t('financialHistory.name')">
        <div v-for="(el, index) in financialHistory" :key="index">
          <!-- TODO icon -->
          <div>{{ $t("financialHistory." + el.title) }}</div>
          <div>{{ $t("financialHistory." + el.description) }}</div>
        </div>
      </background-tile>
    </div>
  </div>
</template>
<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import FinanceElement from "@/components/kitchenSink/FinanceElement.vue";
import MarketShareElement from "@/components/kitchenSink/MarketShareElement.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "FinancesMenu",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],
  components: {MarketShareElement, FinanceElement, CustomButton, BackgroundTile},

  data() {
    return {
      selectedYear: -1,
      selectedMonth: -1,
      selectDate: null,
      selectedMarketYear: -1,
      availablePerformanceDates: [],
      availablePerformanceYears: [],
      availableMonths: [],
      availableMarketYears: this.$store.getters.getMarketYears,
      fiscalPerformanceData: {
        production: {name: "production", incoming: 0, outgoing: 0, accumulated: 0},
        marketing: {name: "marketing", incoming: 0, outgoing: 0, accumulated: 0},
        loan: {name: "loan", incoming: 0, outgoing: 0, accumulated: 0},
        cinema: {name: "cinema", incoming: 0, outgoing: 0, accumulated: 0},
        streaming: {name: "streaming", incoming: 0, outgoing: 0, accumulated: 0},
        total: {name: "total", incoming: 0, outgoing: 0, accumulated: 0}
      },
      otherStudios: [],
      financialHistory: this.$store.getters.getFinancialHistory
    }
  },

  methods: {
    calcMonths() {
      if (this.selectedYear === -1) {
        this.selectedMonth = -1;
      } else {
        let months = [];
        this.$store.getters.getFinancialPerformance.forEach((el) => {
          if (el._date.getFullYear() === this.selectedYear) {
            months.push(this.$store.state.months[el._date.getMonth()])
          }
        })
        this.selectedMonth = months[0]
        this.availableMonths = months
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

    updateFiscalPerformance() {
      //set values to 0
      this.fiscalPerformanceData.production = {name: "production", incoming: 0, outgoing: 0, accumulated: 0}
      this.fiscalPerformanceData.marketing = {name: "marketing", incoming: 0, outgoing: 0, accumulated: 0}
      this.fiscalPerformanceData.loan = {name: "loan", incoming: 0, outgoing: 0, accumulated: 0}
      this.fiscalPerformanceData.cinema = {name: "cinema", incoming: 0, outgoing: 0, accumulated: 0}
      this.fiscalPerformanceData.streaming = {name: "streaming", incoming: 0, outgoing: 0, accumulated: 0}
      this.fiscalPerformanceData.total = {name: "total", incoming: 0, outgoing: 0, accumulated: 0}

      let neededData = this.$store.getters.getFinancialPerformance.filter((el) => {
        return el._date.getFullYear() === this.selectedYear && el._date.getMonth() === this.$store.state.months.indexOf(this.selectedMonth)
      })

      neededData.forEach((el) => {
        this.fiscalPerformanceData.production.incoming += el._production.incoming
        this.fiscalPerformanceData.production.outgoing += el._production.outgoing
        this.fiscalPerformanceData.production.accumulated = this.fiscalPerformanceData.production.incoming - this.fiscalPerformanceData.production.outgoing

        this.fiscalPerformanceData.marketing.incoming += el._marketing.incoming
        this.fiscalPerformanceData.marketing.outgoing += el._marketing.outgoing
        this.fiscalPerformanceData.marketing.accumulated = this.fiscalPerformanceData.marketing.incoming - this.fiscalPerformanceData.marketing.outgoing

        this.fiscalPerformanceData.loan.incoming += el._loan.incoming
        this.fiscalPerformanceData.loan.outgoing += el._loan.outgoing
        this.fiscalPerformanceData.loan.accumulated = this.fiscalPerformanceData.loan.incoming - this.fiscalPerformanceData.loan.outgoing

        this.fiscalPerformanceData.cinema.incoming += el._cinema.incoming
        this.fiscalPerformanceData.cinema.outgoing += el._cinema.outgoing
        this.fiscalPerformanceData.cinema.accumulated = this.fiscalPerformanceData.cinema.incoming - this.fiscalPerformanceData.cinema.outgoing

        this.fiscalPerformanceData.streaming.incoming += el._streaming.incoming
        this.fiscalPerformanceData.streaming.outgoing += el._streaming.outgoing
        this.fiscalPerformanceData.streaming.accumulated = this.fiscalPerformanceData.streaming.incoming - this.fiscalPerformanceData.streaming.outgoing

        //total
        this.fiscalPerformanceData.total.incoming = this.fiscalPerformanceData.production.incoming +
            this.fiscalPerformanceData.marketing.incoming + this.fiscalPerformanceData.loan.incoming +
            this.fiscalPerformanceData.cinema.incoming + this.fiscalPerformanceData.streaming.incoming

        this.fiscalPerformanceData.total.outgoing = this.fiscalPerformanceData.production.outgoing +
            this.fiscalPerformanceData.marketing.outgoing + this.fiscalPerformanceData.loan.outgoing +
            this.fiscalPerformanceData.cinema.outgoing + this.fiscalPerformanceData.streaming.outgoing

        this.fiscalPerformanceData.total.accumulated = this.fiscalPerformanceData.total.incoming - this.fiscalPerformanceData.total.outgoing
      })
    },

    updateMarketShare() {
      this.otherStudios.sort((a, b) => {
        return a.marketShare[this.selectedMarketYear] - b.marketShare[this.selectedMarketYear]
      })
    }
  },

  mounted() {
    //get available dates
    this.$store.state.financialPerformance.forEach((el) => {
      !this.availablePerformanceYears.includes(el._date.getFullYear()) ? this.availablePerformanceYears.push(el._date.getFullYear()) : ""
      this.availablePerformanceDates.push(el._date)
    })

    this.calcMonths()
    this.updateFiscalPerformance()

    this.otherStudios = [...this.$store.getters.getOtherStudios]
    this.otherStudios.push(this.$store.getters.getStudio)

    this.updateMarketShare()

    window.ipcRenderer.send("updateDiscordDetails", "In Game: Finances Menu")

  }
}
</script>

<style scoped>
.financesMenu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.financesMenuLeftSide, .financesMenuRightSide {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.financesMenuCenter {
  flex-grow: 2;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

.fiscalPerformanceTile, .marketShareTile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  flex-basis: 0;
}

#fiscalPerformanceListHeaderContainer {
  padding-bottom: 5px;
  padding-right: 20px;
}

.buyStudioTile {
  margin-top: 20px;
}

.loanButton, .buyStudioButton {
  margin-top: 20px;
}

#fiscalPerformanceSorts {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}

#fiscalPerformance {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#fiscalPerformanceList {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  min-height: 30px;
}

#financesMenuFinancialHistory {
  flex-grow: 1;
}

#marketShareSort {
  width: 50%;
  margin-top: 10px;
  margin-bottom: 20px;
}

#marketShareListHeaderContainer {
  padding-right: 20px;
  padding-bottom: 5px;
}

.marketShareList {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  min-height: 30px;
}

.marketShareListElement, .fiscalPerformanceListElement {
  display: block;
}
</style>