<template>
  <div id="sourcesDetailsMainDiv">
    <h2 class="sourcesDetailsHeader">{{ $t('general') }}</h2>
    <div class="sourcesDetailsBox">
      <div id="sourcesDetailsPosterBox">
      </div>
      <div v-if="source !== null" class="sourcesDetailsSourceInfo">
        <div v-if="typeof source === Screenplay" class="sourcesDetailsSourceName">
          {{ source.title }}
        </div>
        <div v-if="typeof source === Movie" class="sourcesDetailsSourceName">
          {{ source._preProduction.screenplay.title }}
        </div>
        <!--<div>
          {{ franchise.foundationDate.toLocaleDateString(this.$store.getters.getCurrentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
        </div>
        <div>
          {{ franchiseMovies.length }}
        </div>-->
      </div>
    </div>
    <!--<h2 class="sourcesDetailsHeader" id="sourcesDetailsMovieHeader">{{ $t('movies') }}</h2>
    <div class="sourcesDetailsBox">
      <div v-if="franchiseMovies.length !== 0" class="sourcesDetailsMovieBox">
        <div v-for="(it,index) in franchiseMovies" :key="index" class="sourcesDetailsMovieItem">
          {{ it._preProduction.screenplay.title }}
        </div>
      </div>
    </div>
    <custom-button
        v-if="franchise !== null && franchise.owner !== this.$store.getters.getStudio"
        id="sourcesDetailsBuyButton"
        :dark="false"
        size="small"
        :disabled="checkBalance"
        @clicked="buySource">{{ $t('continue') }}</custom-button>-->
  </div>
</template>

<script>
import {Screenplay} from "@/classes/Screenplay";

export default {
  name: "SourcesDetails",
  computed: {
    Screenplay() {
      return Screenplay
    }
  },
  components: {},

  props: {
    source: Object,
    checkBalance: Boolean
  },

  data(){
    return {
      sourcePrice: 0,
    }
  },

  watch: {
    source: function(){
      if (this.source !== null) {
        //TODO: Source Preis setzen
      }
    },
  },

  methods: {
    buySource(){
      //this.$store.commit('buyOtherStudiosFranchise',[this.source,this.sourcePrice])
    }
  }
}
</script>

<style scoped>
#sourcesDetailsMainDiv {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  width: 550px;
  padding: 15px;
}

.sourcesDetailsHeader {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.sourcesDetailsBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  gap: 15px;
}

#sourcesDetailsPosterBox {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
}

.sourcesDetailsSourceName {
  font-size: 28px;
  font-weight: var(--fsm-fw-bold);
}

.sourcesDetailsSourceInfo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>