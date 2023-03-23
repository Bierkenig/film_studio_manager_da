<template>
  <div>
    <div id="menuNavContainer">
      <p style="width: 15%"></p>
      <div id="menuNavButtonContainer">
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
      </div>

      <custom-button
          id="menuNavSkipButton"
          :dark="false"
          size="medium"
          :disabled="this.allEventsCompleted === false"
          @clicked="startSimulation">{{ $t('continue') }}</custom-button>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "MenuNav",

  components: {CustomButton, IconButton},

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
      this.checkCalendarEvents();
    },

    '$store.getters.getCurrentCalendarEvent.completed': function (){
      this.checkCalendarEvents();
    },

    '$route.name': function (){
      if(this.$route.name === 'createStudio'){
        this.highlightButton['homeButton'] = false;
        this.highlightButton[this.lastButton] = false;
        this.lastButton = 'homeButton';
      }
    }
  },

  methods: {
    checkCalendarEvents(){
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      this.allEventsCompleted = null;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].start === this.formatDate(this.$store.getters.getCurrentDate.toDateString())){
          if(this.allEventsCompleted === null || this.allEventsCompleted === true){
            this.allEventsCompleted = allCalendarEvents[i].completed;
          }
        }
      }
    },

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

      if(name === 'moviesButton'){
        this.$router.push({name: 'movies'})
      } else if(name === 'homeButton'){
        this.$router.push({name: 'home'})
      } else if(name === 'streamingButton'){
        this.$router.push({name: 'streaming'})
      } else if(name === 'newsButton'){
        this.$router.push({name: 'news'})
      } else if(name === 'financesButton'){
        this.$router.push({name: 'finances'})
      } else if(name === 'calendarButton'){
        this.$router.push({name: 'calendar'})
      }

      this.lastButton = name;
    },

    startSimulation(){
      this.$router.push({name: 'simulation'})
      this.highlightButton['homeButton'] = false;
      this.highlightButton[this.lastButton] = false;
      this.lastButton = 'homeButton';
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