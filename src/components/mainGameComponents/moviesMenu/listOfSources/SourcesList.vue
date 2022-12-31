<template>
  <div>
    <h1 id="sourcesListHeader">List of Sources</h1>
    <icon-button
        id="sourcesListBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";

export default {
  name: "SourcesList",
  components: {IconButton},

  methods: {
    goBack(){
      this.$router.push({name: 'movies'})
    }
  }
}
</script>

<style scoped>
#sourcesListHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#sourcesListBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>