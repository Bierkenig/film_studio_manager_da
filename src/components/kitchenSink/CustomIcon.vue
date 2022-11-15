<template>
  <div>
    <img class="customIconSrc" ref="customIconSrc" :src="require(`../../assets/icons/${icon}.svg`)" :alt="icon"/>
    <svg class="customIcon" ref="customIcon" />
  </div>
</template>

<script>
export default {
  name: "CustomIcon",
  props: {
    icon: {
      type: String,
      default: 'movies'
    }
  },
  methods: {
    async setSVG() {
      this.$refs.customIcon.innerHTML = await this.getSVGCode();
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
      return atob(requestResult.substring(26));
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
  /*GRÖSSE FIXEN*******************************************************************************************************/
}
</style>