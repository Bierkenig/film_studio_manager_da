<template>
<div class="eventElementMainDiv" ref="eventElementMainDiv">
  <div class="eventElementMainContent">
    <custom-icon class="eventElementIcon" :id="'actorDropsOutIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'callForRecastIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'directorDropsOutPreProductionIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'directorWantsMoreBudgetIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'directorWantsExtendPhaseIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'preProductionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="blue"/>

    <custom-icon class="eventElementIcon" :id="'badWeatherIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'castMakesProblemsIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'insufficientBudgetIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'equipmentMalfunctionsIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'budgetProblemsIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'setBreakdownIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'insufficientProductionPhaseIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'directorDropsOutProductionIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'directorWantsChangesIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'injuryOfCastIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'productionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="red"/>

    <custom-icon class="eventElementIcon" :id="'testScreeningIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'soundQualityProblemIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'postProductionProblemIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'visualEffectsProblemIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'visualQualityProblemIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'reshootingOfScenesIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'postProductionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="green"/>

    <custom-icon class="eventElementIcon" :id="'releaseIcon' + randomId" icon="party" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'releaseSummaryIcon' + randomId" icon="documentary" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'dvdSummaryIcon' + randomId" icon="documentary" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'studioTakeoverIcon' + randomId" icon="studio" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'bankruptIcon' + randomId" icon="falling-chart" :size="contentHeight" theme="yellow"/>
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
        return ['actorDropsOut', 'callForRecast', 'directorDropsOutPreProduction', 'directorWantsMoreBudget',
          'directorWantsExtendPhase', 'preProductionFinished',
          'badWeather', 'castMakesProblems', 'insufficientBudget', 'equipmentMalfunctions', 'budgetProblems',
          'setBreakdown', 'insufficientProductionPhase', 'directorDropsOutProduction', 'directorWantsChanges',
          'injuryOfCast', 'productionFinished',
          'testScreening', 'soundQualityProblem', 'postProductionProblem', 'visualEffectsProblem',
          'visualQualityProblem', 'reshootingOfScenes', 'postProductionFinished',
          'release', 'releaseSummary', 'dvdSummary', 'studioTakeover', 'bankrupt', 'award'].includes(value);
      }
    },
    movieTitle: {
      type: String,
      default: 'movieTitle',
    },
    studioName: {
      type: String,
      default: '',
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
        case 'actorDropsOut':
          document.getElementById('actorDropsOutIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.actorDropsOut.title');
          this.description = this.$t('events.actorDropsOut.description') + ' "' + this.movieTitle + '"';
          break;
        case 'callForRecast':
          document.getElementById('callForRecastIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.callForRecast.title');
          this.description = this.$t('events.callForRecast.description') + ' "' + this.movieTitle + '"';
          break;
        case 'directorDropsOutPreProduction':
          document.getElementById('directorDropsOutPreProductionIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.directorDropsOut.title');
          this.description = this.$t('events.directorDropsOut.description') + ' "' + this.movieTitle + '"';
          break;
        case 'directorWantsMoreBudget':
          document.getElementById('directorWantsMoreBudgetIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.directorWantsMoreBudget.title');
          this.description = this.$t('events.directorWantsMoreBudget.description') + ' "' + this.movieTitle + '"';
          break;
        case 'directorWantsExtendPhase':
          document.getElementById('directorWantsExtendPhaseIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.directorWantsExtendPhase.title');
          this.description = this.$t('events.directorWantsExtendPhase.description') + ' "' + this.movieTitle + '"';
          break;
        case 'preProductionFinished':
          document.getElementById('preProductionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.preProductionFinished.title');
          this.description = this.$t('events.preProductionFinished.description') + ' "' + this.movieTitle + '"';
          break;

        case 'badWeather':
          document.getElementById('badWeatherIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.badWeather.title');
          this.description = this.$t('events.badWeather.description') + ' "' + this.movieTitle + '"';
          break;
        case 'castMakesProblems':
          document.getElementById('castMakesProblemsIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.castMakesProblems.title');
          this.description = this.$t('events.castMakesProblems.description') + ' "' + this.movieTitle + '"';
          break;
        case 'insufficientBudget':
          document.getElementById('insufficientBudgetIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.insufficientBudget.title');
          this.description = this.$t('events.insufficientBudget.description') + ' "' + this.movieTitle + '"';
          break;
        case 'equipmentMalfunctions':
          document.getElementById('equipmentMalfunctionsIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.equipmentMalfunctions.title');
          this.description = this.$t('events.equipmentMalfunctions.description') + ' "' + this.movieTitle + '"';
          break;
        case 'budgetProblems':
          document.getElementById('budgetProblemsIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.budgetProblems.title');
          this.description = this.$t('events.budgetProblems.description') + ' "' + this.movieTitle + '"';
          break;
        case 'setBreakdown':
          document.getElementById('setBreakdownIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.setBreakdown.title');
          this.description = this.$t('events.setBreakdown.description') + ' "' + this.movieTitle + '"';
          break;
        case 'insufficientProductionPhase':
          document.getElementById('insufficientProductionPhaseIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.insufficientProductionPhase.title');
          this.description = this.$t('events.insufficientProductionPhase.description') + ' "' + this.movieTitle + '"';
          break;
        case 'directorDropsOutProduction':
          document.getElementById('directorDropsOutProductionIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.directorDropsOut.title');
          this.description = this.$t('events.directorDropsOut.description') + ' "' + this.movieTitle + '"';
          break;
        case 'directorWantsChanges':
          document.getElementById('directorWantsChangesIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.directorWantsChanges.title');
          this.description = this.$t('events.directorWantsChanges.description') + ' "' + this.movieTitle + '"';
          break;
        case 'injuryOfCast':
          document.getElementById('injuryOfCastIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.injuryOfCast.title');
          this.description = this.$t('events.injuryOfCast.description') + ' "' + this.movieTitle + '"';
          break;
        case 'productionFinished':
          document.getElementById('productionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.productionFinished.title');
          this.description = this.$t('events.productionFinished.description') + ' "' + this.movieTitle + '"';
          break;

        case 'testScreening':
          document.getElementById('testScreeningIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.testScreening.title');
          this.description = this.$t('events.testScreening.description') + ' "' + this.movieTitle + '"';
          break;
        case 'soundQualityProblem':
          document.getElementById('soundQualityProblemIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.soundQualityProblem.title');
          this.description = this.$t('events.soundQualityProblem.description') + ' "' + this.movieTitle + '"';
          break;
        case 'postProductionProblem':
          document.getElementById('postProductionProblemIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.postProductionProblem.title');
          this.description = this.$t('events.postProductionProblem.description') + ' "' + this.movieTitle + '"';
          break;
        case 'visualEffectsProblem':
          document.getElementById('visualEffectsProblemIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.visualEffectsProblem.title');
          this.description = this.$t('events.visualEffectsProblem.description') + ' "' + this.movieTitle + '"';
          break;
        case 'visualQualityProblem':
          document.getElementById('visualQualityProblemIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.visualQualityProblem.title');
          this.description = this.$t('events.visualQualityProblem.description') + ' "' + this.movieTitle + '"';
          break;
        case 'reshootingOfScenes':
          document.getElementById('reshootingOfScenesIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.reshootingOfScenes.title');
          this.description = this.$t('events.reshootingOfScenes.description') + ' "' + this.movieTitle + '"';
          break;
        case 'postProductionFinished':
          document.getElementById('postProductionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.postProductionFinished.title');
          this.description = this.$t('events.postProductionFinished.description') + ' "' + this.movieTitle + '"';
          break;

        case 'release':
          document.getElementById('releaseIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.release.title');
          this.description = this.$t('events.release.description') + ' "' + this.movieTitle + '"';
          break;
        case 'releaseSummary':
          document.getElementById('releaseSummaryIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.releaseSummary.title');
          this.description = this.$t('events.releaseSummary.description') + ' "' + this.movieTitle + '"';
          break;
        case 'dvdSummary':
          document.getElementById('dvdSummaryIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.dvdSummary.title');
          this.description = this.$t('events.dvdSummary.description') + ' "' + this.movieTitle + '"';
          break;
        case 'studioTakeover':
          document.getElementById('studioTakeoverIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.studioTakeover.title');
          this.description = this.$t('events.studioTakeover.description') + ' "' + this.studioName + '"';
          break;
        case 'bankrupt':
          document.getElementById('bankruptIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.bankrupt.title');
          this.description = this.$t('events.bankrupt.description');
          break;
        case 'award':
          document.getElementById('awardIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.award.title');
          this.description = this.$t('events.award.description');
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
  flex: 1;
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