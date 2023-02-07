<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-body">
            <slot name="body">
              <h2>{{$t('summaries.preProduction.title')}}</h2>
              <div>{{$t('summaries.preProduction.progress')}}</div>
              <progress :max="maxWeeks" :value="currentWeeks">
              </progress>
              <div>{{percent}}%</div>
              <div>{{$t('summaries.preProduction.events')}}</div>
              <div v-for="(el, index) in happenedEvents" :key="index">
                {{$t('preProductionEvents.' + el + ".problem")}}
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "preProductionSummary",

  data() {
    return {
      happenedEvents: [],
      maxWeeks: 0,
      currentWeeks: 0,
      percent: 0,
    }
  },

  mounted() {
    this.happenedEvents = this.$store.getters.getCurrentMovie._preProduction.happenedEvents
    this.maxWeeks = this.$store.getters.getCurrentMovie._preProduction.preProductionLength +
        this.$store.getters.getCurrentMovie._preProduction.productionLength +
        this.$store.getters.getCurrentMovie._preProduction.postProductionLength
    this.currentWeeks = this.$store.getters.getCurrentMovie._preProduction.preProductionLength

    this.percent = Math.round((this.currentWeeks * 100) / this.maxWeeks)
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
  text-align: center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>