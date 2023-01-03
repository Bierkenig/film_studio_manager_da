<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">

          <div class="modal-body">
            <slot name="body">
              <h2 class="closeModalHeader">{{ $t(headline) }}</h2>
              <!--
              <div v-if="headline === 'closeGame'">
                {{ $t('closeGameMsg') }}
              </div>
              <div v-if="headline === 'goBackMenu'">
                {{ $t('goBackMenuMsg') }}
              </div>
              -->
            </slot>
          </div>

          <div class="modal-footer closeModalFooter">
            <slot name="footer">
                <custom-button
                    v-if="headline === 'closeGame'"
                    class="modal-default-button"
                    :dark="false"
                    size="small"
                    style="font-weight: var(--fsm-fw-bold) !important; padding: 10px"
                    @clicked="$emit('closeGame')">{{ $t('closeGame') }} </custom-button>
                <custom-button
                    v-else
                    class="modal-default-button"
                    :dark="false"
                    size="small"
                    style="font-weight: var(--fsm-fw-bold) !important; padding: 10px"
                    @clicked="$emit('backToStartmenu')">{{ $t('startMenu') }}</custom-button>
              <custom-button
                  class="modal-default-button"
                  :dark="false"
                  size="small"
                  style="font-weight: var(--fsm-fw-bold) !important; padding: 10px"
                  @clicked="$emit('close')">{{ $t('resume') }}</custom-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton";
export default {
  name: "CloseModal",
  components: {CustomButton},
  props: {
    headline: String
  },
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

.closeModalFooter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px
}

.closeModalHeader {
  font-weight: var(--fsm-fw-bold) !important;
  /*
  color: var(--fsm-pink-1) !important;
  */
  color: white

}
</style>