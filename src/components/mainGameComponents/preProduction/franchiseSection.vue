<template>
  <div>
    <div>
      <select
          class="createFranchiseSelect"
          v-model="movieFranchiseType"
      >
        <option :value="undefined" disabled selected hidden>Franchise Type</option>
        <option value="Sequel">Sequel</option>
        <option value="Prequel">Prequel</option>
      </select>
    </div>
    <custom-button
        id="franchiseSectionContinueButton"
        :dark="false"
        size="medium"
        :disabled="!movieFranchiseType"
        @clicked="goToScreenplay">Save Franchise</custom-button>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "franchiseSection",
  components: {CustomButton},

  data(){
    return {
      movieFranchiseType: null,
    }
  },

  methods: {
    goToScreenplay(){
      let newScreenplay = this.$store.getters.getCurrentFranchise.getLastScreenplay();
      newScreenplay.acts = {act1: [], act2: [], act3: []};
      newScreenplay.price = null;
      newScreenplay.writer = null;
      newScreenplay.id = this.$store.getters.getNextScreenplayId;
      this.$store.getters.getCurrentMovie._franchiseType = this.movieFranchiseType;
      this.$store.commit('setNewCurrentScreenplay', newScreenplay);
      this.$router.push({name: 'newScreenplay'});
    }
  }
}
</script>

<style scoped>
#franchiseSectionContinueButton {
  position: absolute;
  float: right;
  right: 100px;
  bottom: 20px;
  width: 15%;
}
</style>