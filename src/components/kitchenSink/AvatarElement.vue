<template>
  <div class="customIcon" ref="customIcon"></div>
</template>

<script>
export default {
  name: "AvatarElement",
  data() {
    return {
      svgBG: '',
    }
  },
  props: {
    svgCode: {
      type: String,
      default: '100px'
    },
    size: {
      type: String,
      required: true
    },
  },
  methods: {
    setSVG() {
      this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(this.svgCode) + '")'
    },
  },
  mounted() {
    this.setSVG();
  },
}
</script>

<style scoped>
.customIcon {
  background-image: v-bind('svgBG');
  width: v-bind('size');
  height: v-bind('size');
  background-size: v-bind('size');
}
</style>