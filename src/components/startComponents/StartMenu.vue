<template>
  <div id="startMenuMainDiv">
    <div id="startMenuSubDiv">
      <div id="startMenuBackground">
        <div id="startMenuBox">
          <div id="startMenu">
            <icon-button
                id="startMenuCloseButton"
                size="medium"
                icon="exit"
                :dark="true"
                :bg-gradient="true"
                :icon-gradient="false"
                :shadow="false"
                @click="showCloseModal = true"/>

            <transition name="modal">
              <close-modal
                  v-if="showCloseModal"
                  headline="closeGame"
                  @closeGame="exit"
                  @close="showCloseModal = false">
                <template v-slot:header>
                  <h3>custom header</h3>
                </template>
              </close-modal>
            </transition>

            <settings-header id="startMenuSettingHeader"/>
            <div id="heading">
              <img src="../../assets/FSM_Logo.svg" alt="Logo FSM"/>
              <div id="headline">Film Studio <hr style="height:0px; visibility:hidden; margin:-15px" /> Manager</div>
            </div>
            <div id="startMenuButtonContainer">
              <router-link :to="{ name: 'SelectSlotWindow'}" style="text-decoration: none; color: inherit">
                <button id="newButton" class="startMenuButton">
                  <custom-icon size="40px" icon="movies"/>
                  {{ $t('newGameButton') }}
                </button>
              </router-link>
              <router-link :to="{ name: 'loadWindow'}" style="text-decoration: none; color: inherit">
                <button id="loadButton" class="startMenuButton">
                  <custom-icon size="40px" icon="save"/>
                  {{ $t('loadButton') }}
                </button>
              </router-link>
              <router-link :to="{ name: 'SelectDBWindow' }" style="text-decoration: none; color: inherit">
                <button id="editorButton" class="startMenuButton">
                  <custom-icon size="40px" icon="database"/>
                  {{ $t('database') }}
                </button>
              </router-link>
            </div>

            <router-link :to="{ name: 'kitchenSink'}">
              <button id="kitchenSinkButton" class="buttonStyle">kitchen-sink</button>
            </router-link>

            <!--<router-link :to="{ name: 'SelectSlotWindow'}">
              <button id="slotButton" class="buttonStyle">Select Slot</button>
            </router-link>

            <router-link :to="{ name: 'testScreening'}">
              <button id="testScreening" class="buttonStyle">testScreening</button>
            </router-link>

            <router-link :to="{ name: 'testScreeningOptions'}">
              <button id="testScreeningOptions" class="buttonStyle">testScreeningOptions</button>
            </router-link>

            <router-link :to="{ name: 'MarketingBudgetSelect'}">
              <button id="MarketingBudgetSelect" class="buttonStyle">MarketingBudgetSelect</button>
            </router-link>

            <router-link :to="{ name: 'chooseMedium'}">
              <button id="chooseMedium" class="buttonStyle">chooseMedium</button>
            </router-link>

            <router-link :to="{ name: 'loadingScreen', params: {nextRoute: 'default', title: $t('loading') + '...', duration: '10'}}">
              <button id="loadingScreen" class="buttonStyle">loadingScreen</button>
            </router-link>
            <div>
              <router-link :to="{ name: 'kitchenSink'}">
                <button id="kitchenSinkButton" class="buttonStyle">kitchen-sink</button>
              </router-link>
              <router-link :to="{ name: 'createStudio'}">
                <button id="newButton" class="buttonStyle">{{ $t('newStudioButton') }}</button>
              </router-link>
              <router-link :to="{ name: 'loadWindow'}">
                <button id="loadButton" class="buttonStyle">{{ $t('loadButton') }}</button>
              </router-link>
              <router-link :to="{ name: 'SelectSlotWindow'}">
                <button id="slotButton" class="buttonStyle">Select Slot</button>
              </router-link>
              <router-link :to="{ name: 'mainSettings'}">
                <button id="settingsButton" class="buttonStyle">{{ $t('settings') }}</button>
              </router-link>

                <button id="exitButton" class="buttonStyle" @click="exit">{{ $t('exitButton') }}</button>

              <button id="saveButton" class="buttonStyle" @click="save">save</button>
              <button id="deleteButton" class="buttonStyle" @click="deleting">delete</button>
              <button id="autoSave" class="buttonStyle" @click="autoSave">autoSave</button>
              <router-link to="SelectDBWindow">
                <button>editor</button>
              </router-link>

            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import CustomIcon from "@/components/kitchenSink/CustomIcon";
import SettingsHeader from "@/components/startComponents/SettingsHeader";
import IconButton from "@/components/kitchenSink/IconButton";
import CloseModal from "@/components/mainGameComponents/CloseModal";

export default {
  name: 'StartMenu',
  components: {CloseModal, SettingsHeader, CustomIcon, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('.iconButtonSubDiv','click')],

  data(){
    return {
      showCloseModal: false,
    }
  },

  mounted(){
    window.ipcRenderer.send("updateDiscordDetails", "Start Menu")
  },

  methods: {
    exit() {
      close();
    },

    save(){
      let reducedState = {}
      this.$store.commit("stateToSave", reducedState)

      window.ipcRenderer.send('savingData', [JSON.stringify(reducedState), this.$store.getters.getSlot])
    },
    deleting(){
      window.ipcRenderer.send('r2mDeleting', this.$store.getters.getSlot)
    },
    autoSave(){
      window.ipcRenderer.send('autoSave', [JSON.stringify(this.$store.state),3])
    }
  },
}
</script>

<style scoped>
#startMenuMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#heading {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

#headline {
  font-size: 75px;
  text-shadow: var(--fsm-white-shadow-color) 1px 0 10px;
  padding-right: 30px;
}

#startMenuButtonContainer {
  display: flex;
  flex-direction: row;
  gap: 35px;
  margin-bottom: 30px;
}

.startMenuButton {
  border-radius: var(--fsm-l-border-radius);
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);

  border-style: none;
  width: 350px;
  height: 100px;
  color: var(--fsm-white);
  font-size: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

#startMenuSettingHeader {
  position: absolute;
  float: right;
  right: 100px;
  top: 20px;
}

#startMenuCloseButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

br {
  line-height: 1000%;
}
</style>
