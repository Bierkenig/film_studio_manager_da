<template>
  <div>
    <div id="container">
      <!--<post-prod-modal/>-->
      <upcoming-events-section class="upcomingEvents"/>
      <projects-section class="projectsSection"/>

      <div id="homeMenuRightSide">
        <news-section class="news"/>
        <earnings-section class="earnings"/>
      </div>
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import NewsSection from "@/components/mainGameComponents/sectionsForMenus/NewsSection";
import EarningsSection from "@/components/mainGameComponents/sectionsForMenus/EarningsSection";
import UpcomingEventsSection from "@/components/mainGameComponents/sectionsForMenus/UpcomingEventsSection";
import ProjectsSection from "@/components/mainGameComponents/sectionsForMenus/ProjectsSection";
//import PostProdModal from "@/components/mainGameComponents/postProduction/postProdEventModal";
export default {
  name: "HomeMenu",

  mixins: [soundeffectMixin('button', 'click')],
  components: {ProjectsSection, UpcomingEventsSection, EarningsSection, NewsSection},
  methods: {
    save() {
      let reducedState = {}
      this.$store.commit("stateToSave", reducedState)
      window.ipcRenderer.send('savingData', [JSON.stringify(reducedState), this.$store.getters.getSlot])
    }
  },
}
</script>

<style scoped>
#container {
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 15px;
}

.upcomingEvents, #homeMenuRightSide {
  width: 25%;
}

.projectsSection {
  width: 45%;
}

.news, .earnings {
  height: 50%;
}

#homeMenuRightSide {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>