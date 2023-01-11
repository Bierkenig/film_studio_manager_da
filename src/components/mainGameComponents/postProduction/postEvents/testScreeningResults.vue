<template>
  AddedWeeks:
  {{this.addedWeeks}}
  <br>
  Editing Budget Increase:
  {{JSON.parse(this.editingBudgetIncrease).value}}
  Editing Budget Increase %:
  {{JSON.parse(this.editingBudgetIncrease).percentage}}
  <br>
  Sound Budget Increase:
  {{JSON.parse(this.soundBudgetIncrease).value}}
  Sound Budget Increase %:
  {{JSON.parse(this.soundBudgetIncrease).percentage}}
  <br>
  VFX Budget Increase:
  {{JSON.parse(this.vfxBudgetIncrease).value}}
  VFX Budget Increase %:
  {{JSON.parse(this.vfxBudgetIncrease).percentage}}
  <br>
  Acting Budget Increase:
  {{JSON.parse(this.actingBudgetIncrease).value}}
  Acting Budget Increase %:
  {{JSON.parse(this.actingBudgetIncrease).percentage}}
  <br>
  Story Budget Increase:
  {{JSON.parse(this.storyBudgetIncrease).value}}
  Story Budget Increase %:
  {{JSON.parse(this.storyBudgetIncrease).percentage}}
  <br>
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
    soundBudgetIncrease: String,
    vfxBudgetIncrease: String,
    actingBudgetIncrease: String,
    storyBudgetIncrease: String,
    flags: Number
  }
}
</script>

<style scoped>

</style>