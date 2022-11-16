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
        <div id="writerDetailsGenreRating">
          <div v-show="showDetails" id="writerDetailsGenreRatingHint">Genre Rating</div>
          <div id="writerDetailsGenreRatingValue">!NOCH ZUM MACHEN!<div v-show="!showDetails" class="writerDetailsInvisible">X</div></div>
        </div>
        <div id="writerDetailsSalary" class="element">
          <div v-show="showDetails" id="writerDetailsSalaryHint">{{ $t('salary') }}</div>
          <div id="writerDetailsSalaryValue"><div v-show="showDetails">$ {{ staffSalary }}</div><div v-show="!showDetails" class="writerDetailsInvisible">X</div></div>
        </div>
      </div>
      <router-link :to="{name: this.nextLocation}">
        <button v-if="type === 'Writer'" id="hireWriterButton" class="buttonStyle" @click="hireWriter" :disabled="checkBalance">{{ $t('hireWriter') }}</button>
        <button v-if="type === 'Director'" id="hireDirectorButton" class="buttonStyle" @click="hireDirector" :disabled="checkBalance">{{ $t('hireDirector') }}</button>
        <button v-if="type === 'Actor'" id="hireActorButton" class="buttonStyle" @click="hireActor" :disabled="checkBalance">{{ $t('hireActor') }}</button>
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
    type: String,
    nextLocation: String,
  },

  data() {
    return {
      showDetails: false,
      staffName: '',
      staffRating: '',
      staffGenre: '',
      staffSalary: '',
      staffGender: 'iconPlaceholder',
      copiedPrice: '',
      oldWriter: ''
    }
  },

  mounted() {
   this.copiedPrice = this.$store.getters.getCurrentScreenplay.price;
   this.oldWriter = this.$store.getters.getCurrentScreenplay.writer;
  },

  watch: {
    staff: function(){
      if (this.staff.length !== 0) {
        this.showDetails = true;
        this.staffName = this.staff._first_name + ' ' + this.staff._last_name;
        this.staffRating = this.staff._rating;
        //this.staffGenre = this.writer.genres[this.screenplay.getGenre()];
        this.staffSalary = this.staff._salary;
        this.staffGender = this.staff._gender.substr(1, this.staff.gender.length - 2);
      }
    }
  },

  methods: {
    hireActor(){
      console.log('FUNKTION NOCH NICHT EINGEBAUT')
    },

    hireDirector(){
      console.log('FUNKTION NOCH NICHT EINGEBAUT')
    },

    hireWriter(){
      console.log(this.copiedPrice);
      //this.screenplay.setRating(Math.round((this.staff.genres[this.screenplay.getGenre()] * 65 + this.staff.rating * 35) / 100));
      this.screenplay.setWriter(this.staff);
      if(this.oldWriter === this.staff){
        this.screenplay.setPrice(this.copiedPrice + (this.staff._salary/2));
        this.$store.commit('subtractBalance', (this.staff._salary/2));
      } else {
        this.screenplay.setPrice(this.copiedPrice + this.staff._salary);
        this.$store.commit('subtractBalance', this.staff._salary);
      }

      let betterGenreRating = ((this.staff._rating * 2 + this.staff._talent) / 3);
      this.screenplay.setRating((betterGenreRating + parseInt(this.staff._performance)) / 2)

      this.screenplay.setRatingRange((Math.ceil(this.screenplay.rating / 10) * 10) - 9 + ' - ' + (Math.ceil(this.screenplay.rating / 10) * 10))

      if(this.screenplay.getType === 'Feature' || this.screenplay.getType === 'Animation'){
        if(this.staff._rating >= 1 && this.staff._rating <= 25){
          this.screenplay.setWritingPhase(18)
        } else if(this.staff._rating >= 26 && this.staff._rating <= 50){
          this.screenplay.setWritingPhase(16)
        } else if(this.staff._rating >= 51 && this.staff._rating <= 75){
          this.screenplay.setWritingPhase(14)
        } else if(this.staff._rating >= 76 && this.staff._rating <= 100){
          this.screenplay.setWritingPhase(12)
        }
      } else {
        if(this.staff._rating >= 1 && this.staff._rating <= 25){
          this.screenplay.setWritingPhase(14)
        } else if(this.staff._rating >= 26 && this.staff._rating <= 50){
          this.screenplay.setWritingPhase(12)
        } else if(this.staff._rating >= 51 && this.staff._rating <= 75){
          this.screenplay.setWritingPhase(10)
        } else if(this.staff._rating >= 76 && this.staff._rating <= 100){
          this.screenplay.setWritingPhase(8)
        }
      }
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