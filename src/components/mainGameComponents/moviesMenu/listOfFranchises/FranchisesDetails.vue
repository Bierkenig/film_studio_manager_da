<template>
  <div id="franchisesDetailsMainDiv">
    <background-tile :title="$t('general')">
      <div class="franchiseDetailsOuterBox">
        <div class="franchiseDetailsBox">
          <div class="franchiseDetailsPosterBox"/>
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
              <input type="range"
                     :min="0"
                     :max="100"
                     :step="1"
                     v-model="childrenRating" disabled>
            </div>
            <div class="franchiseDetailsPeopleRating">
              <div>
                {{ $t('teenagers') }}
              </div>
              <input type="range"
                     :min="0"
                     :max="100"
                     :step="1"
                     v-model="teenagerRating" disabled>
            </div>
            <div class="franchiseDetailsPeopleRating">
              <div>
                {{ $t('adults') }}
              </div>
              <input type="range"
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
                $ {{ roundBudget(franchisePrice) }}
              </div>
            </div>
            <div class="franchiseDetailsFinancesDetails">
              <div class="franchiseDetailsFinancesDetailsHeader">
                {{ $t('expenses') }}
              </div>
              <div>
                $ {{ roundBudget(franchiseExpenses) }}
              </div>
            </div>
            <div class="franchiseDetailsFinancesDetails">
              <div class="franchiseDetailsFinancesDetailsHeader">
                {{ $t('worldwideGross') }}
              </div>
              <div>
                $ {{ roundBudget(franchisePrice) }}
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
    </background-tile>
  </div>
</template>

<script>
import Franchises from "@/classes/Franchises";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "FranchisesDetails",
  components: {BackgroundTile},

  props: {
    franchise: Franchises,
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
    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    },

    roundBudget(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
    },
  }
}
</script>

<style scoped>
#franchisesDetailsMainDiv {
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

.franchiseDetailsPosterBox {
  height: 160px;
  border-radius: var(--fsm-s-border-radius);
  flex-basis: 120px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('sourcePosterSVG');
  background-size: 120px;
  background-position: center;
  background-repeat: no-repeat;
}

#franchiseDetailsFranchiseName {
  font-size: 28px;
  font-weight: var(--fsm-fw-bold);
  margin: 10px 0 10px 0;
  flex: 1;
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
  font-size: 14px;
}

.franchiseDetailsGeneralInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px 10px 7px 10px;
  font-size: 14px;
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
  padding: 7px 10px 7px 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

#franchiseDetailsBuyButton {
  margin-top: 15px;
}

.franchiseDetailsFinancesDetailsHeader {
  flex: 1;
  font-size: 14px;
}
</style>