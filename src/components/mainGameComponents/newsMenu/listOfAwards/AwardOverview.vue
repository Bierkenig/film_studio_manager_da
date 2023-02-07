<template>
  <div id="awardOverviewMainDiv">
    <h1 id="awardOverviewHeader">{{ $t('listOfAwards') }}</h1>
    <icon-button
        id="awardOverviewBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
    <award-list/>
    <award-details/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import AwardList from "@/components/mainGameComponents/newsMenu/listOfAwards/AwardList.vue";
import AwardDetails from "@/components/mainGameComponents/newsMenu/listOfAwards/AwardDetails.vue";

export default {
  name: "AwardOverview",
  components: {AwardDetails, AwardList, IconButton},

  data() {
    return {
      clickedAward: {},
    }
  },

  methods: {
    goBack() {
      this.$router.push({name: 'news'})
    },

    receiveAward(award) {
      this.clickedAward = award;
    }
  }
}
</script>

<style scoped>
#awardOverviewMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 15px;
}

#awardOverviewHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#awardOverviewBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>