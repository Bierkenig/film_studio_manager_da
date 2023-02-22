<template>
  <div id="dbEditorMainDiv">
    <icon-button
        id="dbEditorBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="$router.go(-1)"
    />
    <background-tile title="Edit Database" id="dbEditorBgTile">
      <custom-button id="WriterInputButton" class="dbEditorButton" @click="toWriter">Writers</custom-button>
      <custom-button id="DirectorInputButton" class="dbEditorButton" @click="toDirector">Directors</custom-button>
      <custom-button id="ActorInputButton" class="dbEditorButton" @click="toActor">Actors</custom-button>
      <custom-button id="exitButton" class="dbEditorButton" @click="toStudio">Studios</custom-button>
    </background-tile>
  </div>
</template>

<script>
import i18next from "i18next";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Editor",
  components: {CustomButton, BackgroundTile, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  methods:{
    toWriter(){
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'WriterOutput', title: i18next.t('editorToWriter') + '...', duration: '3'}})

    },
    toDirector(){
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'DirectorOutput', title: i18next.t('editorToDirector') + '...', duration: '3'}})

    },
    toActor(){
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'ActorOutput', title: i18next.t('editorToActor') + '...', duration: '3'}})

    },
    toStudio(){
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'StudioOutput', title: i18next.t('editorToStudio') + '...', duration: '3'}})

    }
  }
}
</script>

<style scoped>
#dbEditorMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#dbEditorBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#dbEditorBgTile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: fit-content;
}
</style>