<template>
  <div id="createFranchiseMainDiv">
    <div id="createFranchiseBox">
      <background-tile :title="$t('movieDetailsElement.newFranchise')">
        <div id="createFranchiseBoxInside">
          <input id="createFranchiseName" v-model="franchiseTitle" type="text" placeholder="Franchise Name" />
          <div id="createFranchiseInfoText">{{ $t('franchiseInfoText') }} <span id="createFranchiseMovieName">{{ this.$store.getters.getCurrentMovieDetails._preProduction.screenplay.title }}</span></div>
          <custom-button
              id="createFranchiseContinueButton"
              :dark="false"
              size="small"
              :disabled="!franchiseTitle"
              @clicked="saveFranchise">{{ $t('createFranchise') }}</custom-button>
        </div>
      </background-tile>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import Franchises from "@/classes/Franchises";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "CreateFranchise",
  components: {BackgroundTile, CustomButton},

  data(){
    return {
      franchiseTitle: null,
    }
  },

  methods: {
    saveFranchise(){
      let newFranchise = new Franchises(this.$store.getters.getNextFranchiseId,this.franchiseTitle, this.$store.getters.getStudio, this.$store.getters.getCurrentDate);
      newFranchise.addAllMovies(this.$store.getters.getCurrentMovie)
      this.$store.getters.getCurrentMovie._preProduction.screenplay.franchise = newFranchise;
      this.$store.commit('addFranchise',newFranchise);
      this.$router.push({name: 'movies'})
    }
  }
}
</script>

<style scoped>
#createFranchiseMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#createFranchiseBox {
  display: flex;
  flex-direction: column;
  width: 350px;
}

#createFranchiseBoxInside {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#createFranchiseName {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  height: 30px;
  margin-top: 10px;
  padding-left: 10px;
}

#createFranchiseName:focus {
  outline: none;
}

#createFranchiseInfoText {
  color: var(--fsm-grey-font-color);
  font-size: 14px;
}

#createFranchiseMovieName {
  font-weight: var(--fsm-fw-bold);
}
</style>