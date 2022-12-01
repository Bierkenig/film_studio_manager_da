<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="body">
              <fieldset>
                <legend>{{ $t('location') }}</legend>
                <select
                    id="location"
                    onfocus="this.size=5;"
                    onblur="this.size=1;"
                    onchange="this.size=1; this.blur();"
                    @change="selectSetting($event)"
                >
                  <option value="" disabled selected hidden>{{ $t('location') }}</option>
                  <option value="undefined">{{ $t('undefined') }}</option>
                  <option value="space">{{ $t('space') }}</option>
                  <optgroup :label="$t('countries')">
                    <option style="font-weight: bold; color: black" disabled>{{ $t('europe') }}</option>
                    <option value="france">&nbsp;&nbsp;{{ $t('france') }}</option>
                    <option value="germany">&nbsp;&nbsp;{{ $t('germany') }}</option>
                    <option value="uk">&nbsp;&nbsp;{{ $t('uk') }}</option>
                    <option value="russia">&nbsp;&nbsp;{{ $t('russia') }}</option>
                    <option value="italy">&nbsp;&nbsp;{{ $t('italy') }}</option>
                    <option value="spain">&nbsp;&nbsp;{{ $t('spain') }}</option>
                    <option style="font-weight: bold; color: black" disabled>{{ $t('asia') }}</option>
                    <option value="China">&nbsp;&nbsp;China</option>
                    <option value="india">&nbsp;&nbsp;{{ $t('india') }}</option>
                    <option value="saudiArabia">&nbsp;&nbsp;{{ $t('saudiArabia') }}</option>
                    <option value="Japan">&nbsp;&nbsp;Japan</option>
                    <option value="southKorea">&nbsp;&nbsp;{{ $t('southKorea') }}</option>
                    <option style="font-weight: bold; color: black" disabled>{{ $t('africa') }}</option>
                    <option value="southAfrica">&nbsp;&nbsp;{{ $t('southAfrica') }}</option>
                    <option value="morocco">&nbsp;&nbsp;{{ $t('morocco') }}</option>
                    <option value="egypt">&nbsp;&nbsp;{{ $t('egypt') }}</option>
                    <option style="font-weight: bold; color: black" disabled>{{ $t('northAmerica') }}</option>
                    <option value="canada">&nbsp;&nbsp;{{ $t('canada') }}</option>
                    <option value="USA">&nbsp;&nbsp;USA</option>
                    <option value="mexico">&nbsp;&nbsp;{{ $t('mexico') }}</option>
                    <option style="font-weight: bold; color: black" disabled>{{ $t('southAmerica') }}</option>
                    <option value="brazil">&nbsp;&nbsp;{{ $t('brazil') }}</option>
                    <option value="colombia">&nbsp;&nbsp;{{ $t('colombia') }}</option>
                    <option value="argentina">&nbsp;&nbsp;{{ $t('argentina') }}</option>
                    <option style="font-weight: bold; color: black" disabled>{{ $t('oceania') }}</option>
                    <option value="australia">&nbsp;&nbsp;{{ $t('australia') }}</option>
                    <option value="newZealand">&nbsp;&nbsp;{{ $t('newZealand') }}</option>
                  </optgroup>
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
              <button class="modal-default-button" @click="sendSetting" :disabled="!selectedSetting || !selectedAct">
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
  name: "SettingModal",

  data(){
    return {
      selectedSetting: '',
      selectedAct: ''
    }
  },

  methods: {
    selectSetting(event){
      this.selectedSetting = event.target.value;
    },

    selectAct(event){
      this.selectedAct = event.target.value;
    },

    sendSetting(){
      this.$emit('sendSetting',this.selectedSetting, this.selectedAct);
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