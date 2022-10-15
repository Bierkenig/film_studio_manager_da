import { createWebHistory, createRouter } from "vue-router";
import CreateStudio from "@/components/startComponents/CreateStudio";
import StartMenu from "@/components/startComponents/StartMenu";
import Home from "@/components/mainGameComponents/HomeMenu";
import LoadWindow from "@/components/startComponents/LoadWindow";
import MainSettings from "@/components/startComponents/MainSettings";
import News from "@/components/mainGameComponents/NewsMenu";
import Movies from "@/components/mainGameComponents/MoviesMenu";
import Library from "@/components/mainGameComponents/LibraryMenu";
import Streaming from "@/components/mainGameComponents/StreamingMenu";
import Finances from "@/components/mainGameComponents/FinancesMenu";
import Calendar from "@/components/mainGameComponents/CalendarMenu";

const routes = [
    { name: 'news', path: '/news', component: News, props: true },
    { name: 'movies', path: '/movies', component: Movies, props: true },
    { name: 'library', path: '/library', component: Library, props: true },
    { name: 'streaming', path: '/streaming', component: Streaming, props: true },
    { name: 'finances', path: '/finances', component: Finances, props: true },
    { name: 'calendar', path: '/calendar', component: Calendar, props: true },

    { name: 'createStudio', path: '/createStudio', component: CreateStudio, props: true },
    { name: 'home', path: '/home', component: Home, props: true },
    { name: 'loadWindow', path: '/loadings', component: LoadWindow, props: true },
    { name: 'mainSettings', path: '/mainSettings', component: MainSettings, props: true },
    { name: 'default', path: '/', component: StartMenu, props: true },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;