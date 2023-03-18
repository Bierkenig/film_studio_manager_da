<template>
  <div class="franchiseSectionMainDiv">
    <div>
      <background-tile class="franchiseSectionTile" :title="$t('chooseSequelPrequel')">
        <div>
          <select
              class="franchiseSectionSelect"
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
            size="small"
            :disabled="!movieFranchiseType"
            @clicked="goToScreenplay">{{ $t('continue')}}</custom-button>
      </background-tile>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import {Screenplay} from "@/classes/Screenplay";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "franchiseSection",
  components: {BackgroundTile, CustomButton},
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
.franchiseSectionMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.franchiseSectionTile {
  width: 400px;
}

.franchiseSectionSelect {
  margin-top: 10px;
}

#franchiseSectionContinueButton {
  margin-top: 15px;
}
</style>