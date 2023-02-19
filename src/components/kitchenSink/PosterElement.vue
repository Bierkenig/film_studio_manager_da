<template>
  <div id="posterElement">
    <img class="posterElementSrc" ref="posterElementSrc" :src="require(`../../assets/poster/${posterName}.svg`)" :alt="posterName"/>
  </div>
</template>

<script>
import {Buffer} from "buffer";

export default {
  name: "PosterElement",
  data() {
    return {
      svgBG: '',
    }
  },
  props: {
    svgCode: {
      type: String,
      default: '<?xml version="1.0" encoding="UTF-8"?><svg id="Ebene_1" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2.83 2.83"><defs><style>.cls-1 {fill: #252D3E;}</style></defs><rect class="cls-1" width="2.83" height="2.83"/></svg>',
    },
    height: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    posterName: {
      type: String,
      default: 'placeholder',
    },
  },
  methods: {
    async setSVG() {
      if (this.posterName !== 'placeholder') {
        this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent((await this.getSVGCode()).toString()) + '")';
      } else {
        this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(this.svgCode) + '")';
      }
    },
    async getSVGCode() {
      let requestResult = await new Promise((resolve) => {
            let request = new XMLHttpRequest();
            request.open('GET', this.$refs.posterElementSrc.src, true);
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
    svgCode: function () {
      this.setSVG();
    },
  },
}
</script>

<style scoped>
#posterElement {
  height: v-bind('height');
  width: v-bind('width');
  border-radius: var(--fsm-s-border-radius);
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('svgBG');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.posterElementSrc {
  display: none;
}
</style>