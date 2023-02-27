<template>
  <div id="durationSectionMainDiv">
    <background-tile id="durationSectionBgTile" :title="$t('durationSection.heading')">
      <div id="durationSectionContent">
        <div class="durationSectionDurationElement">
          <div class="durationSectionDurationElementLabel">{{ $t('durationSection.set') }}</div>
          <div class="durationSectionDurationElementInputContainer">
            <input class="durationSectionDurationElementInput" type="range" :min="2" :max="12" step="1"
                   v-model="preProductionInput" :disabled="confirm">
          </div>
          <div class="durationSectionDurationElementValue">{{ preProductionInput }} {{
              $t('durationSection.weeks')
            }}
          </div>
        </div>

        <div class="durationSectionDurationElement">
          <div class="durationSectionDurationElementLabel">{{ $t('durationSection.set2') }}</div>
          <div class="durationSectionDurationElementInputContainer">
            <input class="durationSectionDurationElementInput" type="range" :min="4" :max="24" step="1"
                   v-model="productionInput" :disabled="confirm">
          </div>
          <div class="durationSectionDurationElementValue">{{ productionInput }} {{ $t('durationSection.weeks') }}</div>
        </div>

        <div class="durationSectionDurationElement">
          <div class="durationSectionDurationElementLabel">{{ $t('durationSection.set3') }}</div>
          <div class="durationSectionDurationElementInputContainer">
            <input class="durationSectionDurationElementInput" type="range" :min="4" :max="24" step="1"
                   v-model="postProductionInput" :disabled="confirm">
          </div>
          <div class="durationSectionDurationElementValue">{{ postProductionInput }} {{
              $t('durationSection.weeks')
            }}
          </div>
        </div>
        <custom-button id="durationSectionConfirmButton" @click="releaseSection = true; confirm = true" :disabled="confirm">{{
            $t('durationSection.confirm')
          }}
        </custom-button>
      </div>
      <div v-if="releaseSection" id="durationSectionRelease">
        <div class="durationSectionDurationElement">
          <div class="durationSectionDurationElementLabel">{{ $t('durationSection.releaseDate') }}</div>
          <div class="durationSectionDurationElementInputContainer">
            <input class="durationSectionDurationElementInput" type="range" :min="0" :max="12" step="1"
                   v-model="releaseDateInput">
          </div>
          <div class="durationSectionDurationElementValue">{{ $t('durationSection.choice') }}{{ releaseDateInput }}
            {{ $t('durationSection.weeks') }}
          </div>
        </div>

        <custom-button @click="calcTheReleaseDate(); release = true; disabled = false">
          {{ $t('durationSection.calc') }}
        </custom-button>
        <div v-if="release" id="durationSectionEstimatedDate">
          <div>{{ $t('durationSection.estimated') }}</div>
          <div>{{ calcReleaseDate.toDateString() }}</div>
        </div>

        <custom-button :disabled="disabled" @click="continueButton">
          {{ $t('durationSection.continue') }}
        </custom-button>
      </div>
    </background-tile>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "durationSection",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      scope: this.$store.state.currentMovie._preProduction.screenplay.details.scope,
      preProductionInput: 0,
      productionInput: 0,
      postProductionInput: 0,
      releaseDateInput: 0,
      productionPhase: 0,
      disabled: true,
      counter: 0,
      calcReleaseDate: null,
      release: false,
      releaseSection: false,
      confirm: false,
    }
  },

  methods: {
    calcTheReleaseDate() {
      this.productionPhase = parseInt(this.preProductionInput) + parseInt(this.productionInput) + parseInt(this.postProductionInput)
      const weeks = this.productionPhase + parseInt(this.releaseDateInput)
      this.calcReleaseDate = this.addWeeks(weeks, this.$store.getters.getCurrentDate)
    },

    addWeeks(weeks, startDate) {
      return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (weeks * 7))
    },

    setStoreWeeks() {
      this.$store.state.currentMovie._preProduction.releaseDate = this.calcReleaseDate;
      this.$store.state.currentMovie._preProduction.preProductionLength = this.preProductionInput
      this.$store.state.currentMovie._preProduction.productionLength = this.productionInput
      this.$store.state.currentMovie._preProduction.postProductionLength = this.postProductionInput

      //check for needed
      switch (this.scope) {
        case "Small":
          if (this.isBetween(2, 4, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(4, 8, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(4, 8, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          break
        case "Normal":
          if (this.isBetween(4, 6, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(8, 12, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(8, 12, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(2, 4, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(4, 8, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(4, 8, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          break
        case "Large":
          if (this.isBetween(6, 8, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(12, 16, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(12, 16, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(4, 6, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(8, 12, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(8, 12, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          break
        case "Epic":
          if (this.isBetween(8, 10, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(16, 20, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(16, 20, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(6, 8, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(12, 16, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(12, 16, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          break
      }
    },

    isBetween(min, max, value) {
      if (value >= min && value < max) return true
    },

    continueButton() {
      if (!this.disabled) {
        this.setStoreWeeks();
        this.$router.push({name: 'budgetSection'})
      }
    },
  },

  mounted() {
    this.preProductionInput = 2
    this.productionInput = 4
    this.postProductionInput = 4
  }
}
</script>

<style scoped>
#durationSectionMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#durationSectionBgTile {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

#durationSectionContent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 20px;
}

.durationSectionDurationElement, #durationSectionEstimatedDate {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px;
}

.durationSectionDurationElementLabel, .durationSectionDurationElementInputContainer, .durationSectionDurationElementValue {
  flex-basis: 0;
}

.durationSectionDurationElementLabel {
  flex-grow: 2;
}

.durationSectionDurationElementInput {
  flex-grow: 1;
}

.durationSectionDurationElementValue {
  flex-grow: 1;
  text-align: center;
}

.durationSectionDurationElementValue {
  white-space: nowrap;
}

#durationSectionConfirmButton {
  margin-top: 10px;
}

#durationSectionRelease {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 20px;
}
</style>