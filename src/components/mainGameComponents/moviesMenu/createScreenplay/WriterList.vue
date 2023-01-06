<template>
  <div>
    <div id="writerList">
      <div class="writerListSortDiv">
        <custom-select :options="['Popularity','Rating','Salary']" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
        <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
      </div>
      <div class="writerListScroll verticalScroll">
        <div v-for="(item, index) in writers" :id="'item' + index" :key="index" class="writerListElement" @click="getWriterInfo(index, item)">
          <div class="writerListElementTitle" :id="'writerListElementTitle' + index">
            {{ item._first_name }} {{ item._last_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";

export default {
  name: "WriterList",
  components: {CustomListSort, CustomSelect},

  props: {
    writerList: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      writers: this.writerList,
      lastIndex: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  methods: {
    setSelectedSortByWhat(arg){
      this.selectedSortByWhat = arg;
      this.sortWriterList();
    },

    setSelectedTypeOfSort(arg){
      this.selectedTypeOfSort = arg;
      this.sortWriterList();
    },

    sortWriterList(){
      if(this.selectedSortByWhat === 'Popularity' && this.selectedTypeOfSort === 'Ascending'){
        this.writers.sort((a, b) => a._popularity - b._popularity)
      } else if(this.selectedSortByWhat === 'Popularity' && this.selectedTypeOfSort === 'Descending') {
        this.writers.sort((a, b) => b._popularity - a._popularity)
      } else if(this.selectedSortByWhat === 'Rating' && this.selectedTypeOfSort === 'Ascending'){
        this.writers.sort((a, b) => a._rating - b._rating)
      } else if(this.selectedSortByWhat === 'Rating' && this.selectedTypeOfSort === 'Descending'){
        this.writers.sort((a, b) => b._rating - a._rating)
      } else if(this.selectedSortByWhat === 'Salary' && this.selectedTypeOfSort === 'Ascending'){
        this.writers.sort((a, b) => parseInt(a._salary.replaceAll('.','')) - parseInt(b._salary.replaceAll('.','')))
      } else if(this.selectedSortByWhat === 'Salary' && this.selectedTypeOfSort === 'Descending'){
        this.writers.sort((a,b) => parseInt(b._salary.replaceAll('.','')) - parseInt(a._salary.replaceAll('.','')))
      }
    },

    getWriterInfo(index, writer){
      document.getElementById('item'+index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById('writerListElementTitle'+index).style.color = 'var(--fsm-dark-blue-4)';
      if(this.lastIndex !== null){
        document.getElementById('item'+this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
        document.getElementById('writerListElementTitle'+this.lastIndex).style.color = 'unset';
      }
      this.lastIndex = index;

      this.$emit('sendWriter',writer);
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

#writerList {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  width: 350px;
}

.writerListScroll {
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.writerListSortDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  margin-bottom: 20px;
}

.writerListElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 0 10px 15px;
}
</style>