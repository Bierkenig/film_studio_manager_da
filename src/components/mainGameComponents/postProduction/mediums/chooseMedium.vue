<template>
<div>
{{$t('cinema')}}
  {{scope}}
  <button @click="choose('wide')">Wide Release</button>
  <button @click="choose('limited')">Limited Release</button>
  Cost: {{cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
  Potential Sales: {{potential * 100}}%
  <router-link to="/">
    <button>Back</button>
  </router-link>

  <button @click="next" :disabled="continueDisable">Continue</button>
</div>
</template>

<script>
export default {
  name: "chooseMedium",

  data(){
    return{
    scope: this.$store.getters.getCurrentMovie._preProduction.screenplay.details.scope,
    potential: 0,
    cost: 0,
    continueDisable: true
    }
  },

  methods:{
    choose(type){
      if(type === 'wide'){
        this.potential = 1
        this.continueDisable = false

        switch(this.scope){
          case 'Little':
            this.cost = 5000000
            break
          case 'Small':
            this.cost = 10000000
            break
          case 'Normal':
            this.cost = 15000000
            break
          case 'Large':
            this.cost = 20000000
            break
          case 'Epic':
            this.cost = 25000000
            break
        }
      }
      if(type === 'limited'){
        this.potential = 0.5
        this.continueDisable = false

        switch(this.scope){
          case 'Little':
            this.cost = 500000
            break
          case 'Small':
            this.cost = 1000000
            break
          case 'Normal':
            this.cost = 1500000
            break
          case 'Large':
            this.cost = 2000000
            break
          case 'Epic':
            this.cost = 2500000
            break
        }
      }
    },

    next(){
      this.$store.getters.getCurrentMovie.setProduction()
      this.$store.getters.getCurrentMovie._status = 'Postproduction'
      this.$store.getters.getCurrentMovie.setPostProduction()
      this.$store.getters.getCurrentMovie._postProduction.earningPotential = this.potential
      this.$store.getters.getCurrentMovie._postProduction.distributionCosts = this.cost
      this.$router.push({ name: 'cinemaNegotiation'})
    }
  }
}
</script>

<style scoped>

</style>