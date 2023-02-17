<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('events.' + this.headline + '.title') + ' - ' + $t('events.' + this.headline + '.winner')">
                <div class="awardPresentationListContainer">
                  <div v-for="(value, index) in Object.entries(data)" :key="index" class="awardPresentationCategoryBox">
                    <div class="awardPresentationCategoryHeader">{{ value[0].replace(/([a-z])([A-Z])/g, '$1 $2') }}</div>
                    <div v-if="value[0] === 'Movies' || value[0] === 'ActionOrAdventureMovies' || value[0] === 'ThrillerMovies'
                              || value[0] === 'ScienceFictionMovies' || value[0] === 'FantasyMovies' || value[0] === 'HorrorMovies'"
                         class="awardPresentationCategoryList">
                      <div v-for="(el, index) in value[1]" :key="index">
                        {{ el._preProduction.screenplay.title }}
                      </div>
                    </div>
                    <div v-else class="awardPresentationCategoryList">
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

export default {
  name: "AwardPresentation",
  components: {CustomButton, BackgroundTile},

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
    if(this.headline === 'internationalAwardPresentation'){
      this.data = this.$store.getters.getInternationalAwardNominations;
    } else if(this.headline === 'independentAwardPresentation'){
      this.data = this.$store.getters.getIndependentAwardNominations;
    } else if(this.headline === 'audienceAwardPresentation'){
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

.awardPresentationListContainer {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;

  margin-top: 15px;
  margin-bottom: 15px;
}

.awardPresentationCategoryBox {
  background-color: var(--fsm-dark-blue-2);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.awardPresentationCategoryHeader {
  text-align: center;
}

.awardPresentationCategoryList {
  font-size: 14px;
}
</style>