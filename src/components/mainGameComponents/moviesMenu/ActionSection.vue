<template>
  <div id="actionSectionContainer">
    <h2 class="actionSectionHeader">{{ $t(headline) }}</h2>
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
import {Screenplay} from "@/classes/Screenplay";
import CustomButton from "@/components/kitchenSink/CustomButton";

export default {
  name: "ActionSection",
  components: {CustomButton},
  props: {
    headline: String,
    infoText: String,
    buttonText: String,
  },

  methods: {
    goToSite(){
      if(this.headline === 'createScreenplay'){
        this.$store.commit('setNewCurrentScreenplay', new Screenplay(this.$store.getters.getNextScreenplayId, null, null, null,
            null,null, null, null, null, null,
            {firstTopic: undefined, secondTopic: undefined, thirdTopic: undefined}));
        this.$router.push({name: 'createScreenplay'});
      } else if(this.headline === 'createMovie'){
        //TODO: add function for create movie
        console.log('ADD FUNCTION IN CODE')
      } else if(this.headline === 'listOfSources'){
        //TODO: add function for list sources
        console.log('ADD FUNCTION IN CODE')
      } else if(this.headline === 'listOfFranchises'){
        //TODO: add function for list franchises
        console.log('ADD FUNCTION IN CODE')
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

.actionSectionInfoText {
  color: #848891;
}

.actionSectionHeader {
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}
</style>