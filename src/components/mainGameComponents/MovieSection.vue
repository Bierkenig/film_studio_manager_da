<template>
  <div id="movieSection">
    <h1>{{ heading }}</h1>
    <div id="movieTextSection">
      <div v-for="(it, index) in this.data" :key="index">
        {{ it.getScreenplay().title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieSection",

  props: {
    heading: String,
    data: Object
  }
}
</script>

<style scoped>
#movieSection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}

#movieTextSection {
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