<template>
  <div>
    <div id="sourcesListMainDiv">
      <div>
        <tile-pages-nav id="sourcesListSelect" :pages='[$t("movies"),$t("screenplays")]' :gradient='true'>
          <tile-pages-nav id="movieListNavigation" :pages='[$t("owning"),$t("forSale")]' :gradient='true'>
            <div class="sourcesList">
              <div class="sourcesListScroll verticalScroll">
                <div v-for="(it, index) in allOwningMovies" :id="'movieOwningItem' + index" :key="index" class="sourcesListElement" @click="getSourceInfo(it,index,'moviesListElementName','movieOwningItem')">
                  <div class="sourcesListElementTitle" :id="'moviesListElementName' + index">
                    {{it._preProduction.screenplay.title}}
                  </div>
                </div>
              </div>
              <div class="sourcesListSortDiv">
                <custom-select :options="[$t('popularity'),'Name',$t('newsData.year')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhatForAllOwningMovies"/>
                <custom-list-sort @sort-changed="setSelectedTypeOfSortForAllOwningMovies"/>
              </div>
            </div>
            <div class="sourcesList">
              <div class="sourcesListScroll verticalScroll">
                <div v-for="(it, index) in allOtherStudiosMovies" :id="'movieSaleItem' + index" :key="index" class="sourcesListElement" @click="getSourceInfo(it,index,'moviesListElementName','movieSaleItem')">
                  <div class="sourcesListElementTitle" :id="'moviesListElementName' + index">
                    {{it._preProduction.screenplay.title}}
                  </div>
                </div>
              </div>
              <div class="sourcesListSortDiv">
                <custom-select :options="[$t('popularity'),'Name',$t('newsData.year')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhatForAllOtherStudiosMovies"/>
                <custom-list-sort @sort-changed="setSelectedTypeOfSortForAllOtherStudiosMovies"/>
              </div>
            </div>
          </tile-pages-nav>
          <tile-pages-nav id="screenplaysListNavigation" :pages='[$t("owning"),$t("forSale")]' :gradient='true'>
            <div class="sourcesList">
              <div class="sourcesListScroll verticalScroll">
                <div v-for="(it, index) in allOwningScreenplays" :id="'screenplayOwningItem' + index" :key="index" class="sourcesListElement" @click="getSourceInfo(it,index,'screenplaysListElementName','screenplayOwningItem')">
                  <div class="sourcesListElementTitle" :id="'screenplaysListElementName' + index">
                    {{it.title}}
                  </div>
                </div>
              </div>
              <div class="sourcesListSortDiv">
                <custom-select :options="[$t('popularity'),'Name',$t('newsData.year')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhatForAllOwningScreenplays"/>
                <custom-list-sort @sort-changed="setSelectedTypeOfSortForAllOwningScreenplays"/>
              </div>
            </div>
            <div class="sourcesList">
              <div class="sourcesListScroll verticalScroll">
                <div v-for="(it, index) in allOtherStudiosScreenplays" :id="'screenplaySaleItem' + index" :key="index" class="sourcesListElement" @click="getSourceInfo(it,index,'screenplaysListElementName','screenplaySaleItem')">
                  <div class="sourcesListElementTitle" :id="'screenplaysListElementName' + index">
                    {{it.title}}
                  </div>
                </div>
              </div>
              <div class="sourcesListSortDiv">
                <custom-select :options="[$t('popularity'),'Name',$t('newsData.year')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhatForAllOtherStudiosScreenplays"/>
                <custom-list-sort @sort-changed="setSelectedTypeOfSortForAllOtherStudiosScreenplays"/>
              </div>
            </div>
          </tile-pages-nav>
        </tile-pages-nav>
      </div>
    </div>
  </div>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav.vue";
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";

