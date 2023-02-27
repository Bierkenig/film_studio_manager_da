<template>
  <video id="videoPlay" autoplay>
    <source src="../../src/animation/FSM_Startanimation_mit_Sound_4K_v1.mp4">
  </video>
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
#videoPlay {
  width: 100%;
  height: 100%;
  margin-left: 0.01%;
}

</style>