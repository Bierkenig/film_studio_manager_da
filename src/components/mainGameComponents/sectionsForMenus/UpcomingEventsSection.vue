<template>
  <div id="eventsSection">
    <h1>{{ $t('upcomingEvents') }}</h1>
  </div>
</template>

<script>
export default {
  name: "UpcomingEventsSection"
}
</script>

<style scoped>
#eventsSection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}
</style>