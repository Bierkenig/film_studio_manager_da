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
      <!-- TODO date -->
      <table>
        <tr>
          <th>{{$t('fiscalPerformance.area')}}</th>
          <th>{{$t('fiscalPerformance.incoming')}}</th>
          <th>{{$t('fiscalPerformance.outgoing')}}</th>
          <th>{{$t('fiscalPerformance.accumulated')}}</th>
        </tr>
        <tr>
          <td>{{}}</td>
          <td>{{}}</td>
          <td>{{}}</td>
          <td>{{}}</td>
        </tr>
        <tr>
          <td>{{$t('total')}}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>

    <div id="marketShare">
      <h3>{{$t('marketShare.name')}}</h3>
      <select>
        <!-- TODO for loop with options -->
      </select>
      <div v-for="studio in this.$store.getters.getOtherStudios" :key="studio[0]">{{studio[0]}} {{studio[1]}}</div>
      <div>
        <pie-chart :data="this.$store.getters.getOtherStudios"></pie-chart>
      </div>
    </div>

    <div>
      <h3>{{$t('financialHistory.name')}}</h3>
      <!-- list history-->
    </div>
  </div>
</template>

<script>
export default {
  name: "FinancesMenu",

  data() {
    return {
      selectDate: ""
    }
  },

  methods: {
    calcfiscalPeroformance() {
      let data = this.$store.getters.getFinancialPerformance

    },
  },
}
</script>

<style scoped>

</style>