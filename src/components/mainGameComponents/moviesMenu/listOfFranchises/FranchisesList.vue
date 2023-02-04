<template>
  <div>
    <div id="franchisesListMainDiv">
      <div>
        <div class="franchiseList">
          <div class="franchiseListSortDiv">
            <custom-select :options="[$t('popularity'),'Name',$t('newsData.year')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhatOwningFranchises"/>
            <custom-list-sort @sort-changed="setSelectedTypeOfSortOwningFranchises"/>
          </div>
          <div class="franchiseListScroll verticalScroll">
            <div v-for="(it, index) in allOwningFranchises" :id="'franchiseItem' + index" :key="index" class="franchiseListElement" @click="getFranchiseInfo(it,index)">
              <div class="franchiseListElementTitle" :id="'franchiseListElementName' + index">
                {{it.name}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/kitchenSink/CustomSelect";
import CustomListSort from "@/components/kitchenSink/CustomListSort";
export default {
  name: "FranchisesList",
  components: {CustomListSort, CustomSelect},

  data(){
    return {
      allOwningFranchises: this.$store.getters.getFranchises,
      allForSalesFranchises: this.$store.getters.getFranchisesFromOtherStudios,
      lastIndex: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  methods: {
    getFranchiseInfo(franchise,index){
      document.getElementById('franchiseItem'+index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById('franchiseListElementName'+index).style.color = 'var(--fsm-dark-blue-4)';
      if(this.lastIndex !== null){
        document.getElementById('franchiseItem'+this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
        document.getElementById('franchiseListElementName'+this.lastIndex).style.color = 'unset';
      }
      this.lastIndex = index;

      this.$emit('sendFranchise',franchise);
    },

    setSelectedSortByWhatOwningFranchises(arg){
      this.selectedSortByWhat = arg;
      this.sortFranchiseList(this.allOwningFranchises);
    },

    setSelectedTypeOfSortOwningFranchises(arg){
      this.selectedTypeOfSort = arg;
      this.sortFranchiseList(this.allOwningFranchises);
    },

    sortFranchiseList(array){
      if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Ascending'){
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
      }
    },

    roundSalary(labelValue){
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
#franchisesListMainDiv {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);
  padding: 15px;
  width: 350px;
}

.franchiseListScroll {
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.franchiseListSortDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
}

.franchiseListElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 0 10px 15px;
}

.franchiseList {
  width: 100%;
}
</style>