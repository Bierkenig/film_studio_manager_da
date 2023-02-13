<template>
  <div class="marketShareElement">
    <div class="marketShareElementValue">
      <custom-icon class="marketShareElementIcon" :icon="icon" size="20px" :theme="iconTheme"/>
    </div>
    <div class="marketShareElementStudio marketShareElementValue">
      {{ studio }}
    </div>
    <div class="marketShareElementRevenue marketShareElementValue">
      {{ revenue }}
    </div>
    <div class="marketShareElementProfit marketShareElementValue">
      {{ profit }}
    </div>
    <div class="marketShareElementShare marketShareElementValue">
      {{ share }}
    </div>
    <div class="marketShareElementChange marketShareElementValue">
      {{ change }}
    </div>
  </div>
</template>

<script>
import CustomIcon from "@/components/kitchenSink/CustomIcon";
export default {
  name: "marketShareElement",
  components: {CustomIcon},
  data() {
    return {
      iconDisplay: 'flex',
      changeColor: 'var(--fsm-light-green)',
      whiteColor: 'var(--fsm-white)',
      redColor: 'var(--fsm-pink-1)',
      iconReplacement: '0',
    }
  },
  props: {
    studio: {
      type: String,
      required: true,
    },
    revenue: {
      type: String,
      required: true,
    },
    profit: {
      type: String,
      required: true,
    },
    share: {
      type: String,
      required: true,
    },
    change: {
      type: String,
      required: true,
    },
    noChangeColor: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'open',
    },
    iconTheme: {
      type: String,
      default: 'light',
    },
  },
  methods: {
    setupElement() {
      if (this.icon === 'open') {
        this.iconDisplay = 'none';
        this.iconReplacement = '30px';
      }
      if (this.noChangeColor) {
        this.changeColor = this.whiteColor;
      } else if (this.change.charAt(0) === '-') {
        this.changeColor = this.redColor;
      }
    },
  },
  mounted() {
    this.setupElement();
  }
}
</script>

<style scoped>
.marketShareElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 0 10px 0 10px;
  box-sizing: border-box;
}

.marketShareElementValue {
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
}

.marketShareElementIcon {
  display: v-bind('iconDisplay');
  margin-right: 10px;
}

.marketShareElementStudio {
  flex-grow: 3;
  margin-right: v-bind('iconReplacement');
}

.marketShareElementRevenue, .marketShareElementProfit {
  flex-grow: 2;
}

.marketShareElementShare {
  flex-grow: 1;
}

.marketShareElementChange {
  flex-grow: 1;
  color: v-bind('changeColor');
}
</style>