<template>
  <div>
    <div id="staffList">
      <div class="staffListScroll">
        <div v-for="(item, index) in staff" :id="'item' + index" :key="index" class="staffListElement" @click="getStaffInfo(index, item)">
          <div class="staffListElementTitle">
            {{ item.firstName }} {{ item.lastName }}
          </div>
          <div class="moreStaffListElementInfo">
            <div class="staffListElementSalary">$ {{ item.salary }}</div>
            <div class="staffListElementRating">{{ item.rating }}</div>
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
    }
  },

  methods: {
    getStaffInfo(index, staff){
      document.getElementById('item'+index).style.backgroundColor = 'rgb(255, 70, 85)';
      if(this.lastIndex !== null){
        document.getElementById('item'+this.lastIndex).style.backgroundColor = 'unset';
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
</style>