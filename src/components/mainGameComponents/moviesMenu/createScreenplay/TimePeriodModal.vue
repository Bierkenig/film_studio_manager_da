<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="body">
              <fieldset>
                <legend>{{ $t('timePeriod') }}</legend>
                <select
                    id="timePeriod"
                    onfocus="this.size=5;"
                    onblur="this.size=1;"
                    onchange="this.size=1; this.blur();"
                    @change="selectTimePeriod($event)"
                >
                  <option value="" disabled selected hidden>{{ $t('timePeriod') }}</option>
                  <option value="farFuture">{{ $t('farFuture') }}</option>
                  <option value="nearFuture">{{ $t('nearFuture') }}</option>
                  <option value="presentDay">{{ $t('presentDay') }}</option>
                  <option value="90s">90s</option>
                  <option value="80s">80s</option>
                  <option value="70s">70s</option>
                  <option value="60s">60s</option>
                  <option value="century20">{{ $t('century20') }}</option>
                  <option value="century19">{{ $t('century19') }}</option>
                  <option value="century18">{{ $t('century18') }}</option>
                  <option value="industrialRevolution">{{ $t('industrialRevolution') }}</option>
                  <option value="theRenaissance">{{ $t('the') }} Renaissance</option>
                  <option value="highMiddleAges">{{ $t('highMiddleAges') }}s</option>
                  <option value="earlyMiddleAges">{{ $t('earlyMiddleAges') }}</option>
                  <option value="vikingEra">{{ $t('vikingEra') }}</option>
                  <option value="darkAge">{{ $t('darkAge') }}</option>
                  <option value="ancientWorld">{{ $t('ancientWorld') }}</option>
                  <option value="stoneAge">{{ $t('stoneAge') }}</option>
                </select>
                <select
                    id="act"
                    onfocus="this.size=5;"
                    onblur="this.size=1;"
                    onchange="this.size=1; this.blur();"
                    @change="selectAct($event)"
                >
                  <option value="" disabled selected hidden>{{ $t('acts') }}</option>
                  <option :value="1">{{ $t('act1') }}</option>
                  <option :value="2">{{ $t('act2') }}</option>
                  <option :value="3">{{ $t('act3') }}</option>
                </select>
              </fieldset>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                {{ $t('close') }}
              </button>
              <button class="modal-default-button" @click="sendTimePeriod" :disabled="!selectedTimePeriod || !selectedAct">
                {{ $t('save') }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimePeriodModal",

  data(){
    return {
      selectedTimePeriod: '',
      selectedAct: ''
    }
  },

  methods: {
    selectTimePeriod(event){
      this.selectedTimePeriod = event.target.value;
    },

    selectAct(event){
      this.selectedAct = event.target.value;
    },

    sendTimePeriod(){
      this.$emit('sendTimePeriod',this.selectedTimePeriod, this.selectedAct);
      this.$emit('close');
    }
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
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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