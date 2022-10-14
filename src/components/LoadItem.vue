<template>
  <div id="card">
    <h1>{{ $t('noSaving') }}</h1>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "LoadItem",
  mixins: [soundeffectMixin('button')],
}
</script>

<style scoped>
#card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  padding: 2em;
}
</style>