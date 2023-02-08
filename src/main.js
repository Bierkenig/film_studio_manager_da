import { createApp } from 'vue'
import App from './App.vue'
import store from "@/services/store";
import router from './routes';
import i18n from './translation/i18n';
import VueObserveVisibility from 'vue3-observe-visibility'

i18n(createApp(App))
    .use(store)
    .use(router)
    .use(VueObserveVisibility)
    .mount('#app')
