<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3>{{$t('reeditingDirector.h3')}}</h3>
            <div>{{$t('reeditingDirector.msg')}}</div>

            <button class="modal-default-button" @click="bool = true; bool2 = false">{{$t('reeditingDirector.reedit')}}</button>
            <button class="modal-default-button" @click="bool2 = true; bool = false">{{$t('reeditingDirector.ignore')}}</button>

            <div v-if="bool">
              {{$t('reeditingDirector.quality2')}}
            </div>

            <div v-if="bool2">
              {{$t('reeditingDirector.quality')}}
            </div>

            <button class="modal-default-button" @click="saveState()">{{$t('reeditingDirector.save')}}</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reeditingDirector",

  data() {
    return {
      bool: false,
      bool2: false
    }
  },

  methods: {
    saveState() {
      if (this.bool) {
        this.$store.state.currentMovie.hype += this.$store.state.currentMovie.hype * 0.05
      } else if (this.bool2) {
        this.$store.state.currentMovie.quality *= 0.9
      }
    },
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