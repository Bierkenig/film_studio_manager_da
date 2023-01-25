<template>
<div class="eventElementMainDiv" ref="eventElementMainDiv">
  <div class="eventElementMainContent">
    <custom-icon class="eventElementIcon" :id="'preProductionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'productionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'postProductionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'featureFilmIcon' + randomId" icon="rising-chart" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'blockbusterIcon' + randomId" icon="rising-chart" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'awardIcon' + randomId" icon="award" :size="contentHeight" theme="yellow"/>
    <div class="eventElementText">
      <div class="eventElementTitle">{{title}}</div>
      <div class="eventElementDescription">{{description}}</div>
    </div>
  </div>
  <icon-button class="eventElementOpenButton" icon="arrow-right" size="small" theme="light" @click="openButtonFunction"/>
  <icon-button class="eventElementDoneButton" icon="simple-tick" size="small" :disabled="true"/>
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
      openIconDisplay: 'none',
      doneIconDisplay: 'none',
    }
  },
  props: {
    type: {
      type: String,
      default: 'productionFinished',
      validator(value) {
        return ['preProductionFinished', 'productionFinished', 'postProductionFinished', 'featureFilm', 'blockbuster', 'award'].includes(value);
      }
    },
    movieTitle: {
      type: String,
      default: 'movieTitle',
    },
    status: {
      type: String,
      default: 'none',
      validator(value) {
        return ['none', 'open', 'done'].includes(value);
      }
    },
  },
  methods: {
    setupElement() {
      this.updateStatus();
      switch (this.type) {
        case 'preProductionFinished':
          document.getElementById('preProductionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.preProductionFinished.title');
          this.description = this.$t('events.preProductionFinished.description') + ' "' + this.movieTitle + '"';
          break;
        case 'productionFinished':
          document.getElementById('productionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.productionFinished.title');
          this.description = this.$t('events.productionFinished.description') + ' "' + this.movieTitle + '"';
          break;
        case 'postProductionFinished':
          document.getElementById('postProductionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.postProductionFinished.title');
          this.description = this.$t('events.postProductionFinished.description') + ' "' + this.movieTitle + '"';
          break;
        case 'featureFilm':
          document.getElementById('featureFilmIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.featureRelease.title');
          this.description = this.$t('events.featureRelease.description') + ' "' + this.movieTitle + '"';
          break;
        case 'blockbuster':
          document.getElementById('blockbusterIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.blockbusterRelease.title');
          this.description = this.$t('events.blockbusterRelease.description') + ' "' + this.movieTitle + '"';
          break;
        case 'award':
          document.getElementById('awardIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.awards.title');
          this.description = this.$t('events.awards.description');
          break;
        default:
          throw('Invalid event type!');
      }
    },
    openButtonFunction() {
      this.$emit('open-clicked');
    },
    updateStatus() {
      switch (this.status) {
        case 'none':
          this.openIconDisplay = 'none';
          this.doneIconDisplay = 'none';
          break;
        case 'open':
          this.openIconDisplay = 'flex';
          this.doneIconDisplay = 'none';
          break;
        case 'done':
          this.openIconDisplay = 'none';
          this.doneIconDisplay = 'flex';
          break;
        default:
          this.openIconDisplay = 'none';
          this.doneIconDisplay = 'none';
          break;
      }
    },
  },
  mounted() {
    this.setupElement();
  },
  watch: {
    status: function() {
      this.updateStatus();
    }
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

.eventElementDoneButton {
  display: v-bind('doneIconDisplay');
  margin: 5px;
}
</style>