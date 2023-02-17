<template>
  <background-tile id="actionSectionContainer" :title="$t(headline)" :icon="icon" content-color="grey">
    {{ $t(infoText) }}
    <custom-button
        class="actionButton"
        :dark="false"
        size="small"
        @clicked="goToSite">{{ $t(buttonText) }}</custom-button>
  </background-tile>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton";
import {Movie} from "@/classes/Movie";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import {Screenplay} from "@/classes/Screenplay";

export default {
  name: "ActionSection",
  components: {BackgroundTile, CustomButton},
  props: {
    headline: String,
    infoText: String,
    buttonText: String,
    icon: String
  },

  methods: {
    goToSite(){
      if(this.headline === 'createMovie'){
        this.$store.state.currentMovie = new Movie(this.$store.getters.getNextMovieId, this.$store.state.studio, 0,'Pre Production',100,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined, undefined);
        this.$store.getters.getCurrentMovie._foundationDate = this.$store.getters.getCurrentDate;
        this.$router.push({name: 'screenplaySection'});
      } else if(this.headline === 'listOfSources'){
        this.$router.push({name: 'sourcesOverview'});
      } else if(this.headline === 'listOfFranchises'){
        this.$router.push({name: 'franchisesOverview'});
      } else if(this.headline === 'buyStreamingRights'){
        this.$router.push({name: 'buyMovieRights'});
      } else if(this.headline === 'listOfMovies'){
        this.$router.push({name: 'moviesOverview'});
      } else if(this.headline === 'listOfPeople'){
        this.$router.push({name: 'peopleOverview'});
      } else if(this.headline === 'listOfAwards'){
        this.$router.push({name: 'awardOverview'});
      } else if(this.headline === 'createScreenplay'){
        this.$store.commit('setNewCurrentScreenplay', new Screenplay(this.$store.getters.getNextScreenplayId, null, null, null,
            null,null, null, null, null, null,
            null, {firstTopic: null, secondTopic: null, thirdTopic: null}, null, null, null, null,
            this.$store.getters.getStudio));
        this.$router.push({name: 'newScreenplay'});
      }
    }
  }
}
</script>

<style scoped>
.actionButton {
  margin-top: 15px;
}
</style>