export default function backgroundMusicMixin(){
    return {
        mounted() {
            let audio = new Audio(require('../backgroundMusic/BackgroundMusic_mixdown.mp3'))
            playSound()

            function playSound() {
                audio.play()
            }
        }
    }
}