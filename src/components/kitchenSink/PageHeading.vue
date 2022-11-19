<template>
  <div class="pageHeadingMainDiv">
    <div class="pageHeading">
      {{ heading }}
    </div>
    <div class="pageDescription">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeading",
  props: {
    heading: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.pageHeadingMainDiv {
  text-align: left;
  font-size: 14px;
  font-weight: var(--fsm-fw-medium);
}

.pageHeading {
  font-size: 32px;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}
</style>