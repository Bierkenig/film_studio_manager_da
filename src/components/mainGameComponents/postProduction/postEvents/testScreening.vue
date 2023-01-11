<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3 v-if="!feedbacks">{{ $t('postProductionEvents.testScreening.title') }}</h3>
            <h3 v-else>{{ $t('postProductionEvents.testScreening.result') }}</h3>

            <button v-if="!feedbacks" class="modal-default-button" @click="buildFeedbacks">
              {{ $t('postProductionEvents.testScreening.run') }}
            </button>
            <div v-if="feedbacks">
              <div class="feedback">
                <info-circle text="+" size="30px" alternative-style/>

                {{ $t('postProductionEvents.testScreening.editingTitle') }}

                {{ editingFeedback }}
              </div>


              <div class="feedback">
                <info-circle text="+" size="30px" alternative-style/>
                {{ $t('postProductionEvents.testScreening.soundTitle') }}

                {{ soundFeedback }}
              </div>
              <div class="feedback">
                <info-circle text="+" size="30px" alternative-style/>
                {{ $t('postProductionEvents.testScreening.vfxTitle') }}

                {{ vfxFeedback }}
              </div>
              <div class="feedback">
                <info-circle text="+" size="30px" alternative-style/>

                {{ $t('postProductionEvents.testScreening.actingTitle') }}

                {{ actingFeedback }}
              </div>

              <div class="feedback">
                <info-circle text="-" size="30px" alternative-style/>
                {{ $t('postProductionEvents.testScreening.storyTitle') }}

                {{ storyFeedback }}
              </div>
              <router-link to="/">
                <button>Back</button>
              </router-link>
              <router-link :to = "{name: 'testScreeningOptions'}">
                <button>Continue</button>
              </router-link>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoCircle from "@/components/kitchenSink/InfoCircle";
import {i18next} from '@/translation/i18n'

