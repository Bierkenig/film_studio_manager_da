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
          <div v-show="showDetails" id="writerDetailsGenreRatingHint">Genre {{ $t('rating') }}</div>
          <div id="writerDetailsGenreRatingValue">{{ staffGenre }}<div v-show="!showDetails" class="writerDetailsInvisible">X</div></div>
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
      staffSalary: 0,
      staffGender: 'iconPlaceholder',
      copiedPrice: 0,
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
        this.staffGenre = this.staff._genre[this.$store.getters.getCurrentScreenplay.genre];
        this.staffSalary = parseInt(this.staff._salary.replaceAll('.',''));
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
      this.screenplay.setWriter(this.staff);
      if(this.oldWriter === this.staff){
        this.screenplay.setPrice(this.copiedPrice + (this.staffSalary/2));
        this.$store.commit('subtractBalance', (this.staffSalary/2));
      } else {
        this.screenplay.setPrice(this.copiedPrice + this.staffSalary);
        this.$store.commit('subtractBalance', this.staffSalary);

      }

      if(this.$store.getters.getCurrentScreenplay.rewritingStatus){
        const arr = ['+', '-'];
        let weight = {
          A: 0.5,
          B: 0.3,
          C: 0.2
        };
        if(this.staff._rating >= 1 && this.staff._rating <= 25){
          weight = {
            '+': 0.35,
            '-': 0.65
          }
        } else if(this.staff._rating >= 26 && this.staff._rating <= 50){
          weight = {
            '+': 0.5,
            '-': 0.5
          }
        } else if(this.staff._rating >= 51 && this.staff._rating <= 75){
          weight = {
            '+': 0.75,
            '-': 0.25
          }
        } else if(this.staff._rating >= 76 && this.staff._rating <= 100){
          weight = {
            '+': 0.85,
            '-': 0.15
          }
        }
        const find = input =>
            arr.find((el, i) => {
              const sum = arr.slice(0, i + 1).reduce((acc, el) => {
                return acc + weight[el];
              }, 0);

              if (input < sum) {
                return true;
              }

              return false;
            });

        let result = find(Math.random());
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        if(result == '-'){
          this.screenplay.setRating(this.screenplay.rating - randomNumber);
        } else {
          this.screenplay.setRating(this.screenplay.rating + randomNumber);
        }
      } else {
        let betterGenreRating = ((parseInt(this.staffGenre) * 2 + this.staff._talent) / 3);
        this.screenplay.setRating((betterGenreRating + parseInt(this.staff._performance)) / 2)
      }

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