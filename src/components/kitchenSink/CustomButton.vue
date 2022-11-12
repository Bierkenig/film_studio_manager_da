<template>
<button class="customButton">
  <slot />
</button>
</template>

<script>
export default {
  name: "CustomButton",
  data() {
    return {
      sizeMedium: {
        fontSize: '24px',
        fontWeight: 'var(--fsm-fw-bold)'
      },
      sizeLarge: {
        fontSize: '28px',
        fontWeight: 'var(--fsm-fw-regular)'
      },
      themeLight: {
        bgColor: 'var(--fsm-pink-1)',
        fontColor: 'var(--fsm-dark-blue-3)'
      },
      themeDark: {
        bgColor: 'var(--fsm-dark-blue-4)',
        fontColor: 'var(--fsm-pink-1)'
      },
      sizeValues: {},
      themeValues: {},
    }
  },
  props: {
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['medium', 'large'].includes(value);
      },
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setCSSVariables() {
      if (this.size === 'medium') {
        this.sizeValues = {...this.sizeMedium};
      } else if (this.size === 'large') {
        this.sizeValues = {...this.sizeLarge};
      }
      if (!this.dark) {
        this.themeValues = {...this.themeLight};
      } else {
        this.themeValues = {...this.themeDark};
      }
    },
  },
  mounted() {
    this.setCSSVariables();
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
  color: v-bind('themeValues.fontColor');
  font-size: v-bind('sizeValues.fontSize');
  font-weight: v-bind('sizeValues.fontWeight');
}
</style>