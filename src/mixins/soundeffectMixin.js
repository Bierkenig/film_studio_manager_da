import store from "@/services/store";
export default function soundeffectMixin(element, event){
    return {
        mounted() {
            let btns = document.querySelectorAll(element);

            btns.forEach(playSound);

            let audio = null;
            if(element === 'button'){
                audio = new Audio(require("../soundeffects/" + element + "Sound.mp3"));
            } else {
                audio = new Audio(require("../soundeffects/imgSound.mp3"));
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