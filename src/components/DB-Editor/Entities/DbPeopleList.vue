<template>
  <background-tile :title="$t(type.toLowerCase())" id="peopleList">
    <div class="peopleListContainer">
      <div class="peopleListScroll verticalScroll">
        <div v-for="(item, index) in people" :id="'peopleItem' + index" :key="index" class="peopleListElement"
             @click="getPersonInfo(index, item, 'people')">
          <div class="peopleListElementTitle" :id="'peopleListElementTitle' + index">
            {{ item._first_name }} {{ item._last_name }}
          </div>
        </div>
      </div>
      <div class="peopleListSortDiv">
        <custom-select :options="[$t('popularity'),$t('rating'),'Name']" :placeholder="$t('sortBy')"
                       @select-change="setSelectedSortByWhatpeople"/>
        <custom-list-sort @sort-changed="setSelectedTypeOfSortpeople"/>
      </div>
    </div>
  </background-tile>
</template>

<script>
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "DbPeopleList",
  components: {BackgroundTile, CustomListSort, CustomSelect},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      lastIndex: null,
      lastItemId: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  props: {
    people: Object,
    type: String,
  },

  methods: {
    setSelectedSortByWhatpeople(arg) {
      this.selectedSortByWhat = arg;
      this.sortPeopleList(this.people);
    },

    setSelectedTypeOfSortpeople(arg) {
      this.selectedTypeOfSort = arg;
      this.sortPeopleList(this.people);
    },

    setSelectedSortByWhatWriter(arg) {
      this.selectedSortByWhat = arg;
      this.sortPeopleList(this.writers);
    },

    setSelectedTypeOfSortWriter(arg) {
      this.selectedTypeOfSort = arg;
      this.sortPeopleList(this.writers);
    },

    setSelectedSortByWhatActor(arg) {
      this.selectedSortByWhat = arg;
      this.sortPeopleList(this.actors);
    },

    setSelectedTypeOfSortActor(arg) {
      this.selectedTypeOfSort = arg;
      this.sortPeopleList(this.actors);
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
.peopleListContainer {
  width: 100%;
}

.peopleListScroll {
  height: 60vh;
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