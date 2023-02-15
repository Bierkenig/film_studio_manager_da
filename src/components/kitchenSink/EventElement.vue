<template>
<div class="eventElementMainDiv" ref="eventElementMainDiv">
  <div class="eventElementMainContent">
    <!--Event Modal-->
    <custom-icon class="eventElementIcon" :id="'dropOutIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'recastIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'creativeIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'difficultyIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>
    <custom-icon class="eventElementIcon" :id="'extendIcon' + randomId" icon="action" :size="contentHeight" theme="blue"/>

    <!--Event Modal - ERLEDIGT -->
    <custom-icon class="eventElementIcon" :id="'preProductionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="blue"/>

    <!--Event Modal-->
    <custom-icon class="eventElementIcon" :id="'weatherIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'castMemberIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'budgetForCostumesIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'equipmentIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'budgetIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'breakdownIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'durationIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'directorLeavesIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'changesIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>
    <custom-icon class="eventElementIcon" :id="'injuredIcon' + randomId" icon="action" :size="contentHeight" theme="red"/>

    <!--Event Modal - ERLEDIGT -->
    <custom-icon class="eventElementIcon" :id="'productionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="red"/>

    <!--Event Modal-->
    <custom-icon class="eventElementIcon" :id="'soundIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'postProductionProblemIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'visualEffectsIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'visualQualityIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>
    <custom-icon class="eventElementIcon" :id="'reshootingIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>

    <!--Component-->
    <custom-icon class="eventElementIcon" :id="'testScreeningIcon' + randomId" icon="action" :size="contentHeight" theme="green"/>

    <!--Event Modal - ERLEDIGT -->
    <custom-icon class="eventElementIcon" :id="'postProductionFinishedIcon' + randomId" icon="simple-tick" :size="contentHeight" theme="green"/>

    <!--Event Modal - ERLEDIGT -->
    <custom-icon class="eventElementIcon" :id="'beforeReleaseIcon' + randomId" icon="documentary" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'afterReleaseWithCinemaRunIcon' + randomId" icon="documentary" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'afterReleaseIcon' + randomId" icon="documentary" :size="contentHeight" theme="yellow"/>

    <!--Components-->
    <custom-icon class="eventElementIcon" :id="'studioTakeoverIcon' + randomId" icon="studio" :size="contentHeight" theme="yellow"/>

    <custom-icon class="eventElementIcon" :id="'internationalAwardNominationIcon' + randomId" icon="award" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'independentAwardNominationIcon' + randomId" icon="award" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'audienceAwardNominationIcon' + randomId" icon="award" :size="contentHeight" theme="yellow"/>

    <custom-icon class="eventElementIcon" :id="'internationalAwardPresentationIcon' + randomId" icon="award" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'independentAwardPresentationIcon' + randomId" icon="award" :size="contentHeight" theme="yellow"/>
    <custom-icon class="eventElementIcon" :id="'audienceAwardPresentationIcon' + randomId" icon="award" :size="contentHeight" theme="yellow"/>
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
        return ['dropOut', 'recast', 'creative', 'difficulty', 'extend', 'preProductionFinished',
          'weather', 'castMember', 'budgetForCostumes', 'equipment', 'budget', 'breakdown', 'duration',
          'directorLeaves', 'changes', 'injured', 'productionFinished',
          'testScreening', 'sound', 'postProductionProblem', 'visualEffects', 'visualQuality', 'reshooting', 'postProductionFinished',
          'beforeRelease', 'afterReleaseWithCinemaRun', 'afterRelease', 'studioTakeover',
          'internationalAwardNomination', 'independentAwardNomination', 'audienceAwardNomination',
          'internationalAwardPresentation', 'independentAwardPresentation', 'audienceAwardPresentation',].includes(value);
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
        case 'dropOut':
          document.getElementById('dropOutIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.dropOut.title');
          this.description = this.$t('events.dropOut.description') + ' "' + this.movieTitle + '"';
          break;
        case 'recast':
          document.getElementById('recastIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.recast.title');
          this.description = this.$t('events.recast.description') + ' "' + this.movieTitle + '"';
          break;
        case 'creative':
          document.getElementById('creativeIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.creative.title');
          this.description = this.$t('events.creative.description') + ' "' + this.movieTitle + '"';
          break;
        case 'difficulty':
          document.getElementById('difficultyIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.difficulty.title');
          this.description = this.$t('events.difficulty.description') + ' "' + this.movieTitle + '"';
          break;
        case 'extend':
          document.getElementById('extendIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.extend.title');
          this.description = this.$t('events.extend.description') + ' "' + this.movieTitle + '"';
          break;
        case 'preProductionFinished':
          document.getElementById('preProductionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.preProductionFinished.title');
          this.description = this.$t('events.preProductionFinished.description') + ' "' + this.movieTitle + '"';
          break;

        case 'weather':
          document.getElementById('weatherIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.weather.title');
          this.description = this.$t('events.weather.description') + ' "' + this.movieTitle + '"';
          break;
        case 'castMember':
          document.getElementById('castMemberIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.castMember.title');
          this.description = this.$t('events.castMember.description') + ' "' + this.movieTitle + '"';
          break;
        case 'budgetForCostumes':
          document.getElementById('budgetForCostumesIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.budgetForCostumes.title');
          this.description = this.$t('events.budgetForCostumes.description') + ' "' + this.movieTitle + '"';
          break;
        case 'equipment':
          document.getElementById('equipmentIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.equipment.title');
          this.description = this.$t('events.equipment.description') + ' "' + this.movieTitle + '"';
          break;
        case 'budget':
          document.getElementById('budgetIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.budget.title');
          this.description = this.$t('events.budget.description') + ' "' + this.movieTitle + '"';
          break;
        case 'breakdown':
          document.getElementById('breakdownIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.breakdown.title');
          this.description = this.$t('events.breakdown.description') + ' "' + this.movieTitle + '"';
          break;
        case 'duration':
          document.getElementById('durationIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.duration.title');
          this.description = this.$t('events.duration.description') + ' "' + this.movieTitle + '"';
          break;
        case 'directorLeaves':
          document.getElementById('directorLeavesIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.creative.title');
          this.description = this.$t('events.creative.description') + ' "' + this.movieTitle + '"';
          break;
        case 'changes':
          document.getElementById('changesIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.changes.title');
          this.description = this.$t('events.changes.description') + ' "' + this.movieTitle + '"';
          break;
        case 'injured':
          document.getElementById('injuredIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.injured.title');
          this.description = this.$t('events.injured.description') + ' "' + this.movieTitle + '"';
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
        case 'sound':
          document.getElementById('soundIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.sound.title');
          this.description = this.$t('events.sound.description') + ' "' + this.movieTitle + '"';
          break;
        case 'postProductionProblem':
          document.getElementById('postProductionProblemIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.postProductionProblem.title');
          this.description = this.$t('events.postProductionProblem.description') + ' "' + this.movieTitle + '"';
          break;
        case 'visualEffects':
          document.getElementById('visualEffectsIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.visualEffects.title');
          this.description = this.$t('events.visualEffects.description') + ' "' + this.movieTitle + '"';
          break;
        case 'visualQuality':
          document.getElementById('visualQualityIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.visualQuality.title');
          this.description = this.$t('events.visualQuality.description') + ' "' + this.movieTitle + '"';
          break;
        case 'reshooting':
          document.getElementById('reshootingIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.reshooting.title');
          this.description = this.$t('events.reshooting.description') + ' "' + this.movieTitle + '"';
          break;
        case 'postProductionFinished':
          document.getElementById('postProductionFinishedIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.postProductionFinished.title');
          this.description = this.$t('events.postProductionFinished.description') + ' "' + this.movieTitle + '"';
          break;

        case 'beforeRelease':
          document.getElementById('beforeReleaseIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.beforeRelease.title');
          this.description = this.$t('events.beforeRelease.description') + ' "' + this.movieTitle + '"';
          break;
        case 'afterReleaseWithCinemaRun':
          document.getElementById('afterReleaseWithCinemaRunIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.afterReleaseWithCinemaRun.title');
          this.description = this.$t('events.afterReleaseWithCinemaRun.description') + ' "' + this.movieTitle + '"';
          break;
        case 'afterRelease':
          document.getElementById('afterReleaseIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.afterRelease.title');
          this.description = this.$t('events.afterRelease.description') + ' "' + this.movieTitle + '"';
          break;
        case 'studioTakeover':
          document.getElementById('studioTakeoverIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.studioTakeover.title');
          this.description = this.$t('events.studioTakeover.description') + ' "' + this.studioName + '"';
          break;
        case 'internationalAwardNomination':
          document.getElementById('internationalAwardNominationIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.internationalAwardNomination.title');
          this.description = this.$t('events.internationalAwardNomination.description');
          break;
        case 'independentAwardNomination':
          document.getElementById('independentAwardNominationIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.independentAwardNomination.title');
          this.description = this.$t('events.independentAwardNomination.description');
          break;
        case 'audienceAwardNomination':
          document.getElementById('audienceAwardNominationIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.audienceAwardNomination.title');
          this.description = this.$t('events.audienceAwardNomination.description');
          break;
        case 'internationalAwardPresentation':
          document.getElementById('internationalAwardPresentationIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.internationalAwardPresentation.title');
          this.description = this.$t('events.internationalAwardPresentation.description');
          break;
        case 'independentAwardPresentation':
          document.getElementById('independentAwardPresentationIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.independentAwardPresentation.title');
          this.description = this.$t('events.independentAwardPresentation.description');
          break;
        case 'audienceAwardPresentation':
          document.getElementById('audienceAwardPresentationIcon' + this.randomId).style.display = 'block';
          this.title = this.$t('events.audienceAwardPresentation.title');
          this.description = this.$t('events.audienceAwardPresentation.description');
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