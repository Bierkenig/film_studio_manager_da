<template>
  <div id="actionSectionContainer">
    <div id="actionSectionHeaderContainer">
      <h2 class="actionSectionHeader">{{ $t(headline) }}</h2>
      <info-circle
          id="actionSectionHeaderIcon"
          :icon="icon"
          :dark="false"/>
    </div>
    <div class="actionSectionInfoText">
      {{ $t(infoText) }}
    </div>
    <custom-button
        class="actionButton"
        :dark="false"
        size="small"
        @clicked="goToSite">{{ $t(buttonText) }}</custom-button>

  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton";
import {Movie} from "@/classes/Movie";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";

export default {
  name: "ActionSection",
  components: {InfoCircle, CustomButton},
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
      }
    }
  }
}
</script>

<style scoped>
#actionSectionContainer {
  display: flex;
  flex-direction: column;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  padding: 0 20px 20px 20px;
}

#actionSectionHeaderContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#actionSectionHeaderIcon {
  margin-top: 20px;
}

.actionSectionInfoText {
  color: #848891;
  width: 75%;
}

.actionSectionHeader {
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.actionButton {
  margin-top: 15px;
}
</style>