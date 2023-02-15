import {createWebHistory, createRouter, createWebHashHistory} from "vue-router";
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
import WriterOutput from "@/components/DB-Editor/Entities/WriterOutput";
import KitchenSink from "@/components/kitchenSink/KitchenSink";
import PersonEdit from "@/components/DB-Editor/Entities/PersonEdit";
import SelectSlotWindow from "@/components/startComponents/SelectSlotWindow";
import Editor from "@/components/DB-Editor/Editor";
import DirectorOutput from "@/components/DB-Editor/Entities/DirectorOutput";
import ActorOutput from "@/components/DB-Editor/Entities/ActorOutput";
import SelectDBWindow from "@/components/DB-Editor/SelectDBWindow";
import NewCreateScreenplay from "@/components/mainGameComponents/moviesMenu/NewCreateScreenplay.vue";
import ScreenplaySummary from "@/components/mainGameComponents/homeMenu/ScreenplaySummary.vue";
import prodEventModal from "@/components/mainGameComponents/currentProduction/prodEventModal";
import testScreening from "@/components/mainGameComponents/postProduction/postEvents/testScreening";
import MovieSummary from "@/components/mainGameComponents/homeMenu/MovieSummary.vue";
import CreateFranchise from "@/components/mainGameComponents/homeMenu/CreateFranchise.vue";
import FranchiseSection from "@/components/mainGameComponents/preProduction/franchiseSection.vue";
import FranchisesOverview from "@/components/mainGameComponents/moviesMenu/listOfFranchises/FranchisesOverview.vue";
import testScreeningOptions from "@/components/mainGameComponents/postProduction/postEvents/testScreeningOptions";
import testScreeningResults from "@/components/mainGameComponents/postProduction/postEvents/testScreeningResults";
import SourcesOverview from "@/components/mainGameComponents/moviesMenu/listOfSources/SourcesOverview";
import MarketingBudgetSelect from "@/components/mainGameComponents/postProduction/marketing/MarketingBudgetSelect";
import chooseMedium from "@/components/mainGameComponents/postProduction/mediums/chooseMedium";
import cinemaNegotiation from "@/components/mainGameComponents/postProduction/mediums/cinemaNegotiation";
import SimulationScreen from "@/components/mainGameComponents/calendarSimulation/SimulationScreen";
import MovieDetails from "@/components/mainGameComponents/moviesMenu/MovieDetails.vue";
import LoadingScreen from "@/components/mainGameComponents/LoadingScreen.vue";
import takeALoan from "@/components/mainGameComponents/financesMenu/TakeALoan";
import BuyAStudio from "@/components/mainGameComponents/financesMenu/BuyAStudio";
import PeopleOverview from "@/components/mainGameComponents/newsMenu/listOfPeople/PeopleOverview.vue";
import MoviesOverview from "@/components/mainGameComponents/newsMenu/listOfMovies/MoviesOverview.vue";
import AwardOverview from "@/components/mainGameComponents/newsMenu/listOfAwards/AwardOverview.vue";
import preProductionSummary from "@/components/mainGameComponents/preProduction/preProductionSummary";
import productionSummary from "@/components/mainGameComponents/currentProduction/productionSummary";
import StudioOutput from "@/components/DB-Editor/Entities/StudioOutput";
import StudioEdit from "@/components/DB-Editor/Entities/StudioEdit";


