<template>
  <button class="customButton" @click="buttonFunction">
    <slot/>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  data() {
    return {
      sizeSmall: {
        fontSize: '16px',
        fontWeight: 'var(--fsm-fw-bold)'
      },
      sizeMedium: {
        fontSize: '24px',
        fontWeight: 'var(--fsm-fw-bold)'
      },
      sizeLarge: {
        fontSize: '28px',
        fontWeight: 'var(--fsm-fw-regular)'
      },
      themeLight: {
        bgImage: 'linear-gradient(var(--fsm-pink-1), var(--fsm-pink-2))',
        fontColor: 'var(--fsm-dark-blue-3)'
      },
      themeDark: {
        bgColor: 'var(--fsm-dark-blue-4)',
        fontColor: 'var(--fsm-pink-1)'
      },
      themeDisabled: {
        bgColor: 'var(--fsm-light-blue)',
        fontColor: 'var(--fsm-grey-font-color)'
      },
      sizeValues: {},
      themeValues: { bgImage: 'none', bgColor: 'none' },
    }
  },
  props: {
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small','medium', 'large'].includes(value);
      },
    },
    dark: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    setCSSVariables() {
      if (this.size === 'medium') {
        this.sizeValues = {...this.sizeMedium};
      } else if (this.size === 'large') {
        this.sizeValues = {...this.sizeLarge};
      } else if (this.size === 'small') {
        this.sizeValues = {...this.sizeSmall};
      }
      if (!this.dark) {
        this.themeValues = {...this.themeLight};
      } else {
        this.themeValues = {...this.themeDark};
      }
    },
    buttonFunction() {
      if (!this.disabled) {
        this.$emit('clicked');
      }
    },
    applyAbilityStyle() {
      if (this.disabled) {
        this.themeValues = {...this.themeDisabled};
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
    disabled: function () {
      this.applyAbilityStyle();
    }
  },
}
</script>

<style scoped>
.customButton {
  border: none;
  border-radius: var(--fsm-max-border-radius);
  padding: 0.25em;
  width: 100%;
  background-color: v-bind('themeValues.bgColor');
  background-image: v-bind('themeValues.bgImage');
  color: v-bind('themeValues.fontColor');
  font-size: v-bind('sizeValues.fontSize');
  font-weight: v-bind('sizeValues.fontWeight');
}
</style>