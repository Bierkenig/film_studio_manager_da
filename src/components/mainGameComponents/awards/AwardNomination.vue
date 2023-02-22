<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('events.' + this.headline + '.title') + ' - ' + $t('events.' + this.headline + '.nomination')">
                <div class="awardNominationListContainer">
                  <div v-for="(value, index) in Object.entries(data)" :key="index" class="awardNominationCategoryBox">
                    <div class="awardNominationCategoryHeader">{{ value[0].replace(/([a-z])([A-Z])/g, '$1 $2') }}</div>
                    <div v-if="value[0] === 'Movies' || value[0] === 'ActionOrAdventureMovies' || value[0] === 'ThrillerMovies'
                              || value[0] === 'ScienceFictionMovies' || value[0] === 'FantasyMovies' || value[0] === 'HorrorMovies'"
                         class="awardNominationCategoryList">
                      <div v-for="(el, index) in value[1]" :key="index">
                        {{ el._preProduction.screenplay.title }}
                      </div>
                    </div>
                    <div v-else
                         class="awardNominationCategoryList">
                      <div v-for="(el, index) in value[1]" :key="index">
                        {{ el.getFullName() }}
                      </div>
                    </div>
                  </div>
                </div>
                <custom-button size="small" @clicked="closeModal">{{ $t('close') }}</custom-button>
              </background-tile>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "AwardNomination",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],


  props: {
    typeOfAward: String,
  },

  data(){
    return {
      headline: this.typeOfAward,
      data: [],
    }
  },

  mounted() {
    if(this.headline === 'internationalAwardNomination'){
      this.data = this.$store.getters.getInternationalAwardNominations;
    } else if(this.headline === 'independentAwardNomination'){
      this.data = this.$store.getters.getIndependentAwardNominations;
    } else if(this.headline === 'audienceAwardNomination'){
      this.data = this.$store.getters.getAudienceAwardNominations;
    }
  },

  methods: {
    closeModal(){
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].id === currentCalendarEvent.id){
          allCalendarEvents[i].completed = true;
        }
      }

      this.$emit('close');
    }
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
  width: 50%;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
  transition: all 0.3s ease;
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

.awardNominationListContainer {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;

  margin-top: 15px;
  margin-bottom: 15px;
}

.awardNominationCategoryBox {
  background-color: var(--fsm-dark-blue-2);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.awardNominationCategoryHeader {
  text-align: center;
}

.awardNominationCategoryList {
  font-size: 14px;
}
</style>