<template>
  <div>
    <h1>{{ $t('loadHeader') }}</h1>
    <div id="savingsBox">
      <load-item/>
      <load-item/>
      <load-item/>
    </div>
  </div>
</template>

<script>
import LoadItem from "@/components/startComponents/LoadItem";
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "LoadWindow",
  mixins: [soundeffectMixin('button','click')],
  components: {LoadItem}
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