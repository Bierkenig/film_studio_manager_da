<template>
  <div class="tilePagesNavMainDiv">
    <div v-for="(page, i) in pages"
         :key="i"
         class="tilePagesNavElement"
    >
      <input :id="'tileNavPage' + i" v-model="currentPage" type="radio" class="tilePagesNavRadioButton" :value="page"/>
      <label :for="'tileNavPage' + i" :id="'tileNavPageLabel' + i" class="tilePagesNavRadioButtonLabel">
        {{ page }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "TilePagesNav",
  data() {
    return {
      currentPage: this.pages[0]
    }
  },
  props: {
    pages: Array,
  },
}
</script>

<style scoped>
.tilePagesNavMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: var(--fsm-max-border-radius);
  background-color: var(--fsm-dark-blue-4);
}

.tilePagesNavElement {
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  justify-content: center;
}

.tilePagesNavRadioButton {
  display: none;
}

.tilePagesNavRadioButtonLabel {
  flex-grow: 1;
  font-size: 18px;
  font-weight: var(--fsm-fw-bold);
  text-align: center;
  padding: 0.25em;
  color: var(--fsm-pink-1);
  border-radius: var(--fsm-max-border-radius);
  transition: background-color 0.5s, color 0.5s;
}

.tilePagesNavRadioButton:checked + .tilePagesNavRadioButtonLabel {
  background-color: var(--fsm-pink-1);
  color: var(--fsm-dark-blue-2);
}
</style>