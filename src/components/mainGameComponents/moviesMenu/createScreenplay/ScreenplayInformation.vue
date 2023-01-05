<template>
  <div id="screenplayInformationMainDiv">
    <div id="screenplayInformationBackground">
      <div>
        <h1 id="screenplayInformationHeader">{{ $t('screenplay') }} Information</h1>
        <div id="screenplayInformationInfoContainer" class="verticalScroll">
          <p id="screenplayInformationTitle">{{ screenplay.title }}</p>
          <div class="screenplayInformationTextDiv">
            <div class="screenplayInformationText">
              <div>
                Type:
              </div>
              <div>
                {{ screenplay.type }}
              </div>
            </div>
            <div class="screenplayInformationText">
              <div>
                Genre:
              </div>
              <div>
                {{ screenplay.genre }}
              </div>
            </div>
            <div class="screenplayInformationText">
              <div>
                Subgenre:
              </div>
              <div v-if="screenplay.subgenre">
                {{ screenplay.subgenre }}
              </div>
              <div v-else>
                _____
              </div>
            </div>
          </div>
          <div class="screenplayInformationTextDiv">
            <div class="screenplayInformationText">
              <div>
                {{ $t('ageRating') }}:
              </div>
              <div>
                {{ RegExp('\\+\\d+$').exec(screenplay.ageRating)[0] }}
              </div>
            </div>
            <div class="screenplayInformationText">
              <div>
                {{ $t('writer') }}:
              </div>
              <div>
                {{ screenplay.writer._first_name }} {{ screenplay.writer._last_name }}
              </div>
            </div>
            <div class="screenplayInformationText">
              <div>
                {{ $t('description') }}:
              </div>
              <div>
                {{ screenplay.description }}
              </div>
            </div>
          </div>
          <div class="screenplayInformationTextDiv">
            <div class="screenplayInformationText">
              <div>
                {{ $t('rating') }}:
              </div>
              <div>
                {{ screenplay.ratingRange }}
              </div>
            </div>
            <div class="screenplayInformationText">
              <div>
                {{ $t('price') }}:
              </div>
              <div>
                {{ roundSalary(screenplay.price) }}
              </div>
            </div>
            <div class="screenplayInformationText">
              <div>
                {{ $t('topics') }}:
              </div>
              <div id="screenplayInformationTopicsContainer">
                <div v-for="(it, index) in screenplay.topics" :key="index">
                  {{ it }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="screenplayInformationSubHeader">{{ $t('roles') }}</p>
            <div>
              <div class="screenplayInformationRoleDiv">
                <div class="screenplayInformationRoleInfo">{{ $t('main') }}</div>
                <div class="screenplayInformationRoleInfo">{{ $t('support') }}</div>
                <div class="screenplayInformationRoleInfo">Minor</div>
              </div>
              <div class="screenplayInformationTextDiv">
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.roles['main']" :key="index">
                    {{ it.name }}
                  </div>
                </div>
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.roles['support']" :key="index">
                    {{ it.name }}
                  </div>
                </div>
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.roles['minor']" :key="index">
                    {{ it.name }}
                  </div>
                </div>
              </div>
            </div>
            <div id="screenplayInformationRoleSecondDiv">
              <div class="screenplayInformationRoleDiv">
                <div v-if="screenplay.roles['cameo'].length !== 0" class="screenplayInformationRoleInfo">Cameo</div>
              </div>
              <div class="screenplayInformationTextDiv">
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.roles['cameo']" :key="index">
                    {{ it.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="screenplayInformationSubHeader">{{ $t('acts') }}</p>
            <div v-if="this.$store.getters.getCurrentLanguage === 'en'">
              <div class="screenplayInformationRoleDiv">
                <div class="screenplayInformationRoleInfo">{{ $t('act1') }}</div>
                <div class="screenplayInformationRoleInfo">{{ $t('act2') }}</div>
                <div class="screenplayInformationRoleInfo">{{ $t('act3') }}</div>
              </div>
              <div class="screenplayInformationTextDiv">
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.acts['act1']" :key="index">
                    {{ it.textEn }}
                  </div>
                </div>
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.acts['act2']" :key="index">
                    {{ it.textEn }}
                  </div>
                </div>
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.acts['act3']" :key="index">
                    {{ it.textEn }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="screenplayInformationRoleDiv">
                <div class="screenplayInformationRoleInfo">{{ $t('act1') }}</div>
                <div class="screenplayInformationRoleInfo">{{ $t('act2') }}</div>
                <div class="screenplayInformationRoleInfo">{{ $t('act3') }}</div>
              </div>
              <div class="screenplayInformationTextDiv">
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.acts['act1']" :key="index">
                    {{ it.textDe }}
                  </div>
                </div>
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.acts['act2']" :key="index">
                    {{ it.textDe }}
                  </div>
                </div>
                <div class="screenplayInformationRoleNameContainer">
                  <div class="screenplayInformationText" v-for="(it, index) in screenplay.acts['act3']" :key="index">
                    {{ it.textDe }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="screenplayInformationSubHeader">Details</p>
            <div class="screenplayInformationTextDiv">
              <div v-for="(it,index) in screenplay.details" :key="index" class="screenplayInformationText">
                <div >
                  {{ $t(index) }}
                </div>
                <div>
                  {{ $t(it) }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="screenplayInformationSubHeader">{{ $t('ageRating') }} Details</p>
            <div class="screenplayInformationTextDiv">
              <div v-for="(it,index) in screenplay.ageRatingDetails" :key="index" class="screenplayInformationText">
                <div >
                  {{ $t(index) }}
                </div>
                <div>
                  {{ RegExp('\\+\\d+$').exec(it)[0] }}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="screenplayInformationSubHeader">More</p>
            <div class="screenplayInformationTextDiv">
              <div class="screenplayInformationText">
                <div >
                  {{ $t('screenplayLength') }}
                </div>
                <div>
                  {{ screenplay.length }}
                </div>
              </div>
              <div class="screenplayInformationText">
                <div >
                  {{ $t('writingPhase') }}
                </div>
                <div>
                  {{ screenplay.writingPhase }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <icon-button
        v-if="this.$store.getters.getCurrentScreenplay.rewritingStatus"
        id="screenplayInformationBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
    <custom-button
        id="screenplayInformationContinueButton"
        :dark="false"
        size="medium"
        @clicked="onButtonClick">{{ $t('saveScreenplay') }}</custom-button>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import PreProduction from "@/classes/PreProduction";

export default {
  name: "ScreenplayInformation",
  components: {CustomButton, IconButton},

  data(){
    return {
      screenplay: this.$store.getters.getCurrentScreenplay,
    }
  },

  methods: {
    onButtonClick(){
      let screenplays = this.$store.getters.getScreenplays;
      let position = -1;
      for (let i = 0; i < screenplays.length; i++) {
        if(screenplays[i].id === this.$store.getters.getCurrentScreenplay.id){
          position = i;
        }
      }

      if(position === -1){
        this.$store.commit('addScreenplay', this.screenplay);
      } else {
        this.$store.getters.getCurrentScreenplay.subtractRewriting();
        this.$store.getters.getCurrentScreenplay.setRewritingStatus(false);
      }
      console.log(this.$store.getters.getCurrentScreenplay);

      if (this.$store.state.currentMovie._preProduction instanceof PreProduction) {
        this.$store.state.currentMovie._preProduction.screenplay = this.screenplay
        this.$router.push({name: 'directorSection'})
      } else {
        this.$router.push({name: 'movies'});
      }
    },

    goBack(){
      this.$router.push({name: 'hireWriter'})
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
#screenplayInformationMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#screenplayInformationHeader {
  text-align: center;
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#screenplayInformationBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#screenplayInformationContinueButton {
  position: absolute;
  float: right;
  right: 100px;
  bottom: 20px;
  width: 15%;
}

#screenplayInformationBackground {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  height: 750px;
  padding-right: 15px;
  padding-left: 15px;
}

#screenplayInformationInfoContainer {
  height: 650px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#screenplayInformationTitle {
  text-align: center;
  font-weight: var(--fsm-fw-bold);
  font-size: 24px;
}

.screenplayInformationTextDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
}

.screenplayInformationText {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.screenplayInformationSubHeader {
  font-weight: var(--fsm-fw-bold);
  font-size: 20px;
}

.screenplayInformationRoleDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.screenplayInformationRoleInfo {
  width: 100%;
}

.screenplayInformationRoleNameContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-right: 20px;
  margin-top: 10px;
}

#screenplayInformationRoleSecondDiv {
  margin-top: 15px;
}

#screenplayInformationTopicsContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>