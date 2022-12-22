<template>
  <div>
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

    <h1 id="loadWindowHeader">{{ $t('loadHeader') }}</h1>

    <div id="savingsBox">
      <load-item class="savingsBoxLoadItem" :slot-nr="1"/>
      <load-item class="savingsBoxLoadItem" :slot-nr="2"/>
      <load-item class="savingsBoxLoadItem" :slot-nr="3"/>
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
#savingsBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
  min-height: 100vh;
}

.savingsBoxLoadItem {
  width: 100%;
}

#loadWindowBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#loadWindowHeader {
  position: absolute;
  top: 15px;
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  left: 50%;
  transform: translate(-50%, 0);
}
</style>