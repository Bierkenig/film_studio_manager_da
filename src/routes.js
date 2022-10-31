import { createWebHistory, createRouter } from "vue-router";
import CreateStudio from "@/components/startComponents/CreateStudio";
import StartMenu from "@/components/startComponents/StartMenu";
import Home from "@/components/mainGameComponents/homeMenu/HomeMenu";
import LoadWindow from "@/components/startComponents/LoadWindow";
import MainSettings from "@/components/startComponents/MainSettings";
import News from "@/components/mainGameComponents/newsMenu/NewsMenu";
import Movies from "@/components/mainGameComponents/moviesMenu/MoviesMenu";
import Library from "@/components/mainGameComponents/libraryMenu/LibraryMenu";
import Streaming from "@/components/mainGameComponents/streamingMenu/StreamingMenu";
import Finances from "@/components/mainGameComponents/financesMenu/FinancesMenu";
import Calendar from "@/components/mainGameComponents/calendarMenu/CalendarMenu";
import CreateScreenplay from "@/components/mainGameComponents/moviesMenu/createScreenplay/CreateScreenplay";
import ScreenplayCharacters from "@/components/mainGameComponents/moviesMenu/createScreenplay/ScreenplayCharacters";
import ScreenplayPlot from "@/components/mainGameComponents/moviesMenu/createScreenplay/ScreenplayPlot";
import ScreenplayDetails from "@/components/mainGameComponents/moviesMenu/createScreenplay/ScreenplayDetails";

const routes = [
    { name: 'news', path: '/news', component: News, props: true },
    { name: 'movies', path: '/movies', component: Movies, props: true },
    { name: 'library', path: '/library', component: Library, props: true },
    { name: 'streaming', path: '/streaming', component: Streaming, props: true },
    { name: 'finances', path: '/finances', component: Finances, props: true },
    { name: 'calendar', path: '/calendar', component: Calendar, props: true },
    { name: 'createScreenplay', path: '/createScreenplay', component: CreateScreenplay, props: true },
    { name: 'screenplayCharacters', path: '/screenplayCharacters', component: ScreenplayCharacters, props: true },
    { name: 'screenplayPlot', path: '/screenplayPlot', component: ScreenplayPlot, props: true },
    { name: 'screenplayDetails', path: '/screenplayDetails', component: ScreenplayDetails, props: true },

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