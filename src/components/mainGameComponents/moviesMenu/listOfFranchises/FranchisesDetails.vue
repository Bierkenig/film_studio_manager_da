<template>
  <div id="franchisesDetailsMainDiv">
    <h2 class="franchiseDetailsHeader">{{ $t('general') }}</h2>
    <div class="franchiseDetailsOuterBox">
      <div class="franchiseDetailsBox">
        <div id="franchiseDetailsPosterBox">
        </div>
        <div v-if="franchise !== null" class="franchiseDetailsFranchiseInfo">
          <div id="franchiseDetailsFranchiseName">
            {{ franchise.name }}
          </div>
          <div class="franchiseDetailsGeneralInfo">
            <div>
              {{ $t('creationDate') }}
            </div>
            <div>
              {{ franchise.foundationDate.toLocaleDateString(this.$store.getters.getCurrentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
          </div>
          <div class="franchiseDetailsGeneralInfo">
            <div>
              {{ $t('numberOfMovies') }}
            </div>
            <div>
              {{ franchiseMovies.length }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="franchise !== null" class="franchiseDetailsBox">
        <div class="franchiseDetailsPeople">
          <div class="franchiseDetailsPeopleRating">
            <div>
              {{ $t('children') }}
            </div>
            <input class="franchiseDetailsRangeSlider"
                   type="range"
                   :min="0"
                   :max="100"
                   :step="1"
                   v-model="childrenRating" disabled>
          </div>
          <div class="franchiseDetailsPeopleRating">
            <div>
              {{ $t('teenagers') }}
            </div>
            <input class="franchiseDetailsRangeSlider"
                   type="range"
                   :min="0"
                   :max="100"
                   :step="1"
                   v-model="teenagerRating" disabled>
          </div>
          <div class="franchiseDetailsPeopleRating">
            <div>
              {{ $t('adults') }}
            </div>
            <input class="franchiseDetailsRangeSlider"
                   type="range"
                   :min="0"
                   :max="100"
                   :step="1"
                   v-model="adultRating" disabled>
          </div>
        </div>
        <div class="franchiseDetailsFinances">
          <div class="franchiseDetailsFinancesDetails">
            <div class="franchiseDetailsFinancesDetailsHeader">
              {{ $t('price') }}
            </div>
            <div>
              $ {{ currencyFormatDE(franchisePrice) }}
            </div>
          </div>
          <div class="franchiseDetailsFinancesDetails">
            <div class="franchiseDetailsFinancesDetailsHeader">
              {{ $t('expenses') }}
            </div>
            <div>
              $ {{ currencyFormatDE(franchiseExpenses) }}
            </div>
          </div>
          <div class="franchiseDetailsFinancesDetails">
            <div class="franchiseDetailsFinancesDetailsHeader">
              {{ $t('worldwideGross') }}
            </div>
            <div>
              $ {{ currencyFormatDE(franchisePrice) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="franchiseDetailsHeader" id="franchiseDetailsMovieHeader">{{ $t('movies') }}</h2>
    <div class="franchiseDetailsOuterBox">
      <div v-if="franchiseMovies.length !== 0" class="franchiseDetailsMovieBox verticalScroll">
        <div v-for="(it, index) in franchiseMovies" :key="index" class="franchiseDetailsMovieItem">
          <div>
            {{ it._preProduction.screenplay.title }}
          </div>
          <div>
            <!--TODO: mit den Einnahmen des Filmes ersetzen-->
            $ {{ currencyFormatDE(franchiseMovieEarnings[index]) }}
          </div>
          <div>
            {{ it._foundationDate.getFullYear() }}
          </div>
        </div>
      </div>
    </div>
    <custom-button
        v-if="franchise !== null && franchise.owner !== this.$store.getters.getStudio"
        id="franchiseDetailsBuyButton"
        :dark="false"
        size="small"
        :disabled="checkBalance"
        @clicked="buyFranchise">{{ $t('buyScreenplaySection.buy') }}</custom-button>
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
      franchiseExpenses: 0,
      franchiseMovieEarnings: [],
      childrenRating: 0,
      teenagerRating: 0,
      adultRating: 0,
    }
  },

  watch: {
    franchise: function(){
      if (this.franchise !== null) {
        this.franchiseMovies = this.franchise.allMovies;
        this.franchisePrice = 0;
        this.childrenRating = 0;
        this.teenagerRating = 0;
        this.adultRating = 0;
        this.franchiseExpenses = 0;

        for (let i = 0; i < this.franchiseMovies.length; i++) {
          let childrenRatingSum = 0;
          let teenagerRatingSum = 0;
          let adultRatingSum = 0;

          childrenRatingSum += this.franchiseMovies[i].genrePopularity['children'];
          childrenRatingSum += this.franchiseMovies[i].subgenrePopularity['children'];

          teenagerRatingSum += this.franchiseMovies[i].genrePopularity['teenager'];
          teenagerRatingSum += this.franchiseMovies[i].subgenrePopularity['teenager'];

          adultRatingSum += this.franchiseMovies[i].genrePopularity['adult'];
          adultRatingSum += this.franchiseMovies[i].subgenrePopularity['adult'];

          Object.keys(this.franchiseMovies[i].topicPopularity).forEach(key => {
            Object.keys(this.franchiseMovies[i].topicPopularity[key]).forEach(key2 => {
              if(key2 == 'children'){
                childrenRatingSum += this.franchiseMovies[i].topicPopularity[key][key2]
              } else if(key2 == 'teenager'){
                teenagerRatingSum += this.franchiseMovies[i].topicPopularity[key][key2]
              } else if(key2 == 'adult'){
                adultRatingSum += this.franchiseMovies[i].topicPopularity[key][key2]
              }
            })
          })

          this.childrenRating += childrenRatingSum / 5;
          this.teenagerRating += teenagerRatingSum / 5;
          this.adultRating += adultRatingSum / 5;

          // price of each franchise
          let movieEarnings = 0;
          for (let j = 0; j < this.franchiseMovies[i]._earnings.length; j++) {
            movieEarnings += this.franchiseMovies[i]._earnings[j].amount
          }
          this.franchisePrice += movieEarnings;
          this.franchiseMovieEarnings.push(movieEarnings);

          this.franchiseExpenses += this.franchiseMovies[i].totalOutgoings;
        }

        this.childrenRating = this.childrenRating / this.franchiseMovies.length;
        this.teenagerRating = this.teenagerRating / this.franchiseMovies.length;
        this.adultRating = this.adultRating / this.franchiseMovies.length;
      }
    },
  },

  methods: {
    buyFranchise(){
      this.$emit('boughtFranchise')
      this.$store.commit('buyFranchiseFromOtherStudios',[this.franchise,this.franchisePrice])
    },

    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
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

.franchiseDetailsOuterBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.franchiseDetailsBox {
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
  margin: 10px 0 10px 0;
}

.franchiseDetailsFranchiseInfo {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}

#franchiseDetailsMovieHeader {
  margin-top: 15px !important;
}

.franchiseDetailsMovieBox {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 120px;
  width: 100%;
}

.franchiseDetailsMovieItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px 10px 7px 10px;
}

.franchiseDetailsGeneralInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  flex: 1;
  padding: 7px 10px 7px 10px;
}

.franchiseDetailsPeople, .franchiseDetailsFinances {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.franchiseDetailsPeopleRating, .franchiseDetailsFinancesDetails {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 5px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.franchiseDetailsRangeSlider {
  width: 100px;
  height: 10px;
}

.franchiseDetailsRangeSlider::-webkit-slider-thumb {
  background: linear-gradient(to right, var(--fsm-pink-1) 0%, var(--fsm-pink-1) 50%, var(--fsm-dark-blue-4) 50%, var(--fsm-dark-blue-4) 100%);
}

#franchiseDetailsBuyButton {
  margin-top: 15px;
}

.franchiseDetailsFinancesDetailsHeader {
  flex: 1;
}
</style>