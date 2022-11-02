import { createApp } from 'vue'
import App from './App.vue'
import store from "@/services/store";
import router from './routes';
import i18n from './translation/i18n';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

i18n(createApp(App))
    .use(store)
    .use(router)
    .use(VueChartkick)
    .mount('#app')