export default {
  name: "SourcesList",
  components: {CustomListSort, CustomSelect, TilePagesNav},

  data(){
    return {
      allOtherStudiosMovies: this.$store.getters.getMoviesFromOtherStudios,
      allOtherStudiosScreenplays: this.$store.getters.getScreenplaysFromWriters,
      allOwningScreenplays: this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays),
      allOwningMovies: this.$store.getters.getInProductionMovies.concat(this.$store.getters.getFinishedMovies, this.$store.getters.getBoughtMovies),
      lastIndex: null,
      lastContainerId: null,
      lastItemId: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  methods: {
    getSourceInfo(source, index, containerId, itemId) {
      document.getElementById(itemId + index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById(containerId + index).style.color = 'var(--fsm-dark-blue-4)';
      if (this.lastIndex !== null) {
        document.getElementById(this.lastItemId + this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
        document.getElementById(this.lastContainerId + this.lastIndex).style.color = 'unset';
      }
      this.lastIndex = index;
      this.lastItemId = itemId;
      this.lastContainerId = containerId;

      if(itemId === 'movieSaleItem' || itemId === 'screenplaySaleItem'){
        this.$emit('sendSource', source, 'Sale');
      } else {
        this.$emit('sendSource', source, 'Owning');
      }
    },

    setSelectedSortByWhatForAllOwningMovies(arg) {
      this.selectedSortByWhat = arg;
      this.sortSourceList(this.allOwningMovies);
    },

    setSelectedTypeOfSortForAllOwningMovies(arg) {
      this.selectedTypeOfSort = arg;
      this.sortSourceList(this.allOwningMovies);
    },

    setSelectedSortByWhatForAllOtherStudiosMovies(arg) {
      this.selectedSortByWhat = arg;
      this.sortSourceList(this.allOtherStudiosMovies);
    },

    setSelectedTypeOfSortForAllOtherStudiosMovies(arg) {
      this.selectedTypeOfSort = arg;
      this.sortSourceList(this.allOtherStudiosMovies);
    },

    setSelectedSortByWhatForAllOwningScreenplays(arg) {
      this.selectedSortByWhat = arg;
      this.sortSourceList(this.allOwningScreenplays);
    },

    setSelectedTypeOfSortForAllOwningScreenplays(arg) {
      this.selectedTypeOfSort = arg;
      this.sortSourceList(this.allOwningScreenplays);
    },

    setSelectedSortByWhatForAllOtherStudiosScreenplays(arg) {
      this.selectedSortByWhat = arg;
      this.sortSourceList(this.allOtherStudiosScreenplays);
    },

    setSelectedTypeOfSortForAllOtherStudiosScreenplays(arg) {
      this.selectedTypeOfSort = arg;
      this.sortSourceList(this.allOtherStudiosScreenplays);
    },

    sortSourceList(array) {
      console.log(array)
      /*if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Ascending'){
        array.sort(function (a, b) {
          let franchiseAPopularity = 0;
          let franchiseBPopularity = 0;
          for (let i = 0; i < a.allMovies.length; i++) {
            franchiseAPopularity += a.allMovies[i].popularity;
          }
          for (let i = 0; i < b.allMovies.length; i++) {
            franchiseBPopularity += b.allMovies[i].popularity;
          }
          return (franchiseAPopularity / a.allMovies.length) - (franchiseBPopularity / b.allMovies.length)
        })
      } else if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Descending') {
        array.sort(function (a, b) {
          let franchiseAPopularity = 0;
          let franchiseBPopularity = 0;
          for (let i = 0; i < a.allMovies.length; i++) {
            franchiseAPopularity += a.allMovies[i].popularity;
          }
          for (let i = 0; i < b.allMovies.length; i++) {
            franchiseBPopularity += b.allMovies[i].popularity;
          }
          return (franchiseBPopularity / b.allMovies.length) - (franchiseAPopularity / a.allMovies.length)
        })
      } else if(this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Ascending'){
        array.sort((a, b) => a.name.localeCompare(b.name))
      } else if(this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Descending'){
        array.sort((a, b) => b.name.localeCompare(a.name))
      } else if((this.selectedSortByWhat === 'Year' || this.selectedSortByWhat === 'Jahr') && this.selectedTypeOfSort === 'Ascending'){
        array.sort((a, b) => a.foundationDate - b.foundationDate)
      } else if((this.selectedSortByWhat === 'Year' || this.selectedSortByWhat === 'Jahr') && this.selectedTypeOfSort === 'Descending'){
        array.sort((a, b) => b.foundationDate - a.foundationDate)
      }*/
    },

    roundSalary(labelValue) {
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
  }
}
</script>

<style scoped>
#sourcesListMainDiv {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);
  padding: 15px;
  width: 350px;
}

.sourcesListScroll {
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sourcesListSortDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  margin-top: 20px;
}

.sourcesListElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 0 10px 15px;
}

#sourcesListSelect{
  margin: 15px;
}

#movieListNavigation, #screenplaysListNavigation {
  width: 100%;
}

.sourcesList {
  width: 100%;
}
</style>