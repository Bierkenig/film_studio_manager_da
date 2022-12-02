<template>
  <div>
    <div>{{$t('marketingSection.interest')}}</div>
    <div>{{$t('marketingSection.children')}} - {{children}}</div>
    <div>{{$t('marketingSection.teenager')}} - {{teenager}}</div>
    <div>{{$t('marketingSection.adult')}} - {{adult}}</div>

    <div>{{$t('marketingSection.trailer')}}</div>
    <div>{{$t('marketingSection.scope')}}{{scope}}</div>
    <div>1: </div>
    <button>{{$t('marketingSection.add')}}</button>
    <div v-if="scope === 'normal' || scope === 'large' || scope === 'epic'">2: </div>
    <button v-if="scope === 'normal' || scope === 'large' || scope === 'epic'" >{{$t('marketingSection.add')}}</button>
    <div v-if="scope === 'epic'">3: </div>
    <button v-if="scope === 'epic'">{{$t('marketingSection.add')}}</button>

    <div></div>
  </div>
</template>

<script>
export default {
  name: "marketingSection",

  props: {
    children: Number,
    teenager: Number,
    adult: Number,
  },

  data() {
    return {
      scope: this.$store.state.preProduction.currentScreenplay.details.scope
    }
  }
}
</script>

<style scoped>

</style>