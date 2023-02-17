<template>
  <div class="tilePagesNavMainDiv">
    <div class="tilePagesNavBarMainDiv">
      <div v-for="(page, i) in pages"
           :key="i"
           class="tilePagesNavElement"
           @click="refreshPageView(i)"
      >
        <input :id="'tileNavPage' + i + randomId"
               :ref="'tileNavPage' + i + randomId"
               :value="'tileNavPage' + i + randomId"
               v-model="currentPage"
               type="radio"
               :name="'tilePagesNav' + randomId"
               class="tilePagesNavRadioButton"
        />
        <label :for="'tileNavPage' + i + randomId" :id="'tileNavPageLabel' + i + randomId" class="tilePagesNavRadioButtonLabel">
          {{ page }}
        </label>
      </div>
    </div>
    <div :id="'tilePagesContent' + randomId" class="tilePagesContent" :ref="'tilePagesContent' + randomId">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TilePagesNav",
  data() {
    return {
      randomId: Math.floor(Math.random() * Math.pow(10, 10)),
      currentPage: null,
      selectedGradientBG: 'none',
    }
  },
  props: {
    pages: {
      type: Array,
      required: true,
    },
    gradient: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    setupMenu() {
      let contentPages = this.$refs['tilePagesContent' + this.randomId].children;
      if (contentPages.length !== this.pages.length) {
        console.error('Number of pages doesn\'t match number of child containers!');
      } else {
        this.refreshPageView(0);
      }
      if (this.gradient) {
        this.selectedGradientBG = 'linear-gradient(var(--fsm-pink-1), var(--fsm-pink-4))';
      }
      this.currentPage = 'tileNavPage0' + this.randomId;
    },
    refreshPageView(index) {
      let contentPages = this.$refs['tilePagesContent' + this.randomId].children;
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
.tilePagesNavMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.tilePagesNavBarMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: var(--fsm-max-border-radius);
  background-color: var(--fsm-dark-blue-4);
  margin-bottom: 10px;
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

.tilePagesContent {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>