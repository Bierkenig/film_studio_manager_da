<template>
  <div class="testScreeningMainDiv">
    <background-tile class="testScreeningBackground" :title="'Test Screening - ' + this.$store.getters.getCurrentCalendarEvent.movie">
      <div>
        <div class="testScreeningInfoElement">
          <div>{{ $t('projectElement.release') }}</div>
          <div>{{this.releaseDate.toLocaleDateString('de-DE')}}</div>
        </div>
        <div class="testScreeningHeader" v-if="feedbacks">{{ $t('postProductionEvents.testScreening.result') }}</div>

        <custom-button size="small" v-if="!feedbacks" class="testScreeningRunButton" @clicked="buildFeedbacks">
          {{ $t('postProductionEvents.testScreening.run') }}
        </custom-button>
        <div v-if="feedbacks">
          <div class="testScreeningOverallResults">
            <div class="testScreeningOverallInfo">
              <div>Overall</div>
              <div>{{this.feedbackCount}}/5</div>
            </div>
            <div>
              <info-circle class="projectElementInfoCircle"
                           size="50px"
                           :large-font="true"
                           :text="this.testScreeningRating.toString()"
                           data-title="Test Screening Rating"/>
            </div>
          </div>
          <div class="testScreeningResultContainer">
            <div class="testScreeningResultElement">
              <div class="testScreeningPositiveResultHeader">Positive</div>
              <div v-if="!this.$store.state.type.editing">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.editingTitle') }}:</div>
                <div class="testScreeningFeedback">{{ editingFeedback }}</div>
              </div>
              <div v-if="!this.$store.state.type.sound">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.soundTitle') }}:</div>
                <div class="testScreeningFeedback">{{ soundFeedback }}</div>
              </div>
              <div v-if="!this.$store.state.type.vfx">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.vfxTitle') }}:</div>
                <div class="testScreeningFeedback">{{ vfxFeedback }}</div>
              </div>
              <div v-if="!this.$store.state.type.acting">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.actingTitle') }}:</div>
                <div class="testScreeningFeedback">{{ actingFeedback }}</div>
              </div>
            </div>
            <div class="testScreeningResultElement">
              <div class="testScreeningNegativeResultHeader">Negative</div>
              <div v-if="this.$store.state.type.editing">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.editingTitle') }}:</div>
                <div class="testScreeningFeedback">{{ editingFeedback }}</div>
              </div>
              <div v-if="this.$store.state.type.sound">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.soundTitle') }}:</div>
                <div class="testScreeningFeedback">{{ soundFeedback }}</div>
              </div>
              <div v-if="this.$store.state.type.vfx">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.vfxTitle') }}:</div>
                <div class="testScreeningFeedback">{{ vfxFeedback }}</div>
              </div>
              <div v-if="this.$store.state.type.acting">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.actingTitle') }}:</div>
                <div class="testScreeningFeedback">{{ actingFeedback }}</div>
              </div>
              <div v-if="this.$store.state.type.story">
                <div class="testScreeningFeedbackType">{{ $t('postProductionEvents.testScreening.storyTitle') }}:</div>
                <div class="testScreeningFeedback">{{ storyFeedback }}</div>
              </div>
            </div>
          </div>

          <router-link :to = "{name: 'testScreeningOptions'}">
            <custom-button size="small" class="testScreeningRunButton">{{ $t('continue') }}</custom-button>
          </router-link>
        </div>
      </div>
    </background-tile>
  </div>
</template>

