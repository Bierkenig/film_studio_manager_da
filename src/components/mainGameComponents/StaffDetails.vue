<template>
  <div id="writerDetailsDiv">
    <div id="writerDetailsVertical">
      <div id="writerName">
        {{ staffName }}
        <div v-show="!showDetails" class="writerDetailsInvisible">X</div>
      </div>
      <div id="writerDetailsData">
        <div id="writerDetailsRating">
          <div v-show="showDetails" id="writerDetailsRatingHint">{{ $t('rating') }}</div>
          <div id="writerDetailsRatingValue">{{ staffRating }}<div v-show="!showDetails" class="writerDetailsInvisible">X</div></div>
        </div>
        <div id="writerDetailsGenre">
          <div v-show="showDetails" id="writerDetailsGenreHint">Genre</div>
          <div id="writerDetailsGenreValue">{{ staffGenre }}<div v-show="!showDetails" class="writerDetailsInvisible">X</div></div>
        </div>
        <div id="writerDetailsSalary" class="element">
          <div v-show="showDetails" id="writerDetailsSalaryHint">{{ $t('salary') }}</div>
          <div id="writerDetailsSalaryValue"><div v-show="showDetails">$ {{ staffSalary }}</div><div v-show="!showDetails" class="writerDetailsInvisible">X</div></div>
        </div>
      </div>
      <router-link :to="{name: 'movies'}">
        <button id="hireWriterButton" class="buttonStyle" @click="hireWriter" :disabled="checkBalance">{{ $t('hire'+type) }}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {Screenplay} from "@/classes/Screenplay";

export default {
  name: "WriterDetails",

  props: {
    staff: Object,
    checkBalance: Boolean,
    screenplay: Screenplay,
    type: String
  },

  data() {
    return {
      showDetails: false,
      staffName: '',
      staffRating: '',
      staffGenre: '',
      staffSalary: '',
      staffGender: 'iconPlaceholder',
    }
  },

  watch: {
    staff: function(){
      if (this.staff.length !== 0) {
        this.showDetails = true;
        this.staffName = this.staff.firstName + ' ' + this.staff.lastName;
        this.staffRating = this.staff.rating;
        //this.staffGenre = this.writer.genres[this.screenplay.getGenre()];
        this.staffSalary = this.staff.salary;
        this.staffGender = this.staff.gender.substr(1, this.staff.gender.length - 2);
      }
    }
  },

  methods: {
    hireWriter(){
      //this.screenplay.setRating(Math.round((this.staff.genres[this.screenplay.getGenre()] * 65 + this.staff.rating * 35) / 100));
      this.screenplay.setWriter(this.staff);
      this.screenplay.setPrice(this.staff.salary);
      this.$store.commit('addScreenplay', this.screenplay);
      this.$store.commit('subtractBalance', this.staff.salary);
      console.log(this.$store.getters.getScreenplays);
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
    },
  }
}
</script>

<style scoped>

</style>