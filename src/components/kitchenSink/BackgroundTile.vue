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
      default: 'placeholder',
    },
  },
  methods: {
    setCSSVariables() {
      if (this.contentColor === 'white') {
        this.colorValue = this.whiteColor;
      } else if (this.contentColor === 'grey') {
        this.colorValue = this.greyColor;
      }
      if (this.icon !== 'placeholder') {
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
  border-radius: var(--fsm-l-border-radius);
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  font-weight: var(--fsm-fw-regular);
  font-size: 22px;
  color: v-bind('colorValue');
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
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