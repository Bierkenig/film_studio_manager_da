<template>
  <div id="posterElement">
    <img class="posterElementSrc" ref="actionMoviePosterElementSrc" :src="require(`../../assets/poster/actionMoviePoster.svg`)" alt="actionMoviePoster"/>
    <img class="posterElementSrc" ref="actionScreenplayPosterElementSrc" :src="require(`../../assets/poster/actionScreenplayPoster.svg`)" alt="actionScreenplayPoster"/>
    <img class="posterElementSrc" ref="adventureMoviePosterElementSrc" :src="require(`../../assets/poster/adventureMoviePoster.svg`)" alt="adventureMoviePoster"/>
    <img class="posterElementSrc" ref="adventureScreenplayPosterElementSrc" :src="require(`../../assets/poster/adventureScreenplayPoster.svg`)" alt="adventureScreenplayPoster"/>
    <img class="posterElementSrc" ref="comedyMoviePosterElementSrc" :src="require(`../../assets/poster/comedyMoviePoster.svg`)" alt="comedyMoviePoster"/>
    <img class="posterElementSrc" ref="comedyScreenplayPosterElementSrc" :src="require(`../../assets/poster/comedyScreenplayPoster.svg`)" alt="comedyScreenplayPoster"/>
    <img class="posterElementSrc" ref="documentaryMoviePosterElementSrc" :src="require(`../../assets/poster/documentaryMoviePoster.svg`)" alt="documentaryMoviePoster"/>
    <img class="posterElementSrc" ref="documentaryScreenplayPosterElementSrc" :src="require(`../../assets/poster/documentaryScreenplayPoster.svg`)" alt="documentaryScreenplayPoster"/>
    <img class="posterElementSrc" ref="dramaMoviePosterElementSrc" :src="require(`../../assets/poster/dramaMoviePoster.svg`)" alt="dramaMoviePoster"/>
    <img class="posterElementSrc" ref="dramaScreenplayPosterElementSrc" :src="require(`../../assets/poster/dramaScreenplayPoster.svg`)" alt="dramaScreenplayPoster"/>
    <img class="posterElementSrc" ref="fantasyMoviePosterElementSrc" :src="require(`../../assets/poster/fantasyMoviePoster.svg`)" alt="fantasyMoviePoster"/>
    <img class="posterElementSrc" ref="fantasyScreenplayPosterElementSrc" :src="require(`../../assets/poster/fantasyScreenplayPoster.svg`)" alt="fantasyScreenplayPoster"/>
    <img class="posterElementSrc" ref="horrorMoviePosterElementSrc" :src="require(`../../assets/poster/horrorMoviePoster.svg`)" alt="horrorMoviePoster"/>
    <img class="posterElementSrc" ref="horrorScreenplayPosterElementSrc" :src="require(`../../assets/poster/horrorScreenplayPoster.svg`)" alt="horrorScreenplayPoster"/>
    <img class="posterElementSrc" ref="musicalMoviePosterElementSrc" :src="require(`../../assets/poster/musicalMoviePoster.svg`)" alt="musicalMoviePoster"/>
    <img class="posterElementSrc" ref="musicalScreenplayPosterElementSrc" :src="require(`../../assets/poster/musicalScreenplayPoster.svg`)" alt="musicalScreenplayPoster"/>
    <img class="posterElementSrc" ref="placeholderElementSrc" :src="require(`../../assets/poster/placeholder.svg`)" alt="placeholder"/>
    <img class="posterElementSrc" ref="romanceMoviePosterElementSrc" :src="require(`../../assets/poster/romanceMoviePoster.svg`)" alt="romanceMoviePoster"/>
    <img class="posterElementSrc" ref="romanceScreenplayPosterElementSrc" :src="require(`../../assets/poster/romanceScreenplayPoster.svg`)" alt="romanceScreenplayPoster"/>
    <img class="posterElementSrc" ref="science-fictionMoviePosterElementSrc" :src="require(`../../assets/poster/science-fictionMoviePoster.svg`)" alt="science-fictionMoviePoster"/>
    <img class="posterElementSrc" ref="science-fictionScreenplayPosterElementSrc" :src="require(`../../assets/poster/science-fictionScreenplayPoster.svg`)" alt="science-fictionScreenplayPoster"/>
    <img class="posterElementSrc" ref="thrillerMoviePosterElementSrc" :src="require(`../../assets/poster/thrillerMoviePoster.svg`)" alt="thrillerMoviePoster"/>
    <img class="posterElementSrc" ref="thrillerScreenplayPosterElementSrc" :src="require(`../../assets/poster/thrillerScreenplayPoster.svg`)" alt="thrillerScreenplayPoster"/>
    <img class="posterElementSrc" ref="warMoviePosterElementSrc" :src="require(`../../assets/poster/warMoviePoster.svg`)" alt="warMoviePoster"/>
    <img class="posterElementSrc" ref="warScreenplayPosterElementSrc" :src="require(`../../assets/poster/warScreenplayPoster.svg`)" alt="warScreenplayPoster"/>
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
      this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent((await this.getSVGCode()).toString()) + '")';
    },
    async getSVGCode() {
      let requestResult = await new Promise((resolve) => {
            let request = new XMLHttpRequest();
            request.open('GET', this.$refs[this.posterName + 'ElementSrc'].src, true);
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
    posterName: function () {
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