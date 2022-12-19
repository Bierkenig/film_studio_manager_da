<template>
  <div class="headerInfoMainDiv">
    <custom-icon class="headerInfoIcon" :icon="icon" size="30px" :dark="false" :gradient="true" :shadow="true"/>
    <div class="headerInfoText">
      <slot/>
    </div>
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
      default: 'placeholder',
    }
  }
}
</script>

<style scoped>
.headerInfoMainDiv {
  display: flex;
  flex-direction: row;
}

.headerInfoIcon {
  margin-right: 1em;
}

.headerInfoText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
}
</style>