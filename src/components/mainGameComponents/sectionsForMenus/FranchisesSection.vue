<template>
  <div id="franchisesSection">
    <h1>{{ $t('franchises') }}</h1>
    <div id="franchisesTextSection">
      <div v-for="(it, index) in this.$store.getters.getFranchises" :key="index">
        {{ it }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FranchisesSection"
}
</script>

<style scoped>
#franchisesSection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}

#franchisesTextSection {
  margin: 3em;
  background-color: #2c3e50;
  overflow-y: scroll;
  width: 80%;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-button {
  height: 1.5em;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1C222F;
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(226, 226, 226);
  border-radius: 20px;
}
</style>