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
    }
  },
  methods: {
    async setSVG() {
      let svgCode = await this.getSVGCode();
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