<template>
  <div class="infoLineElement">
    <slot />
  </div>
</template>

<script>
export default {
  name: "InfoLine"
}
</script>

<style scoped>
.infoLineElement {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 35px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 0 10px 0 10px;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
  box-sizing: border-box;
}
</style>