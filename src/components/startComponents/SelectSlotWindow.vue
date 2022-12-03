<template>
  <div>
    <h1>{{ $t('SlotHeader') }}</h1>
    <div id="savingsBox">
      <slot-item :slot-nr="1"/>
      <slot-item :slot-nr="2"/>
      <slot-item :slot-nr="3"/>
    </div>
    <router-link to="/">
      <button>Back</button>
    </router-link>
  </div>
</template>

<script>
import SlotItem from "@/components/startComponents/SlotItem";

import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "SelectSlotWindow",
  mixins: [soundeffectMixin('button','click')],
  components: { SlotItem}
}
</script>

<style scoped>
#savingsBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3em;
}
</style>