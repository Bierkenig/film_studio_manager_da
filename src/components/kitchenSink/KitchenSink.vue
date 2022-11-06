<template>
  <div id="kitchenSinkMainDiv">
    <router-link :to="{ name: 'default'}">
      <button id="startMenuButton" class="buttonStyle">Menu</button>
    </router-link>
    <div class="kitchenSinkComponentDiv">
      <div class="kitchenSinkCodeView">
        {{backgroundTile}}
      </div>
      <background-tile>TEST</background-tile>
    </div>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/backgroundTile";
export default {
  name: "KitchenSink",
  components: {BackgroundTile},
  data() {
    return {
      backgroundTile: '<background-tile>TEST</background-tile>',
    }
  },
}
</script>

<style>
.kitchenSinkComponentDiv {
  margin: 1em 1em 0 1em;
}
.kitchenSinkCodeView {
  font-family: 'Courier New';
  background-color: black;
  color: white;
  margin-bottom: 0.5em;
}
</style>