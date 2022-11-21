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
      <div>{{$t('buyScreenplaySection.new')}}</div>
      <button @click="goToCreateScreenplay(null)">{{$t('buyScreenplaySection.create2')}}</button>
    </div>
    <div>
      <div>{{$t('buyScreenplaySection.existing')}}</div>
      <div v-for="(el, index) in owningScreenplays" :key="index">
        {{el.title}} / {{el.genre}} / {{el.ageRating}} / {{el.writer}} / {{el.description}} / {{el.rating}} / {{el.price}}
        <button @click="this.$store.state.preProduction.currentScreenplay = el">{{$t('buyScreenplaySection.choose')}}</button>
      </div>
    </div>
    <div>
      <div>{{$t('buyScreenplaySection.pitch')}}</div>
      <div v-for="(el, index) in directors" :key="index">
        {{el._first_name}} {{el._last_name}} / {{el.age}} / {{el.rating}}
        <button @click="showModal = true; curDir = el">{{$t('buyScreenplaySection.idea')}}</button>
      </div>
      <transition name="modal">
        <screenplay-modal v-if="showModal" :el="curDir" @close="showModal = false">
          <template v-slot:header>
            <h3>custom header</h3>
          </template>
        </screenplay-modal>
      </transition>
    </div>
    <button v-if="this.$store.getters.getCurrentScreenplay !== null" @click="this.$router.push({name: 'directorSection'})">{{$t('buyScreenplaySection.continue')}}</button>
  </div>
</template>

<script>
import {Screenplay} from "@/classes/Screenplay";
import ScreenplayModal from "@/components/mainGameComponents/preProduction/modals/screenplay-modal";

export default {
  name: "screenplaySection",
  components: {ScreenplayModal},
  data() {
    return {
      screenplays: this.$store.getters.getAllScreenplays,
      curDir: null,
      boughtScreenplays: this.$store.getters.getBoughtScreenplays,
      owningScreenplays: this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays),
      franchises: this.$store.getters.getFranchises,
      directors: this.$store.getters.getAllDirectors,
      showModal: false,
    }
  },

  methods: {
    buy(screenplay) {
      this.$store.state.boughtScreenplays.push(screenplay)
      if ((this.$store.getters.getBalance - parseInt(screenplay.price)) > 0){
        this.$store.state.balance -= screenplay.price
      }
    },

    goToCreateScreenplay(el){
      this.$store.commit('setNewCurrentScreenplay', new Screenplay(this.$store.getters.getNextScreenplayId, null, null, null,
          null,null, null, null, null, null,
          {firstTopic: undefined, secondTopic: undefined, thirdTopic: undefined}));
      if (el !== null) {
        this.$store.state.currentFranchise = el;
      }
      this.$store.state.preProduction.isPreProduction = true
      this.$router.push({name: 'createScreenplay'});
    }
  }
}
</script>

<style scoped>
</style>