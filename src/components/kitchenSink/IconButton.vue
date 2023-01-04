<template>
  <div class="iconButtonMainDiv">
    <div class="iconButtonSubDiv">
      <custom-icon class="iconButtonSVG" ref="iconButtonSVG" :size="sizeValues.iconSize" :theme="iconThemes[dark ? 1 : 0]" :icon="icon" :shadow="false" :invert-theme="invertIconTheme"/>
    </div>
  </div>
</template>

<script>
import CustomIcon from "@/components/kitchenSink/CustomIcon";
export default {
  name: "IconButton",
  components: {CustomIcon},
  data() {
    return {
      sizeExtraSmall: {
        buttonSize: '20px',
        iconSize: '18px'
      },
      sizeSmall: {
        buttonSize: '30px',
        iconSize: '20px'
      },
      sizeMedium: {
        buttonSize: '60px',
        iconSize: '40px'
      },
      sizeLarge: {
        buttonSize: '70px',
        iconSize: '47px'
      },
      themeLight: {
        bgColor: 'var(--fsm-pink-1)',
        bgImage: 'linear-gradient(var(--fsm-pink-1), var(--fsm-pink-2))',
        boxShadow: '0 0 5px 5px var(--fsm-pink-shadow-color)'
      },
      themeDark: {
        bgColor: 'var(--fsm-dark-blue-2)',
        bgImage: 'none',
        boxShadow: '0 0 5px 5px var(--fsm-dark-shadow-color)'
      },
      themeDisabled: {
        bgColor: 'var(--fsm-dark-blue-2)',
        bgImage: 'none',
        boxShadow: 'none'
      },
      sizeValues: {},
      themeValues: {},
      iconThemes: ['dark', 'light'],
      invertIconTheme: false,
    }
  },
  props: {
    icon: {
      type: String,
      default: 'placeholder',
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['extraSmall', 'small', 'medium', 'large'].includes(value);
      }
    },
    dark: {
      type: Boolean,
      default: false,
    },
    bgGradient: {
      type: Boolean,
      default: true,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    invertTheme: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setCSSVariables() {
      if (this.size === 'extraSmall') {
        this.sizeValues = {...this.sizeExtraSmall};
      } else if (this.size === 'small') {
        this.sizeValues = {...this.sizeSmall};
      } else if (this.size === 'medium') {
        this.sizeValues = {...this.sizeMedium};
      } else if (this.size === 'large') {
        this.sizeValues = {...this.sizeLarge};
      }
      if (!this.dark) {
        this.themeValues = {...this.themeLight};
      } else {
        this.themeValues = {...this.themeDark};
      }
      if (!this.bgGradient) {
        this.themeValues.bgImage = 'none';
      }
      if (!this.shadow) {
        this.themeValues.boxShadow = 'none'
      }
      this.invertIconTheme = this.invertTheme;
    },
    applyAbilityStyle() {
      if (this.disabled) {
        this.themeValues = {...this.themeDisabled};
        this.invertIconTheme = this.dark;
      } else {
        this.setCSSVariables();
      }
    },
  },
  mounted() {
    this.setCSSVariables();
    this.applyAbilityStyle();
  },
  watch: {
    invertTheme: function() {
      if (!this.disabled) {
        if (this.dark && this.invertTheme || !this.dark && !this.invertTheme) {
          this.themeValues = {...this.themeLight};
        } else {
          this.themeValues = {...this.themeDark};
        }
        if (!this.shadow) {
          this.themeValues.boxShadow = 'none'
        }
        this.invertIconTheme = this.invertTheme;
      }
    },
    disabled: function () {
      this.applyAbilityStyle();
    },
  },
}
</script>

<style scoped>
.iconButtonMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: v-bind('themeValues.bgColor');
  border-radius: var(--fsm-max-border-radius);
  height: v-bind('sizeValues.buttonSize');
  width: v-bind('sizeValues.buttonSize');
  background-image: v-bind('themeValues.bgImage');
  box-shadow: v-bind('themeValues.boxShadow');
}

.iconButtonSubDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>