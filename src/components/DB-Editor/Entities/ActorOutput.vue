<template>
  <div v-for="(el, index) in allActors" :key="index">
    <avatar-element :svg-code="el._avatar"/>
    {{ el._first_name }}
    {{ el._last_name }}
    {{ el._birthday}}
    {{ el._gender }}
    {{ el._nationality}}
    {{ el._ethnicity }}
    {{ el._workingSince}}
    {{ el._performance }}
    {{ el._experience }}
    {{ el._talent }}
    {{ el._popularity }}
    {{ el._rating }}
    {{ el._isActor }}
    {{ el._isDirector }}
    {{ el._isWriter }}
    <router-link :to="{ name: 'PersonEdit'}">
      <button id="editButton" class="buttonStyle" @click="edit(el)" >Edit</button>
    </router-link>
    <button id="deleteButton" class="buttonStyle" @click="deletePerson(el)">Delete</button>
  </div>
  <button id="backButton" class="buttonStyle" @click="this.$router.go(-2)">Back</button>

</template>

<script>
import AvatarElement from "@/components/kitchenSink/AvatarElement";
export default {
  name: "ActorOutput",
  components: {AvatarElement},
  data(){
    return {
      allActors: null
    };
  },
  mounted(){
    this.allActors = this.$store.state.allActors;
  },

  methods: {
    edit(person){
      this.$store.state.editPerson = person;
    },
    deletePerson(person){
      window.ipcRenderer.send('editDB', 'DELETE FROM people WHERE pk_personID = ' + person._id)
    }
  }


}


</script>

<style scoped>

</style>