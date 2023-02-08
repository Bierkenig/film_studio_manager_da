<template>
  <div class="financesMenu">
    <div class="financesMenuLeftSide">
      <background-tile class="loanTile" :title="$t('labelTakeCredit')" content-color="grey" icon="placeholder">
        {{ $t('descCredit') }}
        <custom-button class="loanButton" @click="this.$router.push({name: 'TakeALoan'})">{{
            $t('takeCredit')
          }}
        </custom-button>
      </background-tile>
      <background-tile class="buyStudioTile" :title="$t('labelBuyStudio')" content-color="grey" icon="placeholder">
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
          <div>
            <select v-model="selectedMonth" @change="updateFiscalPerformance()">
              <option v-for="(el, index) in availableMonths" :key="index" :value="el">
                {{ $t('dates.' + el) }}
              </option>
            </select>
            <select v-model="selectedYear" @change="calcMonths(); updateFiscalPerformance()">
              <option v-for="(el, index) in availablePerformanceYears" :key="index" :value="el">
                {{ el }}
              </option>
            </select>
          </div>
          <div class="scroll verticalScroll">
            <table class="financesMenuTable">
              <tr class="financesMenuTableRow">
                <th>{{ $t('fiscalPerformance.area') }}</th>
                <th>{{ $t('fiscalPerformance.incoming') }}</th>
                <th>{{ $t('fiscalPerformance.outgoing') }}</th>
                <th>{{ $t('fiscalPerformance.accumulated') }}</th>
              </tr>
              <tr v-for="(element, index) in fiscalPerformanceData" :key="index" class="financesMenuTableRow">
                <td>{{ $t(element.name) }}</td>
                <td>$ {{ element.incoming }}</td>
                <td>$ {{ element.outgoing }}</td>
                <td>$ {{ element.accumulated }}</td>
              </tr>
            </table>
          </div>
        </div>
      </background-tile>
      <background-tile class="marketShareTile" :title="$t('marketShare.name')">
        <select v-model="selectedMarketYear" @change="updateMarketShare">
          <option v-for="year in availableMarketYears" :key="year" :value="year">{{ year }}</option>
        </select>
        <div class="financesMenuTable scroll verticalScroll">
          <table class="financesMenuTable">
            <tr class="financesMenuTableRow">
              <th>{{$t('marketShare.studio')}}</th>
              <th>{{$t('marketShare.revenue')}}</th>
              <th>{{$t('marketShare.profit')}}</th>
              <th>{{$t('marketShare.share')}}</th>
              <th>{{$t('marketShare.change')}}</th>
            </tr>
            <tr v-for="(el, index) in otherStudios" :key="index" class="financesMenuTableRow">
              <td>{{el.name}}</td>
              <td>$ {{el.calcRevenue()}}</td>
              <td>$ {{el.calcProfit()}}</td>
              <td>{{el.marketShare[selectedMarketYear]}}%</td>
              <td>{{el.marketShare[selectedMarketYear] - (el.marketShare[selectedMarketYear-1] !== undefined ? el.marketShare[selectedMarketYear-1] : 0)}}%</td>
            </tr>
          </table>
        </div>
      </background-tile>
    </div>
    <div class="financesMenuRightSide">
      <background-tile :title="$t('financialHistory.name')" content-color="grey" icon="placeholder">
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

export default {
  name: "FinancesMenu",

  components: {CustomButton, BackgroundTile},

  data() {
    return {
      selectedYear: 2023,
      selectedMonth: 0,
      selectDate: null,
      selectedMarketYear: 2023,
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
      let months = []
      this.$store.getters.getFinancialPerformance.forEach((el) => {
        if (el._date.getFullYear() === this.selectedYear) {
          months.push(this.$store.state.months[el._date.getMonth()])
        }
      })
      this.selectedMonth = months[0]
      this.availableMonths = months
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
            this.fiscalPerformanceData.cinema.outgoing+ this.fiscalPerformanceData.streaming.outgoing

        this.fiscalPerformanceData.total.accumulated = this.fiscalPerformanceData.total.incoming - this.fiscalPerformanceData.total.outgoing
      })
    },

    updateMarketShare() {
      this.otherStudios.sort((a,b) => {
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

    this.otherStudios = this.$store.getters.getOtherStudios
    this.otherStudios.push(this.$store.getters.getStudio)
    console.log(this.otherStudios)

    this.updateMarketShare()
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
  justify-content: space-between;
  gap: 20px;
}

.fiscalPerformanceTile, .marketShareTile {
  height: 50%;
}

.buyStudioTile {
  margin-top: 20px;
}

.loanButton, .buyStudioButton {
  margin-top: 20px;
}

.financesMenuTable {
  width: 100%;
}

.financesMenuTableRow {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-l-border-radius);
}

.scroll {
  height: 250px;
}
</style>