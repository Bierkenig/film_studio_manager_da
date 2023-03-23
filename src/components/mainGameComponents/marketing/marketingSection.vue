<template>
  <div>
    <div>{{$t('marketingSection.interest')}}</div>
    <div>{{$t('marketingSection.children')}} - {{children}}</div>
    <div>{{$t('marketingSection.teenager')}} - {{teenager}}</div>
    <div>{{$t('marketingSection.adult')}} - {{adult}}</div>

    <div>{{$t('marketingSection.champaign')}}</div>

    <div>{{$t('marketingSection.print')}}</div>
    <div>{{$t('marketingSection.poster')}}</div>
    <input type="number" v-model="posters.value">
    <div>{{$t('marketingSection.price')}}{{roundBudget(posters.price)}}</div>
    <div>{{$t('marketingSection.ads')}}</div>
    <input type="number" v-model="ads.value">
    <div>{{$t('marketingSection.price')}}{{roundBudget(ads.price)}}</div>

    <div>{{$t('marketingSection.internet')}}</div>
    <div>{{$t('marketingSection.social')}}</div>
    <label class="switch">
      <input type="checkbox" v-model="social.check">
      <span class="slider round"></span>
    </label>
    <div>{{$t('marketingSection.price')}}{{social.check ? roundBudget(social.price) : ""}}</div>

    <div>{{$t('marketingSection.video')}}</div>
    <label class="switch">
      <input type="checkbox" v-model="videoCampaign.check">
      <span class="slider round"></span>
    </label>
    <div>{{$t('marketingSection.price')}}{{videoCampaign.check ? roundBudget(videoCampaign.price) : ""}}</div>

    <div>{{$t('marketingSection.commercials')}}</div>
    <label class="switch">
      <input type="checkbox" v-model="commercials.check">
      <span class="slider round"></span>
    </label>
    <div>{{$t('marketingSection.price')}}{{commercials.check ? roundBudget(commercials.price) : ""}}</div>

    <button @click="startMarketing()">{{$t('marketingSection.start')}}</button>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "marketingSection",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  props: {
    children: Number,
    teenager: Number,
    adult: Number,
  },

  data() {
    return {
      posters: {
        value: 0,
        price: this.calcPricePrint()
      },
      ads: {
        value: 0,
        price: this.calcPriceAds(),
      },
      social: {
        check: false,
        price: 0
      },
      videoCampaign: {
        check: false,
        price: 0
      },
      commercials: {
        check: false,
        price: 0,
      }
    }
  },

  methods: {
    startMarketing() {
      this.$store.state.currentMovie.popularity.children *= ((100 - this.children) + 100) / 100
      this.$store.state.currentMovie.popularity.teenager *= ((100 - this.teenager) + 100) / 100
      this.$store.state.currentMovie.popularity.adult *= ((100 - this.adult) + 100) / 100

      this.$store.commit('subtractBalance',this.posters.price + this.ads.price + this.social.price + this.videoCampaign.price + this.commercials.price)
    },

    roundBudget(labelValue){
      if(this.$store.getters.getCurrentLanguage === 'en'){
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                    : Math.abs(Number(labelValue));
      } else {
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " Mrd"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " Mio"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " T"

                    : Math.abs(Number(labelValue));
      }
    },

    calcPricePrint() {
      //TODO
      return 0
    },

    calcPriceAds() {
      //TODO
      return 0
    }
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>