<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-body">
            <slot name="body">
              <h2>{{$t('buyAStudio.response')}}</h2>
              <h4>{{studio.name}}</h4>
              <div>{{$t('buyAStudio.popularity')}}</div>
              <div>{{$t('buyAStudio.offer')}}: $ {{Math.round(offer)}}</div>
              <button @click="accept(offer, studio)" :disabled="disabled">{{$t('buyAStudio.accept')}}</button>
              <button @click="this.closeModal">{{$t('buyAStudio.deny')}}</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "StudioTakeOverResponse",

  data() {
    return {
      studio: this.$store.getters.getCurrentCalendarEvent.studio,
      offer: 0,
      disabled: false
    }
  },

  methods: {
    accept(amount, studio) {
      //decrease balance
      this.$store.commit('subtractBalance', amount)

      //transfer movies
      this.$store.getters.getAllMovies.forEach((movie) => {
        if (studio.id === movie.owner.id) {
          this.$store.commit('addFinishedMovie', movie)
          this.$store.commit('addAllMovie', this.$store.getters.getAllMovies.filter(el => el.owner.id !== studio.id))
        }
      })

      this.$store.getters.getMoviesFromOtherStudios.forEach((movie) => {
        if (studio.id === movie.owner.id) {
          this.$store.commit('addFinishedMovie', movie)
          this.$store.state.moviesFromOtherStudios = this.$store.state.moviesFromOtherStudios.filter(el => el.id !== studio.id)
        }
      })
      this.closeModal();
    },

    closeModal() {
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if (allCalendarEvents[i].id === currentCalendarEvent.id) {
          allCalendarEvents[i].completed = true;
        }
      }
      this.$emit('close');
    }
  },

  mounted() {
    console.log(this.$store.getters.getAllMovies.length)
    this.$store.getters.getAllMovies.forEach((el) => {
      if (el.owner.id === this.studio.id) {
        this.offer += el._release.totalEarnings
      }
    })

    this.$store.getters.getMoviesFromOtherStudios.forEach(el => {
      if (el.owner.id === this.studio.id) {
        this.offer += el._release.totalEarnings
      }
    })

    if (this.$store.getters.getStudio.budget <= this.offer) {
      this.disabled = true
    }

    if (this.studio.popularity < 50) {
      this.offer *= 1.15
    } else if (this.studio.popularity >= 50 && this.studio.popularity < 75) {
      this.offer *= 1.25
    } else if (this.studio.popularity >= 75) {
      this.offer *= 1.35
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