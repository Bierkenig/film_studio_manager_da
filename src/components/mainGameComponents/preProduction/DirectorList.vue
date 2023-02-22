<template>
  <div>
    <background-tile :title="$t('hireDirectorSection.hire')" id="peopleList">
      <div class="peopleListContainer">
        <div class="peopleListScroll verticalScroll">
          <div v-for="(item, index) in directors" :id="'directorItem' + index" :key="index" class="peopleListElement"
               @click="getPersonInfo(index, item,'director')">
            <div class="peopleListElementTitle" :id="'directorListElementTitle' + index">
              {{ item._first_name }} {{ item._last_name }}
            </div>
          </div>
        </div>
        <div class="peopleListSortDiv">
          <custom-select :options="[$t('popularity'),$t('rating'),'Name']" :placeholder="$t('sortBy')"
                         @select-change="setSelectedSortByWhatDirector"/>
          <custom-list-sort @sort-changed="setSelectedTypeOfSortDirector"/>
        </div>
      </div>
    </background-tile>
  </div>
</template>

<script>
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "DirectorList",
  components: {BackgroundTile, CustomListSort, CustomSelect},

  data() {
    return {
      lastIndex: null,
      lastItemId: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  props: {
    directors: Array
  },

  methods: {
    setSelectedSortByWhatDirector(arg) {
      this.selectedSortByWhat = arg;
      this.sortPeopleList(this.directors);
    },

    setSelectedTypeOfSortDirector(arg) {
      this.selectedTypeOfSort = arg;
      this.sortPeopleList(this.directors);
    },

    sortPeopleList(array) {
      if ((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Ascending') {
        array.sort((a, b) => a._popularity - b._popularity)
      } else if ((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Descending') {
        array.sort((a, b) => b._popularity - a._popularity)
      } else if ((this.selectedSortByWhat === 'Rating' || this.selectedSortByWhat === 'Bewertung') && this.selectedTypeOfSort === 'Ascending') {
        array.sort((a, b) => a._rating - b._rating)
      } else if ((this.selectedSortByWhat === 'Rating' || this.selectedSortByWhat === 'Bewertung') && this.selectedTypeOfSort === 'Descending') {
        array.sort((a, b) => b._rating - a._rating)
      } else if (this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Ascending') {
        array.sort((a, b) => a._last_name.localeCompare(b._last_name))
      } else if (this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Descending') {
        array.sort((a, b) => b._last_name.localeCompare(a._last_name))
      }
    },

    getPersonInfo(index, person, id) {
      document.getElementById(id + 'Item' + index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById(id + 'ListElementTitle' + index).style.color = 'var(--fsm-dark-blue-4)';
      if (this.lastIndex !== null) {
        document.getElementById(this.lastItemId + 'Item' + this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
        document.getElementById(this.lastItemId + 'ListElementTitle' + this.lastIndex).style.color = 'unset';
      }
      this.lastIndex = index;
      this.lastItemId = id;

      this.$emit('sendPerson', person);
    },
  }
}
</script>

<style scoped>
#peopleList {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  padding: 15px;
  width: 350px;
}

.peopleListContainer {
  width: 100%;
}

.peopleListScroll {
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.peopleListSortDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  margin-top: 20px;
}

#peopleListSelect {
  margin: 15px;
}

.peopleListElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 0 10px 15px;
}
</style>