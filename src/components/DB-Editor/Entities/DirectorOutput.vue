<template>
  <div id="actorOutputMainDiv">
    <icon-button
        id="actorOutputBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="this.$router.go(-2)"
    />

    <div class="actorOutputColumn" id="actorOutputLeft">
      <db-people-list :people="allActors" type="Directors" @send-person="recieveActor"/>
    </div>
    <div class="actorOutputColumn" id="actorOutputRight">
      <db-people-details :person="currentActor"/>
      <router-link :to="{ name: 'PersonEdit'}">
        <custom-button id="editButton" class="buttonStyle" @click="edit(currentActor)">{{  $t('edit') }}</custom-button>
      </router-link>
      <custom-button id="deleteButton" class="buttonStyle" @click="deletePerson(currentActor)">{{  $t('delete') }}</custom-button>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import DbPeopleDetails from "@/components/DB-Editor/Entities/DbPeopleDetails.vue";
import DbPeopleList from "@/components/DB-Editor/Entities/DbPeopleList.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "DirectorOutput",
  components: {CustomButton, DbPeopleList, DbPeopleDetails, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      allActors: [],
      currentActor: null,
    };
  },
  mounted() {
    this.allActors = this.$store.state.allDirectors;
    this.currentActor = this.allActors[0];
  },

  methods: {
    edit(person) {
      this.$store.state.editPerson = person
    },

    async deletePerson(person) {
      window.ipcRenderer.send('editDB', 'DELETE FROM people WHERE pk_personID = ' + person._id)
      await new Promise(resolve => setTimeout(resolve, 20))
      this.$store.state.dbFetcher.clear()
      this.$store.state.dbFetcher.fetch()
      this.allWriters = this.$store.state.allActors
    },

    recieveActor(actor) {
      this.currentActor = actor;
    },
  }


}


</script>

<style scoped>
#actorOutputMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
}

#actorOutputBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

.actorOutputColumn {
  flex-basis: 0;
  height: 80vh;
}

#actorOutputLeft {
  flex-grow: 1;
}

#actorOutputRight {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
</style>