<template>
  <div>
    <div id="staffList">
      <div class="staffListSortDiv">
        <custom-select :options="['Popularity','Rating','Salary']" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
        <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
      </div>
      <div class="staffListScroll verticalScroll">
        <div v-for="(item, index) in data" :id="'item' + index" :key="index" class="staffListElement" @click="getStaffInfo(index, item)">
          <div class="staffListElementTitle" :id="'staffListElementTitle' + index">
            {{ item._first_name }} {{ item._last_name }}
          </div>
          <!--<div class="moreStaffListElementInfo">
            <div class="staffListElementSalary">$ {{ item._salary }}</div>
            <div class="staffListElementRating">{{ item._rating }}</div>
            <div class="staffListElementGenreRating">{{ item._rating }}</div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";

export default {
  name: "StaffList",
  components: {CustomListSort, CustomSelect},

  props: {
    staff: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      data: this.staff,
      lastIndex: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  methods: {
    setSelectedSortByWhat(arg){
      this.selectedSortByWhat = arg;
      this.sortStaffList();
    },

    setSelectedTypeOfSort(arg){
      this.selectedTypeOfSort = arg;
      this.sortStaffList();
    },

    sortStaffList(){
      if(this.selectedSortByWhat === 'Popularity' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._popularity - b._popularity)
      } else if(this.selectedSortByWhat === 'Popularity' && this.selectedTypeOfSort === 'Descending') {
        this.data.sort((a, b) => b._popularity - a._popularity)
      } else if(this.selectedSortByWhat === 'Rating' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._rating - b._rating)
      } else if(this.selectedSortByWhat === 'Rating' && this.selectedTypeOfSort === 'Descending'){
        this.data.sort((a, b) => b._rating - a._rating)
      } else if(this.selectedSortByWhat === 'Salary' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => parseInt(a._salary.replaceAll('.','')) - parseInt(b._salary.replaceAll('.','')))
      } else if(this.selectedSortByWhat === 'Salary' && this.selectedTypeOfSort === 'Descending'){
        this.data.sort((a,b) => parseInt(b._salary.replaceAll('.','')) - parseInt(a._salary.replaceAll('.','')))
      }
    },

    getStaffInfo(index, staff){
      document.getElementById('item'+index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById('staffListElementTitle'+index).style.color = 'var(--fsm-dark-blue-4)';
      if(this.lastIndex !== null){
        document.getElementById('item'+this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
        document.getElementById('staffListElementTitle'+this.lastIndex).style.color = 'unset';
      }
      this.lastIndex = index;

      this.$emit('sendStaff',staff);
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
    }
  }
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-button {
  height: 1.5em;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1C222F;
  border-radius: 20px 20px 20px 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(226,226,226);
  border-radius: 20px 20px 20px 20px;
}

#staffList {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  width: 350px;
}

.staffListScroll {
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.staffListSortDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  margin-bottom: 20px;
}

.staffListElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 0 10px 15px;
}
</style>