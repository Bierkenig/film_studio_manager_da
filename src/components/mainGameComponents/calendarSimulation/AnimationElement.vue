<template>
  <div>
    <div class="animationBody">
      <div class="animationElementDate">
        {{ date.toLocaleDateString("en-US") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimationElement",

  props: {
    date: Date,
  }
}
</script>

<style scoped>
.animationBody {
  background-color: var(--fsm-dark-blue-2);
  border-radius: var(--fsm-m-border-radius);
  height: 150px;
  width: 200px;
  padding: 5px;
}

.animationElementDate {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  text-align: center;
}
</style>