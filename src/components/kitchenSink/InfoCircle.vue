<template>
  <div class="infoCircleMainDiv">
    <div class="infoCircleSubDiv" ref="infoCircleSubDiv">
      <custom-icon class="infoCircleSVG" ref="infoCircleSVG" size="25px" :theme="iconThemes[dark ? 1 : 0]" :gradient="false" :icon="icon" :shadow="false"/>
    </div>
  </div>
</template>

<script>
import CustomIcon from "@/components/kitchenSink/CustomIcon";
export default {
  name: "infoCircle",
  components: {CustomIcon},
  data() {
    return {
      themeLight: {
        ctColor: 'var(--fsm-dark-blue-3)',
        bgColor: 'var(--fsm-pink-1)',
      },
      themeDark: {
        ctColor: 'var(--fsm-pink-1)',
        bgColor: 'var(--fsm-dark-blue-3)',
      },
      themeValues: {},
      iconThemes: ['dark', 'light'],
    }
  },
  props: {
    icon: {
      type: String,
      default: 'movies',
    },
    text: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '40px',
    },
    dark: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    setCSSVariables() {
      if (!this.dark) {
        this.themeValues = {...this.themeLight};
      } else {
        this.themeValues = {...this.themeDark};
      }
      if (this.text !== '') {
        this.$refs.infoCircleSubDiv.innerHTML = this.text;
      }
    },
  },
  mounted() {
    this.setCSSVariables();
  },
}
</script>

<style scoped>
.infoCircleMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: v-bind('themeValues.bgColor');
  border-radius: var(--fsm-max-border-radius);
  height: v-bind('size');
  width: v-bind('size');
}

.infoCircleSubDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: v-bind('themeValues.ctColor');
  font-size: 18px;
  font-weight: var(--fsm-fw-regular);
}
</style>