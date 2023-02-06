<template>
  <div id="peopleOverviewMainDiv">
    <h1 id="peopleOverviewHeader">{{ $t('listOfPeople') }}</h1>
    <icon-button
        id="peopleOverviewBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
    <people-list @sendPerson="receivePerson"/>
    <people-details :person="clickedPerson"/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import PeopleList from "@/components/mainGameComponents/newsMenu/listOfPeople/PeopleList.vue";
import PeopleDetails from "@/components/mainGameComponents/newsMenu/listOfPeople/PeopleDetails.vue";

export default {
  name: "PeopleOverview",
  components: {PeopleDetails, PeopleList, IconButton},

  data() {
    return {
      clickedPerson: {},
    }
  },

  methods: {
    goBack() {
      this.$router.push({name: 'news'})
    },

    receivePerson(person) {
      this.clickedPerson = person;
    }
  }
}
</script>

<style scoped>
#peopleOverviewMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 15px;
}

#peopleOverviewHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#peopleOverviewBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>