<script>
import {i18next} from '@/translation/i18n'
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "reeditingDirector",
  components: {InfoCircle, CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      feedbacks: false,
      feedbackCount: 5,
      testScreeningRating: 0,

      goodFeedback: ["good.feed1", "good.feed2", "good.feed3", "good.feed4", "good.feed5"],
      badFeedback: ["bad.feed1", "bad.feed2", "bad.feed3", "bad.feed4", "bad.feed5"],

      featureList: this.$store.state.feature,
      indieList: this.$store.state.indie,
      animatedList: this.$store.state.animation,

      editingFeedback: null,
      soundFeedback: null,
      vfxFeedback: null,
      actingFeedback: null,
      storyFeedback: null,

      editingBudget: this.$store.state.currentMovie?._preProduction.budget.editing,
      soundBudget: this.$store.state.currentMovie?._preProduction.budget.sound,
      scoreBudget: this.$store.state.currentMovie?._preProduction.budget.score,
      vfxBudget: this.$store.state.currentMovie?._preProduction.budget.vfx,

      dirMorale: this.$store.state.currentMovie?._preProduction.hiredDirector.dirMorale,
      crewMorale: this.$store.state.currentMovie?.crewMorale,
      screenplayRating: this.$store.state.currentMovie?._preProduction.screenplay.rating,
      screenplayType: this.$store.state.currentMovie?._preProduction.screenplay.type,

      editingFeatureMin: parseInt(this.splitRange(this.$store.state.feature[4])[0]),
      editingFeatureMax: parseInt(this.splitRange(this.$store.state.feature[4])[1]),
      editingFeatureRange: 0,

      editingIndieMin: parseInt(this.splitRange(this.$store.state.indie[4])[0]),
      editingIndieMax: parseInt(this.splitRange(this.$store.state.indie[4])[1]),
      editingIndieRange: 0,

      editingAnimationMin: parseInt(this.splitRange(this.$store.state.animation[4])[0]),
      editingAnimationMax: parseInt(this.splitRange(this.$store.state.animation[4])[1]),
      editingAnimationRange: 0,

      soundFeatureMin: parseInt(this.splitRange(this.$store.state.feature[3])[0]),
      soundFeatureMax: parseInt(this.splitRange(this.$store.state.feature[3])[1]),
      soundFeatureRange: 0,

      soundIndieMin: parseInt(this.splitRange(this.$store.state.indie[3])[0]),
      soundIndieMax: parseInt(this.splitRange(this.$store.state.indie[3])[1]),
      soundIndieRange: 0,

      soundAnimationMin: parseInt(this.splitRange(this.$store.state.animation[3])[0]),
      soundAnimationMax: parseInt(this.splitRange(this.$store.state.animation[3])[1]),
      soundAnimationRange: 0,

      scoreFeatureMin: parseInt(this.splitRange(this.$store.state.feature[3])[0]),
      scoreFeatureMax: parseInt(this.splitRange(this.$store.state.feature[3])[1]),
      scoreFeatureRange: 0,

      scoreIndieMin: parseInt(this.splitRange(this.$store.state.indie[3])[0]),
      scoreIndieMax: parseInt(this.splitRange(this.$store.state.indie[3])[1]),
      scoreIndieRange: 0,

      scoreAnimationMin: parseInt(this.splitRange(this.$store.state.animation[3])[0]),
      scoreAnimationMax: parseInt(this.splitRange(this.$store.state.animation[3])[1]),
      scoreAnimationRange: 0,

      vfxFeatureMin: parseInt(this.splitRange(this.$store.state.feature[11])[0]),
      vfxFeatureMax: parseInt(this.splitRange(this.$store.state.feature[11])[1]),
      vfxFeatureRange: 0,

      vfxIndieMin: parseInt(this.splitRange(this.$store.state.indie[11])[0]),
      vfxIndieMax: parseInt(this.splitRange(this.$store.state.indie[11])[1]),
      vfxIndieRange: 0,

      vfxAnimationMin: parseInt(this.splitRange(this.$store.state.animation[11])[0]),
      vfxAnimationMax: parseInt(this.splitRange(this.$store.state.animation[11])[1]),
      vfxAnimationRange: 0,

      screenplayScope: this.$store.state.currentMovie?._preProduction.screenplay.details.scope,
      sfxVfxScope: this.$store.state.currentMovie?._preProduction.screenplay.details.specialEffects,

      releaseDate: this.$store.getters.getCurrentMovie._preProduction.releaseDate,
    }
  },

  mounted() {
    this.editingFeatureRange = this.editingFeatureMax - this.editingFeatureMin;
    this.editingIndieRange = this.editingIndieMax - this.editingIndieMin;
    this.editingAnimationRange = this.editingAnimationMax - this.editingAnimationMin;

    this.soundFeatureRange = this.soundFeatureMax - this.soundFeatureMin;
    this.soundIndieRange = this.soundIndieMax - this.soundIndieMin;
    this.soundAnimationRange = this.soundAnimationMax - this.soundAnimationMin;

    this.scoreFeatureRange = this.scoreFeatureMax - this.scoreFeatureMin;
    this.scoreIndieRange = this.scoreIndieMax - this.scoreIndieMin;
    this.scoreAnimationRange = this.scoreAnimationMax - this.scoreAnimationMin;

    this.vfxFeatureRange = this.vfxFeatureMax - this.vfxFeatureMin;
    this.vfxIndieRange = this.vfxIndieMax - this.vfxIndieMin;
    this.vfxAnimationRange = this.vfxAnimationMax - this.vfxAnimationMin;
  },

  methods: {
    buildFeedbacks() {
      this.feedbacks = true;

      if (this.screenplayType === "Feature") {
        switch (this.screenplayScope) {
          case "Little":
            this.$store.state.type.editing = false
            this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break

          case "Small":
            if (this.editingBudget >= this.editingFeatureRange / 5) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Normal":
            if (this.editingBudget >= (this.editingFeatureRange / 5) * 2) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Large":
            if (this.editingBudget >= (this.editingFeatureRange / 5) * 3) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Epic":

            if (this.editingBudget >= (this.editingFeatureRange / 5) * 4) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }

      }
      if (this.screenplayType === "Indie") {
        switch (this.screenplayScope) {
          case "Little":
            this.$store.state.type.editing = false
            this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break

          case "Small":
            if (this.editingBudget >= this.editingIndieRange / 5) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Normal":
            if (this.editingBudget >= (this.editingIndieRange / 5) * 2) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Large":
            if (this.editingBudget >= (this.editingIndieRange / 5) * 3) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Epic":
            if (this.editingBudget >= (this.editingIndieRange / 5) * 4) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }

      }
      if (this.screenplayType === "Animation") {
        switch (this.screenplayScope) {
          case "Little":
            this.$store.state.type.editing = false
            this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break

          case "Small":
            if (this.editingBudget >= this.editingAnimationRange / 5) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Normal":
            if (this.editingBudget >= (this.editingAnimationRange / 5) * 2) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Large":
            if (this.editingBudget >= (this.editingAnimationRange / 5) * 3) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Epic":
            if (this.editingBudget >= (this.editingAnimationRange / 5) * 4) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.feedbackCount -= 1
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }

      }

      if (this.screenplayType === "Feature") {
        switch (this.screenplayScope) {
          case "Little":
            this.$store.state.type.sound = false
            this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break
          case "Small":
            if (this.soundBudget >= this.soundFeatureRange / 5 && this.scoreBudget >= this.scoreFeatureRange / 5) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Normal":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 2 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 2) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Large":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 3 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 3) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Epic":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 4 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 4) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }

      }
      if (this.screenplayType === "Indie") {
        switch (this.screenplayScope) {
          case "Little":
            this.$store.state.type.sound = false
            this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break

          case "Small":
            if (this.soundBudget >= this.soundFeatureRange / 5 && this.scoreBudget >= this.scoreFeatureRange / 5) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1

              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Normal":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 2 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 2) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Large":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 3 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 3) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Epic":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 4 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 4) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }

      }
      if (this.screenplayType === "Animation") {
        switch (this.screenplayScope) {
          case "Little":
            this.$store.state.type.sound = false
            this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break

          case "Small":
            if (this.soundBudget >= this.soundAnimationRange / 5 && this.scoreBudget >= this.scoreAnimationRange / 5) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Normal":
            if (this.soundBudget >= (this.soundAnimationRange / 5) * 2 && this.scoreBudget >= (this.scoreAnimationRange / 5) * 2) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Large":
            if (this.soundBudget >= (this.soundAnimationRange / 5) * 3 && this.scoreBudget >= (this.scoreAnimationRange / 5) * 3) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break

          case "Epic":
            if (this.soundBudget >= (this.soundAnimationRange / 5) * 4 && this.scoreBudget >= (this.scoreAnimationRange / 5) * 4) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.feedbackCount -= 1
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }

      }

      //TODO scopes für vfx noch nicht definiert, daher immer positives Feedback
      if (this.screenplayType === "Feature") {
        switch (this.sfxVfxScope) {
          case "None":
            this.$store.state.type.vfx = false
            this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break
          case "Some":
            if (this.vfxBudget >= this.vfxFeatureRange / 5) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Medium":
            if (this.vfxBudget >= (this.vfxFeatureRange / 5) * 2) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Lots":
            if (this.vfxBudget >= (this.vfxFeatureRange / 5) * 3) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Spectacle":
            if (this.vfxBudget >= (this.vfxFeatureRange / 5) * 4) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }
      }
      if (this.screenplayType === "Indie") {
        switch (this.sfxVfxScope) {
          case "None":
            this.$store.state.type.vfx = false
            this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break
          case "Some":
            if (this.vfxBudget >= this.vfxIndieRange / 5) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Medium":
            if (this.vfxBudget >= (this.vfxIndieRange / 5) * 2) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Lots":
            if (this.vfxBudget >= (this.vfxIndieRange / 5) * 3) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Spectacle":
            if (this.vfxBudget >= (this.vfxIndieRange / 5) * 4) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }
      }
      if (this.screenplayType === "Animation") {
        switch (this.sfxVfxScope) {
          case "None":
            this.$store.state.type.vfx = false
            this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            break
          case "Some":
            if (this.vfxBudget >= this.vfxAnimationRange / 5) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Medium":
            if (this.vfxBudget >= (this.vfxAnimationRange / 5) * 2) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Lots":
            if (this.vfxBudget >= (this.vfxAnimationRange / 5) * 3) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
          case "Spectacle":
            if (this.vfxBudget >= (this.vfxAnimationRange / 5) * 4) {
              this.$store.state.type.vfx = false
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.vfx = true
              this.feedbackCount -= 1
              this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
            }
            break
        }
      }

      if (((this.crewMorale + this.dirMorale)/2) >= 3) {
        this.$store.state.type.acting = false
        this.actingFeedback = i18next.t("postProductionEvents.testScreening.acting." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
      } else if (((this.crewMorale + this.dirMorale)/2) < 3) {
        this.$store.state.type.acting = true
        this.feedbackCount -= 1
        this.actingFeedback = i18next.t("postProductionEvents.testScreening.acting." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])
      }

      if ((this.screenplayRating >= 75) + (this.crewMorale > 3) + (this.dirMorale > 3) >= 2) {
        this.$store.state.type.story = false
        this.storyFeedback = i18next.t("postProductionEvents.testScreening.story." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
      } else {
        this.$store.state.type.story = true
        this.feedbackCount -= 1
        this.storyFeedback = i18next.t("postProductionEvents.testScreening.story." + this.badFeedback[Math.floor(Math.random() * this.badFeedback.length)])

      }
      switch (this.feedbackCount) {
        case 0:
          this.testScreeningRating = Math.floor(Math.random() * (40 - 1) + 1);
          break
        case 1:
          this.testScreeningRating =  Math.floor(Math.random() * (40 - 1) + 1);
          break
        case 2:
          this.testScreeningRating =  Math.floor(Math.random() * (60 - 20) + 20);
          break
        case 3:
          this.testScreeningRating =  Math.floor(Math.random() * (80 - 40) + 40);
          break
        case 4:
          this.testScreeningRating =   Math.floor(Math.random() * (100 - 60) + 60);
          break
        case 5:
          this.testScreeningRating =   Math.floor(Math.random() * (100 - 80) + 80)
          break
      }
    },

    splitRange(el) {
      let str = el.replace(/\s/g, '')
      return str.split('-')
    },

  }
}
</script>

<style scoped>
.testScreeningMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.testScreeningBackground {
  width: 600px;
}

.testScreeningInfoElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px;
  font-size: 15px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
}

.testScreeningRunButton {
  margin-top: 10px;
}

.testScreeningHeader {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 22px;
  margin-bottom: 0.25em;
  margin-top: 10px;
}

.testScreeningResultContainer {
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
}

.testScreeningResultElement {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  width: 50%;
}

.testScreeningPositiveResultHeader {
  color: #46FF54;
  text-align: center;
}

.testScreeningNegativeResultHeader {
  color: #FF3A4D;
  text-align: center;
}

.testScreeningFeedbackType {
  font-size: 15px;
  margin-bottom: 5px;
}

.testScreeningFeedback {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px;
  font-size: 15px;
}

.testScreeningOverallResults {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
}

.testScreeningOverallInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  flex: 1;
  padding: 7px;
  align-items: center;
}
</style>