<template>
  <div>
    {{ $t('hireWriter') }}
    <div id="hireWriterBackground">
      <staff-list id="hireWriterList" :staff="data" @sendStaff="receiveStaff"/>
      <div id="hireWriterDetailsVertical">
        <staff-details
            id="hireWriterDetails"
            :staff="clickedStaff"
            :screenplay="this.$store.getters.getCurrentScreenplay"
            :check-balance="checkBalance"
            next-location="screenplayInformation"
            type="Writer"
        />
        <button v-if="this.$store.getters.getCurrentScreenplay.rewritingStatus" id="backButton" class="buttonStyle" @click="goBack">{{ $t('back') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import StaffList from "@/components/mainGameComponents/StaffList";
import StaffDetails from '@/components/mainGameComponents/StaffDetails';
export default {
  name: "HireWriter",
  components: {StaffList, StaffDetails},

  data() {
    return {
      data: this.$store.getters.getAllWriters,
      clickedStaff: {},
      checkBalance: true
    }
  },

  mounted() {
    if(this.$store.getters.getCurrentScreenplay.price !== null){
      this.clickedStaff = this.$store.getters.getCurrentScreenplay.writer;
      this.checkBalance = (this.$store.getters.getBalance - parseInt(this.$store.getters.getCurrentScreenplay.writer.salary)) < 0;
    }
  },

  methods: {
    receiveStaff: function (staff){
      this.clickedStaff = staff;
      this.checkBalance = (this.$store.getters.getBalance - parseInt(staff.salary)) < 0;
    },

    goBack(){
      this.$router.push({name: 'screenplayDetails'})
    }
  }
}
</script>

<style scoped>
#hireWriterBackground {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10em;
}
</style>