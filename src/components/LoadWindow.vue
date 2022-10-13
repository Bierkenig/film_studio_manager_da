<template>
  <div>
    <h1>Loadings</h1>
    <div id="savingsBox">
      <load-item/>
      <load-item/>
      <load-item/>
    </div>
  </div>
</template>

<script>
import LoadItem from "@/components/LoadItem";
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "LoadWindow",
  mixins: [soundeffectMixin('button')],
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