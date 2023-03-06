<template>
  <div class="movieElementMainDiv">
    <div class="movieElementHead">
      <div class="movieElementHeading">
        <div class="movieElementImage">
          <poster-element height="110px" width="80px" :poster-name="source.genre.genreName.toLowerCase() + 'MoviePoster'"/>
        </div>
        <div class="movieElementTitle">
          {{ movieTitle }}
        </div>
      </div>
      <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"
                   @click="openButtonClicked"/>
    </div>
    <div class="movieElementInfo">
      <div class="movieElementInfoElements1">
        <div class="movieElementReleaseInfoBox">
          <div class="movieElementReleaseInfo">
            <div class="movieElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" icon="calendar" :shadow="true"/>
            </div>
            <div class="movieElementReleaseLabel">
              {{ $t('movieElement.release') }}
            </div>
          </div>
          <div class="movieElementReleaseValue">
            {{ release }}
          </div>
        </div>
        <div class="movieElementInfoCircles1">
          <info-circle class="movieElementInfoCircle" :icon="genreIcon" :data-title="genre"/>
          <info-circle class="movieElementInfoCircle" :text="age" data-title="Age Rating"/>
        </div>
      </div>
      <div class="movieElementInfoElements2">
        <div class="movieElementEarningsInfoBox">
          <div class="movieElementEarningsInfo">
            <div class="movieElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" icon="revenue" :shadow="true"/>
            </div>
            <div class="movieElementEarningsLabel">
              {{ $t('movieElement.earnings') }}
            </div>
          </div>
          <div class="movieElementEarningsValue">
            {{ earnings }}
          </div>
        </div>
        <div class="movieElementInfoCircles2">
          <info-circle class="movieElementInfoCircle" :text="viewers" data-title="Audience Rating"/>
          <info-circle class="movieElementInfoCircle" :text="critics" data-title="Critics Rating"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
import InfoCircle from "@/components/kitchenSink/InfoCircle";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";
import PosterElement from "@/components/kitchenSink/PosterElement.vue";

export default {
  name: "MovieElement",
  components: {PosterElement, CustomIcon, InfoCircle, IconButton},

  props: {
    movieTitle: {
      type: String,
      required: true,
    },
    viewers: {
      type: String,
      required: true,
    },
    critics: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    genreIcon: {
      type: String,
      required: true,
    },
    release: {
      type: String,
      required: true,
    },
    earnings: {
      type: String,
      required: true,
    },
  },
  methods: {
    openButtonClicked() {
      this.$emit('open-clicked');
    },
  },
}
</script>

<style scoped>
.movieElementMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 210px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.movieElementHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.movieElementHeading {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.movieElementImage {
  height: 90px;
  border-radius: var(--fsm-s-border-radius);
  margin-right: 10px;
  flex-basis: 70px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-size: 70px;
}

.movieElementInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movieElementTitle {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-right: 10px;
}

.movieElementInfoElements1, .movieElementInfoElements2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.movieElementInfoElements1 {
  margin-bottom: 10px;
}

.movieElementEarningsInfoBox, .movieElementReleaseInfoBox {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
}

.movieElementEarningsInfo, .movieElementReleaseInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.movieElementInfoBoxIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
}

.movieElementEarningsLabel, .movieElementEarningsValue, .movieElementReleaseLabel, .movieElementReleaseValue {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
}

.movieElementInfoCircles1, .movieElementInfoCircles2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.movieElementInfoCircle {
  margin-left: 10px;
}
</style>