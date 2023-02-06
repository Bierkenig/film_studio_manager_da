<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-body">
            <slot name="body">
              <div>
                <select v-model="selected1" @change="sortByNameOrFoundationDate">
                  <option value="name">Name</option>
                  <option value="date">{{$t('buyAStudio.foundationDate')}}</option>
                </select>
                <select v-model="selected2" @change="sortByNameOrFoundationDate">
                  <option value="ascend">{{$t('buyAStudio.ascending')}}</option>
                  <option value="descend">{{$t('buyAStudio.descending')}}</option>
                </select>
                <div v-for="(el, index) in otherStudios" :key="index">
                  <div @click="showMovieDetails(el.id, el.name, el.year, el.marketShare, el.movies); showStreamingDetails()">{{el.name}}</div>
                </div>
              </div>
              <div v-if="detail">
                <div>
                  <h2>{{$t('buyAStudio.general')}}</h2>
                  <div>
                    <h3>{{general.name}}</h3>
                    <div>
                      <div>{{$t('buyAStudio.revenue')}} $ {{general.revenue}}</div>
                      <div>{{$t('buyAStudio.profit')}} $ {{general.profit}}</div>
                      <div>{{$t('buyAStudio.share')}} {{general.share}}%</div>
                    </div>
                  </div>
                </div>
                <div v-if="streaming.check">
                  <h2>{{$t('buyAStudio.streaming')}}</h2>
                  <div>
                    <h3>{{streaming.name}}</h3>
                    <div>{{$t('buyAStudio.popularity')}} {{streaming.popularity}}</div>
                    <div>{{$t('buyAStudio.subs')}} {{streaming.subs}}</div>
                  </div>
                </div>
                <button>{{$t('buyAStudio.contact')}}</button>
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
  name: "BuyAStudio",

  data() {
    return {
      otherStudios: this.$store.state.otherStudios,
      selected1: "name",
      selected2: "ascend",
      detail: false,
      general: {
        id: 0,
        name: "",
        share: 0,
        revenue: 0,
        profit: 0,
      },
      streaming: {
        check: false,
        name: "",
        popularity: 0,
        subs: 0
      }
    }
  },

  methods: {
    sortByNameOrFoundationDate() {
      if (this.selected1 === "name" && this.selected2 === "ascend") {
        this.otherStudios.sort((a,b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
      } else if (this.selected1 === "name" && this.selected2 === "descend") {
        this.otherStudios.reverse()
      } else if (this.selected1 === "date" && this.selected2 === "ascend") {
        this.otherStudios.sort((a,b) => {
          return b.date - a.date
        });
      } else if (this.selected1 === "date" && this.selected2 === "descend") {
        this.otherStudios.reverse()
      }
    },

    showMovieDetails(id, name, year, share, movies) {
      //set values
      this.general.id = id
      this.general.name = name
      this.general.share = share

      //calc
      let earnings = 0
      let totalCosts = 0
      movies.forEach((movie) => {
        movie._earnings.forEach((el) =>{
          earnings += el.amount
        })
        totalCosts += movie._totalCosts
      })

      this.general.revenue = earnings
      this.general.profit = earnings - totalCosts
      this.detail = true
    },

    showStreamingDetails() {
      let otherStreaming = this.$store.getters.getStreamingServicesFromOtherStudios.filter((el) => {
        el.owner.name = this.general.name
      })

      if (otherStreaming !== null) {
        this.streaming.check = true
        this.streaming.name = otherStreaming._name
        this.streaming.popularity = otherStreaming._popularity
        this.streaming.subs = otherStreaming._subscribers
      }
    },

    contact() {
      this.$store.commit('addStudioTakeOverRequest', this.general.id)
    }
  },

  mounted() {
    this.sortByNameOrFoundationDate()
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