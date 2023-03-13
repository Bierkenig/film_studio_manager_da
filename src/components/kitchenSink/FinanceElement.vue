<template>
  <div class="financeElement">
    <div class="financeElementArea financeElementValue">
      {{area}}
    </div>
    <div class="financeElementIncoming financeElementValue">
      {{incoming}}
    </div>
    <div class="financeElementOutgoing financeElementValue">
      {{outgoing}}
    </div>
    <div class="financeElementAccumulated financeElementValue">
      {{accumulated}}
    </div>
  </div>
</template>

<script>
export default {
  name: "financeElement",
  data() {
    return {
      incomingColor: 'var(--fsm-light-green)',
      outgoingColor: 'var(--fsm-pink-1)',
      accumulatedColor: 'var(--fsm-pink-1)',
      whiteColor: 'var(--fsm-white)',
      greenColor: 'var(--fsm-light-green)',
      redColor: 'var(--fsm-pink-1)',
    }
  },
  props: {
    area: {
      type: String,
      required: true,
    },
    incoming: {
      type: String,
      required: true,
    },
    outgoing: {
      type: String,
      required: true,
    },
    accumulated: {
      type: String,
      required: true,
    },
    colorIncoming: {
      type: Boolean,
      default: true,
    },
    colorOutgoing: {
      type: Boolean,
      default: true,
    },
    colorAccumulated: {
      type: Boolean,
      default: true,
    },
  },

  watch: {
    incoming: function (){
      this.setupElement();
    },

    outgoing: function (){
      this.setupElement();
    },

    accumulated: function (){
      this.setupElement();
    }
  },

  methods: {
    setupElement() {
      if (!this.colorIncoming) {
        this.incomingColor = this.whiteColor;
      }
      if (!this.colorOutgoing) {
        this.outgoingColor = this.whiteColor;
      }
      if (!this.colorAccumulated) {
        this.accumulatedColor = this.whiteColor;
      } else if (this.accumulated.toString().charAt(2) === '-') {
        this.accumulatedColor = this.redColor;
      } else {
        this.accumulatedColor = this.greenColor;
      }
    },
  },
  mounted() {
    this.setupElement();
  }
}
</script>

<style scoped>
.financeElement {
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

.financeElementValue {
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
}

.financeElementArea {
  flex-grow: 2;
}

.financeElementIncoming {
  flex-grow: 3;
  color: v-bind('incomingColor');
}

.financeElementOutgoing {
  flex-grow: 3;
  color: v-bind('outgoingColor');
}

.financeElementAccumulated {
  flex-grow: 3;
  color: v-bind('accumulatedColor');
}
</style>