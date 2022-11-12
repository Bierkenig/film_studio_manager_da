<template>
  <div class="iconButtonMainDiv">
    <div class="iconButtonSubDiv">
      <img class="iconButtonSVG" :src="require(`../../assets/icons/${icon}.svg`)" :alt="icon"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconButton",
  data() {
    return {
      sizeSmall: {
        buttonSize: '30px',
        iconSize: '15px'
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
        filter: 'var(--fsm-filter-dark-blue-3)',
        bgColor: 'var(--fsm-pink-1)',
        bgImage: 'linear-gradient(var(--fsm-pink-1), var(--fsm-pink-4))',
        boxShadow: '0 0 5px 5px var(--fsm-pink-shadow-color)'
      },
      themeDark: {
        filter: 'var(--fsm-filter-pink-1)',
        bgColor: 'var(--fsm-dark-blue-2)',
        bgImage: 'linear-gradient(var(--fsm-dark-blue-2), var(--fsm-dark-blue-3))',
        boxShadow: '0 0 5px 5px var(--fsm-dark-shadow-color)'
      },
      sizeValues: {},
      themeValues: {},
    }
  },
  props: {
    icon: {
      type: String,
      default: 'movies',
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value);
      }
    },
    dark: {
      type: Boolean,
      default: false,
    },
    bgGradient: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setCSSVariables() {
      if (this.size === 'small') {
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
    },
  },
  mounted() {
    this.setCSSVariables();
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

.iconButtonSVG {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: v-bind('sizeValues.iconSize');
  width: v-bind('sizeValues.iconSize');
  filter: v-bind('themeValues.filter');
}
</style>