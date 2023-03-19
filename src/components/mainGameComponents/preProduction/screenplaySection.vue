<template>
  <div id="screenplaySectionMainDiv">
    <icon-button
        id="screenplaySectionBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"
    />

    <background-tile :title="$t('buyScreenplaySection.expand')" class="screenplaySectionColumn"
                     id="screenplaySectionLeft">
      <div id="screenplaySectionLeftContent" class="verticalScroll">
        <div v-for="(el, index) in franchises" :key="index" class="screenplaySectionFranchiseElementContainer">
          <div class="screenplaySectionFranchiseElement">
            <div class="screenplaySectionFranchiseName">{{ el.name }}</div>
            <custom-button @click="goToExpandFranchise(el)" class="screenplaySectionFranchiseButton" size="small">
              {{ $t('buyScreenplaySection.expand2') }}
            </custom-button>
          </div>
        </div>
      </div>
    </background-tile>
    <background-tile :title="$t('buyScreenplaySection.existing')" class="screenplaySectionColumn"
                     id="screenplaySectionCenter">
      <div id="screenplaySectionCenterContent" class="verticalScroll">
        <div v-for="(el, index) in possibleScreenplays" :key="index" class="screenplaySectionScreenplayElement">
          <screenplay-element :writer="el.writer.getFullName()"
                              :genre-icon="el.genre.genreName.toLowerCase()"
                              :genre="el.genre.genreName"
                              :age="el.ageRating.substring(el.ageRating.indexOf('/') + 1)"
                              :screenplay-title="el.title"
                              :quality="el.rating"
                              @open-clicked="setScreenplay(el);this.$router.push({name: 'directorSection'});"
          />
        </div>
      </div>
    </background-tile>
    <div class="screenplaySectionColumn" id="screenplaySectionRight">
      <action-section headline="createScreenplay" info-text="createScreenplayInfoText" button-text="create"
                      icon="screenplay"/>
<!--      <custom-button v-if="this.$store.state.currentMovie._preProduction.screenplay !== null"-->
<!--                     @click="this.$router.push({name: 'directorSection'})">{{ $t('buyScreenplaySection.continue') }}-->
<!--      </custom-button>-->
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import {Screenplay} from "@/classes/Screenplay";
import ActionSection from "@/components/mainGameComponents/moviesMenu/ActionSection.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import ScreenplayElement from "@/components/kitchenSink/ScreenplayElement.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "screenplaySection",
  components: {ScreenplayElement, BackgroundTile, CustomButton, ActionSection, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      screenplays: this.$store.getters.getAllScreenplays,
      boughtScreenplays: this.$store.getters.getBoughtScreenplays,
      possibleScreenplays: [],
      franchises: this.$store.getters.getFranchises,
      allWriters: this.$store.getters.getAllWriters,
      allDirectors: this.$store.getters.getAllDirectors,
      allActors: this.$store.getters.getAllActors,
    }
  },

  mounted() {
    this.setOfferNumberZero(this.allWriters)
    this.setOfferNumberZero(this.allDirectors)
    this.setOfferNumberZero(this.allActors)

    this.$store.getters.getCurrentMovie._status = 'Pre Production'


    let createdScreenplays = this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays);
    let allStudioMovies = this.$store.getters.getInProductionMovies.concat(this.$store.getters.getCreatedMovies, this.$store.getters.getFinishedMovies);

    for (let i = 0; i < createdScreenplays.length; i++) {
      let screenplayAlreadyInUse = false;
      for (let j = 0; j < allStudioMovies.length; j++) {
        if (allStudioMovies[j]._preProduction.screenplay === createdScreenplays[i]) {
          screenplayAlreadyInUse = true;
        }
      }

      if (!screenplayAlreadyInUse) {
        this.possibleScreenplays.push(createdScreenplays[i])
      }
    }
  },

  methods: {
    setOfferNumberZero(array) {
      for (let i = 0; i < array.length; i++) {
        array[i]._no = 0;
      }
    },

    buy(screenplay) {
      if ((this.$store.getters.getBalance - parseInt(screenplay.price)) > 0) {
        this.$store.commit('subtractBalance', screenplay.price);
        this.$store.state.boughtScreenplays.push(screenplay)
        this.screenplays = this.screenplays.filter(el => el.id !== screenplay.id)
      }
    },

    goToExpandFranchise(el) {
      if (el !== null) {
        this.$store.state.currentFranchise = el;
      }
      this.$router.push({name: 'franchiseSection'});
    },

    goToCreateScreenplay() {
      this.$store.commit('setNewCurrentScreenplay', new Screenplay(this.$store.getters.getNextScreenplayId, null, null, null,
          null, null, null, null, null, null,
          {firstTopic: null, secondTopic: null, thirdTopic: null}));
      this.$router.push({name: 'newScreenplay'});
    },


    setScreenplay(screenplay) {
      this.$store.state.currentMovie._preProduction.screenplay = screenplay
    },

    goBack() {
      this.$router.push({name: 'movies'})
    }
  }
}
</script>

<style scoped>
#screenplaySectionBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#screenplaySectionMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.screenplaySectionColumn {
  flex-basis: 0;
  height: 80vh;
}

#screenplaySectionLeft {
  flex-grow: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}

#screenplaySectionLeftContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}

.screenplaySectionFranchiseElementContainer {
  display: block;
}

.screenplaySectionFranchiseElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
}

.screenplaySectionFranchiseName {
  flex-grow: 1;
}

.screenplaySectionFranchiseButton {
  width: fit-content;
  height: fit-content;
}

#screenplaySectionCenter {
  flex-grow: 6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#screenplaySectionCenterContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}

.screenplaySectionScreenplayElement {
  display: block;
}

#screenplaySectionRight {
  flex-grow: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>