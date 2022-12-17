<template>
  <div>
    <transition v-if="showBuyModal" name="modal">
      <buy-streaming-service-modal
          v-if="showBuyModal"
          @close="showBuyModal = false"
          :check-balance="checkBalance"
          class="buyStreamingServiceModal">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </buy-streaming-service-modal>
    </transition>

    <div v-if="this.$store.getters.getOwnStreamingService !== null" class="streamingMenuContainer">
      <div id="leftSide">
        <own-service-section class="ownServiceSectionTag"/>
        <rights-section class="rightsSectionTag"/>
        <competitor-service-section class="competitorServiceSectionTag"/>
      </div>
      <content-management-section class="contentManagementSectionTag"/>
    </div>
    <div v-else id="streamingMenuEmptyMessage">
      NO STREAMING SERVICE HAS BEEN CREATED YET
    </div>
  </div>
</template>

<script>
import OwnServiceSection from "@/components/mainGameComponents/streamingMenu/OwnServiceSection";
import RightsSection from "@/components/mainGameComponents/streamingMenu/RightsSection";
import ContentManagementSection from "@/components/mainGameComponents/streamingMenu/ContentManagementSection";
import CompetitorServiceSection from "@/components/mainGameComponents/streamingMenu/CompetitorServiceSection";
import BuyStreamingServiceModal from "@/components/mainGameComponents/streamingMenu/BuyStreamingServiceModal";
import financeMixin from "@/mixins/financeMixin";
export default {
  name: "StreamingMenu",

  mixins: [financeMixin()],

  components: {
    BuyStreamingServiceModal,
    CompetitorServiceSection, ContentManagementSection, RightsSection, OwnServiceSection},

  data(){
    return {
      showBuyModal: true,
      checkBalance: true,
    }
  },

  mounted() {
    if(this.$store.getters.getOwnStreamingService !== null){
      this.showBuyModal = false;
    }
    //TODO: auf 10 Milliarden ändern
    this.checkBalance = (this.$store.getters.getBalance - 10000000) < 0;
  }
}
</script>

<style scoped>
.streamingMenuContainer {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

.ownServiceSectionTag, .rightsSectionTag {
  display: flex;
  flex-direction: column;
}

#leftSide {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 2em;
}

.contentManagementSectionTag {
  width: 70%;
}
</style>