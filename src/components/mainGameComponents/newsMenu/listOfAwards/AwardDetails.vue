<template>
  <div class="awardDetails">
    <tile-pages-nav class="awardDetailsNavigation" :pages='["International","Independent","Audience"]' :gradient='true'>
      <div>
        <select
            class="awardDetailsSelect"
            v-model="choosenAwardType"
        >
          <option :value="null" disabled>Award Type</option>
          <option value="Movies">Best Film</option>
          <option value="ActorLeadingRole">Best Leading Actor</option>
          <option value="ActorSupportingRole">Best Leading Actress</option>
          <option value="ActressLeadingRole">Best Supporting Actor</option>
          <option value="ActressSupportingRole">Best Supporting Actress</option>
          <option value="Directors">Best Director</option>
          <option value="Writers">Best Writer</option>
        </select>
        <div class="awardDetailsWinnerContainer verticalScroll">
          <div class="awardDetailsYearHeader" v-for="(value, index) in Object.entries(internationalAwards)" :key="index">
            {{ value[0] }}
            <div v-if="choosenAwardType === 'Movies'" class="awardDetailsWinnerName">
                {{ value[1][0].bestMovie._preProduction.screenplay.title }}
            </div>
            <div v-else-if="choosenAwardType === 'ActorLeadingRole'" class="awardDetailsWinnerName">
              {{ value[1][0].bestActorInLeading.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'ActressLeadingRole'" class="awardDetailsWinnerName">
              {{ value[1][0].bestActressInLeading.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'ActorSupportingRole'" class="awardDetailsWinnerName">
              {{ value[1][0].bestActorInSupport.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'ActressSupportingRole'" class="awardDetailsWinnerName">
              {{ value[1][0].bestActressInSupport.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'Directors'" class="awardDetailsWinnerName">
              {{ value[1][0].bestDirector.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'Writers'" class="awardDetailsWinnerName">
              {{ value[1][0].bestWriter.getFullName() }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <select
            class="awardDetailsSelect"
            v-model="choosenAwardType"
        >
          <option :value="null" disabled>Award Type</option>
          <option value="Movies">Best Film</option>
          <option value="Actor">Best Actor</option>
          <option value="Actress">Best Actress</option>
          <option value="Directors">Best Director</option>
          <option value="Writers">Best Writer</option>
        </select>
        <div class="awardDetailsWinnerContainer verticalScroll">
          <div class="awardDetailsYearHeader" v-for="(value, index) in Object.entries(independentAwards)" :key="index">
            {{ value[0] }}
            <div v-if="choosenAwardType === 'Movies'" class="awardDetailsWinnerName">
              {{ value[1][0].bestMovie._preProduction.screenplay.title }}
            </div>
            <div v-else-if="choosenAwardType === 'Actor'" class="awardDetailsWinnerName">
              {{ value[1][0].bestActor.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'Actress'" class="awardDetailsWinnerName">
              {{ value[1][0].bestActress.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'Directors'" class="awardDetailsWinnerName">
              {{ value[1][0].bestDirector.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'Writers'" class="awardDetailsWinnerName">
              {{ value[1][0].bestWriter.getFullName() }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <select
            class="awardDetailsSelect"
            v-model="choosenAwardType"
        >
          <option :value="null" disabled>Award Type</option>
          <option value="ActionOrAdventureMovies">Best Action Or Adventure Film</option>
          <option value="ThrillerMovies">Best Thriller Film</option>
          <option value="ScienceFictionMovies">Best Science Fiction Film</option>
          <option value="FantasyMovies">Best Fantasy Film</option>
          <option value="HorrorMovies">Best Horror Film</option>
          <option value="Actor">Best Actor</option>
          <option value="Actress">Best Actress</option>
          <option value="Directors">Best Directors</option>
          <option value="Writers">Best Writers</option>
        </select>
        <div class="awardDetailsWinnerContainer verticalScroll">
          <div class="awardDetailsYearHeader" v-for="(value, index) in Object.entries(audienceAwards)" :key="index">
            {{ value[0] }}
            <div v-if="choosenAwardType === 'ActionOrAdventureMovies' && value[1][0].bestAction !== null" class="awardDetailsWinnerName">
              {{ value[1][0].bestAction._preProduction.screenplay.title }}
            </div>
            <div v-else-if="choosenAwardType === 'ActionOrAdventureMovies' && value[1][0].bestAdventure !== null" class="awardDetailsWinnerName">
              {{ value[1][0].bestAdventure._preProduction.screenplay.title }}
            </div>
            <div v-if="choosenAwardType === 'ThrillerMovies'" class="awardDetailsWinnerName">
              {{ value[1][0].bestThriller._preProduction.screenplay.title }}
            </div>
            <div v-if="choosenAwardType === 'ScienceFictionMovies'" class="awardDetailsWinnerName">
              {{ value[1][0].bestScienceFiction._preProduction.screenplay.title }}
            </div>
            <div v-if="choosenAwardType === 'FantasyMovies'" class="awardDetailsWinnerName">
              {{ value[1][0].bestFantasy._preProduction.screenplay.title }}
            </div>
            <div v-if="choosenAwardType === 'HorrorMovies'" class="awardDetailsWinnerName">
              {{ value[1][0].bestHorror._preProduction.screenplay.title }}
            </div>
            <div v-else-if="choosenAwardType === 'Actor'" class="awardDetailsWinnerName">
              {{ value[1][0].bestActor.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'Actress'" class="awardDetailsWinnerName">
              {{ value[1][0].bestActress.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'Directors'" class="awardDetailsWinnerName">
              {{ value[1][0].bestDirector.getFullName() }}
            </div>
            <div v-else-if="choosenAwardType === 'Writers'" class="awardDetailsWinnerName">
              {{ value[1][0].bestWriter.getFullName() }}
            </div>
          </div>
        </div>
      </div>
    </tile-pages-nav>
  </div>
</template>

<script>

import TilePagesNav from "@/components/kitchenSink/TilePagesNav.vue";

export default {
  name: "AwardDetails",
  components: {TilePagesNav},

  data(){
    return {
      choosenAwardType: null,
      allAwards: this.$store.getters.getCreatedAwards.concat(this.$store.getters.getAllAwards),
      internationalAwards: {},
      independentAwards: {},
      audienceAwards: {},
    }
  },

  mounted() {
    this.allAwards.forEach((award) => {
      if(!(award.year.getFullYear() in this.internationalAwards) && award.type === 'international'){
        this.internationalAwards[award.year.getFullYear()] = [award];
      } else if((award.year.getFullYear() in this.internationalAwards) && award.type === 'international') {
        this.internationalAwards[award.year.getFullYear()].push(award);
      } else if(!(award.year.getFullYear() in this.independentAwards) && award.type === 'independent'){
        this.independentAwards[award.year.getFullYear()] = [award];
      } else if((award.year.getFullYear() in this.independentAwards) && award.type === 'independent') {
        this.independentAwards[award.year.getFullYear()].push(award);
      } else if(!(award.year.getFullYear() in this.audienceAwards) && award.type === 'audience'){
        this.audienceAwards[award.year.getFullYear()] = [award];
      } else if((award.year.getFullYear() in this.audienceAwards) && award.type === 'audience') {
        this.audienceAwards[award.year.getFullYear()].push(award);
      }
    })
  },
}
</script>

<style scoped>
.awardDetails {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  width: 650px;
  padding: 15px;
}

.awardDetailsWinnerContainer {
  margin-top: 15px;
  height: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.awardDetailsWinnerName {
  font-size: 15px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  margin-top: 10px;
}

.awardDetailsYearHeader {
  font-size: 25px;
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}
</style>