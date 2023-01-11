<template>
hi {{this.addedWeeks}}
  {{JSON.parse(this.editingBudgetIncrease).value}}
  {{JSON.parse(this.editingBudgetIncrease).percentage}}
  {{(this.flags % 3)}}
  {{(~~(this.flags / 3) % 3)}}
  {{(((this.flags / 9)>>0) % 3)}}
  {{(((this.flags / 27) | 0) % 3)}}
  {{(Math.floor(this.flags / 81) % 3)}}

</template>

<script>
export default {
  name: "testScreeningResults",
  props:{
    addedWeeks: Number,
    editingBudgetIncrease: String,
    flags: Number
  }
}
</script>

<style scoped>

</style>