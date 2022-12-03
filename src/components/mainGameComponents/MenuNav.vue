<template>
  <div id="menuNavContainer">
    <router-link to="home">
      <icon-button
          id="homeButton"
          icon="home"
          size="medium"
          :dark="highlightButton['homeButton']"
          :bg-gradient="true"
          :icon-gradient="true"
          :shadow="false"
          @click="focusButton('homeButton')"/>
    </router-link>
    <router-link to="movies">
      <icon-button
          id="moviesButton"
          icon="movies"
          size="medium"
          :dark="highlightButton['moviesButton']"
          :bg-gradient="true"
          :icon-gradient="true"
          :shadow="false"
          @click="focusButton('moviesButton')"/>
    </router-link>
    <router-link to="streaming">
      <icon-button
          id="streamingButton"
          icon="streaming"
          size="medium"
          :dark="highlightButton['streamingButton']"
          :bg-gradient="true"
          :icon-gradient="true"
          :shadow="false"
          @click="focusButton('streamingButton')"/>
    </router-link>
    <router-link to="news">
      <icon-button
          id="newsButton"
          icon="news"
          size="medium"
          :dark="highlightButton['newsButton']"
          :bg-gradient="true"
          :icon-gradient="true"
          :shadow="false"
          @click="focusButton('newsButton')"/>
    </router-link>
    <router-link to="finances">
      <icon-button
          id="financesButton"
          icon="money"
          size="medium"
          :dark="highlightButton['financesButton']"
          :bg-gradient="true"
          :icon-gradient="true"
          :shadow="false"
          @click="focusButton('financesButton')"/>
    </router-link>
    <router-link to="calendar">
      <icon-button
          id="calendarButton"
          icon="calendar"
          size="medium"
          :dark="highlightButton['calendarButton']"
          :bg-gradient="true"
          :icon-gradient="true"
          :shadow="false"
          @click="focusButton('calendarButton')"/>
    </router-link>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton";

export default {
  name: "MenuNav",

  components: {IconButton},

  props:{
    pageName: String,
  },

  data(){
    return {
      lastButton: 'homeButton',
      highlightButton: {
        'homeButton': true,
        'moviesButton': true,
        'streamingButton': true,
        'newsButton': true,
        'financesButton': true,
        'calendarButton': true,
      }
    }
  },

  mixins: [soundeffectMixin('button','click')],

  mounted() {
    //this.highlightButton['homeButton'] = false;
  },

  methods: {
    focusButton(name){
      this.highlightButton[name] = false;
      this.highlightButton[this.lastButton] = true;
      this.lastButton = name;
    }
  }
}
</script>

<style scoped>
#menuNavContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  margin-top: 1em;
}
</style>