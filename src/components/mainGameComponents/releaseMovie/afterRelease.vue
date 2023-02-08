<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <h3>{{$t('afterRelease.summary')}}</h3>
              <h4>{{$t('afterRelease.next')}}></h4>
              <div>
                <div>{{$t('afterRelease.qst')}}</div>
                <input type="text" v-model="inputFranchise">
                <button @click="createFranchise">{{$t('afterRelease.create')}}</button>
              </div>

              <h3>{{$t('afterRelease.plan')}}</h3>

              <div>
                <div>{{$t('afterRelease.dvd')}}</div>
                <div>$ {{release.dvdGross}}</div>
              </div>

              <div>
                <div>{{$t('afterRelease.cinema')}}</div>
                <div>$ {{release.cinemaGross}}</div>
              </div>

              <div v-if="this.$store.getters.getOwnStreamingService !== null">
                <div>{{$t('afterRelease.streamingList')}}</div>
                <div v-for="(el, index) in streamMovies" :key="index">
                  {{el._preProduction.screenplay.title}}
                </div>
                <div>{{$t('afterRelease.streaming')}}</div>
              </div>

              <button @click="finishMovie()">{{$t('finishMovie')}}</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Movie} from "@/classes/Movie";
import Franchises from "@/classes/Franchises";

export default {
  name: "after-release",
  props: {
    movie: Movie
  },

  data() {
    return {
      inputFranchise: "",
      release: this.movie._release,
      streamMovies: this.$store.getters.getBoughtMovieRights
    }
  },

  methods: {
    createFranchise() {
      const id = this.$store.getters.getFranchises.length
      const studio = this.$store.getters.getStudio
      let franchise = new Franchises(id, this.inputFranchise, studio, this.$store.getters.getCurrentDate)
      franchise.addAllMovies(this.movie)
      let check = this.$store.getters.getFranchises.forEach((el) => {
        if (el.name === franchise.name) {
          return true
        }
      })

      if (!check) {
        this.$store.commit('addFranchise', franchise)

      }
    },

    finishMovie() {
      this.$store.getters.getCurrentMovie._status = "Finished"
      this.$store.commit('addFinishedMovie', this.$store.getters.getCurrentMovie)
      this.$store.state.currentMovie = null
      let index = this.$store.getters.getCreatedMovies.indexOf(this.$store.getters.getCurrentMovie)
      this.$store.state.createdMovies.slice(index, 1)
    },
  },

  mounted() {
    this.$store.commit('addBoughtMovieRights', this.movie)
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