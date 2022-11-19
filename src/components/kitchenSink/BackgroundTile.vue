<template>
  <div class="backgroundTileMainDiv">
    <icon-button class="backgroundTileIcon" :id="'backgroundTileIcon' + randomId" :icon="icon" size="large" :dark="false" :bg-gradient="true" :icon-gradient="false" :shadow="false"/>
    <div class="backgroundTileTitle">
      {{ title }}
    </div>
    <slot/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
export default {
  name: "backgroundTile",
  components: {IconButton},
  data() {
    return {
      randomId: Math.floor(Math.random() * Math.pow(10, 10)),
      whiteColor: 'var(--fsm-white)',
      greyColor: 'var(--fsm-grey-font-color)',
      colorValue: '',
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    contentColor: {
      type: String,
      default: 'white',
      validator(value) {
        return ['white', 'grey'].includes(value);
      }
    },
    icon: {
      type: String,
      default: 'open',
    },
  },
  methods: {
    setCSSVariables() {
      if (this.contentColor === 'white') {
        this.colorValue = this.whiteColor;
      } else if (this.contentColor === 'grey') {
        this.colorValue = this.greyColor;
      }
      if (this.icon !== 'open') {
        document.getElementById('backgroundTileIcon' + this.randomId).style.display = 'flex';
      }
    },
  },
  mounted() {
    this.setCSSVariables();
  },
}
</script>

<style scoped>
.backgroundTileMainDiv {
  display: inline-block;
  background-image: linear-gradient(var(--fsm-dark-blue-2), var(--fsm-dark-blue-3));
  border-radius: var(--fsm-l-border-radius);
  padding: var(--fsm-l-border-radius);
  box-shadow: 0 0 5px 5px var(--fsm-dark-shadow-color);
  width: 100%;
  box-sizing: border-box;
  font-weight: var(--fsm-fw-regular);
  font-size: 22px;
  color: v-bind('colorValue');
}

.backgroundTileIcon {
  display: none;
  float: right;
}

.backgroundTileTitle {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
  margin-bottom: 0.25em;
}
</style>