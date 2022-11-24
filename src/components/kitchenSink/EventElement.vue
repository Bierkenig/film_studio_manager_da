<template>
<div class="eventElementMainDiv" ref="eventElementMainDiv">
  <div class="eventElementMainContent">
    <custom-icon class="eventElementIcon" :id="'productionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'featureFilmIcon' + randomId" icon="rising-chart" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'blockbusterIcon' + randomId" icon="rising-chart" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'awardIcon' + randomId" icon="award" :size="contentHeight" theme="yellow"/>
    <div class="eventElementText">
      <div class="eventElementTitle">{{title}}</div>
      <div class="eventElementDescription">{{description}}</div>
    </div>
  </div>
  <icon-button class="eventElementOpenButton" icon="open" size="small" theme="light"/>
</div>
</template>

<script>
import CustomIcon from "@/components/kitchenSink/CustomIcon";
import IconButton from "@/components/kitchenSink/IconButton";
export default {
  name: "EventElement",
  components: {IconButton, CustomIcon},
  data() {
    return {
      title: 'Title',
      description: 'Description',
      icon: 'simple-tick',
      iconTheme: 'red',
      contentHeight: '30px',
      randomId: Math.floor(Math.random() * Math.pow(10, 10)),
      openIconDisplay: 'flex',
    }
  },
  props: {
    type: {
      type: String,
      default: 'productionFinished',
      validator(value) {
        return ['productionFinished', 'featureFilm', 'blockbuster', 'award'].includes(value);
      }
    },
    movieTitle: {
      type: String,
      default: 'movieTitle',
    },
    hideOpenIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setupElement() {
      if (this.hideOpenIcon) {
        this.openIconDisplay = 'none';
      }
      switch (this.type) {
        case 'productionFinished':
          document.getElementById('productionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = 'Production finished';
          this.description = 'Of the movie "' + this.movieTitle + '"';
          break;
        case 'featureFilm':
          document.getElementById('featureFilmIcon' + this.randomId).style.display = 'block';
          this.title = 'Feature Film Release';
          this.description = 'Of the movie "' + this.movieTitle + '"';
          break;
        case 'blockbuster':
          document.getElementById('blockbusterIcon' + this.randomId).style.display = 'block';
          this.title = 'Blockbuster Release';
          this.description = 'Of the movie "' + this.movieTitle + '"';
          break;
        case 'award':
          document.getElementById('awardIcon' + this.randomId).style.display = 'block';
          this.title = 'International Film Awards';
          this.description = 'Nomination Announcements';
          break;
        default:
          throw('Invalid event type!');
      }
    },
  },
  mounted() {
    this.setupElement();
  },
}
</script>

<style scoped>
.eventElementMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  height: 60px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.eventElementMainContent {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.eventElementIcon {
  display: none;
  margin: 5px 15px 5px 5px;
}

.eventElementText {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.eventElementTitle {
  font-size: 18px;
  font-weight: var(--fsm-fw-regular);
}

.eventElementDescription {
  font-size: 14px;
  font-weight: var(--fsm-fw-regular);
  color: var(--fsm-grey-font-color);
}

.eventElementOpenButton {
  display: v-bind('openIconDisplay');
  margin: 5px;
}
</style>