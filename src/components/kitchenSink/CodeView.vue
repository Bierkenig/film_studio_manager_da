<template>
  <div class="codeView">
    {{code}}
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
}
</style>