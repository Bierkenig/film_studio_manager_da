export default function soundeffectMixin(element, event){
    return {
        mounted() {
            let btns = document.querySelectorAll(element);

            btns.forEach(playSound);

            let status = this.$store.getters.getCurrentStatusOfSoundeffect

            const audio = new Audio(require("../soundeffects/" + element + "Sound.mp3"));

            function playSound(item) {
                item.addEventListener(event, function () {
                    if (status === true) {
                        audio.play();
                    }
                });
            }
        }
    }
}