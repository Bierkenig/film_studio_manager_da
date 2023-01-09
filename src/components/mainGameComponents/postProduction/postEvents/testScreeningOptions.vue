<template>
<div v-if="type === 'editing'">
  <div>
    {{$t("postProductionEvents.testScreening.optionA")}}
    {{$t("postProductionEvents.testScreening." + type + ".optionA")}}
    <br>
    Consequence: Lorem Ipsum
    <br>
    Benefit: Lorem Ipsum
    <br>
    <button @click="choseOptionA(type)">Choose</button>
    <br>
    <br>
  </div>
  <div>
    {{$t("postProductionEvents.testScreening.optionB")}}
    {{$t("postProductionEvents.testScreening." + type + ".optionB")}}
    <br>
    Consequence: Lorem Ipsum
    <br>
    Benefit: Lorem Ipsum
    <br>
    <button @click="choseOptionB()">Choose</button>
  </div>

</div>
</template>

<script>
export default {
  name: "testScreeningOptions",

  props:{

  },
  data(){
    return{
      typeEditing: this.$store.state.type.editing,
      typeSound: this.$store.state.type.editing,
      typeVfx: this.$store.state.type.editing,
      typeActing: this.$store.state.type.editing,
      typeStory: this.$store.state.type.editing,

      dirRating: this.$store.getters.getCurrentMovie._preProduction.hiredDirector.rating,
      screenplayScope: this.$store.state.currentMovie._preProduction.screenplay.details.scope,
    }
  },

  methods:{
    choseOptionA(optionType){
        switch(optionType){
          case 'editing':
            this.$store.getters.getCurrentMovie._preProduction.budget.editing *= 1.1;
            break
          case 'sound':
            this.$store.getters.getCurrentMovie._preProduction.budget.sound *= 1.1;
            break
          case 'vfx':
            this.$store.getters.getCurrentMovie._preProduction.budget.vfx *= 1.1;
            break
          case 'acting':
            // eslint-disable-next-line no-case-declarations
            let costs = this.$store.getters.getCurrentMovie._preProduction.getWholeBudget() * 0.2
            this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget += costs;
            if(this.screenplayScope === 'Little'){
              this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),1 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Small'){
              this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),2 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Normal'){
              this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),3 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Large'){
              this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),4 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Epic'){
              this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),5 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            break
      }
    },

    choseOptionB(){
      this.$store.state.currentMovie?._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
    },

    calcDireMorale(trueFalse) {
      if (this.dirRating > 75) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 3
      } else if (this.dirRating > 50 && this.dirRating <= 75) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 2
      } else if (this.dirRating <= 50) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 1
      }
    },
    addWeeks(date, weeks, startDate) {
      date.setDate(startDate.getDate() + 7 * weeks);
      return date;
    },
  }
}
</script>

<style scoped>

</style>