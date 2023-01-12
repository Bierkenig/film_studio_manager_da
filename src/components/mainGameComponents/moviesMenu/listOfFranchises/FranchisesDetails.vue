<template>
  <div id="franchisesDetailsMainDiv">
    <h2 class="franchiseDetailsHeader">{{ $t('general') }}</h2>
    <div class="franchiseDetailsBox">
      <div id="franchiseDetailsPosterBox">
      </div>
      <div v-if="franchise !== null" class="franchiseDetailsFranchiseInfo">
        <div id="franchiseDetailsFranchiseName">
          {{ franchise.name }}
        </div>
        <div>
          {{ franchise.foundationDate }}
        </div>
        <div>
          {{ franchiseMovies.length }}
        </div>
      </div>
    </div>
    <h2 class="franchiseDetailsHeader" id="franchiseDetailsMovieHeader">{{ $t('movies') }}</h2>
    <div class="franchiseDetailsBox">
      <div v-if="franchiseMovies.length !== 0" class="franchiseDetailsMovieBox">
        <div v-for="(it,index) in franchiseMovies" :key="index" class="franchiseDetailsMovieItem">
          {{ it._preProduction.screenplay.title }}
        </div>
      </div>
    </div>
    <custom-button
        v-if="franchise !== null && franchise.owner !== this.$store.getters.getStudio"
        id="franchiseDetailsBuyButton"
        :dark="false"
        size="small"
        :disabled="checkBalance"
        @clicked="buyFranchise">{{ $t('continue') }}</custom-button>
  </div>
</template>

<script>
import Franchises from "@/classes/Franchises";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "FranchisesDetails",
  components: {CustomButton},

  props: {
    franchise: Franchises,
    checkBalance: Boolean
  },

  data(){
    return {
      franchiseMovies: [],
      franchisePrice: 0,
    }
  },

  watch: {
    franchise: function(){
      if (this.franchise !== null) {
        this.franchiseMovies = this.franchise.allMovies;
        //TODO: Franchise Preis setzen
      }
    },
  },

  methods: {
    buyFranchise(){
      this.$store.commit('buyOtherStudiosFranchise',[this.franchise,this.franchisePrice])
    }
  }
}
</script>

<style scoped>
#franchisesDetailsMainDiv {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  width: 550px;
  padding: 15px;
}

.franchiseDetailsHeader {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.franchiseDetailsBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  gap: 15px;
}

#franchiseDetailsPosterBox {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
}

#franchiseDetailsFranchiseName {
  font-size: 28px;
  font-weight: var(--fsm-fw-bold);
}

.franchiseDetailsFranchiseInfo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#franchiseDetailsMovieHeader {
  margin-top: 15px !important;
}

.franchiseDetailsMovieBox {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.franchiseDetailsMovieItem {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  flex: 1;
  padding: 5px 0 5px 5px;
}
</style>