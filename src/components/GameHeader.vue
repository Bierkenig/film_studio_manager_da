<template>
  <div id="headerBox">
    <div class="headerSectionBox">
      <p>Finance</p>
      <div>
        <p>{{ budget }}</p>
      </div>
      <div>
        <p>Details</p>
      </div>
    </div>

    <div class="headerSectionBox">
      <p>Popularity</p>
      <div>
        <p>50%</p>
      </div>
      <p>R&D</p>
      <div>
        <p>100</p>
      </div>
    </div>

    <div class="headerSectionBox">
      <p>{{ studioname }}</p>
      <div>
        <p>Details</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameHeader",

  props: {
    studioname: String,
    budget: Number,
  }
}
</script>

<style scoped>
#headerBox, .headerSectionBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3em;
}

.headerSectionBox {
  background-color: lightgray;
}
</style>