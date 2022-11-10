<template>
  <div id="screenplaySection">
    <h1>{{ heading }}</h1>
    <div id="screenplayTextSection">
      <div v-for="(it, index) in this.data" :key="index">
        <router-link :to="{name: 'createScreenplay'}">
          {{ it.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScreenplaySection",

  props: {
    heading: String,
    data: Object,
  },
}
</script>

<style scoped>
#screenplaySection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}

#screenplayTextSection {
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