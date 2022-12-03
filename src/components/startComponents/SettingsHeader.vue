<template>
  <div class="settingHeaderContainer">
    <div id="settingHeaderIndividualOptions" v-if="onSettingButtonClicked">
      <icon-button
          icon="settings"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"/>
      <icon-button
          icon="settings"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"/>
      <icon-button
          icon="settings"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"/>
      <icon-button
          icon="settings"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"/>
    </div>
    <icon-button
        icon="settings"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="onSettingButtonClicked = !onSettingButtonClicked"/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
export default {
  name: "SettingsHeader",
  components: {IconButton},

  data(){
    return {
      onSettingButtonClicked: false
    }
  },
}
</script>

<style scoped>
.settingHeaderContainer {
  display: flex ;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#settingHeaderIndividualOptions {
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-right: 10px;
}
</style>