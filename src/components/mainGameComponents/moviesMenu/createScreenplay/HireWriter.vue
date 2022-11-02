<template>
  <div>
    Hire Writer
    <staff-list id="hireWriterList" :staff="data"/>
  </div>
</template>

<script>
import StaffList from "@/components/mainGameComponents/StaffList";
export default {
  name: "HireWriter",
  components: {StaffList},

  data() {
    return {
      data: this.$store.getters.getAllWriters,
    }
  },
}
</script>

<style scoped>

</style>