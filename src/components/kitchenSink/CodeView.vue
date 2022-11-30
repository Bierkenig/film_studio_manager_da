<template>
  <div class="codeView">
    {{ code }}
  </div>
</template>

<script>
export default {
  name: "CodeView",
  props: {
    code: String
  }
}
</script>

<style scoped>
.codeView {
  font-family: 'Courier New';
  background-color: black;
  color: white;
  margin-bottom: 0.5em;

  -webkit-touch-callout: default; /* iOS Safari */
  -webkit-user-select: all; /* Safari */
  -khtml-user-select: all; /* Konqueror HTML */
  -moz-user-select: all; /* Old versions of Firefox */
  -ms-user-select: all; /* Internet Explorer/Edge */
  user-select: all;
}
</style>