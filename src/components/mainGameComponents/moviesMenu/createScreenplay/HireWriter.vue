<template>
  <div id="hireWriterMainDiv">
    <h1 id="hireWriterHeader">{{ $t('hireWriter') }}</h1>
    <div id="hireWriterBackground">
      <writer-list v-if="!this.$store.getters.getCurrentScreenplay.rewritingStatus"
                   id="hireWriterList"
                   :writer-list="writers"
                   :disable-writer-list="disableList"
                   @sendWriter="receiveWriter"/>
      <div id="hireWriterDetailsVertical">
        <writer-details
            id="hireWriterDetails"
            :writer="clickedWriter"
            :screenplay="this.$store.getters.getCurrentScreenplay"
            :check-balance="checkBalance"
            @hiredWriter="hiredWriter"
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
import WriterList from "@/components/mainGameComponents/moviesMenu/createScreenplay/WriterList.vue";
import WriterDetails from '@/components/mainGameComponents/moviesMenu/createScreenplay/WriterDetails.vue';
import IconButton from "@/components/kitchenSink/IconButton.vue";
export default {
  name: "HireWriter",
  components: {IconButton, WriterList, WriterDetails},

  data() {
    return {
      writers: this.$store.getters.getAllWriters,
      clickedWriter: {},
      checkBalance: true,
      disableList: false,
    }
  },

  mounted() {
    if(this.$store.getters.getCurrentScreenplay.price !== null){
      this.clickedWriter = this.$store.getters.getCurrentScreenplay.writer;
      this.checkBalance = (this.$store.getters.getBalance - parseInt(this.$store.getters.getCurrentScreenplay.writer.salary)) < 0;
    }
  },

  methods: {
    receiveWriter: function (writer){
      this.clickedWriter = writer;
      this.checkBalance = (this.$store.getters.getBalance - parseInt(writer.salary)) < 0;
    },

    hiredWriter: function (){
      this.disableList = true;
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