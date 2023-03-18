<template>
  <div id="writerDetailsDiv">
    <div id="writerDetailsVertical">
      <h2 class="writerDetailsHeader">{{ $t('general') }}</h2>
      <div class="writerDetailsInfoBox">
        <div id="writerDetailsPersonalInfo">
          <div id="writerDetailsAvatarBox">
            <avatar-element :svg-code="this.writerAvatar" size="100px"/>
          </div>
          <div id="writerDetailsInfoText">
            <div id="writerName">
              {{ writerName }}
              <div v-show="!showDetails" class="writerDetailsInvisible">______</div>
            </div>
            <div id="writerDetailsInfoMainDiv">
              <div class="writerDetailsInfoTextRow">
                <div class="writerDetailsSpecificInfoDiv">
                  <div>
                    {{ $t('age') }}
                  </div>
                  <div>
                    {{ writerAge }}
                  </div>
                </div>
              </div>
              <div class="writerDetailsInfoTextRow">
                <div class="writerDetailsSpecificInfoDiv">
                  <div>
                    {{ $t('nationality') }}
                  </div>
                  <div>
                    {{ writerNationality }}
                  </div>
                </div>
              </div>
              <div class="writerDetailsInfoTextRow">
                <div class="writerDetailsSpecificInfoDiv">
                  <div>
                    {{ $t('salary') }}
                  </div>
                  <div>
                    {{ roundSalary(this.salaryValues[this.indexOfMainSalary]) }}
                  </div>
                </div>
                <div class="writerDetailsSpecificInfoDiv">
                  <div>
                    {{ $t('gender') }}
                  </div>
                  <div>
                    {{ $t(writerGender) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="writerDetailsData">
          <div class="writerDetailsInfoTextRow">
            <div class="writerDetailsSpecificInfoDiv">
              <div class="writerDetailsMoreInfo">
                <custom-icon size="15px" theme="light" :gradient="false" icon="party" :shadow="false" :invert-theme="false"/>
                <div>{{ $t('popularity') }}</div>
              </div>
              <input class="writerDetailsRangeSlider"
                     type="range"
                     :min="0"
                     :max="100"
                     :step="1"
                     v-model="writerPopularity" disabled>
            </div>
            <div class="writerDetailsSpecificInfoDiv">
              <div class="writerDetailsMoreInfo">
                <custom-icon size="15px" theme="light" :gradient="false" icon="briefcase" :shadow="false" :invert-theme="false"/>
                <div>{{ $t('experience') }}</div>
              </div>
              <input class="writerDetailsRangeSlider"
                     type="range"
                     :min="0"
                     :max="100"
                     :step="1"
                     v-model="writerExperience" disabled>
            </div>
          </div>
          <div class="writerDetailsInfoTextRow">
            <div class="writerDetailsSpecificInfoDiv">
              <div class="writerDetailsMoreInfo">
                <custom-icon size="15px" theme="light" :gradient="false" icon="star" :shadow="false" :invert-theme="false"/>
                <div>{{ $t('rating') }}</div>
              </div>
              <input class="writerDetailsRangeSlider"
                     type="range"
                     :min="0"
                     :max="100"
                     :step="1"
                     v-model="writerGenre" disabled>
            </div>
            <div class="writerDetailsSpecificInfoDiv">
              <div class="writerDetailsMoreInfo">
                <custom-icon size="15px" theme="light" :gradient="false" icon="school" :shadow="false" :invert-theme="false"/>
                <div>Talent</div>
              </div>
              <input class="writerDetailsRangeSlider"
                     type="range"
                     :min="0"
                     :max="100"
                     :step="1"
                     v-model="writerTalent" disabled>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!this.$store.getters.getCurrentScreenplay.rewritingStatus">
        <h2 class="writerDetailsHeader" id="writerDetailsOfferHeader">{{ $t('contractOffer') }}</h2>
        <div class="writerDetailsInfoBox">
          <div class="writerDetailsOfferBox">
            <div class="writerDetailsOfferBoxSalaryText">{{ $t('salary') }}</div>
            <div class="writerDetailsOfferBoxSalaryInput">
              <icon-button icon="minus" size="extraSmall" :dark="true" :shadow="false" @click="subtractSalary"/>
              <div class="writerDetailsOfferBoxSalaryValue">$ {{ roundSalary(selectedSalary) }}</div>
              <icon-button icon="plus" size="extraSmall" :dark="true" :shadow="false" @click="addSalary"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!this.$store.getters.getCurrentScreenplay.rewritingStatus">
        <custom-button
            class="writerDetailsOfferButton"
            :dark="false"
            size="medium"
            :disabled="this.currentWriter?._no === 3 || this.writerDecision === null || this.writerDecision === true"
            @clicked="calcWriterDecision">{{ $t('hireDirectorSection.offer') }} ({{ this.currentWriter?._no }}/3)</custom-button>

        <div class="writerDetailsWriterAnswer">
          <div v-if="writerDecision !== null && !writerDecision">{{ $t('hireDirectorSection.rejected') }}</div>
          <div v-if="writerDecision !== null && writerDecision">{{ $t('hireDirectorSection.accepted') }}</div>
        </div>
      </div>
    </div>
    <custom-button
        id="writerContinue"
        class="writerDetailsHireButton"
        :dark="false"
        size="medium"
        :disabled="this.writerDecision !== true"
        @clicked="hireWriter">{{ $t('continue') }}</custom-button>
  </div>
</template>

<script>
import {Screenplay} from "@/classes/Screenplay";
import AvatarElement from "@/components/kitchenSink/AvatarElement.vue";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import store from "@/services/store";
import Earnings from "@/classes/Earnings";

export default {
  name: "WriterDetails",
  components: {IconButton, CustomButton, CustomIcon, AvatarElement},

  props: {
    writer: Object,
    checkBalance: Boolean,
    screenplay: Screenplay,
  },

  data() {
    return {
      showDetails: false,
      writerAvatar: '',
      writerName: '',
      writerRating: 50,
      writerGenre: 50,
      writerAge: '',
      writerNationality: '',
      writerSalary: 0,
      writerGender: '',
      writerPopularity: 50,
      writerTalent: 50,
      writerExperience: 50,
      copiedPrice: 0,
      oldWriter: '',
      currentWriter: null,

      salaryRange: {
        min: 0,
        max: 1,
        step: 1000
      },
      selectedSalary: 0,
      mainSalary: 0,
      salaryValueLevel: 0,
      salaryValues: [],
      indexOfMainSalary: null,
      changingIndex: null,
      writerDecision: null
    }
  },

  mounted() {
   this.copiedPrice = this.$store.getters.getCurrentScreenplay.price;
   this.oldWriter = this.$store.getters.getCurrentScreenplay.writer;

   this.selectedSalary = this.salaryRange.min;
   this.salaryValues = this.$store.getters.getWriterSalaries;
  },

  watch: {
    writer: function(){
      if (this.writer.length !== 0) {
        this.showDetails = true;
        this.writerAvatar = this.writer._avatar
        this.writerName = this.writer._first_name + ' ' + this.writer._last_name;
        this.writerRating = this.writer._rating;
        this.writerTalent = this.writer._talent;
        this.writerExperience = this.writer._experience;
        this.writerPopularity = this.writer._popularity;
        this.writerAge = this.writer._age;
        this.writerNationality = this.writer._nationality;
        this.writerSalary = this.writer._salary;
        this.writerGender = this.writer._gender;

        switch(this.$store.getters.getCurrentScreenplay.genre.genreName) {
          case 'Action':
            this.writerGenre = this.writer._action;
            break;
          case 'Adventure':
            this.writerGenre = this.writer._adventure;
            break;
          case 'Comedy':
            this.writerGenre = this.writer._comedy;
            break;
          case 'Documentary':
            this.writerGenre = this.writer._documentary;
            break;
          case 'Drama':
            this.writerGenre = this.writer._drama;
            break;
          case 'Fantasy':
            this.writerGenre = this.writer._fantasy;
            break;
          case 'Horror':
            this.writerGenre = this.writer._horror;
            break;
          case 'Musical':
            this.writerGenre = this.writer._musical;
            break;
          case 'Romance':
            this.writerGenre = this.writer._romance;
            break;
          case 'Science-Fiction':
            this.writerGenre = this.writer._scienceFiction;
            break;
          case 'Thriller':
            this.writerGenre = this.writer._thriller;
            break;
          case 'War':
            this.writerGenre = this.writer._war;
            break;
          default:
            break;
        }

        this.currentWriter = this.writer;
        this.changeSalaryValueLevel(Math.round((this.writerTalent * 35 + this.writerExperience * 25 + this.writerPopularity * 40) / 100))
        if(this.$store.getters.getCurrentScreenplay.rewritingStatus === true){
          this.writerDecision = true;
        }
      }
    },
  },

  methods: {
    changeSalaryValueLevel(value){
      this.salaryValueLevel = value;
      this.selectedSalary = this.salaryValues[this.salaryValueLevel - 1];
      this.mainSalary = this.selectedSalary;
      this.indexOfMainSalary = this.salaryValues.indexOf(this.selectedSalary);
      this.changingIndex = this.indexOfMainSalary;
      this.salaryRange.min = this.salaryValues[this.indexOfMainSalary - 2];
      this.salaryRange.max = this.salaryValues[this.indexOfMainSalary + 2];
      this.writerDecision = false;
    },

    randomNumber(probability){
      return Math.random() < probability ? 0 : 1;
    },

    calcWriterDecision() {
      if(this.selectedSalary === this.mainSalary){
        if(this.salaryValueLevel > 75){
          if(this.randomNumber(0.33) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else if(this.salaryValueLevel <= 75 && this.salaryValueLevel > 50){
          if(this.randomNumber(0.66) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else {
          this.writerDecision = true;
        }
      } else if(this.selectedSalary === this.salaryValues[this.indexOfMainSalary - 1]){
        if(this.salaryValueLevel > 75){
          if(this.randomNumber(0.25) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else if(this.salaryValueLevel <= 75 && this.salaryValueLevel > 50){
          if(this.randomNumber(0.5) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else {
          if(this.randomNumber(0.66) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        }
      } else if(this.selectedSalary === this.salaryValues[this.indexOfMainSalary - 2]){
        if(this.salaryValueLevel > 75){
          if(this.randomNumber(0.125) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else if(this.salaryValueLevel <= 75 && this.salaryValueLevel > 50){
          if(this.randomNumber(0.25) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else {
          if(this.randomNumber(0.5) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        }
      } else {
        this.writerDecision = true;
      }

      if(!this.writerDecision){
        this.currentWriter._no++;
      } else {
        this.$emit('hiredWriter')
      }
    },

    hireWriter(){
      this.screenplay.setWriter(this.writer);

      if (this.$store.getters.getCurrentMovie === null || this.$store.state.currentMovie._preProduction.screenplay !== null) {
        if(this.$store.getters.getCurrentScreenplay.rewritingStatus){
          this.screenplay.setPrice(this.copiedPrice + (this.selectedSalary/2));
          store.commit('addEarnings',new Earnings(-(this.selectedSalary/2), store.getters.getCurrentDate, 'Production'))
          this.$store.commit('subtractBalance', (this.selectedSalary/2));
        } else {
          this.screenplay.setPrice(this.copiedPrice + this.selectedSalary);
          store.commit('addEarnings',new Earnings(-this.selectedSalary, store.getters.getCurrentDate, 'Production'))
          this.$store.commit('subtractBalance', this.selectedSalary);
        }
      } else {
        this.$store.state.currentMovie._preProduction.budget.writerSalary += this.selectedSalary
        this.screenplay.setPrice(this.selectedSalary);
      }

      let randomNumber;
      if(this.$store.getters.getCurrentScreenplay.rewritingStatus){
        if(this.writerTalent <= 50){
          if(this.writerExperience <= 50){
            randomNumber = Math.floor(Math.random() * (15 - (-30) + 1)) + (-30);
          } else if(this.writerExperience > 50 && this.writerExperience <= 75){
            randomNumber = Math.floor(Math.random() * (20 - (-25) + 1)) + (-25);
          } else if(this.writerExperience > 75){
            randomNumber = Math.floor(Math.random() * (25 - (-20) + 1)) + (-20);
          }
        } else if(this.writerTalent > 50 && this.writerTalent <= 75){
          if(this.writerExperience <= 50){
            randomNumber = Math.floor(Math.random() * (20 - (-25) + 1)) + (-25);
          } else if(this.writerExperience > 50 && this.writerExperience <= 75){
            randomNumber = Math.floor(Math.random() * (25 - (-20) + 1)) + (-20);
          } else if(this.writerExperience > 75){
            randomNumber = Math.floor(Math.random() * (30 - (-15) + 1)) + (-15);
          }
        } else if(this.writerTalent > 75){
          if(this.writerExperience <= 50){
            randomNumber = Math.floor(Math.random() * (25 - (-20) + 1)) + (-20);
          } else if(this.writerExperience > 50 && this.writerExperience <= 75){
            randomNumber = Math.floor(Math.random() * (30 - (-15) + 1)) + (-15);
          } else if(this.writerExperience > 75){
            randomNumber = Math.floor(Math.random() * (35 - (-10) + 1)) + (-10);
          }
        }
        this.screenplay.setRating(this.screenplay.rating + randomNumber);
      } else {
        let minTalent;
        let maxTalent;
        if(this.writerExperience > 0 && this.writerExperience <= 50){
          minTalent = this.writerTalent - 15;
          maxTalent = this.writerTalent + 5;
        } else if(this.writerExperience > 50 && this.writerExperience <= 75){
          minTalent = this.writerTalent - 10;
          maxTalent = this.writerTalent + 5;
        } else if(this.writerExperience > 75){
          minTalent = this.writerTalent - 5;
          maxTalent = this.writerTalent + 5;
        }
        let writerTalent = minTalent + ((maxTalent - minTalent) / (Math.floor(Math.random() * (100 - 20 + 1)) + 20))
        let screenplayRating = Math.floor((writerTalent * 65 + this.writerGenre * 35) / 100);
        this.screenplay.setRating(screenplayRating)
      }

      this.screenplay.setRatingRange((Math.ceil(this.screenplay.rating / 10) * 10) - 9 + ' - ' + (Math.ceil(this.screenplay.rating / 10) * 10))

      if(this.screenplay.getType === 'Feature' || this.screenplay.getType === 'Animation'){
        this.screenplay.setWritingPhase(12)
      } else {
        this.screenplay.setWritingPhase(8)
      }

      this.$router.push({name: 'screenplayInformation'})
    },

    subtractSalary(){
      if(this.writerDecision === false){
        if(this.selectedSalary > this.salaryRange.min){
          this.changingIndex--;
          this.selectedSalary = this.salaryValues[this.changingIndex];
        }
      }
    },

    addSalary(){
      if(this.writerDecision === false){
        if(this.selectedSalary < this.salaryRange.max){
          this.changingIndex++;
          this.selectedSalary = this.salaryValues[this.changingIndex];
        }
      }
    },

    roundSalary(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(3) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(3) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(3) + " K"

                  : Math.abs(Number(labelValue));
    },
  }
}
</script>

<style scoped>
#writerDetailsVertical {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  width: 550px;
  padding: 15px;
}

.writerDetailsHeader {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.writerDetailsInfoBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  margin-top: 15px;
}

#writerDetailsAvatarBox {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
}

#writerDetailsPersonalInfo {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
}

#writerName {
  font-weight: var(--fsm-fw-bold);
  font-size: 22px;
}

#writerDetailsInfoMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  flex: 1;
}

#writerDetailsInfoText {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.writerDetailsSpecificInfoDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.writerDetailsInfoTextRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
}

.writerDetailsMoreInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

#writerDetailsData {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.writerDetailsRangeSlider {
  width: 100px;
  height: 10px;
}

.writerDetailsRangeSlider::-webkit-slider-thumb {
  background: linear-gradient(to right, var(--fsm-pink-1) 0%, var(--fsm-pink-1) 50%, var(--fsm-dark-blue-4) 50%, var(--fsm-dark-blue-4) 100%);
}

.writerDetailsHireButton[disabled],
.writerDetailsHireButton[disabled]{
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}

.writerDetailsHireButton {
  position: absolute;
  float: right;
  right: 100px;
  bottom: 20px;
  width: 15%;
}

#writerDetailsOfferHeader {
  margin-top: 15px !important;
}

.writerDetailsOfferBoxSalaryText {
  font-weight: var(--fsm-fw-semibold);
  font-size: 22px;
}

.writerDetailsOfferBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.writerDetailsOfferBoxSalaryInput {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.writerDetailsOfferBoxSalaryValue {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 5px 35px 5px 35px;
  font-size: 18px;
}

.writerDetailsOfferButton {
  margin-top: 15px;
}

.writerDetailsWriterAnswer {
  text-align: center;
  margin-top: 25px;
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
}
</style>