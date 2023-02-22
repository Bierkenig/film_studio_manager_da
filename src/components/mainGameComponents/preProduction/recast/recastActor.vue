<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-body">
            <slot name="body">
              <h3>{{$t('recast.actor.recast')}}</h3>
              <div v-for="(el, index) in allActors" :key="index">
                <avatar-element :svg-code="el.avatar" size="50px"/>
                <div>{{el._first_name}} {{el._last_name}} {{el._popularity}}</div>
                <button @click="currentActor = el; negotiateActor()" :disabled="disabled">{{$t('recast.actor.negotiate')}}</button>
              </div>

              <div v-if="negotiate">
                <div>{{$t('recast.actor.offer')}}</div>
                <button></button>
              </div>
              <div></div>
              <div v-if="cant">{{$t('actorSection.cant')}}</div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarElement from "@/components/kitchenSink/AvatarElement";
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "recastActor",
  components: {AvatarElement},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      actor: this.$store.getters.getPreProductionEvents.actorWhoWantsToDropOut,
      allActors: [],
      negotiate: false,
      selectedSalary: 0,
      disabled: false,
      cant: false,
      currentActor: null
    }
  },

  methods: {
    negotiateActor() {
      this.negotiate = true
    },
    sendOffer() {
      let salValue = (Object.values(this.calcSalValue(this.proposedSalary))[0]);
      if (salValue === this.perfectSalary) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 3)
          if (random === 0) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        } else if (this.salaryLevel <= 50) {
          this.actorDecision = true
        }
      } else if (this.perfectSalary1 === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1 || random === 2) {
            this.actorDecision = false
            this.currentActor._no += 1
          } else this.actorDecision = true
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        }
      } else if (this.salary.min === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 8)
          this.actorDecision = random === 7;
          if (!this.actorDecision) this.currentActor._no += 1
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1 || random === 2) {
            this.actorDecision = false
            this.currentActor._no += 1
          }
          else this.actorDecision = true
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random())
          if (random === 0) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        }
      } else if (salValue > this.perfectSalary) {
        this.actorDecision = true
      }

      if (this.currentActor._no === 3) {
        const index = this.allActors.indexOf(this.currentActor)
        this.allActors.splice(index, 1)
        this.disabled = false
      }
    },

    calcSalValue(salValue) {
      return [...this.allSalaries].sort((a, b) => {
        a = Math.abs(a - salValue);
        b = Math.abs(b - salValue);

        return a < b ? -1 : (a > b ? 1 : 0);
      });
    },

    addActor() {

    }
  },

  mounted() {
    this.allActors = this.$store.getters.getAllActors
    this.allActors.slice(this.actor.id - 1, 1)
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