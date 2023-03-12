<template>
  <div class="newsElementMainDiv">
    <div v-if="type === 'People'" class="newsElementImage"/>
    <div v-if="type === 'Movie'" class="newsElementImage">
      <poster-element height="95px" width="70px" :poster-name="genre + 'MoviePoster'"/>
    </div>
    <div v-if="type === 'Studio'" class="newsElementImage">
      <custom-icon class="iconButtonSVG" size="50px" theme="light" icon="studio" :shadow="false" :invert-theme="false"/>
    </div>
    <div class="newsElementText">
      <div class="newsElementHeading">
        {{headingText}}
      </div>
      <div class="newsElementInfo">
        {{infoText}}
      </div>
    </div>
  </div>
</template>

<script>
import PosterElement from "@/components/kitchenSink/PosterElement.vue";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";

export default {
  name: "NewsElement",
  components: {CustomIcon, PosterElement},
  data() {
    return {
      svgBG: '',
    }
  },
  props: {
    svgCode: String,
    headingText: {
      type: String,
      required: true,
    },
    infoText: {
      type: String,
      required: true,
    },
    type: String,
    genre: String,
  },

  methods: {
    setSVG() {
      this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(this.svgCode) + '")';
    },
  },

  watch: {
    svgCode: function (){
      this.setSVG();
    }
  },

  mounted() {
    this.setSVG();
  },
}
</script>

<style scoped>
.newsElementMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 115px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.newsElementImage {
  height: 100%;
  border-radius: var(--fsm-s-border-radius);
  margin-right: 10px;
  flex-basis: 70px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('svgBG');
  background-size: 70px;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.newsElementText {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.newsElementHeading {
  width: 70%;
  font-size: 18px;
  font-weight: var(--fsm-fw-regular);
}

.newsElementInfo {
  width: 90%;
  font-size: 12px;
  font-weight: var(--fsm-fw-regular);
  color: var(--fsm-grey-font-color);
}
</style>