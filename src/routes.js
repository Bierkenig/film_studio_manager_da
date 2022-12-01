import { createWebHistory, createRouter } from "vue-router";
import CreateStudio from "@/components/startComponents/CreateStudio";
import StartMenu from "@/components/startComponents/StartMenu";
import Home from "@/components/mainGameComponents/homeMenu/HomeMenu";
import LoadWindow from "@/components/startComponents/LoadWindow";
import MainSettings from "@/components/startComponents/MainSettings";
import News from "@/components/mainGameComponents/newsMenu/NewsMenu";
import Movies from "@/components/mainGameComponents/moviesMenu/MoviesMenu";
import Streaming from "@/components/mainGameComponents/streamingMenu/StreamingMenu";
import Finances from "@/components/mainGameComponents/financesMenu/FinancesMenu";
import Calendar from "@/components/mainGameComponents/calendarMenu/CalendarMenu";
import CreateScreenplay from "@/components/mainGameComponents/moviesMenu/createScreenplay/CreateScreenplay";
import ScreenplayCharacters from "@/components/mainGameComponents/moviesMenu/createScreenplay/ScreenplayCharacters";
import ScreenplayPlot from "@/components/mainGameComponents/moviesMenu/createScreenplay/ScreenplayPlot";
import ScreenplayDetails from "@/components/mainGameComponents/moviesMenu/createScreenplay/ScreenplayDetails";
import HireWriter from "@/components/mainGameComponents/moviesMenu/createScreenplay/HireWriter";
import ScreenplayInformation from "@/components/mainGameComponents/moviesMenu/createScreenplay/ScreenplayInformation";
import screenplaySection from "@/components/mainGameComponents/preProduction/screenplaySection";
import directorSection from "@/components/mainGameComponents/preProduction/directorSection";
import durationSection from "@/components/mainGameComponents/preProduction/durationSection";
import actorsSection from "@/components/mainGameComponents/preProduction/actorsSection";
import budgetSection from "@/components/mainGameComponents/preProduction/budgetSection";
import BuyMovieRights from "@/components/mainGameComponents/streamingMenu/BuyMovieRights";
import ViewServices from "@/components/mainGameComponents/streamingMenu/ViewServices";
// import editorInput from "@/components/DB-Editor/editorInput";
import KitchenSink from "@/components/kitchenSink/KitchenSink";

const routes = [
    { name: 'kitchenSink', path: '/kitchenSink', component: KitchenSink, props: true },
    { name: 'viewServices', path: '/viewServices', component: ViewServices, props: true },
    { name: 'buyMovieRights', path: '/buyMovieRights', component: BuyMovieRights, props: true },
    { name: 'news', path: '/news', component: News, props: true },
    { name: 'movies', path: '/movies', component: Movies, props: true },
    { name: 'streaming', path: '/streaming', component: Streaming, props: true },
    { name: 'finances', path: '/finances', component: Finances, props: true },
    { name: 'calendar', path: '/calendar', component: Calendar, props: true },
    { name: 'createScreenplay', path: '/createScreenplay', component: CreateScreenplay, props: true },
    { name: 'screenplayCharacters', path: '/screenplayCharacters', component: ScreenplayCharacters, props: true },
    { name: 'screenplayPlot', path: '/screenplayPlot', component: ScreenplayPlot, props: true },
    { name: 'screenplayDetails', path: '/screenplayDetails', component: ScreenplayDetails, props: true },
    { name: 'hireWriter', path: '/hireWriter', component: HireWriter, props: true },
    { name: 'screenplayInformation', path: '/screenplayInformation', component: ScreenplayInformation, props: true },

    { name: 'createStudio', path: '/createStudio', component: CreateStudio, props: true },
    { name: 'home', path: '/home', component: Home, props: true },
    { name: 'loadWindow', path: '/loadings', component: LoadWindow, props: true },
    { name: 'mainSettings', path: '/mainSettings', component: MainSettings, props: true },

    { name: 'screenplaySection', path: '/screenplaySection', component: screenplaySection, props: true},
    { name: 'directorSection', path: '/directorSection', component: directorSection, props: true},
    { name: 'durationSection', path: '/durationSection', component: durationSection, props: true},
    { name: 'actorSection', path: '/actorSection', component: actorsSection, props: true},
    { name: 'budgetSection', path: '/budgetSection', component: budgetSection, props: true},

    // { name: 'editorInput', path: '/editorInput', component: editorInput, props: true},

    { name: 'default', path: '/', component: StartMenu, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;