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
                <custom-icon size="15px" theme="light" :gradient="false" icon="baseball" :shadow="false" :invert-theme="false"/>
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
                <custom-icon size="15px" theme="light" :gradient="false" icon="baseball" :shadow="false" :invert-theme="false"/>
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
                <custom-icon size="15px" theme="light" :gradient="false" icon="baseball" :shadow="false" :invert-theme="false"/>
                <div>{{ $t('rating') }}</div>
              </div>
              <input class="writerDetailsRangeSlider"
                     type="range"
                     :min="0"
                     :max="100"
                     :step="1"
                     v-model="writerRating" disabled>
            </div>
            <div class="writerDetailsSpecificInfoDiv">
              <div class="writerDetailsMoreInfo">
                <custom-icon size="15px" theme="light" :gradient="false" icon="baseball" :shadow="false" :invert-theme="false"/>
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
        <h2 class="writerDetailsHeader" id="writerDetailsOfferHeader">Contract Offer</h2>
        <div class="writerDetailsInfoBox">
          <div class="writerDetailsOfferBox">
            <div class="writerDetailsOfferBoxSalaryText">Salary</div>
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
            :disabled="this.currentWriter?._no === 3"
            @clicked="calcWriterDecision">Offer ({{ this.currentWriter?._no }}/3)</custom-button>

        <div class="writerDetailsWriterAnswer">
          <div v-if="writerDecision !== null && !writerDecision">{{ $t('hireDirectorSection.rejected') }}</div>
          <div v-if="writerDecision !== null && writerDecision">{{ $t('hireDirectorSection.accepted') }}</div>
        </div>
      </div>

      <router-link :to="{name: 'screenplayInformation'}">
        <custom-button
            class="writerDetailsHireButton"
            :dark="false"
            size="medium"
            :disabled="!writerDecision"
            @click="hireWriter">{{ $t('continue') }}</custom-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {Screenplay} from "@/classes/Screenplay";
import AvatarElement from "@/components/kitchenSink/AvatarElement.vue";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import IconButton from "@/components/kitchenSink/IconButton.vue";

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
      writerGenre: '',
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

      //numberOfOffers: 0,
      //rejectedStaff: [],

    }
  },

  mounted() {
   this.copiedPrice = this.$store.getters.getCurrentScreenplay.price;
   this.oldWriter = this.$store.getters.getCurrentScreenplay.writer;

   this.selectedSalary = this.salaryRange.min;
   this.salaryValues = this.$store.getters.getWriterSalaries;
   if(this.$store.getters.getCurrentScreenplay.rewritingStatus){
     this.writerDecision = true;
   }
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
        this.writerGenre = this.writer._genre[this.$store.getters.getCurrentScreenplay.genre];
        this.writerSalary = parseInt(this.writer._salary.replaceAll('.',''));
        this.writerGender = this.writer._gender;

        this.currentWriter = this.writer;
        this.changeSalaryValueLevel(Math.round((this.writerTalent * 35 + this.writerExperience * 25 + this.writerPopularity * 40) / 100))
        //this.numberOfOffers = 0;
      }
    },

    /*numberOfOffers: function (){
      if(this.numberOfOffers === 3){
        this.rejectedStaff.push(this.staff)
      }
    }*/
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
        if(this.salaryValueLevel >= 75){
          if(this.randomNumber(0.5) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else if(this.salaryValueLevel < 75 && this.salaryValueLevel >= 50){
          if(this.randomNumber(0.75) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else {
          this.writerDecision = true;
        }
      } else if(this.selectedSalary === this.salaryValues[this.indexOfMainSalary - 1]){
        if(this.salaryValueLevel >= 75){
          if(this.randomNumber(0.25) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else if(this.salaryValueLevel < 75 && this.salaryValueLevel >= 50){
          if(this.randomNumber(0.5) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else {
          if(this.randomNumber(0.75) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        }
      } else if(this.selectedSalary === this.salaryValues[this.indexOfMainSalary - 2]){
        if(this.salaryValueLevel >= 75){
          if(this.randomNumber(0.125) === 0){
            this.writerDecision = true;
          } else {
            this.changeSalaryValueLevel(this.salaryValueLevel + 1);
          }
        } else if(this.salaryValueLevel < 75 && this.salaryValueLevel >= 50){
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
      }
    },

    hireWriter(){
      this.screenplay.setWriter(this.writer);
      if(this.$store.getters.getCurrentScreenplay.rewritingStatus){
        this.screenplay.setPrice(this.copiedPrice + (this.selectedSalary/2));
        this.$store.commit('subtractBalance', (this.selectedSalary/2));
      } else {
        this.screenplay.setPrice(this.copiedPrice + this.selectedSalary);
        this.$store.commit('subtractBalance', this.selectedSalary);
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
        let screenplayRating = (writerTalent * 65 + this.writerGenre * 35) / 100;
        this.screenplay.setRating(screenplayRating)
      }

      console.log(this.screenplay.rating)

      this.screenplay.setRatingRange((Math.ceil(this.screenplay.rating / 10) * 10) - 9 + ' - ' + (Math.ceil(this.screenplay.rating / 10) * 10))

      if(this.screenplay.getType === 'Feature' || this.screenplay.getType === 'Animation'){
        this.screenplay.setWritingPhase(12)
      } else {
        this.screenplay.setWritingPhase(8)
      }
    },

    subtractSalary(){
      if(this.selectedSalary > this.salaryRange.min){
        this.changingIndex--;
        this.selectedSalary = this.salaryValues[this.changingIndex];
      }
    },

    addSalary(){
      if(this.selectedSalary < this.salaryRange.max){
        this.changingIndex++;
        this.selectedSalary = this.salaryValues[this.changingIndex];
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
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
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