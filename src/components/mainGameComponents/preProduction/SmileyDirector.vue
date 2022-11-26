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
      mood: this.$store.state.preProduction.directorMood,
    }
  },

  mounted() {
    switch (this.mood) {
      case 1:
        //set green smiley
        break
      case 2:
        //set yellow smiley
        break
      case 3:
        //set red smiley
        break
    }
  }
}
</script>

<style scoped>

</style>