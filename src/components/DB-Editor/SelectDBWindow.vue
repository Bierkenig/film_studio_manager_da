
<template>
  <div>
    <h1>{{ $t('SlotHeader') }}</h1>
    <div id="savingsBox">
      <DBItem :slot-nr="1"/>
      <DBItem :slot-nr="2"/>
      <DBItem :slot-nr="3"/>
    </div>
    <router-link to="/">
      <button>Back</button>
    </router-link>
  </div>
</template>

<script>

import soundeffectMixin from "@/mixins/soundeffectMixin";
import DBItem from "@/components/DB-Editor/DBItem";
export default {
  name: "SelectDBWindow",
  mixins: [soundeffectMixin('button','click')],
  components: {DBItem}
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