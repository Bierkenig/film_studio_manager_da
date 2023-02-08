<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <h3>{{$t('beforeRelease.details')}}</h3>
              <div>{{movieTitle}}</div>
              <div>
                <div>{{$t('beforeRelease.screenplay.msg')}}</div>
                <div>{{$t('beforeRelease.screenplay.writer')}}: {{screenplay.writer}}</div>
                <div>
                  <div>{{$t('beforeRelease.screenplay.topics')}}</div>
                  <div>{{$t('beforeRelease.screenplay.topic1')}}: {{screenplay.firstTopic !== null ? screenplay.firstTopic : $t('beforeRelease.screenplay.error')}}</div>
                  <div>{{$t('beforeRelease.screenplay.topic2')}}: {{screenplay.secondTopic !== null ? screenplay.secondTopic : $t('beforeRelease.screenplay.error')}}</div>
                  <div>{{$t('beforeRelease.screenplay.topic3')}}: {{screenplay.thirdTopic !== null ? screenplay.thirdTopic : $t('beforeRelease.screenplay.error')}}</div>
                </div>
              </div>
              <div>
                <div>{{$t('beforeRelease.director.msg')}}</div>
                <div>{{$t('beforeRelease.director.name')}}: {{director._first_name}} {{director._last_name}}</div>
                <div>{{$t('beforeRelease.director.age')}}: {{director._age}}</div>
                <div>{{$t('beforeRelease.director.gender')}}: {{director._gender}}</div>
                <div>{{$t('beforeRelease.director.talent')}}: {{director._talent}}</div>
                <div>{{$t('beforeRelease.director.pop')}}: {{director._popularity}}</div>
                <div>{{$t('beforeRelease.director.rating')}}: {{director._rating}}</div>
              </div>
              <div>
                <div>{{$t('beforeRelease.quality')}}: {{movie.quality}}</div>
              </div>
              <div>
                <button @click="changeToCinema()">{{$t('beforeRelease.release')}}</button>
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
  name: "before-release",

  data() {
    return {
      movieTitle: this.$store.getters.getCurrentMovie._title,
      screenplay: this.$store.getters.getCurrentMovie._preProduction.screenplay,
      director: this.$store.getters.getCurrentMovie._preProduction.hiredDirector
    }
  },

  methods: {
    changeToCinema() {
      this.$store.getters.getCurrentMovie._status = 'Release'
      this.$store.getters.getCurrentMovie.setRelease()

      //clear from production
      this.$store.commit('removeInProductionMovie', this.$store.getters.getCurrentMovie)

      //add to cinema
      this.$store.commit('addCreatedMovie', this.$store.getters.getCurrentMovie)

      //set null
      this.$store.commit('setCurrentMovie', null)

      this.$emit('close')
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