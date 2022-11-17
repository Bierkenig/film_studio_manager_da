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
      <code-view code='<header-info icon="studio">Example Studios</header-info>'/>
      <header-info icon="studio">Example Studios</header-info>
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
      <code-view code='<custom-icon icon="home" size="80px" theme="light" :gradient="false" :shadow="true"/>'/>
      <code-view code='<custom-icon icon="settings" size="80px" theme="light" :gradient="false" :shadow="false"/> (DEFAULT)'/>
      <code-view code='<custom-icon icon="suicide" size="80px" theme="light" :gradient="true" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="movies" size="80px" theme="dark" :gradient="false" :shadow="true"/>'/>
      <code-view code='<custom-icon icon="prison" size="80px" theme="dark" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="ninjas" size="80px" theme="dark" :gradient="true" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="simple-tick" size="80px" theme="red" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="rising-chart" size="80px" theme="green" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="rising-chart" size="80px" theme="blue" :gradient="false" :shadow="false"/>'/>
      <code-view code='<custom-icon icon="award" size="80px" theme="yellow" :gradient="false" :shadow="false"/>'/>
      <div class="kitchenSinkFlexRow">
        <custom-icon icon="home" size="80px" theme="light" :gradient="false" :shadow="true"/>
        <custom-icon icon="settings" size="80px" theme="light" :gradient="false" :shadow="false"/>
        <custom-icon icon="suicide" size="80px" theme="light" :gradient="true" :shadow="false"/>
        <custom-icon icon="movies" size="80px" theme="dark" :gradient="false" :shadow="true"/>
        <custom-icon icon="prison" size="80px" theme="dark" :gradient="false" :shadow="false"/>
        <custom-icon icon="ninjas" size="80px" theme="dark" :gradient="true" :shadow="false"/>
        <custom-icon icon="simple-tick" size="80px" theme="red" :gradient="false" :shadow="false"/>
        <custom-icon icon="rising-chart" size="80px" theme="green" :gradient="false" :shadow="false"/>
        <custom-icon icon="rising-chart" size="80px" theme="blue" :gradient="false" :shadow="false"/>
        <custom-icon icon="award" size="80px" theme="yellow" :gradient="false" :shadow="false"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view code='<icon-button icon="plus" size="extraSmall" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>'/>
      <code-view code='<icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>'/>
      <code-view code='<icon-button icon="settings" size="large" :dark="false" :bg-gradient="true" :icon-gradient="false" :shadow="false"/>'/>
      <code-view code='<icon-button icon="home" size="large" :dark="false" :bg-gradient="true" :icon-gradient="true" :shadow="true"/>'/>
      <code-view code='<icon-button icon="movies" size="medium" :dark="true" :bg-gradient="true" :icon-gradient="true" :shadow="false"/>'/>
      <div class="kitchenSinkFlexRow">
        <icon-button icon="plus" size="extraSmall" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>
        <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>
        <icon-button icon="settings" size="large" :dark="false" :bg-gradient="true" :icon-gradient="false" :shadow="false"/>
        <icon-button icon="home" size="large" :dark="false" :bg-gradient="true" :icon-gradient="true" :shadow="true"/>
        <icon-button icon="movies" size="medium" :dark="true" :bg-gradient="true" :icon-gradient="true" :shadow="false"/>
      </div>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view :code="'<tile-pages-nav :pages=' + singleQuote + JSON.stringify(navExample1) + singleQuote + '>'"/>
      <code-view code='░░<div>All</div>'/>
      <code-view code='░░<div>In Production</div>'/>
      <code-view code='░░<div>Released</div>'/>
      <code-view code='</tile-pages-nav>'/>
      <tile-pages-nav :pages='navExample1'>
        <div>All</div>
        <div>In Production</div>
        <div>Released</div>
      </tile-pages-nav>
    </div>
    <div class="kitchenSinkComponentDiv">
      <code-view :code="'<tile-pages-nav :pages=' + singleQuote + JSON.stringify(navExample2) + singleQuote + ' :gradient=' + singleQuote + 'true' + singleQuote + '>'"/>
      <code-view code='░░<div>Movies</div>'/>
      <code-view code='░░<div>People</div>'/>
      <code-view code='░░<div>Others</div>'/>
      <code-view code='</tile-pages-nav>'/>
      <tile-pages-nav :pages='navExample2' :gradient='true'>
        <div>Movies</div>
        <div>People</div>
        <div>Others</div>
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
import HeaderInfo from "@/components/kitchenSink/HeaderInfo";

export default {
  name: "KitchenSink",
  components: {HeaderInfo, CustomIcon, TilePagesNav, IconButton, CodeView, CustomButton, BackgroundTile, PageHeading},
  data() {
    return {
      navExample1: ['All', 'In Production', 'Released'],
      navExample2: ['Movies', 'People', 'Others'],
      singleQuote: "'",
      doubleQuote: '"',
    }
  }
}
</script>

<style scoped>
#kitchenSinkMainDiv {
  background-color: var(--fsm-dark-blue-2);
  padding-bottom: 1em;
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