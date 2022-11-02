<template>
  <div>
    <div id="staffList">
      <div id="staffListSortBar">
        <div id="staffListSortByHint">Sort by</div>
        <div id="staffListSorts">
          <div id="sortName" class="staffListSorts">
            <div id="sortNameHint" class="staffListSortTitle">Name</div>↓
          </div>
          <div id="sortSalary" class="staffListSorts">
            <div id="sortSalaryHint" class="staffListSortTitle">Salary</div>↓
          </div>
          <div id="sortRating" class="staffListSorts">
            <div id="sortRatingHint" class="staffListSortTitle">Rating</div>↓
          </div>
        </div>
      </div>
      <div class="staffListScroll">
        <div v-for="(item, index) in staff" :id="'item' + index" :key="index" class="staffListElement" @click="getStaffInfo(index)">
          <div class="staffListElementTitle">
            {{ item.firstName }} {{ item.lastName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StaffList",

  props: {
    staff: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      lastIndex: null,
      lastSort: null,
      countSameLastSort: 1,
    }
  },

  methods: {
    getStaffInfo(index){
      document.getElementById('item'+index).style.backgroundColor = 'rgb(255, 70, 85)';
      if(this.lastIndex !== null){
        document.getElementById('item'+this.lastIndex).style.backgroundColor = '#1C222F';
      }
      this.lastIndex = index;
    },
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
</style>