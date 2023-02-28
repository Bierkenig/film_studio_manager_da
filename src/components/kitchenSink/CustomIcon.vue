<template>
  <div class="customIcon" ref="customIcon">
    <img class="customIconSrc" ref="customIconSrc" :src="require(`../../assets/icons/${icon}.svg`)" :alt="icon"/>
    <img class="customIconSrc" ref="maleIconSrc" :src="require(`../../assets/icons/male.svg`)" :alt="icon"/>
    <img class="customIconSrc" ref="femaleIconSrc" :src="require(`../../assets/icons/female.svg`)" :alt="icon"/>
  </div>
</template>

<script>
import { Buffer } from 'buffer';

export default {
  name: "CustomIcon",
  data() {
    return {
      svgBG: '',
      themeLight: {
        gradient: '<stop offset="0%" style="stop-color:#FF3A4D;stop-opacity:1" /><stop offset="100%" style="stop-color:#FF264A;stop-opacity:1" />',
        shadow: 'drop-shadow(0 0 3px rgba(255, 70, 85, 0.5))',
      },
      themeDark: {
        color: '#252D3E',
        shadow: 'drop-shadow(0 0 3px rgba(14, 24, 34, 0.25))',
      },
      themeRed: {
        color: '#FF3A4D',
        shadow: 'drop-shadow(0 0 3px rgba(14, 24, 34, 0.25))',
      },
      themeGreen: {
        color: '#46FF54',
        shadow: 'drop-shadow(0 0 3px rgba(14, 24, 34, 0.25))',
      },
      themeBlue: {
        color: '#46AEFF',
        shadow: 'drop-shadow(0 0 3px rgba(14, 24, 34, 0.25))',
      },
      themeYellow: {
        color: '#FFED46',
        shadow: 'drop-shadow(0 0 3px rgba(14, 24, 34, 0.25))',
      },
      themeWhite: {
        color: '#E4E4E4',
        shadow: 'drop-shadow(0 0 3px rgba(14, 24, 34, 0.25))',
      },
      themeValues: { color: '', gradient: '', shadow: '' },
    }
  },
  props: {
    icon: {
      type: String,
      default: 'placeholder'
    },
    size: {
      type: String,
      default: '100px'
    },
    theme: {
      type: String,
      default: 'light',
      validator(value) {
        return ['light', 'dark', 'red', 'green', 'blue', 'yellow', 'white'].includes(value);
      }
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    invertTheme: {
      type: Boolean,
      default: false,
    },
    greyIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async setSVG() {
      let svgCode = (await this.getSVGCode()).toString();
      svgCode = svgCode.replaceAll(/<!-- .*-->/gm, '');
      if (this.invertTheme) {
        if (this.theme === 'dark') {
          this.themeValues = {...this.themeLight};
        } else {
          this.themeValues = {...this.themeDark};
        }
      } else {
        switch (this.theme) {
          case 'light':
            this.themeValues = {...this.themeLight};
            break;
          case 'dark':
            this.themeValues = {...this.themeDark};
            break;
          case 'red':
            this.themeValues = {...this.themeRed};
            break;
          case 'green':
            this.themeValues = {...this.themeGreen};
            break;
          case 'blue':
            this.themeValues = {...this.themeBlue};
            break;
          case 'yellow':
            this.themeValues = {...this.themeYellow};
            break;
          case 'white':
            this.themeValues = {...this.themeWhite};
            break;
          default:
            throw('Invalid icon theme!');
        }
      }
      if (this.greyIcon) {
        svgCode = svgCode.replaceAll('<svg', '<svg fill="#848891"');
      } else {
        if (this.theme === 'light' && !this.invertTheme || this.theme === 'dark' && this.invertTheme) {
          svgCode = svgCode.replaceAll('<svg', '<svg fill="url(#customColor)"');
          svgCode = svgCode.replaceAll('</svg>',
              '<defs><linearGradient id="customColor" x1="0%" y1="0%" x2="0%" y2="100%">'
              + this.themeValues.gradient + '</linearGradient></defs></svg>');
        } else {
          svgCode = svgCode.replaceAll('<svg', '<svg fill="' + this.themeValues.color + '"');
        }
      }
      if (this.shadow) {
        svgCode = svgCode.replaceAll('<svg', '<svg class="customShadow"');
        svgCode = svgCode.replaceAll('</svg>',
            '<style>.customShadow{filter: ' + this.themeValues.shadow + '}</style></svg>')
      }
      this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svgCode) + '")';
    },
    async getSVGCode() {
      let requestResult = await new Promise((resolve) => {
            let request = new XMLHttpRequest();
            if (this.icon === 'male') {
              request.open('GET', this.$refs.maleIconSrc.src, true);
            } else if (this.icon === 'female') {
              request.open('GET', this.$refs.femaleIconSrc.src, true);
            } else {
              request.open('GET', this.$refs.customIconSrc.src, true);
            }
            request.responseType = 'blob';
            request.onload = async function () {
              resolve(await new Promise((resolveRead) => {
                const reader = new FileReader();
                reader.onloadend = () => resolveRead(reader.result);
                reader.onerror = () => console.log(reader.error);
                reader.readAsDataURL(request.response);
              }));
            };
            request.onerror = () => console.log(request.response);
            request.send();
          }
      );
      return Buffer.from(requestResult.substring(26), 'base64');
    },
  },
  mounted() {
    this.setSVG();
  },
  watch: {
    invertTheme: function() {
      this.setSVG();
    },
    icon: function() {
      this.setSVG();
    },
    greyIcon: function() {
      this.setSVG();
    },
  },
}
</script>

<style scoped>
.customIconSrc {
  display: none;
}

.customIcon {
  background-image: v-bind('svgBG');
  width: v-bind('size');
  height: v-bind('size');
  background-size: v-bind('size');
}
</style>