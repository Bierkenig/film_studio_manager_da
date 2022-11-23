<template>
  <div class="movieElementMainDiv">
    <div class="movieElementImage"/>
    <div class="movieElementInfo">
      <div class="movieElementHeading">
        <div class="movieElementTitle">
          {{movieTitle}}
        </div>
        <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>
      </div>
      <div class="movieElementInfoElements">
        <div class="movieElementInfoElement">
          <info-circle class="movieElementInfoCircle" :text="viewers" data-title="Audience Rating"/>
          <div class="movieElementInfoDesc">
            Viewers
          </div>
        </div>
        <div class="movieElementInfoElement">
          <info-circle class="movieElementInfoCircle" :text="critics" data-title="Critics Rating"/>
          <div class="movieElementInfoDesc">
            Critics
          </div>
        </div>
        <div class="movieElementInfoElement">
          <info-circle class="movieElementInfoCircle" :text="age" data-title="Age Rating"/>
          <div class="movieElementInfoDesc">
            Age
          </div>
        </div>
        <div class="movieElementInfoElement">
          <info-circle class="movieElementInfoCircle" :icon="genreIcon" :data-title="genre"/>
          <div class="movieElementInfoDesc">
            Genre
          </div>
        </div>
        <div class="movieElementFinancialInfo">
          <div class="movieElementBudgetInfo">
            <div class="movieElementBudgetLabel">
              Budget
            </div>
            <div class="movieElementBudgetValue">
              {{budget}}
            </div>
          </div>
          <div class="movieElementEarningsInfo">
            <div class="movieElementEarningsLabel">
              Earnings
            </div>
            <div class="movieElementEarningsValue">
              {{earnings}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
import InfoCircle from "@/components/kitchenSink/InfoCircle";

export default {
  name: "movieElement",
  components: {InfoCircle, IconButton},
  data() {
    return {
      svgBG: '',
    }
  },
  props: {
    svgCode: String,
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
    budget: {
      type: String,
      required: true,
    },
    earnings: {
      type: String,
      required: true,
    },
  },
  methods: {
    setSVG() {
      this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(this.svgCode) + '")';
    },
  },
  mounted() {
    this.setSVG();
  },
}
</script>

<style scoped>
.movieElementMainDiv {
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

.movieElementImage {
  height: 100%;
  border-radius: var(--fsm-s-border-radius);
  margin-right: 10px;
  flex-basis: 80px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('svgBG');
  background-size: 80px;
  background-position: center;
  background-repeat: no-repeat;
}

.movieElementInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movieElementHeading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
}

.movieElementTitle {
  flex-grow: 1;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-right: 10px;
}

.movieElementInfoElements {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.movieElementInfoElement {
  text-align: center;
  width: fit-content;
}

.movieElementInfoCircle {
  margin: 10px;
}

.movieElementInfoDesc {
  font-size: 12px;
  font-weight: var(--fsm-fw-regular);
}

.movieElementFinancialInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movieElementBudgetInfo, .movieElementEarningsInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  margin: 10px 0 0 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  box-sizing: border-box;
}

.movieElementBudgetLabel, .movieElementEarningsLabel, .movieElementBudgetValue, .movieElementEarningsValue {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--fsm-fw-regular);
}
</style>