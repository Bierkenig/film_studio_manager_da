<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <div>
                  {{$t('cinema')}}
                  {{scope}}
                <button @click="choose('wide')">Wide Release</button>
                <button @click="choose('limited')">Limited Release</button>

                Cost: {{cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                Potential Sales: {{potential * 100}}%

                <router-link to="/">
                  <button>Back</button>
                </router-link>

                <button @click="next" :disabled="continueDisable">Continue</button>
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
  name: "chooseMedium",

  data(){
    return{
    scope: this.$store.getters.getCurrentMovie._preProduction.screenplay.details.scope,
    releaseScope: 0,
    potential: 0,
    cost: 0,
    continueDisable: true
    }
  },

  methods:{
    choose(type){
      if(type === 'wide'){
        this.releaseScope = 1
        this.potential = 1
        this.continueDisable = false

        switch(this.scope){
          case 'Little':
            this.cost = 5000000
            break
          case 'Small':
            this.cost = 10000000
            break
          case 'Normal':
            this.cost = 15000000
            break
          case 'Large':
            this.cost = 20000000
            break
          case 'Epic':
            this.cost = 25000000
            break
        }
      }
      if(type === 'limited'){
        this.releaseScope = 2
        this.potential = 0.5
        this.continueDisable = false

        switch(this.scope){
          case 'Little':
            this.cost = 500000
            break
          case 'Small':
            this.cost = 1000000
            break
          case 'Normal':
            this.cost = 1500000
            break
          case 'Large':
            this.cost = 2000000
            break
          case 'Epic':
            this.cost = 2500000
            break
        }
      }
    },

    next(){
      this.$store.getters.getCurrentMovie._status = 'Post Production'
      this.$store.getters.getCurrentMovie.setPostProduction()
      this.$store.getters.getCurrentMovie._postProduction.earningPotential = this.potential
      this.$store.getters.getCurrentMovie._postProduction.distributionCosts = this.cost
      this.$store.getters.getCurrentMovie._postProduction.releaseScope = this.releaseScope
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
  width: 400px;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  transition: all 0.3s ease;
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