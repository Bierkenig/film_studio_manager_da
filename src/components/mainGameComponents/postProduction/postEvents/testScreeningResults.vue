<template>
hi {{this.addedWeeks}}
  {{JSON.parse(this.editingBudgetIncrease).value}}
  {{JSON.parse(this.editingBudgetIncrease).percentage}}
</template>

<script>
export default {
  name: "testScreeningResults",
  props:{
    addedWeeks: Number,
    editingBudgetIncrease: String
  }
}
</script>

<style scoped>

</style>