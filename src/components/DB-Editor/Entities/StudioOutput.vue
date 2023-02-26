<template>
  <div id="studioOutputMainDiv">
    <icon-button
        id="studioOutputBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="this.$router.go(-2)"
    />
    <background-tile title="Studios" id="studioOutputBgTile">
      <info-line v-for="(el, index) in otherStudios" :key="index" class="studioOutputElement">
        {{ el.name }}
        <custom-button id="editButton" class="buttonStyle" @click="edit(el)" size="small">{{  $t('edit') }}</custom-button>
        <custom-button id="deleteButton" class="buttonStyle" @click="deleteStudio(el)" size="small">{{  $t('delete') }}
        </custom-button>
      </info-line>
    </background-tile>
  </div>
</template>

<script>
import {Studio} from "@/classes/Studio";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import InfoLine from "@/components/kitchenSink/InfoLine.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "StudioOutput",
  components: {CustomButton, InfoLine, BackgroundTile, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      otherStudios: null
    };
  },
  mounted() {
    this.otherStudios = []
    this.otherStudios = this.$store.state.otherStudios;
  },

  methods: {
    edit(studio) {
      this.$store.state.editStudio = studio
      this.$router.push({name: 'StudioEdit'});
    },

    async deleteStudio(studio) {
      window.ipcRenderer.removeAllListeners("gotStudios")
      window.ipcRenderer.send('editDB', 'DELETE FROM studio WHERE pk_studioID = ' + studio.id)

      this.$store.state.otherStudios = []
      await new Promise(resolve => setTimeout(resolve, 200))
      window.ipcRenderer.send('getStudios', 'SELECT * FROM studio')
      window.ipcRenderer.receive('gotStudios', (data) => {
        this.$store.commit('addOtherStudios', new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.popularity, {"2023": data.marketShare}))
      })
    },
  }


}


</script>

<style scoped>
#studioOutputMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
}

#studioOutputBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#studioOutputBgTile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: fit-content;
}

.studioOutputElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  height: fit-content;
}
</style>