<template>
  <div class="movieItemContainer">
    <h3>{{movie.title}}</h3>
    <div class="movieItemInformation">
      <div class="movieItemPopularity">
        <!--TODO: Popularity von Film anzeigen-->
        78
      </div>
      <div class="movieItemInformationText">
        <div class="movieItemOwnerContract">
          <div>Owner</div>
          <div>{{movie.owner}}</div>
        </div>
        <div class="movieItemOwnerContract">
          <div>Contract</div>
          <div v-if="movie.contract === 0">Unlimited</div>
          <div v-else>{{movie.contract}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {Movie} from "@/classes/Movie";

export default {
  name: "MovieItem",

  props: {
    movie: Movie
  }
}
</script>

<style scoped>
.movieItemContainer {
  background-color: #2c3e50;
}

.movieItemInformation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.movieItemInformationText {
  display: flex;
  flex-direction: column;
}

.movieItemOwnerContract {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
}

.movieItemPopularity {
  background-color: black;
}
</style>