<template>
  <div class="tilePagesNavMainDiv">
    <div class="tilePagesNavBarMainDiv">
      <div v-for="(page, i) in pages"
           :key="i"
           class="tilePagesNavElement"
           @click="refreshPageView(i)"
      >
        <input :id="'tileNavPage' + i"
               :ref="'tileNavPage' + i"
               :value="'tileNavPage' + i"
               v-model="currentPage"
               type="radio"
               :name="'tilePagesNav' + randomId"
               class="tilePagesNavRadioButton"
        />
        <label :for="'tileNavPage' + i" :id="'tileNavPageLabel' + i" class="tilePagesNavRadioButtonLabel">
          {{ page }}
        </label>
      </div>
    </div>
    <div id="tilePagesContent" ref="tilePagesContent">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TilePagesNav",
  data() {
    return {
      currentPage: 'tileNavPage' + 0,
      selectedGradientBG: 'none',
      randomId: Math.floor(Math.random() * Math.pow(10, 10)),
    }
  },
  props: {
    pages: Array,
    gradient: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    setupMenu() {
      let contentPages = this.$refs.tilePagesContent.children;
      if (contentPages.length !== this.pages.length) {
        console.error('Number of pages doesn\'t match number of child containers!');
      } else {
        this.refreshPageView(0);
      }
      if (this.gradient) {
        this.selectedGradientBG = 'linear-gradient(var(--fsm-pink-1), var(--fsm-pink-4))';
      }
    },
    refreshPageView(index) {
      let contentPages = this.$refs.tilePagesContent.children;
      for (let i = 0; i < contentPages.length; i++) {
        contentPages[i].style.display = 'none'
      }
      contentPages[index].style.display = 'inline-block';
    },
  },
  mounted() {
    this.setupMenu();
  }
}
</script>

<style scoped>
.tilePagesNavBarMainDiv {
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
  background-image: v-bind('selectedGradientBG');
  color: var(--fsm-dark-blue-2);
}
</style>