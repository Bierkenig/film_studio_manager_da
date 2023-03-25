<template>
  <div class="movieEarningElementMainDiv">
    <div class="movieEarningElementImage">
      <poster-element height="110px" width="80px" :poster-name="genre.toLowerCase() + 'MoviePoster'"/>
    </div>
    <div class="movieEarningElementInfo">
      <div class="movieEarningElementHeading">
        <div class="movieEarningElementTitle">
          {{movieTitle}}
        </div>
      </div>
      <div class="movieEarningElementInfoElements">
        <div class="movieEarningElementInfoElementsBackground">
          <div class="movieEarningElementInfoElementsLabel">
            <custom-icon class="headerInfoIcon" icon="calendar" size="18px" :dark="false" :gradient="true" :shadow="true"/>
            {{ $t('earningStatisticsElement.opening') }}
          </div>
          <div class="movieEarningElementInfoElementsValue">
            $ {{ roundBudget(openingWeekGross) }}
          </div>
        </div>
        <div class="movieEarningElementInfoElementsBackground">
          <div class="movieEarningElementInfoElementsLabel">
            <custom-icon class="headerInfoIcon" icon="money" size="18px" :dark="false" :gradient="true" :shadow="true"/>
            {{ currentTimeTitle }}
          </div>
          <div class="movieEarningElementInfoElementsValue">
            $ {{ roundBudget(currentTimeGross) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";
import PosterElement from "@/components/kitchenSink/PosterElement.vue";

export default {
  name: "MovieEarningElement",
  components: {PosterElement, CustomIcon},

  props: {
    genre: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    openingWeekGross: {
      type: Number,
      required: true,
    },
    currentTimeTitle: {
      type: String,
      required: true,
    },
    currentTimeGross: {
      type: Number,
      required: true,
    }
  },

  methods: {
    openButtonClicked() {
      this.$emit('open-clicked');
    },
    roundBudget(labelValue){
      if(this.$store.getters.getCurrentLanguage === 'en'){
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                    : Math.abs(Number(labelValue));
      } else {
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " Mrd"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " Mio"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " T"

                    : Math.abs(Number(labelValue));
      }
    },
  },
}
</script>

<style scoped>
.movieEarningElementMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 130px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.movieEarningElementImage {
  height: 100%;
  border-radius: var(--fsm-s-border-radius);
  margin-right: 10px;
  flex-basis: 80px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-size: 80px;
}

.movieEarningElementInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movieEarningElementHeading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
}

.movieEarningElementTitle {
  flex-grow: 1;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-right: 10px;
}

.movieEarningElementInfoElements {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.movieEarningElementInfoElementsBackground {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0 0 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  box-sizing: border-box;
}

.movieEarningElementInfoElementsLabel, .movieEarningElementInfoElementsValue {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 14px;
  gap: 10px;
  font-weight: var(--fsm-fw-regular);
}

</style>