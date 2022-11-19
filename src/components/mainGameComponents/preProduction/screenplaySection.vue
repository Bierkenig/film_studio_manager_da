<template>
  <div>
    <div>
      <div>{{$t('buyScreenplaySection.buyScreenplay')}}</div>
      <div v-for="(el, index) in screenplays" :key="index">
        {{el.title}} / {{el.genre}} / {{el.ageRating}} / {{el.writer}} / {{el.description}} / {{el.rating}} / {{el.price}}
        <button @click="buy(el)">{{$t('buyScreenplaySection.buy')}}</button>
      </div>
    </div>
    <div>
      <div>{{$t('buyScreenplaySection.create')}}</div>
      <div>{{$t('buyScreenplaySection.expand')}}</div>
      <div v-for="(el, index) in franchises" :key="index">
        {{el.name}}
        <button @click="this.$router.push({name: 'createScreenplay', params: { franchise: el}})">{{$t('buyScreenplaySection.expand')}}</button>
      </div>
      <div>{{$t('buyScreenplaySection.new')}}</div>
      <button @click="this.$router.push('/createScreenplay')">{{$t('buyScreenplaySection.create2')}}</button>
    </div>
    <div>
      <div>{{$t('buyScreenplaySection.existing')}}</div>
      <div v-for="(el, index) in boughtScreenplays" :key="index">
        {{el.title}} / {{el.genre}} / {{el.ageRating}} / {{el.writer}} / {{el.description}} / {{el.rating}} / {{el.price}}
        <button @click="buy(el)">{{$t('buyScreenplaySection.buy')}}</button>
      </div>
    </div>
    <div>
      <div>{{$t('buyScreenplaySection.pitch')}}</div>
      <div v-for="(el, index) in directors" :key="index">
        {{el.getFullName}} / {{el.age}} / {{el.rating}}
        <button @click="showModal = true">{{$t('buyScreenplaySection.idea')}}</button>
      </div>
      <transition name="modal">
        <div v-if="showModal">hallo</div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "screenplaySection",

  data() {
    return {
      screenplays: this.$store.getters.getAllScreenplays,
      boughtScreenplays: this.$store.getters.getBoughtScreenplays,
      franchises: this.$store.getters.getFranchises,
      directors: this.$store.getters.getAllDirectors,
      showModal: false,
    }
  },

  methods: {
    buy(screenplay) {
      this.$store.state.boughtScreenplays.push(screenplay)
      this.$store.state.balance -= screenplay.price
    },
  }
}
</script>

<style scoped>

</style>