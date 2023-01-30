<template>
<div class="movieDetails">
  <div class="movieDetailsHeader">
    <icon-button icon="simple-arrow-left" dark @click="$router.go(-1)"/>
    <settings-header/>
  </div>
  <div class="movieDetailsContent">
    <background-tile class="movieDetailsContentTile" title="General (use dann translation please)">
      Content
    </background-tile>
  </div>
</div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import SettingsHeader from "@/components/startComponents/SettingsHeader.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "MovieDetails",
  components: {BackgroundTile, SettingsHeader, IconButton},
  mounted() {
    console.log(this.$store.getters.getCurrentMovieDetails);
  },
}
</script>

<style scoped>
.movieDetails {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.movieDetailsHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.movieDetailsContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.movieDetailsContentTile {
  text-align: left;
}
</style>