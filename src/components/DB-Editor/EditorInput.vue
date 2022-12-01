<template>
  <div v-for="(el, index) in allPeople" :key="index">
    <avatar-element :svg-code="el._avatar"/>
    {{ el._first_name }}
    {{ el._last_name }}
    {{ el._age }}
    {{ el._gender }}
    {{ el._nationality}}
    {{ el._ethnicity }}
    {{ el._performance }}
    {{ el._experience }}
    {{ el._depth }}
    {{ el._craft }}
    {{ el._talent }}
    {{ el._popularity }}
    {{ el._rating }}
    {{ el._salary }}
    {{ el._isActor }}
    {{ el._isDirector }}
    {{ el._isWriter }}
    {{ el._genre }}
    <router-link :to="{ name: 'PersonEdit'}">
    <button id="editButton" class="buttonStyle" @click="edit(el)" >Edit</button>
    </router-link>
  </div>
</template>

<script>
import AvatarElement from "@/components/kitchenSink/AvatarElement";
export default {
  name: "EditorInput",
  components: {AvatarElement},
  data(){
    return {
      allPeople: this.$store.state.allPeople,
    };
  },

  methods: {
    edit(person){
      this.$store.state.editPerson = person;
    }
  }


}


</script>

<style scoped>

</style>