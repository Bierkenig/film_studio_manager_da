<template>
  <div id="hireWriterMainDiv">
    <h1 id="hireWriterHeader">{{ $t('hireWriter') }}</h1>
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
        <icon-button
            v-if="this.$store.getters.getCurrentScreenplay.rewritingStatus"
            id="hireWriterBackButton"
            icon="simple-arrow-left"
            size="medium"
            :dark="true"
            :bg-gradient="true"
            :icon-gradient="false"
            :shadow="false"
            @click="goBack"/>
      </div>
    </div>
  </div>
</template>

<script>
import StaffList from "@/components/mainGameComponents/StaffList";
import StaffDetails from '@/components/mainGameComponents/StaffDetails';
import IconButton from "@/components/kitchenSink/IconButton.vue";
export default {
  name: "HireWriter",
  components: {IconButton, StaffList, StaffDetails},

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
      this.$router.push({name: 'screenplayPlot'})
    }
  }
}
</script>

<style scoped>
#hireWriterMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#hireWriterBackground {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 35px;
}

#hireWriterBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#hireWriterHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}
</style>