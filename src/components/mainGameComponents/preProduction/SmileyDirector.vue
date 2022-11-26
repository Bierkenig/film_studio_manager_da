<template>
  <div>
    <!-- TODO Smiley @Julian-->
  </div>
</template>

<script>
export default {
  name: "SmileyDirector",

  data() {
    return {
      noCounter: this.$store.state.preProduction.hiredDirector._no,
      directorControl: (this.$store.state.preProduction.hiredDirector._popularity + this.$store.state.preProduction.hiredDirector._experience + this.$store.state.preProduction.hiredDirector._rating) / 3
    }
  },

  mounted() {
    if (this.noCounter === 1) {
      if (this.directorControl > 75) {
        //set red smiley
      } else {
        //set green smiley
      }
    } else if (this.noCounter === 3) {
      if (this.directorControl <= 75 && this.directorControl > 50) {
        //set red smiley
      }
    } else if(this.noCounter === 2) {
      //set yellow Smiley
    } else if (this.noCounter === 5) {
      if (this.directorControl <= 50) {
        //set red smiley
      }
    }else if(this.noCounter < 5 && this.noCounter >= 3) {
      //set the yellow smiley
    }else {
      //set green smiley
    }
  }
}
</script>

<style scoped>

</style>