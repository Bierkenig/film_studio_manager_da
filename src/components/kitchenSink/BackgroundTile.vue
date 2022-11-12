<template>
<div class="backgroundTileMainDiv">
  <div class="backgroundTileTitle">
    {{title}}
  </div>
  <slot />
</div>
</template>

<script>
export default {
  name: "backgroundTile",
  props: {
    title: String,
  }
}
</script>

<style scoped>
.backgroundTileMainDiv {
  display: inline-block;
  background-image: linear-gradient(var(--fsm-dark-blue-2), var(--fsm-dark-blue-3));
  border-radius: var(--fsm-l-border-radius);
  padding: var(--fsm-l-border-radius);
  box-shadow: 0 0 5px 5px var(--fsm-dark-shadow-color);
  width: 100%;
  box-sizing: border-box;
  font-weight: var(--fsm-fw-regular);
  font-size: 22px;
}
.backgroundTileTitle {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
  margin-bottom: var(--fsm-l-border-radius);
}
</style>