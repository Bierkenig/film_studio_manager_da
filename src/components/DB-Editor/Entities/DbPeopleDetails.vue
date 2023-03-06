<template>
  <div>
    <div id="peopleDetailsDiv">
      <div id="peopleDetailsVertical">
        <h2 class="peopleDetailsHeader">{{ $t('general') }}</h2>
        <div class="peopleDetailsInfoBox">
          <div id="peopleDetailsPersonalInfo">
            <div id="peopleDetailsAvatarBox">
              <avatar-element :svg-code="this.personAvatar" size="100px"/>
            </div>
            <div id="peopleDetailsInfoText">
              <div id="peopleDetailsInfoMainDiv">
                <div class="peopleDetailsInfoTextRow">
                  <div id="personName">
                    {{ personName }}
                    <div v-show="!showDetails" class="peopleDetailsInvisible">______</div>
                  </div>
                  <div class="peopleDetailsInfoCircleBox">
                    <info-circle class="peopleDetailsInfoCircle" :text="personAge.toString()" size="60px" :data-title="$t('age')" large-font/>
                    <info-circle class="peopleDetailsInfoCircle"
                                 :icon="personGender"
                                 :data-title="$t(personGender)"
                                 size="60px"/>
                  </div>
                </div>
              </div>
              <div id="peopleDetailsInfoMainDiv">
                <div class="peopleDetailsInfoTextRow">
                  <div class="peopleDetailsSpecificInfoDiv">
                    <div>
                      {{ $t('nationality') }}
                    </div>
                    <div>
                      {{ personNationality }}
                    </div>
                  </div>
                </div>
                <div class="peopleDetailsInfoTextRow">
                  <div class="peopleDetailsSpecificInfoDiv">
                    <div>
                      {{ $t('ethnicity') }}
                    </div>
                    <div>
                      {{ $t(personEthnicity) }}
                    </div>
                  </div>
                  <div class="peopleDetailsSpecificInfoDiv">
                    <div>
                      {{ $t('workingSince') }}
                    </div>
                    <div>
                      {{ $t(personWorkingSince) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="peopleDetailsData">
            <div class="peopleDetailsInfoTextRow">
              <div class="peopleDetailsSpecificInfoDiv">
                <div class="peopleDetailsMoreInfo">
                  <custom-icon size="15px" theme="light" :gradient="false" icon="party" :shadow="false" :invert-theme="false"/>
                  <div>{{ $t('popularity') }}</div>
                </div>
                <input class="peopleDetailsRangeSlider"
                       type="range"
                       :min="0"
                       :max="100"
                       :step="1"
                       v-model="personPopularity" disabled>
              </div>
              <div class="peopleDetailsSpecificInfoDiv">
                <div class="peopleDetailsMoreInfo">
                  <custom-icon size="15px" theme="light" :gradient="false" icon="briefcase" :shadow="false" :invert-theme="false"/>
                  <div>{{ $t('experience') }}</div>
                </div>
                <input class="peopleDetailsRangeSlider"
                       type="range"
                       :min="0"
                       :max="100"
                       :step="1"
                       v-model="personExperience" disabled>
              </div>
            </div>
            <div class="peopleDetailsInfoTextRow">
              <div class="peopleDetailsSpecificInfoDiv">
                <div class="peopleDetailsMoreInfo">
                  <custom-icon size="15px" theme="light" :gradient="false" icon="star" :shadow="false" :invert-theme="false"/>
                  <div>{{ $t('rating') }}</div>
                </div>
                <input class="peopleDetailsRangeSlider"
                       type="range"
                       :min="0"
                       :max="100"
                       :step="1"
                       v-model="personRating" disabled>
              </div>
              <div class="peopleDetailsSpecificInfoDiv">
                <div class="peopleDetailsMoreInfo">
                  <custom-icon size="15px" theme="light" :gradient="false" icon="school" :shadow="false" :invert-theme="false"/>
                  <div>Talent</div>
                </div>
                <input class="peopleDetailsRangeSlider"
                       type="range"
                       :min="0"
                       :max="100"
                       :step="1"
                       v-model="personTalent" disabled>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarElement from "@/components/kitchenSink/AvatarElement.vue";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "DbPeopleDetails",
  components: {InfoCircle, CustomIcon, AvatarElement},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  props: {
    person: Object,
  },

  data() {
    return {
      showDetails: false,
      personAvatar: '',
      personName: '',
      personRating: 50,
      personAge: '',
      personNationality: '',
      personGender: 'placeholder',
      personPopularity: 50,
      personTalent: 50,
      personExperience: 50,
      personEthnicity: '',
      personWorkingSince: '',
      currentPerson: null,
    }
  },

  watch: {
    person: function(){
      if (this.person !== null && this.person !== undefined) {
        this.showDetails = true;
        this.personAvatar = this.person._avatar
        this.personName = this.person._first_name + ' ' + this.person._last_name;
        this.personRating = this.person._rating;
        this.personTalent = this.person._talent;
        this.personExperience = this.person._experience;
        this.personPopularity = this.person._popularity;
        this.personAge = this.person._age;
        this.personNationality = this.person._nationality;
        this.personGender = this.person._gender;
        this.personEthnicity = this.person._ethnicity;
        this.personWorkingSince = this.person._workingSince;
        this.currentPerson = this.person;
      }
    },
  },

  methods: {
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
    }
  }

}
</script>

<style scoped>
#peopleDetailsVertical {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}

.peopleDetailsHeader {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.peopleDetailsInfoBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  margin-top: 15px;
}

#peopleDetailsAvatarBox {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
}

#peopleDetailsPersonalInfo {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
}

#personName {
  font-weight: var(--fsm-fw-bold);
  font-size: 22px;
}

#peopleDetailsInfoMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  flex: 1;
}

#peopleDetailsInfoText {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

.peopleDetailsSpecificInfoDiv {
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

.peopleDetailsInfoTextRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 15px;
}

.peopleDetailsMoreInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

#peopleDetailsData {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.peopleDetailsRangeSlider {
  width: 100px;
  height: 10px;
}

.peopleDetailsInfoCircleBox {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>