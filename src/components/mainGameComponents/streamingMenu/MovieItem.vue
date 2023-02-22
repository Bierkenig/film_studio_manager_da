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
          <div>{{ $t('owner') }}</div>
          <div>{{movie.owner}}</div>
        </div>
        <div class="movieItemOwnerContract">
          <div>{{ $t('contract') }}</div>
          <div v-if="movie.contract === 0">{{ $t('unlimited') }}</div>
          <div v-else>{{movie.contract}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {Movie} from "@/classes/Movie";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MovieItem",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  props: {
    movie: Movie
  }
}
</script>

<style scoped>
.movieItemContainer {
  flex: 0 0 30%;
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