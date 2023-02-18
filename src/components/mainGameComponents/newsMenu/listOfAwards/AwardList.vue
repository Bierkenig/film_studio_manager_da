<template>
  <div>
    <div id="awardList">
      <div class="awardListSortDiv">
        <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
      </div>
      <div class="awardListScroll">
        <div class="awardListScrollContainer verticalScroll">
          <div v-for="(item, index) in data" :id="'awardItem' + index" :key="index" class="awardListElement" @click="getAwardInfo(index, item)">
            <div class="awardListElementTitle" :id="'awardListElementTitle' + index">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";

export default {
  name: "AwardList",
  components: {CustomListSort},

  data(){
    return {
      allAwards: this.$store.getters.getCreatedAwards.concat(this.$store.getters.getAllAwards),
      data: [],
      lastIndex: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  mounted() {
    this.allAwards.forEach((award) => {
      if(!this.data.includes(award.year.getFullYear())){
        this.data.push(award.year.getFullYear())
      }
    })
  },

  methods: {
    setSelectedTypeOfSort(arg){
      this.selectedTypeOfSort = arg;
      this.sortYear();
    },

    sortYear(){
      if(this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a - b)
      } else if(this.selectedTypeOfSort === 'Descending') {
        this.data.sort((a, b) => b - a)
      }
    },

    getAwardInfo(index, year){
      document.getElementById('awardItem'+index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById('awardListElementTitle'+index).style.color = 'var(--fsm-dark-blue-4)';
      if(this.lastIndex !== null){
        document.getElementById('awardItem'+this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
        document.getElementById('awardListElementTitle'+this.lastIndex).style.color = 'unset';
      }
      this.lastIndex = index;

      this.$emit('sendYear',year);
    },
  }
}
</script>

<style scoped>
#awardList {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);

  padding: 15px;
  width: 350px;
}

.awardListScroll {
  height: 500px;
}

.awardListScrollContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 500px;
}

.awardListSortDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  margin-bottom: 20px;
}

.awardListElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 0 10px 15px;
}
</style>