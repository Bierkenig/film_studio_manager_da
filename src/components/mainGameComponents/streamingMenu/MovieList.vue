<template>
  <div class="movieListContainer">
    <div id="movieList">
      <div class="movieListScroll">
        <div v-for="(item, index) in movieData" :id="'item' + index" :key="index" class="movieListElement" @click="getStaffInfo(index, item)">
          <div class="movieListElementTitle">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieList",

  props: {
    movieData: Array
  },

  data(){
    return {
      lastIndex: null,
    }
  },

  methods: {
    getStaffInfo(index, movie) {
      document.getElementById('item' + index).style.backgroundColor = 'rgb(255, 70, 85)';
      if (this.lastIndex !== null) {
        document.getElementById('item' + this.lastIndex).style.backgroundColor = 'unset';
      }
      this.lastIndex = index;

      this.$emit('sendMovie',movie);
    }
  }
}
</script>

<style scoped>

</style>