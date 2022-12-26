<template>
  <div id="loadWindowMainDiv">
    <div>
      <icon-button
          id="loadWindowBackButton"
          icon="simple-arrow-left"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"/>
    </div>

    <div id="savingsBox">
      <h1 id="loadWindowHeader">{{ $t('loadButton') }}</h1>
      <div id="loadWindowSaveItems">
        <load-item class="savingsBoxLoadItem" :slot-nr="1"/>
        <load-item class="savingsBoxLoadItem" :slot-nr="2"/>
        <load-item class="savingsBoxLoadItem" :slot-nr="3"/>
      </div>
    </div>
  </div>
</template>

<script>
import LoadItem from "@/components/startComponents/LoadItem";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton";

export default {
  name: "LoadWindow",
  mixins: [soundeffectMixin('button','click')],
  components: {LoadItem, IconButton},

  methods: {
    goBack(){
      this.$router.push({name: 'default'})
    },
  }
}
</script>

<style scoped>
#loadWindowMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#loadWindowBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#loadWindowHeader {
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

#loadWindowSaveItems {
  display: flex;
  flex-direction: column;
  gap: 15px
}
</style>