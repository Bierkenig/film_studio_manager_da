<template>
  <video id="videoPlay" autoplay>
    <source src="../../src/animation/startUP8.mp4">
  </video>
</template>

<script>
export default {
  name: "StartupVideo",

  mounted() {
    setTimeout(() => {
      this.$router.push('startMenu')
    }, 8000)
  }
}
</script>

<style scoped>
#videoPlay {
  width: 100%;
  height: 100%;
  margin-left: 0.01%;
}

</style>