export default {
  name: "reeditingDirector",
  components: {InfoCircle},
  data() {
    let _featureList = this.$store.state.feature
    let _indieList = this.$store.state.indie
    let _animatedList = this.$store.state.animation
    return {
      feedbacks: false,

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

      dirMorale: this.$store.state.currentMovie?._preProduction.hiredDirector.dirMorale,
      crewMorale: this.$store.state.currentMovie?.crewMorale,
      screenplayRating: this.$store.state.currentMovie?._preProduction.screenplay.rating,
      screenplayType: this.$store.state.currentMovie?._preProduction.screenplay.type,

      editingFeatureMin: parseInt(this.splitRange(_featureList[4])[0]),
      editingFeatureMax: parseInt(this.splitRange(_featureList[4])[1]),
      editingFeatureRange: this.editingFeatureMax - this.editingFeatureMin,

      editingIndieMin: parseInt(this.splitRange(_indieList[4])[0]),
      editingIndieMax: parseInt(this.splitRange(_indieList[4])[1]),
      editingIndieRange: this.editingIndieMax - this.editingIndieMin,

      editingAnimationMin: parseInt(this.splitRange(_animatedList[4])[0]),
      editingAnimationMax: parseInt(this.splitRange(_animatedList[4])[1]),
      editingAnimationRange: this.editingAnimationMax - this.editingAnimationMin,

      soundFeatureMin: parseInt(this.splitRange(_featureList[3])[0]),
      soundFeatureMax: parseInt(this.splitRange(_featureList[3])[1]),
      soundFeatureRange: this.soundFeatureMax - this.soundFeatureMin,

      soundIndieMin: parseInt(this.splitRange(_indieList[3])[0]),
      soundIndieMax: parseInt(this.splitRange(_indieList[3])[1]),
      soundIndieRange: this.soundIndieMax - this.soundIndieMin,

      soundAnimationMin: parseInt(this.splitRange(_animatedList[3])[0]),
      soundAnimationMax: parseInt(this.splitRange(_animatedList[3])[1]),
      soundAnimationRange: this.soundAnimationMax - this.soundAnimationMin,

      scoreFeatureMin: parseInt(this.splitRange(_featureList[3])[0]),
      scoreFeatureMax: parseInt(this.splitRange(_featureList[3])[1]),
      scoreFeatureRange: this.scoreFeatureMax - this.scoreFeatureMin,

      scoreIndieMin: parseInt(this.splitRange(_indieList[3])[0]),
      scoreIndieMax: parseInt(this.splitRange(_indieList[3])[1]),
      scoreIndieRange: this.scoreIndieMax - this.scoreIndieMin,

      scoreAnimationMin: parseInt(this.splitRange(_animatedList[3])[0]),
      scoreAnimationMax: parseInt(this.splitRange(_animatedList[3])[1]),
      scoreAnimationRange: this.scoreAnimationMax - this.scoreAnimationMin,

      screenplayScope: this.$store.state.currentMovie?._preProduction.screenplay.details.scope,

    }
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
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Normal":
            if (this.editingBudget >= (this.editingFeatureRange / 5) * 2) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Large":
            if (this.editingBudget >= (this.editingFeatureRange / 5) * 3) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Epic":
            if (this.editingBudget >= (this.editingFeatureRange / 5) * 4) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
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
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Normal":
            if (this.editingBudget >= (this.editingIndieRange / 5) * 2) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Large":
            if (this.editingBudget >= (this.editingIndieRange / 5) * 3) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Epic":
            if (this.editingBudget >= (this.editingIndieRange / 5) * 4) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
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
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Normal":
            if (this.editingBudget >= (this.editingAnimationRange / 5) * 2) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Large":
            if (this.editingBudget >= (this.editingAnimationRange / 5) * 3) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Epic":
            if (this.editingBudget >= (this.editingAnimationRange / 5) * 4) {
              this.$store.state.type.editing = false
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.editing = true
              this.editingFeedback = i18next.t("postProductionEvents.testScreening.editing." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
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
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Normal":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 2 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 2) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Large":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 3 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 3) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Epic":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 4 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 4) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
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
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Normal":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 2 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 2) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Large":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 3 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 3) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Epic":
            if (this.soundBudget >= (this.soundFeatureRange / 5) * 4 && this.scoreBudget >= (this.scoreFeatureRange / 5) * 4) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
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
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Normal":
            if (this.soundBudget >= (this.soundAnimationRange / 5) * 2 && this.scoreBudget >= (this.scoreAnimationRange / 5) * 2) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Large":
            if (this.soundBudget >= (this.soundAnimationRange / 5) * 3 && this.scoreBudget >= (this.scoreAnimationRange / 5) * 3) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break

          case "Epic":
            if (this.soundBudget >= (this.soundAnimationRange / 5) * 4 && this.scoreBudget >= (this.scoreAnimationRange / 5) * 4) {
              this.$store.state.type.sound = false
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            } else {
              this.$store.state.type.sound = true
              this.soundFeedback = i18next.t("postProductionEvents.testScreening.sound." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
            }
            break
        }

      }

      //TODO scopes für vfx noch nicht definiert, daher immer positives Feedback
      this.vfxFeedback = i18next.t("postProductionEvents.testScreening.vfx." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])

      if (this.crewMorale > 3 && this.dirMorale > 3) {
        this.$store.state.type.acting = false
        this.actingFeedback = i18next.t("postProductionEvents.testScreening.acting." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
      } else if (this.crewMorale < 4 && this.dirMorale < 4) {
        this.$store.state.type.acting = true
        this.actingFeedback = i18next.t("postProductionEvents.testScreening.acting." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
      }

      if (this.screenplayRating >= 75 && this.crewMorale > 3 && this.dirMorale > 3) {
        this.$store.state.type.story = false
        this.storyFeedback = i18next.t("postProductionEvents.testScreening.story." + this.goodFeedback[Math.floor(Math.random() * this.goodFeedback.length)])
      } else if (this.screenplayRating < 75 && this.crewMorale < 4 && this.dirMorale < 4) {
        this.$store.state.type.story = true
        this.storyFeedback = i18next.t("postProductionEvents.testScreening.story." + this.badFeedback[Math.floor(Math.random() * this.goodFeedback.length)])

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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.feedback {
  display: flex;
  flex-direction: row;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>