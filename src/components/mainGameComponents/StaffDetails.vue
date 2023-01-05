<template>
  <div id="writerDetailsDiv">
    <div id="writerDetailsVertical">
      <h2 class="writerDetailsHeader">{{ $t('general') }}</h2>
      <div class="writerDetailsInfoBox">
        <div id="writerDetailsPersonalInfo">
          <div id="writerDetailsAvatarBox">
            <avatar-element :svg-code="this.staffAvatar" size="100px"/>
          </div>
          <div id="writerDetailsInfoText">
            <div id="writerName">
              {{ staffName }}
              <div v-show="!showDetails" class="writerDetailsInvisible">______</div>
            </div>
            <div id="writerDetailsInfoMainDiv">
              <div class="writerDetailsInfoTextRow">
                <div class="writerDetailsSpecificInfoDiv">
                  <div>
                    {{ $t('age') }}
                  </div>
                  <div>
                    {{ staffAge }}
                  </div>
                </div>
                <div class="writerDetailsSpecificInfoDiv">
                  <div>
                    {{ $t('nationality') }}
                  </div>
                  <div>
                    {{ staffNationality }}
                  </div>
                </div>
              </div>
              <div class="writerDetailsInfoTextRow">
                <div class="writerDetailsSpecificInfoDiv">
                  <div>
                    {{ $t('salary') }}
                  </div>
                  <div>
                    {{ roundSalary(staffSalary) }}
                  </div>
                </div>
                <div class="writerDetailsSpecificInfoDiv">
                  <div>
                    {{ $t('gender') }}
                  </div>
                  <div>
                    {{ $t(staffGender) }}
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
                     v-model="staffPopularity" disabled>
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
                     v-model="staffExperience" disabled>
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
                     v-model="staffRating" disabled>
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
                     v-model="staffTalent" disabled>
            </div>
          </div>
        </div>
      </div>
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
      <custom-button
          v-if="!this.rejectedStaff.includes(this.staff) || decision !== true"
          class="writerDetailsOfferButton"
          :dark="false"
          size="medium"
          :disabled="numberOfOffers === 3"
          @clicked="calcDirectorsDecision(); decision2 = true; numberOfOffers++">Offer ({{ numberOfOffers }}/3)</custom-button>
      <custom-button
          v-else
          class="writerDetailsOfferButton"
          :dark="false"
          size="medium"
          :disabled="true">Offer (3/3)</custom-button>

      <div v-if="decision2">{{decision ? this.currentStaff._first_name + " " + this.currentStaff._last_name + $t('hireDirectorSection.decision') + "Yes" : this.currentStaff._first_name + " " + this.currentStaff._last_name + $t('hireDirectorSection.decision') + "No"}}</div>

      <div v-if="decision === false && this.currentStaff._no !== 3 && decision2">{{$t('hireDirectorSection.think')}}</div>

      <div v-if="this.currentStaff._no === 3">{{this.currentStaff._first_name}} {{this.currentStaff._last_name}}{{$t('hireDirectorSection.declined')}}</div>

      <!--<button :disabled="!decision" @click="this.$store.state.currentMovie._preProduction.hiredDirector = this.currentStaff ;this.$router.push({name: 'durationSection'})">{{$t('buyScreenplaySection.continue')}}</button>-->

      <!--<router-link :to="{name: this.nextLocation}">
      <custom-button
            v-if="type === 'Writer'"
            class="writerDetailsHireButton"
            :dark="false"
            size="small"
            :disabled="true"
            @clicked="hireWriter">{{ $t('continue') }}</custom-button>
       <custom-button
           v-if="type === 'Writer'"
           id="hireWriterButton"
           class="writerDetailsHireButton"
           :dark="false"
           size="small"
           :disabled="checkBalance || !staffName"
           @clicked="hireWriter">{{ $t('hireWriter') }}</custom-button>
       <custom-button
           v-if="type === 'Director'"
           id="hireDirectorButton"
           class="writerDetailsHireButton"
           :dark="false"
           size="small"
           :disabled="checkBalance || !staffName"
           @clicked="hireDirector">{{ $t('hireDirector') }}</custom-button>
       <custom-button
           v-if="type === 'Actor'"
           id="hireActorButton"
           class="writerDetailsHireButton"
           :dark="false"
           size="small"
           :disabled="checkBalance || !staffName"
           @clicked="hireActor">{{ $t('hireActor') }}</custom-button>
      </router-link>-->
      <router-link :to="{name: this.nextLocation}">
        <custom-button
            v-if="type === 'Writer'"
            class="writerDetailsHireButton"
            :dark="false"
            size="medium"
            :disabled="!decision"
            @clicked="hireWriter">{{ $t('continue') }}</custom-button>
        <custom-button
            v-if="type === 'Director'"
            class="writerDetailsHireButton"
            :dark="false"
            size="medium"
            :disabled="true"
            @clicked="hireDirector">{{ $t('continue') }}</custom-button>
        <custom-button
            v-if="type === 'Actor'"
            class="writerDetailsHireButton"
            :dark="false"
            size="medium"
            :disabled="true"
            @clicked="hireActor">{{ $t('continue') }}</custom-button>
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
    staff: Object,
    checkBalance: Boolean,
    screenplay: Screenplay,
    type: String,
    nextLocation: String,
  },

  data() {
    return {
      showDetails: false,
      staffAvatar: '',
      staffName: '',
      staffRating: 50,
      staffGenre: '',
      staffAge: '',
      staffNationality: '',
      staffSalary: 0,
      staffGender: '',
      staffPopularity: 50,
      staffTalent: 50,
      staffExperience: 50,
      copiedPrice: 0,
      oldWriter: '',
      selectedSalary: 100000,
      numberOfOffers: 0,
      rejectedStaff: [],

      staffControl: null,
      currentStaff: null,
      showNegotiation: false,
      salaryRange: {
        min: 0,
        max: 1,
        step: 50000
      },
      decision: false,
      decision2: false,


    }
  },

  mounted() {
   this.copiedPrice = this.$store.getters.getCurrentScreenplay.price;
   this.oldWriter = this.$store.getters.getCurrentScreenplay.writer;

   this.selectedSalary = this.salaryRange.min
  },

  watch: {
    staff: function(){
      if (this.staff.length !== 0) {
        this.showDetails = true;
        this.staffAvatar = this.staff._avatar
        this.staffName = this.staff._first_name + ' ' + this.staff._last_name;
        this.staffRating = this.staff._rating;
        this.staffTalent = this.staff._talent;
        this.staffExperience = this.staff._experience;
        this.staffPopularity = this.staff._popularity;
        this.staffAge = this.staff._age;
        this.staffNationality = this.staff._nationality;
        this.staffGenre = this.staff._genre[this.$store.getters.getCurrentScreenplay.genre];
        this.staffSalary = parseInt(this.staff._salary.replaceAll('.',''));
        this.staffGender = this.staff._gender;
        this.numberOfOffers = 0;
        console.log(this.staff._genre)
      }
    },

    numberOfOffers: function (){
      if(this.numberOfOffers === 3){
        this.rejectedStaff.push(this.staff)
      }
    }
  },

  methods: {
    calcSalary(staff) {
      this.currentStaff = staff;
      this.showNegotiation = true;
      this.staffControl = (this.currentStaff._popularity + this.currentStaff._experience + this.currentStaff._rating) / 3
      this.salaryRange.min = this.$store.state.allDirectorSalary[staff._rating - 1 - 3]
      this.salaryRange.max = this.$store.state.allDirectorSalary[staff._rating - 1 + 3]
    },

    calcDirectorsDecision() {
      if (this.staffControl <= 50) {
        this.decision = this.selectedSalary >= this.salaryRange.max * 0.3;
      } else if (this.staffControl > 50 && this.staffControl < 75) {
        this.decision = this.selectedSalary >= this.salaryRange.max * 0.625;
      } else if (this.staffControl >= 75) {
        this.decision = this.selectedSalary >= this.salaryRange.max * 0.75;
      }

      if (this.currentDirector._no === 3) {
        const index = this.allDirectors.indexOf(this.currentDirector)
        this.allDirectors.splice(index, 1)
      }
    },

    hireActor(){
      console.log('FUNKTION NOCH NICHT EINGEBAUT')
    },

    hireDirector(){
      console.log('FUNKTION NOCH NICHT EINGEBAUT')
    },

    hireWriter(){
      this.screenplay.setWriter(this.staff);
      if(this.oldWriter === this.staff){
        this.screenplay.setPrice(this.copiedPrice + (this.staffSalary/2));
        this.$store.commit('subtractBalance', (this.staffSalary/2));
      } else {
        this.screenplay.setPrice(this.copiedPrice + this.staffSalary);
        this.$store.commit('subtractBalance', this.staffSalary);

      }

      if(this.$store.getters.getCurrentScreenplay.rewritingStatus){
        const arr = ['+', '-'];
        let weight = {
          A: 0.5,
          B: 0.3,
          C: 0.2
        };
        if(this.staff._rating >= 1 && this.staff._rating <= 25){
          weight = {
            '+': 0.35,
            '-': 0.65
          }
        } else if(this.staff._rating >= 26 && this.staff._rating <= 50){
          weight = {
            '+': 0.5,
            '-': 0.5
          }
        } else if(this.staff._rating >= 51 && this.staff._rating <= 75){
          weight = {
            '+': 0.75,
            '-': 0.25
          }
        } else if(this.staff._rating >= 76 && this.staff._rating <= 100){
          weight = {
            '+': 0.85,
            '-': 0.15
          }
        }
        const find = input =>
            arr.find((el, i) => {
              const sum = arr.slice(0, i + 1).reduce((acc, el) => {
                return acc + weight[el];
              }, 0);

              if (input < sum) {
                return true;
              }

              return false;
            });

        let result = find(Math.random());
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        if(result == '-'){
          this.screenplay.setRating(this.screenplay.rating - randomNumber);
        } else {
          this.screenplay.setRating(this.screenplay.rating + randomNumber);
        }
      } else {
        let betterGenreRating = ((parseInt(this.staffGenre) * 2 + this.staff._talent) / 3);
        this.screenplay.setRating((betterGenreRating + parseInt(this.staff._performance)) / 2)
      }

      this.screenplay.setRatingRange((Math.ceil(this.screenplay.rating / 10) * 10) - 9 + ' - ' + (Math.ceil(this.screenplay.rating / 10) * 10))

      if(this.screenplay.getType === 'Feature' || this.screenplay.getType === 'Animation'){
        if(this.staff._rating >= 1 && this.staff._rating <= 25){
          this.screenplay.setWritingPhase(18)
        } else if(this.staff._rating >= 26 && this.staff._rating <= 50){
          this.screenplay.setWritingPhase(16)
        } else if(this.staff._rating >= 51 && this.staff._rating <= 75){
          this.screenplay.setWritingPhase(14)
        } else if(this.staff._rating >= 76 && this.staff._rating <= 100){
          this.screenplay.setWritingPhase(12)
        }
      } else {
        if(this.staff._rating >= 1 && this.staff._rating <= 25){
          this.screenplay.setWritingPhase(14)
        } else if(this.staff._rating >= 26 && this.staff._rating <= 50){
          this.screenplay.setWritingPhase(12)
        } else if(this.staff._rating >= 51 && this.staff._rating <= 75){
          this.screenplay.setWritingPhase(10)
        } else if(this.staff._rating >= 76 && this.staff._rating <= 100){
          this.screenplay.setWritingPhase(8)
        }
      }
    },

    subtractSalary(){
      if(this.selectedSalary > this.salaryRange.min){
        this.selectedSalary = this.selectedSalary - this.salaryRange.step;
      }
    },

    addSalary(){
      if(this.selectedSalary < this.salaryRange.max){
        this.selectedSalary = this.selectedSalary + this.salaryRange.step;
      }
    },

    roundSalary(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

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
</style>