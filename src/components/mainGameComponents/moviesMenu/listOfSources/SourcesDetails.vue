<template>
  <div>
    <div v-if="sourceType === 'Screenplay' && source !== null" class="sourceDetailsBackground">
      <div>
        <h2 class="screenplayDetailsHeading">Information</h2>
        <div class="screenplayDetailsInformationContainer">
          <div class="screenplayDetailsInfoFlex">
            <div class="screenplayDetailsInfoFlexLeft">
              <div id="screenplayDetailsTitle">{{ source.title }}</div>
              <div id="screenplayDetailsDesc">{{ source.description }}</div>
              <div class="screenplayDetailsText" id="screenplayDetailsWriter">
                <div>
                  {{ $t('writer') }}
                </div>
                <div>
                  {{ source.writer._first_name + ' ' + source.writer._last_name}}
                </div>
              </div>
            </div>
            <div class="screenplayDetailsInfoFlexRight">
              <div id="screenplayDetailsInfoCircleContainer">
                <info-circle class="screenplayDetailsInfoCircle" :icon="source.genre.toLowerCase()" data-title="Genre" size="50px"/>
                <info-circle class="screenplayDetailsInfoCircle" :text="RegExp('\\+\\d+$').exec(source.ageRating)[0]" data-title="Age Rating" size="50px"/>
              </div>
              <div id="screenplayDetailsInfoIcon">

              </div>
            </div>
          </div>
          <div id="screenplayDetailsMoreInfoContainer">
            <div class="screenplayDetailsInfoFlex">
              <div class="screenplayDetailsText">
                <div>
                  {{ $t('quality') }}
                </div>
                <input class="writerDetailsRangeSlider"
                       type="range"
                       :min="0"
                       :max="100"
                       :step="1"
                       v-model="sourceRating" disabled>
              </div>
              <div class="screenplayDetailsText">
                <div>
                  {{ $t('price') }}
                </div>
                <div>
                  $ {{ currencyFormatDE(source.price) }}
                </div>
              </div>
            </div>
            <div class="screenplayDetailsInfoFlex">
              <div class="screenplayDetailsText">
                <div>
                  Type
                </div>
                <div>
                  {{ source.type }}
                </div>
              </div>
              <div class="screenplayDetailsText">
                <div>
                  {{ $t('topics') }}
                </div>
                <div>
                  <span v-for="(it, index) in sourceTopics" :key="index" class="screenplayDetailsTopicValues">
                    {{ it }}<span v-if="index !== sourceTopics.length - 1">, </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="screenplayDetailsHeading">{{ $t('characters') }}</h2>
        <div class="screenplayDetailsInformationContainer">
          <div id="screenplayDetailsCharacterContainer" class="verticalScroll">
            <div class="screenplayDetailsCharacter" v-for="(it, index) in source.roles['main']" :key="index">
              <div class="screenplayDetailsCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplayDetailsCharacterElementCenter">
                {{ $t('character') }} {{ characterIndex[index] }}
              </div>
              <div class="screenplayDetailsCharacterElementRight">
                {{ $t('main') }} {{ $t('role') }}
              </div>
            </div>
            <div class="screenplayDetailsCharacter" v-for="(it, index) in source.roles['support']" :key="index">
              <div class="screenplayDetailsCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplayDetailsCharacterElementCenter">
                {{ $t('character') }} {{ characterIndex[source.roles['main'].length + index] }}
              </div>
              <div class="screenplayDetailsCharacterElementRight">
                {{ $t('support') }} {{ $t('role') }}
              </div>
            </div>
            <div class="screenplayDetailsCharacter" v-for="(it, index) in source.roles['minor']" :key="index">
              <div class="screenplayDetailsCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplayDetailsCharacterElementCenter">
                {{ $t('character') }} {{ characterIndex[source.roles['main'].length + source.roles['support'].length + index] }}
              </div>
              <div class="screenplayDetailsCharacterElementRight">
                Minor {{ $t('role') }}
              </div>
            </div>
            <div class="screenplayDetailsCharacter" v-for="(it, index) in source.roles['cameo']" :key="index">
              <div class="screenplayDetailsCharacterElementLeft">
                {{ it.name }}
              </div>
              <div class="screenplayDetailsCharacterElementCenter">
                {{ $t('character') }} {{ characterIndex[source.roles['main'].length + source.roles['support'].length + source.roles['minor'].length + index] }}
              </div>
              <div class="screenplayDetailsCharacterElementRight">
                Cameo {{ $t('role') }}
              </div>
            </div>
          </div>
        </div>
        <custom-button
            v-if="listType === 'Sale'"
            id="screenplayDetailsBuyButton"
            :dark="false"
            size="small"
            :disabled="checkBalance"
            @click="buyScreenplay">{{ $t('buyScreenplaySection.buy') }}</custom-button>
      </div>
    </div>
    <div v-else-if="sourceType === 'Movie' && source !== null" class="sourceDetailsBackground">
      <custom-button
          v-if="listType === 'Sale'"
          id="movieDetailsBuyButton"
          :dark="false"
          size="small"
          :disabled="checkBalance"
          @click="buyMovie">{{ $t('buyScreenplaySection.buy') }}</custom-button>
    </div>
    <div v-else id="sourceDetailsEmptyBackground" class="sourceDetailsBackground">

    </div>
  </div>
