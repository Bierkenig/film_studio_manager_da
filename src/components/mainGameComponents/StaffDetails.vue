<template>
  <div id="writerDetailsDiv">
    <div id="writerDetailsVertical">
      <h2 class="writerDetailsHeader">{{ $t('general') }}</h2>
      <div id="writerDetailsInfoBox">
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
      <router-link :to="{name: this.nextLocation}">
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
      </router-link>
    </div>
  </div>
</template>

<script>
import {Screenplay} from "@/classes/Screenplay";
import AvatarElement from "@/components/kitchenSink/AvatarElement.vue";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "WriterDetails",
  components: {CustomButton, CustomIcon, AvatarElement},

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
      oldWriter: ''
    }
  },

  mounted() {
   this.copiedPrice = this.$store.getters.getCurrentScreenplay.price;
   this.oldWriter = this.$store.getters.getCurrentScreenplay.writer;
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
        console.log(this.staff._genre)
      }
    }
  },

  methods: {
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

#writerDetailsInfoBox {
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

.writerDetailsHireButton {
  margin-top: 15px;
}

.writerDetailsHireButton[disabled],
.writerDetailsHireButton[disabled]{
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}
</style>