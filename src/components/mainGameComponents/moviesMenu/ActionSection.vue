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
        this.$store.state.currentMovie = new Movie(this.$store.state.studio, null, {children: 0, teenager: 0, adult: 0})
        this.$store.getters.getCurrentMovie._foundationDate = this.$store.getters.getCurrentDate;
        this.$router.push({name: 'screenplaySection'});
      } else if(this.headline === 'listOfSources'){
        this.$router.push({name: 'sourcesOverview'});
      } else if(this.headline === 'listOfFranchises'){
        this.$router.push({name: 'franchisesOverview'});
      } else if(this.headline === 'buyStreamingRights'){
        this.$router.push({name: 'buyMovieRights'});
      } else if(this.headline === 'listOfMovies'){
        //TODO: Link einfügen
      } else if(this.headline === 'listOfPeople'){
        //TODO: Link einfügen
      } else if(this.headline === 'listOfAwards'){
        //TODO: Link einfügen
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