const routes = [
    { name: 'awardOverview', path: '/awardOverview', component: AwardOverview, props: true },
    { name: 'moviesOverview', path: '/moviesOverview', component: MoviesOverview, props: true },
    { name: 'peopleOverview', path: '/peopleOverview', component: PeopleOverview, props: true },

    { name: 'simulation', path: '/simulationScreen', component: SimulationScreen, props: true },

    { name: 'movieSummary', path: '/movieSummary', component: MovieSummary, props: true },
    { name: 'createFranchise', path: '/createFranchise', component: CreateFranchise, props: true },

    { name: 'franchisesOverview', path: '/franchisesOverview', component: FranchisesOverview, props: true },
    { name: 'sourcesOverview', path: '/sourcesOverview', component: SourcesOverview, props: true },

    { name: 'screenplaySummary', path: '/screenplaySummary', component: ScreenplaySummary, props: true },
    { name: 'newScreenplay', path: '/newScreenplay', component: NewCreateScreenplay, props: true },

    { name: 'kitchenSink', path: '/kitchenSink', component: KitchenSink, props: true },
    { name: 'viewServices', path: '/viewServices', component: ViewServices, props: true },
    { name: 'buyMovieRights', path: '/buyMovieRights', component: BuyMovieRights, props: true },
    { name: 'news', path: '/news', component: News, props: true },
    { name: 'movies', path: '/movies', component: Movies, props: true },
    { name: 'movieDetails', path: '/movieDetails', component: MovieDetails, props: true },
    { name: 'streaming', path: '/streaming', component: Streaming, props: true },
    { name: 'finances', path: '/finances', component: Finances, props: true },
    { name: 'calendar', path: '/calendar', component: Calendar, props: true },
    { name: 'createScreenplay', path: '/createScreenplay', component: CreateScreenplay, props: true },
    { name: 'screenplayCharacters', path: '/screenplayCharacters', component: ScreenplayCharacters, props: true },
    { name: 'screenplayPlot', path: '/screenplayPlot', component: ScreenplayPlot, props: true },
    { name: 'screenplayDetails', path: '/screenplayDetails', component: ScreenplayDetails, props: true },
    { name: 'hireWriter', path: '/hireWriter', component: HireWriter, props: true },
    { name: 'screenplayInformation', path: '/screenplayInformation', component: ScreenplayInformation, props: true },

    { name: 'createStudio', path: '/createStudio/:slot', component: CreateStudio, props: true },
    { name: 'home', path: '/home', component: Home, props: true },
    { name: 'loadWindow', path: '/loadings', component: LoadWindow, props: true },
    { name: 'SelectSlotWindow', path: '/SelectSlotWindow', component: SelectSlotWindow, props: true },
    { name: 'SelectDBWindow', path: '/SelectDBWindow', component: SelectDBWindow, props: true },


    { name: 'mainSettings', path: '/mainSettings', component: MainSettings, props: true },
    { name: 'loadingScreen', path: '/loadingScreen/:nextRoute/:title/:duration', component: LoadingScreen, props: true },

    //PreProduction
    { name: 'screenplaySection', path: '/screenplaySection', component: screenplaySection, props: true},
    { name: 'directorSection', path: '/directorSection', component: directorSection, props: true},
    { name: 'durationSection', path: '/durationSection', component: durationSection, props: true},
    { name: 'actorSection', path: '/actorSection', component: actorsSection, props: true},
    { name: 'budgetSection', path: '/budgetSection', component: budgetSection, props: true},
    { name: 'franchiseSection', path: '/franchiseSection', component: FranchiseSection, props: true },

    //Production
    { name: 'prodEventModal', path: '/prodEventModal', component: prodEventModal, props: true},

    //PostProduction
    { name: 'testScreening', path: '/testScreening', component: testScreening, props: true},
    { name: 'testScreeningOptions', path: '/testScreeningOptions', component: testScreeningOptions, props: true},
    { name: 'testScreeningResults', path: '/testScreeningResults/:addedWeeks/:flags/:editingBudgetIncrease/:soundBudgetIncrease/:vfxBudgetIncrease/:actingConsequence/:storyConsequence', component: testScreeningResults, props: true},

    { name: 'chooseMedium', path: '/chooseMedium', component: chooseMedium, props: true},
    { name: 'cinemaNegotiation', path: '/cinemaNegotiation', component: cinemaNegotiation, props: true},


    { name: 'MarketingBudgetSelect', path: '/MarketingBudgetSelect', component: MarketingBudgetSelect, props: true},


    //Finances
    { name: 'TakeALoan', path: '/TakeALoan', component: takeALoan, props: true},
    { name: 'BuyAStudio', path: '/BuyAStudio', component: BuyAStudio, props: true},

    //Summaries
    { name: "preProductionSummary", path: "/preProductionSummary", component: preProductionSummary, props: true},
    { name: "productionSummary", path: "/productionSummary", component: productionSummary, props: true},

    { name: 'Editor', path: '/Editor', component: Editor, props: true},
    { name: 'SelectDBWindow', path: '/SelectDBWindow', component: SelectDBWindow, props: true},
    { name: 'WriterOutput', path: '/WriterOutput', component: WriterOutput, props: true},
    { name: 'DirectorOutput', path: '/DirectorOutput', component: DirectorOutput, props: true},
    { name: 'ActorOutput', path: '/ActorOutput', component: ActorOutput, props: true},
    { name: 'StudioOutput', path: '/StudioOutput', component: StudioOutput, props: true},

    { name: 'PersonEdit', path: '/PersonEdit', component: PersonEdit, props: true},
    { name: 'StudioEdit', path: '/StudioEdit', component: StudioEdit, props: true},

    { name: 'default', path: '/', component: StartMenu, props: true },
]

const router = createRouter({
    history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
    routes
})

export default router;