<template>
  <div id="kitchenSinkMainDiv">
    <router-link :to="{ name: 'default'}">
      <button id="startMenuButton" class="buttonStyle">Menu</button>
    </router-link>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<background-tile title="Title">Test</background-tile>'/>
      <background-tile title="Title">Test</background-tile>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<custom-button theme="light" size="medium">Test</custom-button>'/>
      <code-view code='<custom-button theme="dark" size="medium">Test</custom-button>'/>
      <code-view code='<custom-button theme="light" size="large">Test</custom-button>'/>
      <code-view code='<custom-button theme="dark" size="large">Test</custom-button>'/>
      <div id="kitchenSinkCustomButtons">
        <custom-button theme="light" size="medium">Test</custom-button>
        <custom-button theme="dark" size="medium">Test</custom-button>
        <custom-button theme="light" size="large">Test</custom-button>
        <custom-button theme="dark" size="large">Test</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile";
import CustomButton from "@/components/kitchenSink/CustomButton";
import CodeView from "@/components/kitchenSink/CodeView";

export default {
  name: "KitchenSink",
  components: {CodeView, CustomButton, BackgroundTile},
}
</script>

<style scoped>
.kitchenSinkComponentDiv {
  margin: 1em 1em 0 1em;
}
#kitchenSinkCustomButtons {
  display: flex;
  flex-direction: row;
}
</style>