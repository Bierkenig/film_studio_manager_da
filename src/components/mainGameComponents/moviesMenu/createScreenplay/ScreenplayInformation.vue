<template>
  <div>
    <h1>Screenplay Information</h1>
    <div>
      <p>{{ $t('newsData.title') }}: {{ screenplay.title }}</p>
      <p>Type: {{ screenplay.type }}</p>
      <p>Genre: {{ screenplay.genre }}</p>
      <p>Subgenre: {{ screenplay.subgenre }}</p>
      <p>{{ $t('ageRating') }}: {{ screenplay.ageRating }}</p>
      <p>{{ $t('writer') }}: {{ screenplay.writer._first_name }} {{ screenplay.writer._last_name }}</p>
      <p>{{ $t('description') }}: {{ screenplay.description }}</p>
      <p>{{ $t('rating') }}: {{ screenplay.ratingRange }}</p>
      <p>{{ $t('price') }}: {{ screenplay.price }}</p>
      <p>{{ $t('topics') }}: <span v-for="(it, index) in screenplay.topics" :key="index">{{ it }}&nbsp;</span></p>
      <div>
        <p>{{ $t('roles') }}</p>
        <p>{{ $t('main') }}: </p>
        <p v-for="(it, index) in screenplay.roles['main']" :key="index">{{ it.name }}, {{ $t(it.gender) }}, {{ it.age }}</p>
        <p>{{ $t('support') }}: </p>
        <p v-for="(it, index) in screenplay.roles['support']" :key="index">{{ it.name }}, {{ $t(it.gender) }}, {{ it.age }}</p>
        <p>Minor: </p>
        <p v-for="(it, index) in screenplay.roles['minor']" :key="index">{{ it.name }}, {{ $t(it.gender) }}, {{ it.age }}</p>
        <p v-if="screenplay.roles['cameo'].length !== 0">Cameo: </p>
        <p v-for="(it, index) in screenplay.roles['cameo']" :key="index">{{ it.name }}, {{ $t(it.gender) }}, {{ it.age }}</p>
        <p v-if="screenplay.roles['voiceOver'].length !== 0">{{ $t('voiceOver') }}: </p>
        <p v-for="(it, index) in screenplay.roles['voiceOver']" :key="index">{{ it.name }}, {{ $t(it.gender) }}, {{ it.age }}</p>
      </div>
      <div>
        <p>{{ $t('acts') }}</p>
        <div v-if="this.$store.getters.getCurrentLanguage === 'en'">
          <p>{{ $t('act1') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act1']" :key="index">
            {{ it.textEn }}
          </div>
          <p>{{ $t('act2') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act2']" :key="index">
            {{ it.textEn }}
          </div>
          <p>{{ $t('act3') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act3']" :key="index">
            {{ it.textEn }}
          </div>
        </div>
        <div v-else>
          <p>{{ $t('act1') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act1']" :key="index">
            {{ it.textDe }}
          </div>
          <p>{{ $t('act2') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act2']" :key="index">
            {{ it.textDe }}
          </div>
          <p>{{ $t('act3') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act3']" :key="index">
            {{ it.textDe }}
          </div>
        </div>
      </div>
      <p>Details: <span v-for="(it,index) in screenplay.details" :key="index">{{ $t(index) }}: {{ $t(it) }}&nbsp;</span></p>
      <p>{{ $t('ageRating') }} Details: <span v-for="(it,index) in screenplay.ageRatingDetails" :key="index">{{ $t(index) }}: {{ it }}&nbsp;</span></p>
      <p>{{ $t('screenplayLength') }}: {{ screenplay.length }}</p>
      <p>{{ $t('writingPhase') }}: {{ screenplay.writingPhase }}</p>
    </div>
    <button v-if="this.$store.getters.getCurrentScreenplay.rewritingStatus" id="backButton" class="buttonStyle" @click="goBack">{{ $t('back') }}</button>
    <router-link :to="{name: 'movies'}">
      <button @click="onButtonClick">Save Screenplay</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ScreenplayInformation",

  data(){
    return {
      screenplay: this.$store.getters.getCurrentScreenplay,
    }
  },

  methods: {
    onButtonClick(){
      let screenplays = this.$store.getters.getScreenplays;
      let position = -1;
      for (let i = 0; i < screenplays.length; i++) {
        if(screenplays[i].id === this.$store.getters.getCurrentScreenplay.id){
          position = i;
        }
      }

      if(position === -1){
        this.$store.commit('addScreenplay', this.screenplay);
      } else {
        this.$store.getters.getCurrentScreenplay.subtractRewriting();
        this.$store.getters.getCurrentScreenplay.setRewritingStatus(false);
      }
      console.log(this.$store.getters.getCurrentScreenplay);
    },

    goBack(){
      this.$router.push({name: 'hireWriter'})
    }
  }
}
</script>

<style scoped>
* {
  text-align: center;
}
</style>