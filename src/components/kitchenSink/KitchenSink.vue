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
      <code-view code='<custom-button :dark="false" size="medium">Test</custom-button> (DEFAULT)'/>
      <code-view code='<custom-button :dark="true" size="medium">Test</custom-button>'/>
      <div class="kitchenSinkFlexRow">
        <custom-button :dark="false" size="medium">Test</custom-button>
        <custom-button :dark="true" size="medium">Test</custom-button>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<custom-button :dark="false" size="large">Test</custom-button>'/>
      <code-view code='<custom-button :dark="true" size="large">Test</custom-button>'/>
      <div class="kitchenSinkFlexRow">
        <custom-button :dark="false" size="large">Test</custom-button>
        <custom-button :dark="true" size="large">Test</custom-button>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :shadow="false" />'/>
      <code-view code='<icon-button icon="settings" size="large" :dark="false" :bg-gradient="true" :shadow="false" />'/>
      <code-view code='<icon-button icon="movies" size="large" :dark="false" :bg-gradient="true" :shadow="true" />'/>
      <code-view code='<icon-button icon="movies" size="medium" :dark="true" :bg-gradient="true" :shadow="false" />'/>
      <div class="kitchenSinkFlexRow">
        <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :shadow="false"/>
        <icon-button icon="settings" size="large" :dark="false" :bg-gradient="true" :shadow="false"/>
        <icon-button icon="home" size="large" :dark="false" :bg-gradient="true" :shadow="true"/>
        <icon-button icon="movies" size="medium" :dark="true" :bg-gradient="true" :shadow="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile";
import CustomButton from "@/components/kitchenSink/CustomButton";
import CodeView from "@/components/kitchenSink/CodeView";
import IconButton from "@/components/kitchenSink/IconButton";

export default {
  name: "KitchenSink",
  components: {IconButton, CodeView, CustomButton, BackgroundTile},
}
</script>

<style scoped>
.kitchenSinkComponentDiv {
  margin: 1em 1em 0 1em;
}

.kitchenSinkFlexRow {
  display: flex;
  flex-direction: row;
}
</style>