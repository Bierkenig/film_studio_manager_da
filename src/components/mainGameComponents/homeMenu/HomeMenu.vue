<template>
  <div id="container">

    <upcoming-events-section class="upcomingEvents"/>
    <projects-section class="projectsSection"/>

    <div id="homeMenuRightSide">
      <news-section class="news"/>
      <earnings-section class="earnings"/>
    </div>
  </div>
</template>

<script>
import NewsSection from "@/components/mainGameComponents/sectionsForMenus/NewsSection";
import EarningsSection from "@/components/mainGameComponents/sectionsForMenus/EarningsSection";
import UpcomingEventsSection from "@/components/mainGameComponents/sectionsForMenus/UpcomingEventsSection";
import ProjectsSection from "@/components/mainGameComponents/sectionsForMenus/ProjectsSection";
//import PostProdModal from "@/components/mainGameComponents/postProduction/postProdEventModal";
export default {
  name: "HomeMenu",

  components: {ProjectsSection, UpcomingEventsSection, EarningsSection, NewsSection},
  mounted() {
    window.ipcRenderer.send("updateDiscordDetails", "In Game: Home Menu")
  },

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
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.projectsSection {
  flex-grow: 7;
  flex-basis: 0;
}

.news, .earnings {
  flex-grow: 1;
  flex-basis: 0;
}

.upcomingEvents {
  flex-grow: 4;
  flex-basis: 0;
}

#homeMenuRightSide {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  flex-grow: 4;
  flex-basis: 0;
}
</style>