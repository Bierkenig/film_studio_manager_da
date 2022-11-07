<template>
  <div>
    <h1>Screenplay Information</h1>
    <div>
      <p>{{ $t('newsData.title') }}: {{ screenplay.title }}</p>
      <p>Type: {{ screenplay.type }}</p>
      <p>Genre: {{ screenplay.genre }}</p>
      <p>Subgenre: {{ screenplay.subgenre }}</p>
      <p>{{ $t('ageRating') }}: {{ screenplay.ageRating }}</p>
      <p>{{ $t('writer') }}: {{ screenplay.writer.firstName }} {{ screenplay.writer.lastName }}</p>
      <p>{{ $t('description') }}: {{ screenplay.description }}</p>
      <p>{{ $t('rating') }}: {{ screenplay.rating }}</p>
      <p>{{ $t('price') }}: {{ screenplay.price }}</p>
      <p>{{ $t('topics') }}: <span v-for="(it, index) in screenplay.topics" :key="index">{{ it }}&nbsp;</span></p>
      <div>
        <p>{{ $t('roles') }}</p>
        <p>{{ $t('main') }}: </p>
        <p v-for="(it, index) in screenplay.roles['main']" :key="index">{{ it.name }}, {{ it.gender }}, {{ it.age }}</p>
        <p>{{ $t('support') }}: </p>
        <p v-for="(it, index) in screenplay.roles['support']" :key="index">{{ it.name }}, {{ it.gender }}, {{ it.age }}</p>
        <p>Minor: </p>
        <p v-for="(it, index) in screenplay.roles['minor']" :key="index">{{ it.name }}, {{ it.gender }}, {{ it.age }}</p>
        <p v-if="screenplay.roles['cameo'].length !== 0">Cameo: </p>
        <p v-for="(it, index) in screenplay.roles['cameo']" :key="index">{{ it.name }}, {{ it.gender }}, {{ it.age }}</p>
        <p v-if="screenplay.roles['voiceOver'].length !== 0">{{ $t('voiceOver') }}: </p>
        <p v-for="(it, index) in screenplay.roles['voiceOver']" :key="index">{{ it.name }}, {{ it.gender }}, {{ it.age }}</p>
      </div>
      <div>
        <p>{{ $t('acts') }}</p>
        <div v-if="this.$store.getters.getCurrentLanguage === 'en'">
          <p>{{ $t('act1') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act1']" :key="index">
            <p v-for="(item,ind) in it" :key="ind">
              {{ item.textEn }}
            </p>
          </div>
          <p>{{ $t('act2') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act2']" :key="index">
            <p v-for="(item,ind) in it" :key="ind">
              {{ item.textEn }}
            </p>
          </div>
          <p>{{ $t('act3') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act3']" :key="index">
            <p v-for="(item,ind) in it" :key="ind">
              {{ item.textEn }}
            </p>
          </div>
        </div>
        <div v-else>
          <p>{{ $t('act1') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act1']" :key="index">
            <p v-for="(item,ind) in it" :key="ind">
              {{ item.textDe }}
            </p>
          </div>
          <p>{{ $t('act2') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act2']" :key="index">
            <p v-for="(item,ind) in it" :key="ind">
              {{ item.textDe }}
            </p>
          </div>
          <p>{{ $t('act3') }}:</p>
          <div v-for="(it, index) in screenplay.acts['act3']" :key="index">
            <p v-for="(item,ind) in it" :key="ind">
              {{ item.textDe }}
            </p>
          </div>
        </div>
      </div>
      <p>Details: <span v-for="(it,index) in screenplay.details" :key="index">{{ index }}: {{ it }}&nbsp;</span></p>
      <p>{{ $t('ageRating') }} Details: <span v-for="(it,index) in screenplay.ageRatingDetails" :key="index">{{ index }}: {{ it }}&nbsp;</span></p>
      <p>{{ $t('screenplayLength') }}: {{ screenplay.length }}</p>
      <p>{{ $t('writingPhase') }}: {{ screenplay.writingPhase }}</p>
    </div>
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
      this.$store.commit('addScreenplay', this.screenplay);
      this.$store.commit('subtractBalance', this.screenplay.price);
      console.log(this.$store.getters.getScreenplays);
    }
  }
}
</script>

<style scoped>
* {
  text-align: center;
}
</style>