<template>
  <div class="infoCircleMainDiv">
    <div class="infoCircleSubDiv" ref="infoCircleSubDiv">
      <custom-icon v-show="text === ''" class="infoCircleSVG" ref="infoCircleSVG" size="25px"
                   :theme="iconThemes[dark ? 1 : 0]"
                   :gradient="false" :icon="icon" :shadow="false" :grey-icon="greyIcon"/>
      <div v-show="text !== ''" class="infoCircleText">{{ text }}</div>
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
      themeDarkAlt: {
        ctColor: 'var(--fsm-white)',
        bgColor: 'var(--fsm-dark-blue-3)',
      },
      fontStyleDefault: {
        fontSize: '18px',
        fontWeight: 'var(--fsm-fw-regular)',
      },
      fontStyleAlt: {
        fontSize: '22px',
        fontWeight: 'var(--fsm-fw-medium)',
      },
      fontStyleLarge: {
        fontSize: '28px',
        fontWeight: 'var(--fsm-fw-bold)',
      },
      themeValues: {},
      fontStyleValues: {},
      iconThemes: ['dark', 'light'],
    }
  },
  props: {
    icon: {
      type: String,
      default: 'placeholder',
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
    alternativeStyle: {
      type: Boolean,
      default: false,
    },
    largeFont: {
      type: Boolean,
      default: false,
    },
    greyIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setCSSVariables() {
      if (!this.dark) {
        this.themeValues = {...this.themeLight};
        this.fontStyleValues = {...this.fontStyleDefault};
      } else {
        if (this.alternativeStyle) {
          this.themeValues = {...this.themeDarkAlt};
          this.fontStyleValues = {...this.fontStyleAlt};
        } else {
          this.themeValues = {...this.themeDark};
          this.fontStyleValues = {...this.fontStyleDefault};
        }
      }
      if (this.largeFont) {
        this.fontStyleValues = {...this.fontStyleLarge};
      }
    },
  },
  mounted() {
    this.setCSSVariables();
  },
  watch: {
    icon: function () {
      this.setCSSVariables();
    },
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
}

.infoCircleText {
  color: v-bind('themeValues.ctColor');
  font-size: v-bind('fontStyleValues.fontSize');
  font-weight: v-bind('fontStyleValues.fontWeight');
}
</style>