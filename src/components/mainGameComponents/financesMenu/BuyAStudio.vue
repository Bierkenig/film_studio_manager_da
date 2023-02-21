<template>
  <div id="buyAStudioMainDiv">
    <icon-button
        id="buyAStudioBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="$router.go(-1)"
    />
    <div id="buyAStudioSubDiv">
      <background-tile :title="$t('buyAStudio.listHeading')" id="buyAStudioList" class="buyAStudioTile">
        <select v-model="studioSortType" @change="sortByNameOrFoundationDate">
          <option value="name">Name</option>
          <option value="date">{{ $t('buyAStudio.foundationDate') }}</option>
        </select>
        <select v-model="studioSortDirection" @change="sortByNameOrFoundationDate">
          <option value="ascend">{{ $t('buyAStudio.ascending') }}</option>
          <option value="descend">{{ $t('buyAStudio.descending') }}</option>
        </select>

        <div id="buyAStudioListContent" class="verticalScroll">
          <div v-for="(el, index) in otherStudios"
               :id="'buyAStudioListElement' + index"
               class="buyAStudioListElement"
               :key="index"
               @click="showMovieDetails(el.id, el.name, el.year, el.marketShare); showStreamingDetails(); currentStudio = el"
          >
            {{ el.name }}
          </div>
        </div>
      </background-tile>

      <background-tile :title="$t('buyAStudio.detailsHeading')" id="buyAStudioDetails" class="buyAStudioTile">
        <div v-if="detail">
          {{ general.name }}
          <div>{{ $t('buyAStudio.revenue') }} $ {{ roundBudget(general.revenue) }}</div>
          <div>{{ $t('buyAStudio.profit') }} $ {{ roundBudget(general.profit) }}</div>
          <div>
            {{ $t('buyAStudio.share') }}
            {{ general.share[this.$store.getters.getCurrentDate.getFullYear().toString()] }}%
          </div>
        </div>
      </background-tile>

      <background-tile :title="$t('buyAStudio.offerHeading')" id="buyAStudioOffer" class="buyAStudioTile">
        <div v-if="streaming.check">
          {{ $t('buyAStudio.streaming') }}
          <div>
            {{ streaming.name }}
            <div>{{ $t('buyAStudio.popularity') }} {{ streaming.popularity }}</div>
            <div>{{ $t('buyAStudio.subs') }} {{ roundBudget(streaming.subs) }}</div>
          </div>
        </div>
        <button @click="contact()">{{ $t('buyAStudio.contact') }}</button>
      </background-tile>
    </div>
  </div>
</template>

<script>
import store from "@/services/store";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "BuyAStudio",
  components: {BackgroundTile, IconButton},

  data() {
    return {
      otherStudios: this.$store.getters.getOtherStudios,
      studioSortType: "name",
      studioSortDirection: "ascend",
      detail: false,
      currentStudio: null,
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
      if (this.studioSortType === "name" && this.studioSortDirection === "ascend") {
        this.otherStudios.sort((a, b) => {
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
      } else if (this.studioSortType === "name" && this.studioSortDirection === "descend") {
        this.otherStudios.reverse()
      } else if (this.studioSortType === "date" && this.studioSortDirection === "ascend") {
        this.otherStudios.sort((a, b) => {
          return b.date - a.date
        });
      } else if (this.studioSortType === "date" && this.studioSortDirection === "descend") {
        this.otherStudios.reverse()
      }
    },

    showMovieDetails(id, name, year, share) {
      //set values
      this.general.id = id
      this.general.name = name
      this.general.share = share

      //calc
      let earnings = 0
      let totalCosts = 0
      let movies = [...this.$store.getters.getAllMovies]
          .concat([...this.$store.getters.getFinishedMovies])
          .concat([...this.$store.getters.getCreatedMovies])
          .concat([...this.$store.getters.getInProductionMovies])
      movies.forEach((movie) => {
        if (movie._status === 'Finished') {
          earnings += movie._release.totalEarnings
        } else {
          movie._earnings.forEach((el) => {
            earnings += el.amount
          })
        }
        totalCosts += movie._totalOutgoings
      })
      this.general.revenue = earnings
      this.general.profit = earnings - totalCosts
      this.detail = true
    },

    roundBudget(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
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
      let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),
          store.getters.getCurrentDate.getDate() + (Math.round(Math.random() * 5) + 1))
      let newDate = new Date(endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1)
      store.commit('addCalendarEvents', {
        id: store.getters.getNextEventId,
        movie: "",
        studio: this.currentStudio,
        actor: "",
        director: "",
        start: endDate.toISOString().split('T')[0],
        end: newDate.toISOString().split('T')[0],
        type: 'studioTakeover',
        completed: false,
      })
      this.$router.push({name: "finances"})
    },

    goBack() {
      this.$router.push({name: 'finances'})
    },

    styleSelectedStudio(id) {
      let allElements = document.getElementsByClassName('buyAStudioListElement');
      for (let element of allElements) {
        if (element.getAttribute('id') === 'buyAStudioListElement' + id) {
          element.setAttribute('class', 'buyAStudioListElementSelected buyAStudioListElement');
        } else {
          element.setAttribute('class', 'buyAStudioListElement');
        }
      }
      // CONTINUE HERE (NOT WORKING)
    },
  },

  mounted() {
    this.sortByNameOrFoundationDate()
  },
}
</script>

<style scoped>
#buyAStudioBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#buyAStudioMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#buyAStudioSubDiv {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  max-height: 80vh;
}

.buyAStudioTile {
  flex-basis: 0;
}

#buyAStudioList {
  flex-grow: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}

#buyAStudioListContent {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}

.buyAStudioListElement {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: var(--fsm-dark-blue-4);
  color: var(--fsm-white);
  border-radius: var(--fsm-s-border-radius);
  font-size: 18px;
  font-weight: var(--fsm-fw-regular);
  box-sizing: border-box;
}

.buyAStudioListElementSelected {
  background-color: var(--fsm-pink-1);
  color: var(--fsm-dark-blue-4);
}

#buyAStudioOffer {
  flex-grow: 4;
}

#buyAStudioDetails {
  flex-grow: 7;
}
</style>