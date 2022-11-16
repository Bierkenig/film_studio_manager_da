<template>
  <div class="customIcon" ref="customIcon">
    <img class="customIconSrc" ref="customIconSrc" :src="require(`../../assets/icons/${icon}.svg`)" :alt="icon"/>
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
        color: '#FF4655',
        gradient: '<stop offset="0%" style="stop-color:#FF4655;stop-opacity:1" /><stop offset="100%" style="stop-color:#D11F3D;stop-opacity:1" />',
        shadow: 'drop-shadow(0 0 3px rgba(255, 70, 85, 0.5))',
      },
      themeDark: {
        color: '#252D3E',
        gradient: '<stop offset="0%" style="stop-color:#2B3448;stop-opacity:1" /><stop offset="100%" style="stop-color:#252D3E;stop-opacity:1" />',
        shadow: 'drop-shadow(0 0 3px rgba(14, 24, 34, 0.25))',
      },
      themeValues: {},
    }
  },
  props: {
    icon: {
      type: String,
      default: 'movies'
    },
    size: {
      type: String,
      default: '100px'
    },
    dark: {
      type: Boolean,
      default: false,
    },
    gradient: {
      type: Boolean,
      default: false,
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async setSVG() {
      let svgCode = (await this.getSVGCode()).toString();
      svgCode = svgCode.replaceAll(/<!-- .*-->/gm, '');
      if (this.dark) {
        this.themeValues = {...this.themeDark};
      } else {
        this.themeValues = {...this.themeLight};
      }
      if (this.gradient) {
        svgCode = svgCode.replaceAll('<svg', '<svg fill="url(#customColor)"');
        svgCode = svgCode.replaceAll('</svg>',
            '<defs><linearGradient id="customColor" x1="0%" y1="0%" x2="0%" y2="100%">'
            + this.themeValues.gradient + '</linearGradient></defs></svg>');
      } else {
        svgCode = svgCode.replaceAll('<svg', '<svg fill="' + this.themeValues.color + '"');
      }
      if (this.shadow) {
        svgCode = svgCode.replaceAll('<svg', '<svg class="customShadow"');
        svgCode = svgCode.replaceAll('</svg>',
            '<style>.customShadow{filter: ' + this.themeValues.shadow + '}</style></svg>')
      }
      console.log(svgCode);
      this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svgCode) + '")'
    },
    async getSVGCode() {
      let requestResult = await new Promise((resolve) => {
            let request = new XMLHttpRequest();
            request.open('GET', this.$refs.customIconSrc.src, true);
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