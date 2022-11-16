<template>
  <div id="kitchenSinkMainDiv">
    <router-link :to="{ name: 'default'}">
      <button id="startMenuButton" class="buttonStyle">Menu</button>
    </router-link>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<page-heading heading="Home">Your manager dashboard.</page-heading>'/>
      <page-heading heading="Home">Your manager dashboard.</page-heading>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<background-tile title="Title" content-color="white">Test</background-tile> (DEFAULT)'/>
      <code-view code='<background-tile title="Title" content-color="grey">Test</background-tile>'/>
      <div class="kitchenSinkFlexRow">
        <background-tile title="Title" content-color="white">Test</background-tile>
        <background-tile title="Title" content-color="grey">Test</background-tile>
      </div>
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
      <code-view code=''/>
      <div class="kitchenSinkFlexRow">
        <custom-icon icon="settings"/>
        <custom-icon icon="suicide"/>
        <custom-icon icon="prison"/>
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
    <div class="kitchenSinkComponentDiv">
      <code-view :code="'<tile-pages-nav :pages=' + singleQuote + JSON.stringify(navExample) + singleQuote + '>'"/>
      <code-view code='░░<div>All</div>'/>
      <code-view code='░░<div>In Production</div>'/>
      <code-view code='░░<div>Released</div>'/>
      <code-view code='</tile-pages-nav>'/>
      <tile-pages-nav :pages='navExample'>
        <div>All</div>
        <div>In Production</div>
        <div>Released</div>
      </tile-pages-nav>
    </div>
  </div>
</template>

<script>
import PageHeading from "@/components/kitchenSink/PageHeading";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile";
import CustomButton from "@/components/kitchenSink/CustomButton";
import CodeView from "@/components/kitchenSink/CodeView";
import IconButton from "@/components/kitchenSink/IconButton";
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import CustomIcon from "@/components/kitchenSink/CustomIcon";

export default {
  name: "KitchenSink",
  components: {CustomIcon, TilePagesNav, IconButton, CodeView, CustomButton, BackgroundTile, PageHeading},
  data() {
    return {
      navExample: ['All', 'In Production', 'Released'],
      singleQuote: "'",
      doubleQuote: '"',
    }
  }
}
</script>

<style scoped>
#kitchenSinkMainDiv {
  background-color: var(--fsm-dark-blue-2);
}

.kitchenSinkComponentDiv {
  margin: 1em 1em 0 1em;
  padding: 0.5em;
  border: blue 1px solid;
}

.kitchenSinkFlexRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>