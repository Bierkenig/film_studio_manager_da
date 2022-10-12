import { createWebHistory, createRouter } from "vue-router";
import CreateStudio from "@/components/CreateStudio";
import StartMenu from "@/components/StartMenu";
import MainMenu from "@/components/MainMenu";
import LoadWindow from "@/components/LoadWindow";
import MainSettings from "@/components/MainSettings";

const routes = [
    { name: 'createStudio', path: '/createStudio', component: CreateStudio, props: true },
    { name: 'mainMenu', path: '/mainMenu', component: MainMenu, props: true },
    { name: 'loadWindow', path: '/loadings', component: LoadWindow, props: true },
    { name: 'mainSettings', path: '/mainSettings', component: MainSettings, props: true },
    { name: 'default', path: '/', component: StartMenu, props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;