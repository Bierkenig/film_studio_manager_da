<template>
  <div>
    <div>
      <div>{{$t('buyScreenplaySection.buyScreenplay')}}</div>
      <div v-for="(el, index) in screenplays" :key="index">
        {{el.title}} / {{el.genre}} / {{el.ageRating}} / {{el.writer}} / {{el.description}} / {{el.rating}} / {{el.price}}
        <button @click="buy(el)">{{$t('buyScreenplaySection.buy')}}</button>
      </div>
    </div>
    <div>
      <div>{{$t('buyScreenplaySection.expand')}}</div>
      <div v-for="(el, index) in franchises" :key="index">
        {{el.name}}
        <button @click="goToCreateScreenplay(el)">{{$t('buyScreenplaySection.expand2')}}</button>
      </div>
    </div>
    <div>
      <div>{{$t('buyScreenplaySection.existing')}}</div>
      <div v-for="(el, index) in possibleScreenplays" :key="index">
        {{el.title}} / {{el.genre}} / {{el.ageRating}} / {{el.writer._first_name}} | {{el.writer._last_name}} / {{el.description}} / {{el.rating}} / {{el.price}}
        <button @click="setScreenplay(el)">{{$t('buyScreenplaySection.choose')}}</button>
      </div>
    </div>
    <button v-if="this.$store.state.currentMovie._preProduction.screenplay !== null" @click="this.$router.push({name: 'directorSection'})">{{$t('buyScreenplaySection.continue')}}</button>

    <icon-button
        id="screenplaySectionBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";

export default {
  name: "screenplaySection",
  components: {IconButton},
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

    let createdScreenplays = this.$store.getters.getScreenplays;
    for (let i = 0; i < createdScreenplays.length; i++) {
      if(createdScreenplays[i].franchise === null){
        this.possibleScreenplays.push(createdScreenplays[i])
      }
    }
    this.possibleScreenplays = this.possibleScreenplays.concat(this.$store.getters.getBoughtScreenplays)
  },

  methods: {
    setOfferNumberZero(array){
      for (let i = 0; i < array.length; i++) {
        array[i]._no = 0;
      }
    },

    buy(screenplay) {
      this.$store.state.boughtScreenplays.push(screenplay)
      if ((this.$store.getters.getBalance - parseInt(screenplay.price)) > 0){
        this.$store.commit('subtractBalance',screenplay.price);
      }
    },

    goToCreateScreenplay(el){
      if (el !== null) {
        this.$store.state.currentFranchise = el;
      }
      this.$router.push({name: 'franchiseSection'});
    },

    setScreenplay(screenplay) {
      this.$store.state.currentMovie._preProduction.screenplay = screenplay
    },

    goBack(){
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

* {
  text-align: center;
}
</style>