<template>
  <div>
    <div id="menuNavContainer">
      <p style="width: 15%"></p>
      <div id="menuNavButtonContainer">
        <router-link to="home">
          <icon-button
              id="homeButton"
              icon="home"
              size="medium"
              :dark="false"
              :bg-gradient="true"
              :icon-gradient="true"
              :shadow="false"
              :invertTheme="highlightButton['homeButton']"
              :data-title="$t('home')"
              @click="focusButton('homeButton')"/>
        </router-link>
        <router-link to="movies">
          <icon-button
              id="moviesButton"
              icon="movies"
              size="medium"
              :dark="true"
              :bg-gradient="true"
              :icon-gradient="true"
              :shadow="false"
              :invertTheme="highlightButton['moviesButton']"
              :data-title="$t('movies')"
              @click="focusButton('moviesButton')"/>
        </router-link>
        <router-link to="streaming">
          <icon-button
              id="streamingButton"
              icon="streaming"
              size="medium"
              :dark="true"
              :bg-gradient="true"
              :icon-gradient="true"
              :shadow="false"
              :invertTheme="highlightButton['streamingButton']"
              data-title="Streaming"
              @click="focusButton('streamingButton')"/>
        </router-link>
        <router-link to="news">
          <icon-button
              id="newsButton"
              icon="news"
              size="medium"
              :dark="true"
              :bg-gradient="true"
              :icon-gradient="true"
              :shadow="false"
              :invertTheme="highlightButton['newsButton']"
              :data-title="$t('news')"
              @click="focusButton('newsButton')"/>
        </router-link>
        <router-link to="finances">
          <icon-button
              id="financesButton"
              icon="money"
              size="medium"
              :dark="true"
              :bg-gradient="true"
              :icon-gradient="true"
              :shadow="false"
              :invertTheme="highlightButton['financesButton']"
              :data-title="$t('finances')"
              @click="focusButton('financesButton')"/>
        </router-link>
        <router-link to="calendar">
          <icon-button
              id="calendarButton"
              icon="calendar"
              size="medium"
              :dark="true"
              :bg-gradient="true"
              :icon-gradient="true"
              :shadow="false"
              :invertTheme="highlightButton['calendarButton']"
              :data-title="$t('calendar')"
              @click="focusButton('calendarButton')"/>
        </router-link>
      </div>

      <custom-button
          id="menuNavSkipButton"
          :dark="false"
          size="medium"
          :disabled="this.allEventsCompleted === false"
          @clicked="this.$router.push({name: 'simulation'})">{{ $t('continue') }}</custom-button>
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "MenuNav",

  components: {CustomButton, IconButton},

  mixins: [soundeffectMixin('button','click')],

  props: {
    checkVisibility: Boolean
  },

  data(){
    return {
      lastButton: 'homeButton',
      highlightButton: {
        'homeButton': false,
        'moviesButton': false,
        'streamingButton': false,
        'newsButton': false,
        'financesButton': false,
        'calendarButton': false,
      },
      allEventsCompleted: null,
    }
  },

  watch: {
    checkVisibility: function (){
      if(this.checkVisibility) {
        this.highlightButton['homeButton'] = false;
        this.highlightButton[this.lastButton] = false;
        this.lastButton = 'homeButton';
      }
    },

    '$store.getters.getCurrentDate': function (){
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      this.allEventsCompleted = null;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].start === this.formatDate(this.$store.getters.getCurrentDate.toDateString())){
          if(this.allEventsCompleted === null || this.allEventsCompleted === true){
            this.allEventsCompleted = allCalendarEvents[i].completed;
          }
        }
      }
    }
  },

  methods: {
    focusButton(name){
      if(name === 'homeButton'){
        this.highlightButton[name] = false;
      } else {
        this.highlightButton[name] = true;
      }
      if(this.lastButton === 'homeButton'){
        this.highlightButton[this.lastButton] = true;
      } else {
        this.highlightButton[this.lastButton] = false;
      }

      this.lastButton = name;
    },

    formatDate(date) {
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }
  }
}
</script>

<style scoped>
#menuNavContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 100px;
  margin-right: 100px;
}

#menuNavButtonContainer {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

#menuNavSkipButton {
  width: 15%;
}
</style>