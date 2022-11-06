<template>
<div class="backgroundTileMainDiv">
  <slot />
</div>
</template>

<script>
export default {
  name: "backgroundTile",
}
</script>

<style>
.backgroundTileMainDiv {
  display: inline-block;
  background-image: linear-gradient(var(--fsm-dark-blue-2), var(--fsm-dark-blue-3));
  border-radius: 25px;
  padding: 25px;
  box-shadow: 0 0 5px 5px var(--fsm-shadow-color);
}
</style>