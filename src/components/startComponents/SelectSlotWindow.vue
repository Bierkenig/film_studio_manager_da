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
      <h1 id="selectSlotWindowHeader">{{ $t('SlotHeader') }}</h1>
      <div id="selectSlotWindowSaveItems">
        <slot-item :slot-nr="1"/>
        <slot-item :slot-nr="2"/>
        <slot-item :slot-nr="3"/>
      </div>
    </div>
  </div>
</template>

<script>
import SlotItem from "@/components/startComponents/SlotItem";

import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton.vue";
export default {
  name: "SelectSlotWindow",
  mixins: [soundeffectMixin('button','click')],
  components: {IconButton, SlotItem},

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

#selectSlotWindowHeader {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

#savingsBox {
  display: flex;
  flex-direction: column;
  gap: 15px;

  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  width: 350px;
  padding: 10px 20px 20px 20px;
}

#selectSlotWindowSaveItems {
  display: flex;
  flex-direction: column;
  gap: 15px
}
</style>