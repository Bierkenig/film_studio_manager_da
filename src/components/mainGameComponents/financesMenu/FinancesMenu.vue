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
      <swiper :slides-per-view="1"
              :space-between="0"
              @swiper="selectDate"
              @slideChange="updateFiscalPerformance">
        <swiper-slide v-for="element in this.availablePerformanceDates" :key="element">{{element}}</swiper-slide>
      </swiper>
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
        <pie-chart :data="this.$store.getters.getOtherStudios"></pie-chart>
      </div>
    </div>

    <div>
      <h3>{{$t('financialHistory.name')}}</h3>
      <!-- TODO list history-->
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
export default {
  name: "FinancesMenu",

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      selectDate: "",
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
    }
  },

  methods: {
    updateFiscalPerformance() {
      //let data = this.$store.getters.getFinancialPerformance
      //TODO
    },
  },

  mounted() {
    console.log(this.$store.getters.getOtherStudiosAsString)

    //fetch financial dates
    let array = this.$store.getters.getFinancialPerformance;
    array.forEach((el) => {
      Object.keys(el).forEach(key => {
        if (key === "date") this.availablePerformanceDates.push(el[key])
      })
    })

    //fetch other Studio years
    let studios = this.$store.getters.getOtherStudios
    studios.forEach((el) => {
      console.log(this.availableMarketYears.indexOf(el[1]))
      if (this.availableMarketYears.indexOf(el[1]) === -1) this.availableMarketYears.push(el[1]);
    })
    console.log("available years: " + this.availableMarketYears)

    //call the updateFiscalPerformance Method once
    this.updateFiscalPerformance()
  }
}
</script>

<style scoped>

</style>