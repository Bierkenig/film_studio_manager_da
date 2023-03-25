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
               :key="index"
               class="buyAStudioListElementContainer"
          >
            <div :id="'buyAStudioListElement' + index"
                 class="buyAStudioListElement"
                 @click="showMovieDetails(el.id, el.name, el.year, el.marketShare); showStreamingDetails(); currentStudio = el">
              {{ el.name }}
            </div>
          </div>
        </div>
      </background-tile>

      <background-tile :title="$t('buyAStudio.general')" id="buyAStudioDetails" class="buyAStudioTile">
        <div id="buyAStudioDetailsContent">
          <div id="buyAStudioDetailsInfo">
            <div v-if="detail" id="buyAStudioDetailsInfoGeneral">
              <div id="buyAStudioDetailsInfoStudioName">
                <custom-icon icon="studio" size="40px"/>
                {{ general.name }}
              </div>
              <div id="buyAStudioDetailsInfoStudioValues">
                <div class="buyAStudioDetailsInfoStudioValue">
                  <div class="buyAStudioFontRegular">{{ $t('buyAStudio.revenue') }}</div>
                  <div class="buyAStudioFontRegular">$ {{ roundBudget(general.revenue) }}</div>
                </div>
                <div class="buyAStudioDetailsInfoStudioValue">
                  <div class="buyAStudioFontRegular">{{ $t('buyAStudio.profit') }}</div>
                  <div class="buyAStudioFontRegular">$ {{ roundBudget(general.profit) }}</div>
                </div>
                <div class="buyAStudioDetailsInfoStudioValue">
                  <div class="buyAStudioFontRegular">{{ $t('buyAStudio.share') }}</div>
                  <div class="buyAStudioFontRegular">
                    {{ general.share[this.$store.getters.getCurrentDate.getFullYear().toString()] }}%
                  </div>
                </div>
              </div>
            </div>
            <div v-if="detail && streaming.check" id="buyAStudioDetailsInfoStreamingHeading">
              {{ $t('buyAStudio.streaming') }}
            </div>
            <div v-if="streaming.check" id="buyAStudioDetailsInfoStreaming">
              <div id="buyAStudioDetailsInfoStreamingName">
                <custom-icon icon="streaming" size="40px"/>
                {{ streaming.name }}
              </div>
              <div id="buyAStudioDetailsInfoStreamingValues">
                <div class="buyAStudioDetailsInfoStreamingValue">
                  <div class="buyAStudioFontRegular">{{ $t('buyAStudio.popularity') }}</div>
                  <input type="range" min="1" max="100" step="1" :value="streaming.popularity" disabled>
                </div>
                <div class="buyAStudioDetailsInfoStreamingValue">
                  <div class="buyAStudioFontRegular">{{ $t('buyAStudio.subs') }}</div>
                  <div class="buyAStudioFontRegular">{{ roundBudget(streaming.subs) }}</div>
                </div>
              </div>
            </div>
            <info-line v-if="!detail">{{ $t('buyAStudio.noSelected') }}</info-line>
          </div>
          <custom-button v-if="detail" @click="contact()">{{ $t('buyAStudio.contact') }}</custom-button>
        </div>
      </background-tile>
    </div>
  </div>
</template>

<script>
import store from "@/services/store";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import InfoLine from "@/components/kitchenSink/InfoLine.vue";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "BuyAStudio",
  components: {CustomButton, CustomIcon, InfoLine, BackgroundTile, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

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
      if(this.$store.getters.getCurrentLanguage === 'en'){
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                    : Math.abs(Number(labelValue));
      } else {
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " Mrd"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " Mio"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " T"

                    : Math.abs(Number(labelValue));
      }
    },

    showStreamingDetails() {
      let otherStreaming = this.$store.getters.getStreamingServicesFromOtherStudios.filter((el) =>
        el.owner.name === this.general.name
      )
    console.log(otherStreaming)
      if (otherStreaming.length !== 0) {
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

.buyAStudioListElementContainer {
  display: block;
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
  padding-left: 20px;
}

#buyAStudioDetails {
  flex-grow: 11;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#buyAStudioDetailsContent {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#buyAStudioDetailsInfo {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 10px;
}

#buyAStudioDetailsInfoGeneral, #buyAStudioDetailsInfoStreaming {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 20px;
}

#buyAStudioDetailsInfoStudioName, #buyAStudioDetailsInfoStreamingName {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  font-size: 22px;
}

#buyAStudioDetailsInfoStudioValues, #buyAStudioDetailsInfoStreamingValues {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.buyAStudioDetailsInfoStudioValue, .buyAStudioDetailsInfoStreamingValue {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  padding: 0 10px 0 10px;
}

.buyAStudioFontRegular {
  font-size: var(--fsm-fw-regular);
}

#buyAStudioDetailsInfoStreamingHeading {
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
  font-size: 28px;
}
</style>