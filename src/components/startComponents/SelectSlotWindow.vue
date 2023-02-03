<template>
  <div id="selectSlotWindowMainDiv">
    <div>
      <icon-button
          id="selectSlotWindowBackButton"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"/>
    </div>

    <div id="savingsBox">
      <background-tile :title="$t('SlotHeader')">
        <div id="selectSlotWindowSaveItems">
          <slot-item :slot-nr="1"/>
          <slot-item :slot-nr="2"/>
          <slot-item :slot-nr="3"/>
        </div>
      </background-tile>
    </div>
  </div>
</template>

<script>
import SlotItem from "@/components/startComponents/SlotItem";

import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
export default {
  name: "SelectSlotWindow",
  mixins: [soundeffectMixin('button','click')],
  components: {BackgroundTile, IconButton, SlotItem},

  methods: {
    goBack(){
      this.$router.push({name: 'default'})
    },
  }
}
</script>

<style scoped>
#selectSlotWindowMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#selectSlotWindowBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#savingsBox {
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 350px;
  padding: 10px 20px 20px 20px;
}

#selectSlotWindowSaveItems {
  display: flex;
  flex-direction: column;
  gap: 15px
}
</style>