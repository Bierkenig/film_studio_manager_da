
<template>
  <div id="selectDBWindowMainDiv">
    <div>
      <icon-button
          id="selectDBWindowBackButton"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"/>
    </div>

    <div id="dbBox">
      <background-tile :title="$t('databaseSlots')">
        <div class="dbBoxInside">
          <DBItem :slot-nr="1"/>
          <DBItem :slot-nr="2"/>
          <DBItem :slot-nr="3"/>
        </div>
      </background-tile>
    </div>
  </div>
</template>

<script>

import soundeffectMixin from "@/mixins/soundeffectMixin";
import DBItem from "@/components/DB-Editor/DBItem";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import IconButton from "@/components/kitchenSink/IconButton.vue";
export default {
  name: "SelectDBWindow",
  mixins: [soundeffectMixin('button','click')],
  components: {IconButton, BackgroundTile, DBItem},

  methods: {
    goBack(){
      this.$router.push({name: 'default'})
    },
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