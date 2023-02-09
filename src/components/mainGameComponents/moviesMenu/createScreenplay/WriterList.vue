<template>
  <div>
    <div id="writerList">
      <div class="writerListSortDiv">
        <custom-select :options="[$t('popularity'),$t('rating'),'Name']" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
        <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
      </div>
      <div class="writerListScroll">
        <div v-show="!disableWriterList" class="writerListScrollContainer verticalScroll">
          <div v-for="(item, index) in writers" :id="'writerItem' + index" :key="index" class="writerListElement" @click="getWriterInfo(index, item)">
            <div class="writerListElementTitle" :id="'writerListElementTitle' + index">
              {{ item._first_name }} {{ item._last_name }}
            </div>
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
    },
    disableWriterList: {
      type: Boolean
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
      if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Ascending'){
        this.writers.sort((a, b) => a._popularity - b._popularity)
      } else if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Descending') {
        this.writers.sort((a, b) => b._popularity - a._popularity)
      } else if((this.selectedSortByWhat === 'Rating' || this.selectedSortByWhat === 'Bewertung') && this.selectedTypeOfSort === 'Ascending'){
        this.writers.sort((a, b) => a._rating - b._rating)
      } else if((this.selectedSortByWhat === 'Rating' || this.selectedSortByWhat === 'Bewertung') && this.selectedTypeOfSort === 'Descending'){
        this.writers.sort((a, b) => b._rating - a._rating)
      } else if(this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Ascending'){
        this.writers.sort((a, b) => a._last_name.localeCompare(b._last_name))
      } else if(this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Descending'){
        this.writers.sort((a,b) => b._last_name.localeCompare(a._last_name))
      }
    },

    getWriterInfo(index, writer){
      document.getElementById('writerItem'+index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById('writerListElementTitle'+index).style.color = 'var(--fsm-dark-blue-4)';
      if(this.lastIndex !== null){
        document.getElementById('writerItem'+this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
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
#writerList {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  padding: 15px;
  width: 350px;
}

.writerListScroll {
  height: 500px;
}

.writerListScrollContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 500px;
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