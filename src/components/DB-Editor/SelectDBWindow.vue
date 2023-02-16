
<template>
  <div id="selectDBWindowMainDiv">
    <div>
      <icon-button
          id="selectDBWindowBackButton"
          size="medium"
          icon="simple-arrow-left"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"/>
    </div>

    <div id="dbBox">
      <background-tile :title="$t('databaseSlots')">
        <div class="dbBoxInside">
          <DBItem @reset="showModal" :slot-nr="1"/>
          <DBItem @reset="showModal" :slot-nr="2"/>
          <DBItem @reset="showModal" :slot-nr="3"/>
        </div>
      </background-tile>
    </div>
    <transition name="modal">
      <close-modal
          v-if="isShow"
          headline="resetDBModal"
          @reset="reset(); isShow = false"
          @close="isShow = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </close-modal>
    </transition>
  </div>
</template>

<script>

import soundeffectMixin from "@/mixins/soundeffectMixin";
import DBItem from "@/components/DB-Editor/DBItem";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import CloseModal from "@/components/mainGameComponents/CloseModal";

export default {
  name: "SelectDBWindow",
  mixins: [soundeffectMixin('button','click')],
  components: {CloseModal, IconButton, BackgroundTile, DBItem},

  data(){
    return{
      resetSlot: null,
      isShow: false
    }
  },

  methods: {
    goBack(){
      this.$router.push({name: 'default'})
    },
    showModal(value){
      console.log(value)
      this.resetSlot = value
      this.isShow = true
    },
    reset(){
      window.ipcRenderer.send('resetDB', this.resetSlot)
    }
  }
}
</script>

<style scoped>
#selectDBWindowMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#selectDBWindowBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#dbBox {
  width: 350px;
}

.dbBoxInside {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px
}
</style>