<template>
  <div>
    <div>
      <select
          class="createFranchiseSelect"
          v-model="movieFranchiseType"
      >
        <option :value="undefined" disabled selected hidden>Franchise Type</option>
        <option value="Sequel">{{ $t('sequel') }}</option>
        <option value="Prequel">{{ $t('prequel') }}</option>
      </select>
    </div>
    <custom-button
        id="franchiseSectionContinueButton"
        :dark="false"
        size="medium"
        :disabled="!movieFranchiseType"
        @clicked="goToScreenplay">{{ $t('continue')}}</custom-button>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import {Screenplay} from "@/classes/Screenplay";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "franchiseSection",
  components: {CustomButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data(){
    return {
      movieFranchiseType: null,
    }
  },

  methods: {
    goToScreenplay(){
      let lastScreenplay = this.$store.getters.getCurrentFranchise.getLastScreenplay();
      let newScreenplay = new Screenplay(this.$store.getters.getNextScreenplayId,lastScreenplay.title,
          lastScreenplay.type, lastScreenplay.genre,lastScreenplay.subgenre, lastScreenplay.ageRating,
          null,lastScreenplay.description,lastScreenplay.rating,null, null, lastScreenplay.topics,
          this.$store.getters.getCurrentFranchise,false, lastScreenplay.details, lastScreenplay.ageRatingDetails);
      newScreenplay.setRatingRange(lastScreenplay.ratingRange);
      newScreenplay.roles = lastScreenplay.roles;

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