<template>
  <div class="streamingMenuMainDiv">
    <!--<transition v-if="showBuyModal" name="modal">
      <buy-streaming-service-modal
          v-if="showBuyModal"
          @close="showBuyModal = false"
          :check-balance="checkBalance"
          class="buyStreamingServiceModal">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </buy-streaming-service-modal>
    </transition>-->

    <div v-if="this.$store.getters.getOwnStreamingService !== null" class="streamingMenuContainer">
      <div id="leftSide">
        <own-service-section class="ownServiceSectionTag"/>
        <action-section headline="buyStreamingRights" info-text="buyStreamingRightsInfoText" button-text="buyScreenplaySection.buy" icon="movies"/>
        <!--<rights-section class="rightsSectionTag"/>
        <competitor-service-section class="competitorServiceSectionTag"/>-->
      </div>
      <movies-section class="moviesSectionTag" headline="contentManagement"/>
      <div id="rightSide">
        <competitor-section />
      </div>
    </div>
    <div v-else class="streamingMenuEmptyMessageMainDiv">
      <background-tile class="streamingMenuEmptyMessage" :title="$t('createService')">
        <div class="streamingMenuNameInputDiv">
          <input type="text" name="streamingServiceName" id="streamingServiceName" v-model="name" placeholder="Name">
        </div>
        <custom-button
            id="streamingMenuCreateButton"
            :dark="false"
            :disabled="checkBalance || !name"
            @clicked="createService">
          {{ $t('createService') }}
        </custom-button>
      </background-tile>
    </div>
  </div>
</template>

<script>
import OwnServiceSection from "@/components/mainGameComponents/streamingMenu/OwnServiceSection";
//import RightsSection from "@/components/mainGameComponents/streamingMenu/RightsSection";
import MoviesSection from "@/components/mainGameComponents/sectionsForMenus/MoviesSection";
//import CompetitorServiceSection from "@/components/mainGameComponents/streamingMenu/CompetitorServiceSection";
//import BuyStreamingServiceModal from "@/components/mainGameComponents/streamingMenu/BuyStreamingServiceModal";
import {StreamingService} from "@/classes/StreamingService";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import ActionSection from "@/components/mainGameComponents/moviesMenu/ActionSection.vue";
import {updateServicePopularityAndSubscribers} from "@/simulation/simulation";
import CompetitorSection from "@/components/mainGameComponents/streamingMenu/CompetitorSection.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import store from "@/services/store";
import Earnings from "@/classes/Earnings";
export default {
  name: "StreamingMenu",

  components: {
    BackgroundTile,
    CompetitorSection,
    ActionSection,
    CustomButton,
    //BuyStreamingServiceModal,
    MoviesSection, OwnServiceSection},

  data(){
    return {
      showBuyModal: true,
      checkBalance: true,
      name: ''
    }
  },

  mounted() {
    if(this.$store.getters.getOwnStreamingService !== null){
      this.showBuyModal = false;
    }
    this.checkBalance = (this.$store.getters.getBalance - 2500000000) < 0;
  },

  methods: {
    createService(){
      this.$store.commit('setOwnStreamingService',new StreamingService(this.name,1,0,0,this.$store.getters.getStudio.popularity,this.$store.getters.getStudio.name, this.$store.getters.getCurrentDate))
      updateServicePopularityAndSubscribers();
      store.commit('addEarnings',new Earnings(2500000000, store.getters.getCurrentDate))
      this.$store.commit('subtractBalance', 2500000000)
    }
  }
}
</script>

<style scoped>
.streamingMenuContainer {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex: 1;
}

.ownServiceSectionTag {
  display: flex;
  flex-direction: column;
}

#leftSide, #rightSide {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 20px;
}

.moviesSectionTag {
  width: 70%;
}

.streamingMenuEmptyMessageMainDiv {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.streamingMenuEmptyMessage {
  width: 30%;
}

#streamingServiceName {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  height: 30px;
  margin: 10px 0 20px 0;
  padding-left: 10px;
}

#streamingServiceName:focus {
  outline: none;
}

.streamingMenuNameInputDiv {
  display: flex;
  flex-direction: column;
}

#streamingMenuCreateButton:disabled,
#streamingMenuCreateButton[disabled]{
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}
</style>