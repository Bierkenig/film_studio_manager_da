<template>
  <div id="personEditMainDiv">
    <icon-button
        id="dbEditorBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="$router.go(-1)"
    />
    <background-tile :title="$t('editPerson')" id="personEditBgTile">
      <div class="personEditInputLine">
        <label for="firstname">{{$t('first_name')}}:</label>
        <input id="firstname" v-model="first_name" spellcheck="false">
      </div>
      <div class="personEditInputLine">
        <label for="lastname">{{$t('last_name')}}:</label>
        <input id="lastname" v-model="last_name" spellcheck="false">
      </div>
      <select
          class="createScreenplaySelect"
          id="createScreenplayCharacterGender"
          v-model="gender"
      >
        <option :value="null" disabled selected hidden>{{ $t('gender') }}</option>
        <option value="male">{{ $t('male') }}</option>
        <option value="female">{{ $t('female') }}</option>
        <option value="diverse">{{ $t('diverse') }}</option>
      </select>
      <select
          class="createScreenplaySelect"
          id="nationality"
          v-model="nationality"
      >
        <option :value="null" disabled selected hidden>{{ $t('nationality') }}</option>
        <option v-for="(nationality,index) in nationalityList" :key="index" :value="nationality">{{
            nationality
          }}
        </option>
      </select>
      <select
          class="createScreenplaySelect"
          id="nationality"
          v-model="ethnicity"
      >
        <option :value="null" disabled selected hidden>{{ $t('ethnicity') }}</option>
        <option v-for="(ethnicity,index) in ethnicityList" :key="index" :value="ethnicity">{{ ethnicity }}</option>
      </select>

      <div class="personEditInputLine">
        {{ $t('isWriter') }}
        <input type="checkbox" id="checkboxWriter" v-model="checkedWriter">
      </div>
      <div class="personEditInputLine">
        {{ $t('isDirector') }}
        <input type="checkbox" id="checkboxDirector" v-model="checkedDirector">
      </div>

      <div class="personEditInputLine">
        {{ $t('isActor') }}
        <input type="checkbox" id="checkboxActor" v-model="checkedActor">
      </div>

      <custom-button id="saveButton" class="buttonStyle" @click="writeDB(person)">{{ $t('save') }}</custom-button>
    </background-tile>
  </div>
</template>

<script>

import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "PersonEdit",
  components: {CustomButton, BackgroundTile, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      person: this.$store.state.editPerson,
      first_name: null,
      last_name: null,
      gender: null,
      nationality: null,
      ethnicity: null,
      nationalityList: ["Algeria", " Angola", " Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde/Cape Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo/Republic of the Congo", "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea Guinea-Bissau", "Ivory Coast/Republic of Côte d'Ivoire", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe", "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "British Indian Ocean Territory (UK territory)", "Brunei", "Cambodia", "China", "Georgia", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Macau", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen", "UK", "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States of America", "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu", "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela", "Germany", "France", "Spain", "Italy", "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia/Czech Republic", "Denmark", "Estonia", "Finland", "Georgia", "Greece", "Hungary", "Iceland", "Ireland", "Kazakhstan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Sweden", "Switzerland", "Turkey", "Ukraine", "Vatican City"],
      ethnicityList: ["Caucasian", "Black", "Asian", "Arabic", "People of Color"],
      checkedWriter: null,
      checkedDirector: null,
      checkedActor: null
    }
  },
  mounted() {
    this.first_name = this.person._first_name
    this.last_name = this.person._last_name
    this.birthday = this.person._birthday
    this.gender = this.person._gender
    this.nationality = this.person._nationality
    this.ethnicity = this.person._ethnicity
    this.checkedWriter = this.person._isWriter
    this.checkedDirector = this.person._isDirector
    this.checkedActor = this.person._isActor
  },
  methods: {
    async writeDB(person) {
      window.ipcRenderer.send('editDB', "UPDATE people SET first_name = '" + this.first_name + "', last_name = '" + this.last_name + "', birthday = '" + this.birthday + "', gender = '" + this.gender + "', nationality = '" + this.nationality + "', ethnicity = '" + this.ethnicity + "', isActor = '" + this.checkedActor + "', isDirector = '" + this.checkedDirector + "', isWriter = '" + this.checkedWriter + "' WHERE pk_personID = " + person._id)
      await new Promise(resolve => setTimeout(resolve, 200))
      this.$store.state.dbFetcher.clear()
      this.$store.state.dbFetcher.fetch()
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
#personEditMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#dbEditorBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#personEditBgTile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: fit-content;
}

.personEditInputLine {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

input {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  padding: 10px;
}

input:focus {
  outline: none;
}
</style>