<template>
  <div>
    <div id="container">
      <upcoming-events-section class="upcomingEvents"/>
      <projects-section class="projectsSection"/>

      <div id="homeMenuRightSide">
        <news-section class="news"/>
        <earnings-section class="earnings"/>
      </div>
    </div>

    <router-link to="directorSection">
      <button>director</button>
    </router-link>
    <router-link to="screenplaySection">
      <button>screenplay</button>
    </router-link>
    <router-link to="durationSection">
      <button>duration</button>
    </router-link>
    <router-link to="actorSection">
      <button>actor</button>
    </router-link>
    <router-link to="budgetSection">
      <button>budget</button>
    </router-link>
    <router-link to="prodEventModal">
      <button>production test</button>
    </router-link>
    <button id="saveButton" class="buttonStyle" @click="save">save</button>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import NewsSection from "@/components/mainGameComponents/sectionsForMenus/NewsSection";
import EarningsSection from "@/components/mainGameComponents/sectionsForMenus/EarningsSection";
import UpcomingEventsSection from "@/components/mainGameComponents/sectionsForMenus/UpcomingEventsSection";
import financeMixin from "@/mixins/financeMixin";
import ProjectsSection from "@/components/mainGameComponents/sectionsForMenus/ProjectsSection";
export default {
  name: "HomeMenu",

  mixins: [soundeffectMixin('button', 'click'), financeMixin()],
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
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3em;
}

.upcomingEvents, #homeMenuRightSide {
  width: 20%;
}

.projectsSection {
  width: 50%;
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