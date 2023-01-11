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
    </div>
    <div v-else class="streamingMenuEmptyMessageMainDiv">
      <div class="streamingMenuEmptyMessage">
        <h2 id="streamingMenuEmptyHeader">Create Streaming Service</h2>
        <div class="streamingMenuNameInputDiv">
          <label id="streamingServiceNameLabel" for="streamingServiceName">Name</label>
          <input type="text" name="streamingServiceName" id="streamingServiceName" v-model="name" placeholder="Name">
        </div>
        <custom-button
            id="streamingMenuCreateButton"
            :dark="false"
            size="small"
            :disabled="checkBalance || !name"
            @click="createService">
          {{ $t('createService') }}
        </custom-button>
      </div>
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
export default {
  name: "StreamingMenu",

  components: {
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
    //TODO: auf 2 500 000 000 ändern
    this.checkBalance = (this.$store.getters.getBalance - 10000000) < 0;
  },

  methods: {
    createService(){
      this.$store.commit('setOwnStreamingService',new StreamingService(this.name,1,0,1000000,this.$store.getters.getStudio.popularity,this.$store.getters.getStudio.name, this.$store.getters.getCurrentDate))
      //TODO: auf 2 500 000 000 ändern
      this.$store.commit('subtractBalance', 10000000)
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

#leftSide {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 15px;
}

.moviesSectionTag {
  width: 70%;
}

.streamingMenuEmptyMessageMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.streamingMenuEmptyMessage {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  width: 30%;
  padding: 5px 20px 20px 20px;
}

#streamingMenuEmptyHeader {
  text-align: center;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
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