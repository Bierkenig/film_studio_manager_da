<template>
<div class="iconButtonMainDiv">
  <div class="iconButtonSubDiv">
    <img class="iconButtonSVG" src="../../assets/icons/home.svg" alt="home"/>
  </div>
</div>
</template>

<script>
export default {
  name: "IconButton"
}
</script>

<style scoped>
.iconButtonMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--fsm-pink-1);
  border-radius: var(--fsm-max-border-radius);
  height: 60px;
  width: 60px;
}
.iconButtonSubDiv {
  text-align: center;
}
.iconButtonSVG {
  height: 40px;
  width: 40px;
  filter: var(--fsm-filter-dark-blue-3);
}
</style>

// props: icon (+ color), size, theme, gradient, shadow