<template>
  <div id="writerDetailsDiv">
    <div id="writerDetailsVertical">
      <h2 class="writerDetailsHeader">{{ $t('general') }}</h2>
      <div id="writerDetailsInfoBox">
        <div id="writerDetailsPersonalInfo">
          <div id="writerDetailsAvatarBox">
            <avatar-element svg-code='<svg width="80" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg"><g transform="translate(40, 36)"><path d="M100 0C69.072 0 44 25.072 44 56v6.166c-5.675.952-10 5.888-10 11.834v14c0 6.052 4.48 11.058 10.305 11.881 2.067 19.806 14.458 36.541 31.695 44.73V163h-4c-39.764 0-72 32.236-72 72v9h200v-9c0-39.764-32.236-72-72-72h-4v-18.389c17.237-8.189 29.628-24.924 31.695-44.73C161.52 99.058 166 94.052 166 88V74c0-5.946-4.325-10.882-10-11.834V56c0-30.928-25.072-56-56-56z" fill="#FFDBB4"/><path d="M76 144.611v8A55.79 55.79 0 00100 158a55.789 55.789 0 0024-5.389v-8A55.789 55.789 0 01100 150a55.79 55.79 0 01-24-5.389z" fill="#000" fill-opacity=".1"/></g><g transform="translate(8, 170)"><path d="M108 14.694C92.484 18.38 80.895 25.529 77.228 34.142 50.72 44.765 32 70.696 32 101v9h200v-9.001c0-30.303-18.721-56.234-45.228-66.858-3.667-8.613-15.256-15.761-30.772-19.447V32c0 13.255-10.745 24-24 24s-24-10.745-24-24V14.694z" fill="#65C9FF"/><path d="M102 63.337a67.11 67.11 0 01-7-2.817V110h7V63.337zm60 0a67.039 67.039 0 007-2.817V98.5a3.5 3.5 0 11-7 0V63.337z" fill="#F4F4F4"/><path d="M187.62 34.488a71.788 71.788 0 0110.832 5.628C197.107 55.615 167.87 68 132 68c30.928 0 56-13.431 56-30 0-1.188-.129-2.36-.38-3.512zm-111.24 0A16.477 16.477 0 0076 38c0 16.569 25.072 30 56 30-35.87 0-65.107-12.385-66.452-27.884a71.783 71.783 0 0110.832-5.628z" fill="#000" fill-opacity=".16"/></g><g transform="translate(86, 134)"><path fill-rule="evenodd" clip-rule="evenodd" d="M40.058 27.723C40.708 20.693 46.702 16 54 16c7.342 0 13.363 4.75 13.953 11.848.03.378-.876.676-1.324.451-5.539-2.772-9.749-4.159-12.63-4.159-2.843 0-6.992 1.356-12.445 4.069-.507.252-1.534-.069-1.496-.486z" fill="#000" fill-opacity=".7"/></g><g transform="translate(112, 122)"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 8c0 4.418 5.373 8 12 8s12-3.582 12-8" fill="#000" fill-opacity=".16"/></g><g transform="translate(84, 90)"><path d="M36 22a6 6 0 11-12 0 6 6 0 0112 0zm52 0a6 6 0 11-12 0 6 6 0 0112 0z" fill="#000" fill-opacity=".6"/></g><g transform="translate(84, 82)"><path fill-rule="evenodd" clip-rule="evenodd" d="M36.37 6.876c-1.97 2.905-5.546 4.64-8.738 5.684-3.943 1.29-18.552 3.38-15.112 11.348a.147.147 0 00.272.002c1.153-2.645 17.465-5.123 18.973-5.704 4.445-1.709 8.393-5.49 9.162-10.543.352-2.317-.637-6.049-1.548-7.55-.11-.18-.374-.136-.43.069-.36 1.331-1.41 4.971-2.58 6.694zm39.26 0c1.97 2.905 5.546 4.64 8.738 5.684 3.943 1.29 18.551 3.379 15.112 11.348a.147.147 0 01-.272.002c-1.153-2.645-17.465-5.123-18.973-5.704-4.445-1.709-8.393-5.49-9.162-10.543-.352-2.317.637-6.049 1.548-7.55.11-.18.374-.136.43.069.36 1.331 1.41 4.971 2.58 6.694z" fill="#000" fill-opacity=".6"/></g><g transform="translate(56, 72)"><path d="M57.548 69.678c1.627-.975 3.207-1.922 4.84-2.546 5.19-1.983 14.82-1.42 21.612 2.165 6.792-3.586 16.422-4.148 21.612-2.165 1.633.624 3.213 1.57 4.84 2.546 4.125 2.473 8.551 5.126 14.91 3.15.369-.114.729.217.618.58-1.373 4.51-9.007 7.599-11.601 7.7-6.207.242-11.753-2.261-17.126-4.686-4.444-2.006-8.77-3.958-13.253-4.26-4.483.302-8.809 2.254-13.252 4.26-5.374 2.425-10.92 4.928-17.126 4.686-2.594-.101-10.228-3.19-11.602-7.7-.11-.363.25-.694.619-.58 6.358 1.976 10.784-.677 14.91-3.15z" fill="#A55728"/></g><g transform="translate(7, 0)"><path fill-rule="evenodd" clip-rule="evenodd" d="M183.68 38.949c5.406-4.95 6.707-14.987 3.638-21.5-3.769-7.995-11.417-8.997-18.746-5.48-6.908 3.315-13.057 4.419-20.622 2.813-7.258-1.541-14.144-4.26-21.647-4.706-12.325-.733-24.3 3.839-32.7 13.053-1.603 1.758-2.894 3.768-4.115 5.805-.977 1.63-2.078 3.38-2.493 5.258-.198.894.17 3.098-.275 3.83-.48.79-2.296 1.515-3.069 2.102-1.567 1.188-2.924 2.53-4.18 4.047-2.666 3.222-4.133 6.587-5.368 10.572-4.102 13.245-4.45 28.998.854 42.004.707 1.734 2.898 5.352 4.186 1.638.255-.734-.334-3.194-.333-3.935.005-2.72 1.506-20.729 8.047-30.817 2.13-3.284 11.973-15.58 13.984-15.68 1.065 1.693 11.88 12.51 39.942 11.242 12.662-.572 22.4-6.26 24.738-8.727 1.028 5.533 12.992 13.816 14.815 17.224 5.267 9.846 6.435 30.304 8.445 30.265 2.01-.038 3.453-5.237 3.867-6.23 3.072-7.375 3.595-16.632 3.267-24.559-.427-10.202-4.638-21.226-12.235-28.22z" fill="#A55728"/></g><g transform="translate(69, 85)"><path fill-rule="evenodd" clip-rule="evenodd" d="M40 53c-13.255 0-24-10.745-24-24 0-2.435.363-4.785 1.037-7H10.5a2.5 2.5 0 010-5h8c.229 0 .45.03.66.088C23.297 9.866 31.08 5 40 5c9.352 0 17.455 5.35 21.416 13.155C63.493 15.039 66.949 13 70.862 13c4.013 0 7.545 2.144 9.603 5.394C84.38 10.46 92.553 5 102 5c8.92 0 16.703 4.866 20.84 12.088a2.52 2.52 0 01.66-.088h8a2.5 2.5 0 110 5h-6.537A24.006 24.006 0 01126 29c0 13.255-10.745 24-24 24S78 42.255 78 29c0-1.422.124-2.815.36-4.169C78.277 20.455 74.915 17 70.863 17c-3.736 0-6.887 2.94-7.42 6.83.365 1.665.558 3.395.558 5.17 0 13.255-10.745 24-24 24zm0-4c11.046 0 20-8.954 20-20S51.046 9 40 9s-20 8.954-20 20 8.954 20 20 20zm82-20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z" fill="#000" fill-opacity=".1"/><path fill-rule="evenodd" clip-rule="evenodd" d="M40 51c-13.255 0-24-10.745-24-24 0-2.435.363-4.785 1.037-7H10.5a2.5 2.5 0 010-5h8c.229 0 .45.03.66.088C23.297 7.866 31.08 3 40 3c9.352 0 17.455 5.35 21.416 13.155C63.493 13.039 66.949 11 70.862 11c4.013 0 7.545 2.144 9.603 5.394C84.38 8.46 92.553 3 102 3c8.92 0 16.703 4.866 20.84 12.088a2.52 2.52 0 01.66-.088h8a2.5 2.5 0 110 5h-6.537A24.006 24.006 0 01126 27c0 13.255-10.745 24-24 24S78 40.255 78 27c0-1.422.124-2.815.36-4.169C78.277 18.455 74.915 15 70.863 15c-3.736 0-6.887 2.94-7.42 6.83.365 1.665.558 3.395.558 5.17 0 13.255-10.745 24-24 24zm0-4c11.046 0 20-8.954 20-20S51.046 7 40 7s-20 8.954-20 20 8.954 20 20 20zm82-20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z" fill="#25557C"/></g></svg>' size="100px"/>
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
        console.log(this.staffSalary)
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