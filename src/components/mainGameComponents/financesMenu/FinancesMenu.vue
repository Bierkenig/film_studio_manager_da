<template>
  <div class="financesMenu">
    <div class="financesMenuLeftSide">
      <background-tile class="loanTile" :title="$t('labelTakeCredit')" content-color="grey" icon="placeholder">
        {{ $t('descCredit') }}
        <custom-button class="loanButton">{{ $t('takeCredit') }}</custom-button>
      </background-tile>
      <background-tile class="buyStudioTile" :title="$t('labelBuyStudio')" content-color="grey" icon="placeholder">
        {{ $t('descStudio') }}
        <custom-button class="buyStudioButton">{{ $t('buyStudio') }}</custom-button>
      </background-tile>
    </div>
    <div class="financesMenuCenter">
      <background-tile class="fiscalPerformanceTile" :title="$t('fiscalPerformance.name')">

      </background-tile>
    </div>
    <div class="financesMenuRightSide">
      <background-tile title="Title" content-color="grey" icon="placeholder">Test</background-tile>
    </div>


    <div class="hide">
      <div id="fiscalPerformance">
        <h3>{{ $t('fiscalPerformance.name') }}</h3>
        <i class="arrow left" @click="updateFiscalPerformance(-1)"></i>
        <p>{{ this.availablePerformanceDates[index] }}</p>
        <i class="arrow right" @click="updateFiscalPerformance(1)"></i>
        <table>
          <tr>
            <th>{{ $t('fiscalPerformance.area') }}</th>
            <th>{{ $t('fiscalPerformance.incoming') }}</th>
            <th>{{ $t('fiscalPerformance.outgoing') }}</th>
            <th>{{ $t('fiscalPerformance.accumulated') }}</th>
          </tr>
          <tr v-for="element in fiscalPerformanceData" :key="element">
            <td>{{ $t(element.name) }}</td>
            <td>{{ element.incoming }}</td>
            <td>{{ element.outgoing }}</td>
            <td>{{ element.accumulated }}</td>
          </tr>
        </table>
      </div>

      <div id="marketShare">
        <h3>{{ $t('marketShare.name') }}</h3>
        <select>
          <option v-for="year in this.availableMarketYears" :key="year" :value="year">{{ year }}</option>
        </select>

        <div>
          <h3>{{ $t('financialHistory.name') }}</h3>
          <div v-for="el in this.$store.getters.getFinancialHistory" :key="el">
            <!-- TODO icon -->
            <h2>{{ $t(el.title) }}</h2>
            <p>{{ $t(el.desc) }}</p>
          </div>
        </div>
      </div>
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
      selectDate: "",
      index: -1,
      availablePerformanceDates: [],
      availableMarketYears: [],
      fiscalPerformanceData: {
        production: {name: "production", incoming: 0, outgoing: 0, accumulated: 0},
        marketing: {name: "marketing", incoming: 0, outgoing: 0, accumulated: 0},
        loan: {name: "loan", incoming: 0, outgoing: 0, accumulated: 0},
        cinema: {name: "cinema", incoming: 0, outgoing: 0, accumulated: 0},
        streaming: {name: "streaming", incoming: 0, outgoing: 0, accumulated: 0},
        total: {name: "total", incoming: 0, outgoing: 0, accumulated: 0}
      },
      otherStudiosPieChart: []
    }
  },

  methods: {
    updateFiscalPerformance(higherLower = 1) {
      this.index += higherLower
      this.selectDate = this.availablePerformanceDates[this.index]
      let data = this.$store.getters.getFinancialPerformance
      data.forEach((el) => {
        if (el.date.name === this.selectDate) {
          this.fiscalPerformanceData.production.incoming = el.date.data.production.incoming
          this.fiscalPerformanceData.production.outgoing = el.date.data.production.outgoing
          this.fiscalPerformanceData.production.accumulated =
              Number.isInteger(el.date.data.production.incoming) ? el.date.data.production.incoming : 0 + el.date.data.production.outgoing

          this.fiscalPerformanceData.marketing.incoming = el.date.data.marketing.incoming
          this.fiscalPerformanceData.marketing.outgoing = el.date.data.marketing.outgoing
          this.fiscalPerformanceData.marketing.accumulated =
              Number.isInteger(el.date.data.marketing.incoming) ? el.date.data.marketing.incoming : 0 + el.date.data.marketing.outgoing

          this.fiscalPerformanceData.loan.incoming = el.date.data.loan.incoming
          this.fiscalPerformanceData.loan.outgoing = el.date.data.loan.outgoing
          this.fiscalPerformanceData.loan.accumulated =
              Number.isInteger(el.date.data.loan.incoming) ? el.date.data.loan.incoming : 0 + el.date.data.loan.outgoing

          this.fiscalPerformanceData.cinema.incoming = el.date.data.cinema.incoming
          this.fiscalPerformanceData.cinema.outgoing = el.date.data.cinema.outgoing
          this.fiscalPerformanceData.cinema.accumulated =
              Number.isInteger(el.date.data.cinema.incoming) ? el.date.data.cinema.incoming : 0 + el.date.data.cinema.outgoing

          this.fiscalPerformanceData.streaming.incoming = el.date.data.streaming.incoming
          this.fiscalPerformanceData.streaming.outgoing = el.date.data.streaming.outgoing
          this.fiscalPerformanceData.streaming.accumulated =
              Number.isInteger(el.date.data.streaming.incoming) ? el.date.data.streaming.incoming : 0 + el.date.data.streaming.outgoing

          //total
          this.fiscalPerformanceData.total.incoming =
              (Number.isInteger(el.date.data.production.incoming) ? el.date.data.production.incoming : 0) +
              (Number.isInteger(el.date.data.marketing.incoming) ? el.date.data.marketing.incoming : 0) +
              (Number.isInteger(el.date.data.loan.incoming) ? el.date.data.loan.incoming : 0) +
              (Number.isInteger(el.date.data.cinema.incoming) ? el.date.data.cinema.incoming : 0) +
              (Number.isInteger(el.date.data.streaming.incoming) ? el.date.data.streaming.incoming : 0)

          this.fiscalPerformanceData.total.outgoing =
              (Number.isInteger(el.date.data.production.outgoing) ? el.date.data.production.outgoing : 0) +
              (Number.isInteger(el.date.data.marketing.outgoing) ? el.date.data.marketing.outgoing : 0) +
              (Number.isInteger(el.date.data.loan.outgoing) ? el.date.data.loan.outgoing : 0) +
              (Number.isInteger(el.date.data.cinema.outgoing) ? el.date.data.cinema.outgoing : 0) +
              (Number.isInteger(el.date.data.streaming.outgoing) ? el.date.data.streaming.outgoing : 0)

          this.fiscalPerformanceData.total.accumulated = this.fiscalPerformanceData.total.incoming -
              this.fiscalPerformanceData.total.outgoing
        }
      })
    },
  },

  mounted() {
    //fetch financial dates
    let array = this.$store.getters.getFinancialPerformance;
    console.log('-----------------------------------------------------')
    console.log(array)
    array.forEach((el) => {
      this.availablePerformanceDates.push(el)
    })
    //fetch other Studio years
    let studios = this.$store.getters.getOtherStudios
    studios.forEach((el) => {
      console.log(this.availableMarketYears.indexOf(el[1]))
      if (this.availableMarketYears.indexOf(el[1]) === -1) this.availableMarketYears.push(el[1]);
    })
    console.log("available years: " + this.availableMarketYears)

    //set Studios
    this.otherStudiosPieChart = this.$store.getters.getOtherStudios
    this.otherStudiosPieChart.forEach((el) => {
      el.splice(1, 1)
    })

    //call the updateFiscalPerformance Method once
    //this.updateFiscalPerformance()
  }
}
</script>

<style scoped>
.financesMenu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  margin: 0 20px 0 20px;
}

.buyStudioTile {
  margin-top: 20px;
}

.loanButton, .buyStudioButton {
  margin-top: 20px;
}


.hide {
  display: none;
}

/*.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}*/
</style>