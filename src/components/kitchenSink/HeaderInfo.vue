<template>
<div class="headerInfoMainDiv">
  <custom-icon class="headerInfoIcon" :icon="icon" size="30px" :dark="false" :gradient="true" :shadow="true"/>
  <slot />
</div>
</template>

<script>
import CustomIcon from "@/components/kitchenSink/CustomIcon";
export default {
  name: "HeaderInfo",
  components: {CustomIcon},
  props: {
    icon: {
      type: String,
      default: 'studio',
    }
  }
}
</script>

<style scoped>
.headerInfoMainDiv {
  display: flex;
  flex-direction: row;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
}

.headerInfoIcon {
  margin-right: 1em;
}
</style>