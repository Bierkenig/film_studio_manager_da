<template>
  <div>
    <div v-for="(it, index) in allFranchises" :key="index" @click="getFranchiseInfo(it)">
      {{it.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "FranchisesList",

  data(){
    return {
      allFranchises: this.$store.getters.getFranchises,
    }
  },

  methods: {
    getFranchiseInfo(franchise){
      this.$emit('sendFranchise',franchise);
    },
  }
}
</script>

<style scoped>

</style>