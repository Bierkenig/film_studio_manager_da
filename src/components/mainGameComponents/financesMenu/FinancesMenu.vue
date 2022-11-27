<template>
  <div>
    <div id="credit">
      <h3>{{$t('labelTakeCredit')}}</h3>
      <label for="credit">{{$t('descCredit')}}</label>
      <button name="credit">
        {{$t('takeCredit')}}
      </button>
    </div>

    <div id="buy">
      <h3>{{$t('labelBuyStudio')}}</h3>
      <label for="buy">{{$t('descStudio')}}</label>
      <button name="buy">
        {{$t('buyStudio')}}
      </button>
    </div>

    <div id="fiscalPerformance">
      <h3>{{$t('fiscalPerformance.name')}}</h3>
      <i class="arrow left" @click="updateFiscalPerformance(-1)"></i>
      <p>{{this.availablePerformanceDates[index]}}</p>
      <i class="arrow right" @click="updateFiscalPerformance(1)"></i>
      <table>
        <tr>
          <th>{{$t('fiscalPerformance.area')}}</th>
          <th>{{$t('fiscalPerformance.incoming')}}</th>
          <th>{{$t('fiscalPerformance.outgoing')}}</th>
          <th>{{$t('fiscalPerformance.accumulated')}}</th>
        </tr>
        <tr v-for="element in fiscalPerformanceData" :key="element">
          <td>{{$t(element.name)}}</td>
          <td>{{element.incoming}}</td>
          <td>{{element.outgoing}}</td>
          <td>{{element.accumulated}}</td>
        </tr>
      </table>
    </div>

    <div id="marketShare">
      <h3>{{$t('marketShare.name')}}</h3>
      <select>
        <option v-for="year in this.availableMarketYears" :key="year" :value="year">{{year}}</option>
      </select>
      <div v-for="studio in this.$store.getters.getOtherStudios" :key="studio[0]">{{studio[0]}} {{studio[2]}}</div>
      <div>
        <pie-chart :data="this.otherStudiosPieChart"></pie-chart>
      </div>
    </div>

    <div>
      <h3>{{$t('financialHistory.name')}}</h3>
      <div v-for="el in this.$store.getters.getFinancialHistory" :key="el">
        <!-- TODO icon -->
        <h2>{{$t(el.title)}}</h2>
        <p>{{$t(el.desc)}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import financeMixin from "@/mixins/financeMixin";

export default {
  name: "FinancesMenu",

  components: {
  },

  mixins: [financeMixin()],

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
    array.forEach((el) => {
        this.availablePerformanceDates.push(el.date.name)
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
      el.splice(1,1)
    })

    //call the updateFiscalPerformance Method once
    this.updateFiscalPerformance()
  }
}
</script>

<style scoped>

.arrow {
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
}

</style>