</template>

<script>
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "SourcesDetails",
  components: {CustomButton, InfoCircle},

  props: {
    source: Object,
    sourceType: String,
    listType: String,
    checkBalance: Boolean
  },

  data(){
    return {
      sourcePrice: 0,
      sourceRating: 0,
      sourceTopics: [],
      characterIndex: ['A','B','C','D','E','F','G','H','I','J','K','L']
    }
  },

  watch: {
    source: function(){
      if (this.source !== null) {
        this.sourceTopics = [];
        if(this.sourceType === 'Screenplay'){
          this.sourceRating = this.source.rating

          let allTopics = this.source.topics;

          Object.values(allTopics).forEach((i) => {
            if(i !== null) {
              this.sourceTopics.push(i);
            }
          })
        }
        //TODO: Source Preis setzen (Movie)
      }
    },
  },

  methods: {
    buyScreenplay(){
      let allOtherScreenplays = this.$store.getters.getScreenplaysFromWriters;
      let chosenScreenplay = null;
      for (let i = 0; i < allOtherScreenplays.length; i++) {
        if(allOtherScreenplays[i].id === this.source.id){
          chosenScreenplay = allOtherScreenplays[i];
        }
      }
      this.$store.commit('removeScreenplayFromWriters',chosenScreenplay)
      this.$store.commit('addBoughtScreenplay',chosenScreenplay)
      this.$store.commit('subtractBalance',chosenScreenplay.price)
      this.$router.push({name: 'movies'})
    },

    buyMovie(){

    },

    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    }
  }
}
</script>

<style scoped>
.sourceDetailsBackground {
  display: flex;
  flex-direction: column;

  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  width: 550px;
  padding: 10px 20px 10px 20px;
}

#sourceDetailsEmptyBackground {
  height: 540px;
}

.screenplayDetailsHeading {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
  font-size: 24px;
}

.screenplayDetailsInformationContainer {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-l-border-radius);
  padding: 10px 20px 10px 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.screenplayDetailsInfoFlex {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
}

.screenplayDetailsInfoFlexLeft {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.screenplayDetailsInfoFlexRight {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

#screenplayDetailsTitle {
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-white);
  font-size: 28px;
}

#screenplayDetailsDesc {
  margin-top: 20px;
  color: #848891;
  font-size: 14px;
}

.screenplayDetailsText {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
  margin-top: 10px;
}

#screenplayDetailsInfoCircleContainer {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 60%;
  gap: 10px;
}

.screenplayDetailsInfoCircle {
  margin-right: 15px;
  margin-left: auto;
  order: 2;
}

#screenplayDetailsInfoIcon {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  height: 100%;
  width: 40%;
}

#screenplayDetailsMoreInfoContainer {
  margin-top: 20px;
}

#screenplayDetailsWriter {
  width: 94%;
}

.screenplayDetailsTopicValues {
  font-size: 14px;
}

#screenplayDetailsCharacterContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 130px;
  width: 100%;
}

.screenplayDetailsCharacter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  width: 95%;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

.screenplayDetailsCharacterElementLeft {
  width: 15%;
  float: left;
}

.screenplayDetailsCharacterElementCenter {
  width: 30%;
  text-align: center;
}

.screenplayDetailsCharacterElementRight {
  width: 21%;
}
</style>