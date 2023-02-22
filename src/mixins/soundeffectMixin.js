import store from "@/services/store";
export default function soundeffectMixin(element, event){
    return {
        mounted() {
            let btns = document.querySelectorAll(element);

            btns.forEach(playSound);

            let audio = null;
            if(element === 'button'){
                audio = new Audio(require("../soundeffects/" + element + "Soundwav.wav"));
            } else {
                audio = new Audio(require("../soundeffects/buttonSoundwav.wav"));
            }

            function playSound(item) {
                item.addEventListener(event, function () {
                    if (store.getters.getCurrentStatusOfSoundeffect === true) {
                        audio.play();
                    }
                });
            }
        }
    }
}