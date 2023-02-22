<template>
  <div>
    <video id="videoPlay" autoplay>
      <source src="../../src/animation/startUP.mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: "StartupVideo",

  mounted() {
    setTimeout(() => {
      this.$router.push('startMenu')
    }, 20000)
  }
}
</script>

<style scoped>
video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%
}

</style>