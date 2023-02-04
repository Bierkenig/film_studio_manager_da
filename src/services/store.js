import {createStore} from "vuex";
import {Studio} from "@/classes/Studio";
import {Movie} from "@/classes/Movie";
import News from "@/classes/News";
import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Franchises from "@/classes/Franchises";
import {StreamingService} from "@/classes/StreamingService";
import Earnings from "@/classes/Earnings";
import Event from "@/classes/Event";
import DataUtil from "@/classes/DataUtil";
import FinancialPerformance from '@/classes/FinancialPerformance'
import i18next from "i18next";
import Topic from "@/classes/Topic";
import Genre from "@/classes/Genre";
import DBFetcher from "@/classes/DBFetcher";

export default createStore({
    /** Application state */
    state:{
        slot: null,
        screenplays: [new Screenplay(1,'Cars','Animation',new Genre('Science-Fiction',25,26,36),null,'G / +3',
            new Person(5,null,'Franz','Huber',35,'male','Austria','Caucasian','5',78,25,62,58,57,65,'2.500.000',
                'true','true','true', [{'Action':92,'Adventure':80,'Biography':19,'Comdey':55,'Crime':12,'Documentary':52,'Drama':62,'Erotic':52,
                    'Family':23,'Fantasy':20,'History':25,'Horror':65,'Musical':23,'Mystery':95,'Romance':75,'Science Fiction':41, 'Sport':25,'Thriller':25,'War':56,'Western':78}]),
            'Ein Film von Spielzeugen, die eine fantastische Reise um die Welt erleben und einiges durchmachen müssen',65.8,
            2500000,{firstTopic: new Topic('Alcoholism',1,10,20),
                secondTopic: new Topic('Baseball',10,15,20),thirdTopic: null},null)],
        boughtScreenplays: [new Screenplay(2,'Toy Story','Animation',new Genre('Adventure',15,20,25),null,'G / +3',
            new Person(5,null,'Franz','Huber',35,'male','Austria','Caucasian','5',78,25,62,58,57,65,'2.500.000',
                'true','true','true', [{'Action':92,'Adventure':80,'Biography':19,'Comdey':55,'Crime':12,'Documentary':52,'Drama':62,'Erotic':52,
    'Family':23,'Fantasy':20,'History':25,'Horror':65,'Musical':23,'Mystery':95,'Romance':75,'Science Fiction':41, 'Sport':25,'Thriller':25,'War':56,'Western':78}]),
'Ein Film von Spielzeugen, die eine fantastische Reise um die Welt erleben und einiges durchmachen müssen',65.8,
    2500000,{firstTopic: new Topic('Animals',15,35,30)
                ,secondTopic: new Topic('Boxing',60,45,25),thirdTopic: null},null, true)],
        studio: null,
        currentMovieBudget: 0,
        currentMovieExpenses: 0,
        currentMovie: new Movie(new Studio(100,"Jakob ist Cool", "2023",50000000,80), null),
        currentMovieDetails: null,
        currentProdEventType: "",
        currentPostProdEventType: "sound",
        createdMovies: [],
        currentScreenplay: null,
        logo: null,
        soundeffects: true,
        backgroundMusic: true,
        currentDate: new Date("2023-01-01T00:00:00.000Z"),
        currentLanguage: 'en',
        news: [],
        earnings: [
            {
                value: 245000,
                date: new Date(2022,11,25)
            },
            {
                value: 500000,
                date: new Date(2023,0,15)
            },
            {
                value: 245000,
                date: new Date(2022,11,25)
            },
            {
                value: 500000,
                date: new Date(2023,0,15)
            },
            {
                value: 245000,
                date: new Date(2022,11,25)
            },
            {
                value: 500000,
                date: new Date(2023,0,15)
            },
            {
                value: 245000,
                date: new Date(2022,11,25)
            },
            {
                value: 500000,
                date: new Date(2023,0,15)
            }
        ],
        financialPerformance: [
            new FinancialPerformance(new Date(2023, 0)),
            new FinancialPerformance(new Date(2023, 1)),
            new FinancialPerformance(new Date(2024, 0)),
            new FinancialPerformance(new Date(2024, 1))
        ],
        calendarEvents: [
            {
                id: 1,
                movie: "SOMETHING",
                start: '2023-01-15',
                end: '2023-01-16',
                type: 'productionFinished',
                completed: false,
            },
            {
                id: 2,
                movie: "NICHTS",
                start: '2023-01-08',
                end: '2023-01-09',
                type: 'featureFilm',
                completed: false,
            },
            {
                id: 3,
                movie: "ALLES",
                start: '2023-01-08',
                end: '2023-01-09',
                type: 'blockbuster',
                completed: false,
            },
            {
                id: 4,
                movie: "VIELLEICHT",
                start: '2023-01-29',
                end: '2023-01-30',
                type: 'award',
                completed: false,
            },
            {
                id: 5,
                movie: "SOMETHING",
                start: '2023-01-08',
                end: '2023-01-09',
                type: 'featureFilm',
                completed: false,
            },
            {
                id: 6,
                movie: "SOMETHING",
                start: '2023-01-08',
                end: '2023-01-09',
                type: 'award',
                completed: false,
            },
            {
                id: 7,
                movie: "SOMETHING",
                start: '2023-01-08',
                end: '2023-01-09',
                type: 'award',
                completed: false,
            },
            {
                id: 8,
                movie: "SOMETHING",
                start: '2023-01-29',
                end: '2023-01-30',
                type: 'award',
                completed: false,
            },
            {
                id: 9,
                movie: "SOMETHING",
                start: '2023-01-08',
                end: '2023-01-09',
                type: 'award',
                completed: false,
            },
            {
                id: 10,
                movie: "SOMETHING",
                start: '2023-01-29',
                end: '2023-01-30',
                type: 'award',
                completed: false,
            },
        ],
        happeningEvent: new Event("Breakdown", new Date("2020-12-21"), new Date("2022-09-01")),
        franchises: [],
        currentFranchise: null,

        inProductionMovies: [],

        finishedMovies: [new Movie(new Studio(100,"JJJJ"), 0)],

        moviesFromOtherStudios: [],
        screenplaysFromWriters: [],
        franchisesFromOtherStudios: [],
        otherStudios: [],

        //TODO: schauen, ob bei save file dabei
        boughtMovies: [],
        //TODO: neu hinzugeben bei save
        boughtMovieRights: [],

        financialHistory: [
            {title: "financialHistory.event1", desc: "financialHistory.desc1", iconPath: ""},
            {title: "financialHistory.event2", desc: "financialHistory.desc2", iconPath: ""},
            {title: "financialHistory.event3", desc: "financialHistory.desc3", iconPath: ""},
        ],

        currentLoans: [
            {id: 0, value: 20394, date: new Date(2023, 3, 2)}
        ],

        feature: ["250000 - 7500000", "250000 - 2500000", "250000 - 5000000", "250000 - 5000000", "250000 - 2500000", "250000 - 5000000", "250000 - 10000000", "250000 -  2500000", "250000 - 2500000", "250000 - 2500000", "250000 - 5000000", "250000 - 100000000"],
        indie: ["25000 - 2000000", "25000 - 500000", "25000 - 1500000", "25000 - 1000000", "25000 - 500000", "25000 - 1000000", "25000 - 2000000", "25000 - 500000", "5000 - 500000", "25000 - 500000", "25000 - 1000000", "250000 - 15000000"],
        animation: ["250000 - 5000000", "250000 - 1000000", "250000 - 3500000", "250000 - 3000000", "250000 - 1000000", "250000 - 3000000", "250000 - 5000000", "250000 - 1000000", "250000 - 1000000", "250000 - 1000000", "250000 - 3000000", "1000000 - 50000000"],

        preProductionEvents: {
            actorWhoWantsToDropOut: null,
            directorWithDispute: null,
        },

        type:{
            editing: null,
            sound: null,
            vfx: null,
            acting: null,
            story: null
        },

        streamingServicesFromOtherStudios: [new StreamingService('ASX Studio',1,0,0,10,new Studio('AS'),new Date("January 25, 2023")),
            new StreamingService('TUV Studio',1,0,0,10,new Studio('TU'),new Date("January 24, 2023")),
            new StreamingService('HUA Studio',1,0,0,10,new Studio('HU'),new Date("January 23, 2023"))],
        ownStreamingService: null,

        studioNames: ["Samwise Productions", "The Bohemian Society", "Heavenly Creations", "Filmlot, Artwave", "Amethyst Studio", "Oceanic Studios", "Fantasy Nest", "Freebird Films", "Razzle Dazzle Productions", "Moonlight Pictures", "Lovelight Pictures", "Midnight",
            "Pictures", "Emberlight Films", "Sandstorm Productions", "Greenlight Films", "Incandescent Pictures", "Velvet Vision Studio", "Luna Productions", "Terra studios", "Roaring 20s Productions", "Heart of Life Studios", "Maze Pictures", "Radiant Pictures",
            "Glowing Lantern", "Indigo Studios", "Phoenix Rising Productions", "Serene Cinema", "Summer Moon Cinema", "Vintage Reel Productions", "Digital Cinema Foundry", "Red Pigment", "Burning Torch Studios", "Celestial Pictures", "Mammoth Pictures", "Everchanging Productions",
            "Mystic Moon Studios", "Digital Wonderland", "Eclipse Studios", "Cosmic Connect", "Astral Motion", "Mystic Arts Pictures", "Morningstar Films", "Sparkling Sky Productions", "Flicker Fields", "Silver Cloud Productions", "Wildheart Productions", "Open Sky Pictures",
            "Fairland Pictures", "Valley River Studios", "Golden Moon Cinemas", "Dancing Star Productions", "Starstruck Productions", "Sun Sparkle Pictures", "Dream Makers Cinema", "Lullaby Moon Studio", "Dizzy Eyes Studios", "Cozy Theater Productions", "Raven Productions",
            "Screen Arts", "Scorpio Productions", "Star Bird Studios", "Twinkle Pictures", "Silver Oak Pictures", "Mystic Cloud Pictures", "Riversong Pictures", "Gentle Breeze Cinemas", "Golden Globe Studios", "Visionary Productions", "Shining Star Pictures", "Oceanside Pictures",
            "Reflections Studios", "Dragonfly Filmworks", "Glittering Lights Pictures", "Sunset Pictures", "Broadwing Studio", "Glowing Galaxy Cinema", "Featherlight Pictures", "Starlight Cinema", "Bright Moon Pictures", "Celestial Express", "Cottonwood Pictures", "Roaring River Studios",
            "Midsummer Night Studios", "Radiant Wave Productions", "Infinity Pictures", "Mystic Meadows Studios", "Starlight Films", "Pacific Pictures", "Mystic Canyon Pictures", "Creative Chaos Studios", "Shooting Star Pictures", "Evergreen Productions", "Mystic Cat Studios",
            "Enchanted Forest Productions", "Vision Craft Studio", "Skydancer Pictures", "Morning Glory Films", "Shadow Moon Films", "Winding Path Cinemas", "Mystic Productions", "Daydream Pictures", "Sweetwater Studios", "Everlasting Films", "Sleeping Forest Studio",
            "Lyrical Lights Pictures", "Blue Horizon Films", "Reflections Pictures", "Blazing Sword Productions", "Serendipity Films", "Rainbow Valley Pictures", "Star Vision Productions", "Dreamtime Pictures", "Dreamweaver Pictures", "Dancing Sun Pictures", "Sunrise Studios",
            "Creations Pictures", "Dreaming Stars Pictures", "Waterfall Studios", "Mystic Land Picture", "Moonstone Cinemas", "Electric Light Cinema", "Wildland Pictures", "Cloud Nine Cinema", "Silver Spur Pictures", "Twilight Pictures", "Everland Pictures", "Silver Tree Pictures",
            "Moonlit Cinema", "Trailblazer Productions", "Fading Light Studios", "Silver Sky Pictures", "Dreamcatcher Studios", "Brightstar Pictures", "Mystic Flames Pictures", "Shooting Star Cinemas", "Illumine Pictures", "Wild Wind Studios", "Sunburst Cinema", "Stardust Pictures",
            "Arcadian Pictures", "Endless Summer Cinema", "Northern Lights Studio", "Solar Pictures", "Rising Sun Productions", "Mystic River Pictures", "Starry Night Pictures", "Oceanside Cinemas", "Dreamscape Pictures", "Dreamland Pictures", "Dreamweaver Studios", "Celestial Pictures",
            "Dreamweaver Productions", "Celestial Sky productions", "Twilight Zone Productions", "Shooting Star Cinemas", "Moonbeam Pictures", "Mystic Moonlight Pictures", "Southern Star Pictures", "Starlight Pictures", "Stardust Studios", "Cloudland Productions", "Shadow Moon Pictures",
            "Astral Pictures", "Mystic Memories Films", "Starlight Films", "Heavenly Dreams Films", "Stargazer Films", "Mystic Sunrise Pictures", "Sunlight Pictures", "Stardust Films", "Mystic Moon Studios", "Blue Skies Studios", "Enchanted Forest Pictures", "Starstream Pictures",
            "Mystic Light Pictures", "Glowing Embers Studios", "Dreamland Films", "Dreamwalker Pictures", "Dreamcatcher Studios", "Starry Night Films", "Moonlight Studios", "Mystic Visions Films", "Mystic Valley Pictures", "Celestial Dream Pictures"],

        screenplayTitles: ["The Waning Moon", "The Burning Flame", "The Unspoken Truth", "The Road to Nowhere", "Into the Abyss", "Shadows of the Night", "The Secret Garden", "The Unseen Path", "The Legend of Time", "The Labyrinth of Fate",
            "The Lost Soul", "The Edge of Time", "The Call of the Wild", "Celestial Rising", "Late Night Serenade", "The Last Dance", "A Long Journey", "Emerald Bay", "The Fortune Teller", "Chasing the Horizon", "Frozen Fire",
            "Dreamweaver", "The Phoenix Rises", "Starlight in the Dark", "Eternal Flame", "Moonlight Memory", "Starstruck", "To the Ends of the Earth", "The Big Sky", "The Final Act", "Road to Redemption", "Midnight Magic", "A Wish Upon a Star",
            "The Golden Hour", "Legend of the Lake", "The Siren Song", "The Labyrinth of Fate", "Silver Lining", "The Dreamcatcher", "The Edge of the World", "The Star-Crossed Lovers", "The Storm Before the Calm", "The Silver Screen",
            "Summer Solstice", "A New Dawn", "The Witching Hour", "Flash of Lightning", "The Endless Summer", "The Road Less Traveled", "The Deep Blue Sea", "The Phoenix Reborn", "The Alchemist's Tale",
            "Heart of Gold", "A Night to Remember", "The Lost Paradise", "The Rising Sun", "The Mystic Mountain", "A Moment in Time", "The Frozen North", "The Great Escape", "The Gilded Cage",
            "The Seventh Heaven", "The Night Circus", "The Garden of Dreams", "The Tempest", "The Crimson Moon", "A Dream Come True", "The Mystic Forest", "The Shadow of the Moon", "The Star-Gazer",
            "The Golden Age", "The Lost City", "Midnight Star", "The Wanderer's Path", "Frozen in Fear", "Lost in the Shadows", "The Lonely Road Ahead", "Into the Unknown", "Where the Night Begins",
            "Within the Silence", "Nightfall's Embrace", "In the Depths of Darkness", "The Secrets of the Forest", "Echoes of the Past", "Stranded in a Storm", "Ice and Fire", "Memories of Tomorrow", "Tides of Change",
            "A Stranger's Tale", "The Path Unseen", "The Final Act", "Captive of the Night", "A Whisper in the Wind", "The Forgotten Story", "The Curse of the Moon", "The Endless Journey", "A New Dawn", "The Howling Wind",
            "The Crossroads of Fate", "Beyond the Horizon", "Burning in the Dark", "The Journey Home", "The Chilling Midnight", "The Curse of the Stars", "The Road Not Taken", "The Whispering Woods", "Into the Wild"
        ],

        subgenresFromEachGenre: {
            "Action": [],
            "Adventure": [],
            "Comedy": [],
            "Documentary": [],
            "Drama": [],
            "Fantasy": [],
            "Horror":[],
            "Musical": [],
            "Romance": [],
            "Science-Fiction": [],
            "Thriller": [],
            "War": []
        },

        //Fetcher
        dbFetcher: new DBFetcher(),
        //data from database
        allPeople: [],
        allActors: [],
        allDirectors: [],
        allWriters: [],
        allAwards: [],
        allTopics: [],
        allScreenplays: [],
        allGenres: [],
        allSubGenres: [],

        editPerson: null,

        //TODO need to cut 20
        allDirectorSalary: [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1150000, 1300000, 1450000, 1600000, 1750000, 1900000, 2050000, 2200000, 2350000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000, 9000000, 9500000, 10000000, 11500000, 13000000, 14500000, 16000000, 17500000, 19000000, 20500000, 22000000, 23500000, 25000000, 26500000, 28000000,29500000, 31000000],
        allWriterSalary: [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000,525000,550000,575000,600000,625000,650000,675000,700000,725000,750000,825000,900000,975000,1050000,1125000,1200000,1275000,1350000,1425000,1500000,1600000,1700000,1800000,1900000,2000000,2100000,2200000,2300000,2400000,2500000,2750000,3000000,3250000,3500000,3750000,4000000,4250000,4500000,4750000,5000000,5500000,6000000,6500000,7000000,7500000,8000000,8500000,9000000,9500000,10000000,10500000,11000000,11500000,12000000],
    },

    /** Methods that read the application state */
    getters: {
        getScreenplays(state) {
            return state.screenplays;
        },

        getStudio(state) {
            return state.studio;
        },

        getBalance(state) {
            return state.studio.budget;
        },

        getCurrentMovieBudget(state) {
            return state.currentMovieBudget;
        },

        getCurrentMovieExpenses(state) {
            return state.currentMovieExpenses;
        },

        getCreatedMovies(state) {
            return state.createdMovies;
        },

        getCurrentMovie(state){
            return state.currentMovie;
        },

        getCurrentMovieDetails(state) {
            return state.currentMovieDetails;
        },

        getCurrentScreenplay(state){
            return state.currentScreenplay;
        },

        getBoughtScreenplays(state){
            return state.boughtScreenplays;
        },

        getNextScreenplayId(state){
            let nextId = 0;
            let allScreenplays = state.screenplays.concat(state.boughtScreenplays, state.screenplaysFromWriters)
            allScreenplays.forEach(screenplay => {
                if (screenplay.getId() > nextId) {
                    nextId = screenplay.getId();
                }
            })
            return nextId + 1;
        },

        //TODO: changes
        getCurrentLogo(state){
            return state.logo;
        },

        getCurrentStatusOfSoundeffect(state){
            return state.soundeffects;
        },

        getCurrentStatusOfBackgroundMusic(state){
            return state.backgroundMusic;
        },

        getCurrentNews(state){
            return state.news;
        },

        getEarnings(state){
            return state.earnings;
        },

        getInProductionMovies(state) {
            return state.inProductionMovies;
        },

        getCurrentDate(state){
            return state.currentDate;
        },

        getCalendarEvents(state){
            return state.calendarEvents;
        },

        getCurrentLanguage(state){
            return state.currentLanguage;
        },

        getFinishedMovies(state){
            return state.finishedMovies;
        },

        getFranchises(state){
            return state.franchises;
        },

        getOtherStudios(state) {
            return state.otherStudios;
        },

        getFinancialPerformance(state) {
            return state.financialPerformance;
        },

        getCurrentLoans(state) {
            return state.currentLoans
        },

        getAllActors(state){
            return state.allActors;
        },

        getAllDirectors(state){
            return state.allDirectors;
        },

        getAllWriters(state){
            return state.allWriters;
        },

        getAllPeople(state) {
            return state.allPeople
        },

        getSubgenresFromEachGenre(state){
            return state.subgenresFromEachGenre;
        },

        getAllSubGenres(state){
            return state.allSubGenres;
        },

        getFinancialHistory(state) {
            return state.financialHistory;
        },

        getAllTopics(state){
            return state.allTopics;
        },

        getAllGenres(state){
            return state.allGenres;
        },

        getAllMovies(state) {
            return state.allMovies
        },

        getAllYears(state) {
            return state.allYears
        },

        getAllAwards(state) {
            return state.allAwards
        },

        getAllScreenplays(state) {
            return state.allScreenplays;
        },

        getAllDirectorSalary(state) {
            return state.allDirectorSalary;
        },

        getOwnStreamingService(state) {
            return state.ownStreamingService;
        },

        getCurrentFranchise(state) {
            return state.currentFranchise;
        },

        getBoughtMovies(state) {
            return state.boughtMovies;
        },

        getStreamingServicesFromOtherStudios(state){
            return state.streamingServicesFromOtherStudios;
        },

        getSlot(state){
            return state.slot
        },

        getDirectorAndActorSalaries(state){
            return state.allDirectorSalary;
        },

        getWriterSalaries(state){
            return state.allWriterSalary;
        },

        getNextFranchiseId(state){
            let nextId = 0;
            state.franchises.forEach(franchise => {
                if (franchise.getId() > nextId) {
                    nextId = franchise.getId();
                }
            })
            return nextId + 1;
        },

        getNextStudioId(state){
            let nextId = 0;
            state.otherStudios.forEach(studio => {
                if (studio.getId() > nextId) {
                    nextId = studio.getId();
                }
            })
            return nextId + 1;
        },

        getFranchisesFromOtherStudios(state){
            return state.franchisesFromOtherStudios;
        },

        getNextOtherStudiosFranchiseId(state){
            let nextId = 0;
            state.franchisesFromOtherStudios.forEach(franchise => {
                if (franchise.getId() > nextId) {
                    nextId = franchise.getId();
                }
            })
            return nextId + 1;
        },

        getBoughtMovieRights(state){
            return state.boughtMovieRights;
        },

        getMoviesFromOtherStudios(state) {
            return state.moviesFromOtherStudios;
        },

        getScreenplaysFromWriters(state){
            return state.screenplaysFromWriters;
        }
    },

    /** Methods that change the application state synchronously */
    mutations: {
        addScreenplay(state, screenplay) {
            state.screenplays.push(screenplay);
        },

        //TODO: changes
        createStudio(state, payload) {
            state.studio = payload.studio;
            state.logo = payload.logo;
        },

        addBalance(state, value) {
            state.studio.budget += parseInt(value);
        },

        subtractBalance(state, value) {
            if (parseInt(value) > state.studio.budget) {
                throw "BALANCE TOO LOW";
            } else {
                state.studio.budget -= parseInt(value);
            }
        },

        subtractMovieExpensesFromBalance(state) {
            let expenses = state.currentMovieExpenses + state.currentMovieBudget;
            if (parseInt(expenses) > state.studio.budget) {
                throw "BALANCE TOO LOW";
            } else {
                state.studio.budget -= parseInt(expenses);
            }
        },

        addCreatedMovie(state, ratingAndIncome) {
            let createdMovie = {
                movie: state.currentMovie,
                rating: ratingAndIncome.rating,
                salaries: state.currentMovieExpenses,
                budget: state.currentMovieBudget,
                income: ratingAndIncome.income
            };
            state.createdMovies.push(createdMovie);
        },

        setCurrentMovie(state, payload) {
            state.currentMovie = payload
        },

        setCurrentMovieDetails(state, payload) {
            state.currentMovieDetails = payload;
        },

        clearCurrentMovieDetails(state) {
            state.currentMovieDetails = null;
        },

        setNewCurrentMovieAndScreenplay(state, screenplay) {
            state.currentMovie = new Movie(screenplay);
        },

        setCurrentMovieDirector(state, director){
            state.currentMovie.setDirector(director);
        },

        addCurrentMovieMainCharacter(state, actor) {
            state.currentMovie.addMainCharacter(actor);
        },

        addCurrentMovieSupportCharacter(state, actor) {
            state.currentMovie.addSupportCharacter(actor);
        },

        addCurrentMovieMinorCharacter(state, actor) {
            state.currentMovie.addMinorCharacter(actor);
        },

        addCurrentLoan(state, payload) {
            state.currentLoans.push(payload)
        },

        changeDateOfLoan(state, payload) {
            state.currentLoans.forEach((el) => {
                if (el.id === payload) {
                    el.date = state.currentDate
                }
            })
        },

        setCurrentMovieBudget(state, budget) {
            state.currentMovieBudget = budget;
        },

        setNewCurrentScreenplay(state, screenplay){
            state.currentScreenplay = screenplay;
        },

        setNewCurrentMovie(state,movie){
            state.currentMovie = movie;
        },

        setCurrentScreenplayWriter(state, writer){
            state.currentScreenplay.setWriter(writer);
        },

        setCurrentScreenplayRating(state, rating){
            state.currentScreenplay.setRating(rating);
        },

        setCurrentScreenplayPrice(state, price){
            state.currentScreenplay.setPrice(price);
        },

        addCurrentMovieExpenses(state, salary) {
            state.currentMovieExpenses += salary;
        },

        addBoughtScreenplay(state, screenplayId){
            state.boughtScreenplays.push(screenplayId);
        },

        removeScreenplay(state, screenplay) {
            state.screenplays.splice(state.screenplays.indexOf(screenplay), 1);
        },

        resetCurrentMovieInfos(state) {
            state.currentMovieBudget = 0;
            state.currentMovieExpenses = 0;
            state.currentMovie = null;
        },
        resetCurrentScreenplayInfos(state) {
            state.currentScreenplay = null;
        },

        //TODO: changes
        setCurrentLogo(state, image){
            state.logo = image;
        },

        setCurrentSoundeffect(state, status){
            state.soundeffects = status;
        },

        setCurrentBackgroundMusic(state, status){
            state.backgroundMusic = status;
        },

        addNews(state, newNews){
            state.news.push(newNews);
        },

        deleteNews(state, index){
            state.news.splice(index,1);
        },

        addEarnings(state, payload){
            state.earnings.push({value: payload[0], date: payload[1]})
        },

        addInProductionMovie(state, movie) {
            state.inProductionMovies.push(movie);
        },

        removeInProductionMovie(state, movie) {
            state.inProductionMovies.splice(state.inProductionMovies.indexOf(movie), 1);
        },

        updateCurrentDate(state){
            let lastDate = state.currentDate;
            state.currentDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()+1);
        },

        addCalendarEvents(state, calendarEvent){
            state.calendarEvents.push(calendarEvent)
        },

        addCalendarEvent(state, calendarEvent){
            state.calendarEvents.push(calendarEvent)
        },

        addEvent(state, event){
            state.happeningEvents.push(event);
        },

        changeCurrentLanguage(state, value){
            state.currentLanguage = value;
            i18next.changeLanguage(value)
        },

        addFinishedMovie(state, movie){
            state.finishedMovies.push(movie);
        },

        addFranchise(state, franchise){
            state.franchises.push(franchise);
        },

        removeFranchise(state, franchise){
            state.franchises.splice(state.franchises.indexOf(franchise), 1);
        },

        addCurrentScreenplayMainCharacter(state, character) {
            state.currentScreenplay.addMainCharacter(character);
        },

        addCurrentScreenplaySupportCharacter(state, character) {
            state.currentScreenplay.addSupportCharacter(character);
        },

        addCurrentScreenplayMinorCharacter(state, character) {
            state.currentScreenplay.addMinorCharacter(character);
        },

        addCurrentScreenplayCameoCharacter(state, character) {
            state.currentScreenplay.addCameoCharacter(character);
        },

        removeCurrentScreenplayMainCharacter(state, character) {
            state.currentScreenplay.removeMainCharacter(character);
        },

        removeCurrentScreenplaySupportCharacter(state, character) {
            state.currentScreenplay.removeSupportCharacter(character);
        },

        removeCurrentScreenplayMinorCharacter(state, character) {
            state.currentScreenplay.removeMinorCharacter(character);
        },

        removeCurrentScreenplayCameoCharacter(state, character) {
            state.currentScreenplay.removeCameoCharacter(character);
        },

        setAllActors(state, value){
            state.allActors = value;
        },

        setAllDirectors(state, value){
            state.allDirectors = value;
        },

        setAllWriters(state, value){
            state.allWriters = value;
        },

        setAllTopics(state, value){
            state.allTopics = value;
        },

        setAllGenres(state, payload) {
            state.allGenres = payload
        },

        setAllSubGenres(state, payload) {
            state.allSubGenres = payload
        },

        setOwnStreamingService(state, value){
            state.ownStreamingService = value;
        },

        setAllPeople(state, payload) {
            state.allPeople = payload;
        },

        addBoughtMovie(state, movie){
            state.boughtMovies.push(movie);
        },

        addStreamingServicesFromOtherStudios(state, service){
            state.streamingServicesFromOtherStudios.push(service)
        },

        addFranchiseFromOtherStudios(state, franchise){
            state.franchisesFromOtherStudios.push(franchise)
        },

        //payload[0] -> franchise, payload[1] -> movie
        addMovieToFranchiseFromOtherStudios(state, payload){
            for (let i = 0; i < state.franchisesFromOtherStudios.length; i++) {
                if(state.franchisesFromOtherStudios[i] === payload[0]){
                    state.franchisesFromOtherStudios[i].addAllMovies(payload[1])
                }
            }
        },

        //payload -> [0] -> bought franchise, [1] -> price of franchise
        buyFranchiseFromOtherStudios(state, payload){
          let otherStudio = state.otherStudios.filter(st => st === payload[0].owner);
          state.franchisesFromOtherStudios.splice(state.franchisesFromOtherStudios.indexOf(payload[0]), 1);
          payload[0].owner = state.studio;
          state.franchises.push(payload[0])
          state.studio.budget = state.studio.budget - payload[1];
          otherStudio.budget = otherStudio.budget + payload[1];

          for (let i = 0; i < payload[0].allMovies.length; i++) {
              state.finishedMovies.push(payload[0].allMovies[i]);
          }

          console.log(state.otherStudios)
        },

        addBoughtMovieRights(state, movie){
            state.boughtMovieRights.push(movie);
        },

        removeBoughtMovieRights(state, movie){
            state.boughtMovieRights.splice(state.boughtMovieRights.indexOf(movie), 1);
        },

        addMoviesFromOtherStudios(state, movie){
            state.moviesFromOtherStudios.push(movie);
        },

        removeMovieFromOtherStudios(state, movie){
            state.moviesFromOtherStudios.splice(state.moviesFromOtherStudios.indexOf(movie), 1);
        },

        addScreenplaysFromWriters(state, movie){
            state.screenplaysFromWriters.push(movie)
        },

        removeScreenplayFromWriters(state, movie){
            state.screenplaysFromWriters.splice(state.screenplaysFromWriters.indexOf(movie), 1);
        },

        stateToSave(state, reducedState){
            DataUtil.transferProperties(state, reducedState, [
                "slot",
                "screenplays",
                "boughtScreenplays",
                "studio",
                "balance",
                "currentMovieBudget",
                "currentMovieExpenses",
                "createdMovies",
                "logo",
                "currentDate",
                "news",
                "earnings",
                "financialPerformance",
                "inProductionMovies",
                "finishedMovies",
                "calendarEvents",
                "happeningEvent",
                "franchises",
                "otherStudios",
                "financialHistory",
                "allYears",
                "movieState",
                "preProduction",
                "marketing",
                "streamingServicesFromOtherStudios",
                "ownStreamingService",
                "boughtMovies",
                "moviesFromOtherStudios",
                "allDirectorSalary",
            ])

            return reducedState
        },
        stateToSettings(state, reducedState){
            DataUtil.transferProperties(state, reducedState, [
                "soundeffects",
                "backgroundMusic",
                "currentLanguage",
            ])

            return reducedState
        },

        loadFromSave(state, responseData){
            // Object.keys(state).forEach(key => delete state[key]);
            // Object.assign(state, responseData)

            DataUtil.transferProperties(responseData, state, [
                "slot",
                "balance",
                "currentMovieBudget",
                "currentMovieExpenses",
                "financialHistory",
                "financialPerformance",
                "allYears",
                "allDirectorSalary",
                "boughtMovies",
                "moviesFromOtherStudios",
                "logo",
                "calenderEvents"

                /**
                 *                 //Store Daten falsch
                 *                 "otherStudios",
                 *                 //Store Daten leer
                 *                 "movieState",
                 *                 //Store Daten leer
                 *                 "marketing",
                 *                 preProduction
                 */

            ])

            state.currentDate = new Date(responseData.currentDate)
            state.ownStreamingService = responseData.ownStreamingService != null ? StreamingService.fromJSON(responseData.ownStreamingService) : null
            state.streamingServicesFromOtherStudios = responseData.streamingServicesFromOtherStudios.map(jsonObject => StreamingService.fromJSON(jsonObject))
            state.franchises = responseData.franchises.map(jsonObject => Franchises.fromJSON(jsonObject))
            state.screenplays = responseData.screenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
            state.boughtScreenplays = responseData.boughtScreenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
            state.studio = Studio.fromJSON(responseData.studio)
            state.createdMovies = responseData.createdMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            state.news = responseData.news.map(jsonObject => News.fromJSON(jsonObject))
            state.earnings = responseData.earnings.map(jsonObject => Earnings.fromJSON(jsonObject))
            state.inProductionMovies = responseData.inProductionMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            state.finishedMovies = responseData.finishedMovies.map(jsonObject => Movie.fromJSON(jsonObject))

            state.happeningEvent = responseData.happeningEvent != null ? Event.fromJSON(responseData.happeningEvent) : null
            //state.otherStudios = responseData.otherStudios.map(jsonObject => Studio.fromJSON(jsonObject))
            state.boughtMovies = responseData.boughtMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            state.moviesFromOtherStudios = responseData.moviesFromOtherStudios.map(jsonObject => Movie.fromJSON(jsonObject))


            // state.preProduction = DataUtil.objectMapPerProperty(responseData.preProduction,{
            //     isPreProduction: value => value,
            //     currentScreenplay: obj => obj && Screenplay.fromJSON(obj),
            //     hiredDirector: obj => obj && Person.fromJSON(obj),
            //     feature: value => value,
            //     indie: value => value,
            //     animated: value => value,
            //     outgoings: value => value,
            //     directorMood: value => value,
            //     duration: value => value,
            //     budget: value => value ,
            //     budgetPop: value => value,
            // })
            console.log(state)
            //state.screenplays = responseData.screenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
            // state.boughtScreenplays = store.state.boughtScreenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
            // state.createdMovies = store.state.createdMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            // //state.actors = store.state.actors.map(jsonObject => actors.find(actor => actor.id === jsonObject.id)).filter(actor => actor)
            // state.currentMovie = store.state.currentMovie ? Movie.fromJSON(store.state.currentMovie) : null
            // if (store.getters.getStudio(store.state) !== 'NO STUDIO') {
            //     state.studio = Studio.fromJSON(store.state.studio)
            // }
        },

            setSlot(state, payload){
            state.slot = payload
        },

        setDBCustomName(state, name, slot){
            if(slot === 1){
                state.dbCustomName1 = name
            }
            else if(slot === 2){
                state.dbCustomName2 = name
            }
            else{
                state.dbCustomName2  = name
            }
        },

        resetState(state){
            state.screenplay = []
            state.boughtScreenplays = []
            state.studio = null
            state.currentMovieExpenses = 0
            state.currentMovieBudget = 0
            state.currentMovie = null
            state.currentMovieDetails = null
            state.currentProdEventType = ""
            state.currentPostProdEventType = ""
            state.createdMovies = []
            state.currentScreenplay = null
            state.logo = null
            state.currentDate = new Date("2023-01-01T00:00:00.000Z")
            state.news = []
            state.earnings = []
            state.financialPerformance = []
            state.calenderEvents = []
            state.happeningEvent = null
            state.franchise = []
            state.currentFranchise = null
            state.inProductionMovies = []
            state.finishedMovies = []
            state.moviesFromOtherStudios = []
            state.screenplaysFromWriters = []
            state.franchisesFromOtherStudios = []
            state.otherStudios = []
            state.boughtMovies = []
            state.boughtMovieRights = []
            state.financialHistory = []
            state.feature = ["250000 - 7500000", "250000 - 2500000", "250000 - 5000000", "250000 - 5000000", "250000 - 2500000", "250000 - 5000000", "250000 - 10000000", "250000 -  2500000", "250000 - 2500000", "250000 - 2500000", "250000 - 5000000", "250000 - 100000000"]
            state.indie = ["25000 - 2000000", "25000 - 500000", "25000 - 1500000", "25000 - 1000000", "25000 - 500000", "25000 - 1000000", "25000 - 2000000", "25000 - 500000", "5000 - 500000", "25000 - 500000", "25000 - 1000000", "250000 - 15000000"]
            state.animation = ["250000 - 5000000", "250000 - 1000000", "250000 - 3500000", "250000 - 3000000", "250000 - 1000000", "250000 - 3000000", "250000 - 5000000", "250000 - 1000000", "250000 - 1000000", "250000 - 1000000", "250000 - 3000000", "1000000 - 50000000"]
            state.preProductionEvents.actorWhoWantsToDropOut = null
            state.preProductionEvents.directorWithDispute = null
            state.type.editing = null
            state.type.sound = null
            state.type.vfx = null
            state.type.acting = null
            state.type.story = null
            state.streamingServicesFromOtherStudios = []
            state.ownStreamingService = null
            state.studioNames = ["Samwise Productions", "The Bohemian Society", "Heavenly Creations", "Filmlot, Artwave", "Amethyst Studio", "Oceanic Studios", "Fantasy Nest", "Freebird Films", "Razzle Dazzle Productions", "Moonlight Pictures", "Lovelight Pictures", "Midnight",
                "Pictures", "Emberlight Films", "Sandstorm Productions", "Greenlight Films", "Incandescent Pictures", "Velvet Vision Studio", "Luna Productions", "Terra studios", "Roaring 20s Productions", "Heart of Life Studios", "Maze Pictures", "Radiant Pictures",
                "Glowing Lantern", "Indigo Studios", "Phoenix Rising Productions", "Serene Cinema", "Summer Moon Cinema", "Vintage Reel Productions", "Digital Cinema Foundry", "Red Pigment", "Burning Torch Studios", "Celestial Pictures", "Mammoth Pictures", "Everchanging Productions",
                "Mystic Moon Studios", "Digital Wonderland", "Eclipse Studios", "Cosmic Connect", "Astral Motion", "Mystic Arts Pictures", "Morningstar Films", "Sparkling Sky Productions", "Flicker Fields", "Silver Cloud Productions", "Wildheart Productions", "Open Sky Pictures",
                "Fairland Pictures", "Valley River Studios", "Golden Moon Cinemas", "Dancing Star Productions", "Starstruck Productions", "Sun Sparkle Pictures", "Dream Makers Cinema", "Lullaby Moon Studio", "Dizzy Eyes Studios", "Cozy Theater Productions", "Raven Productions",
                "Screen Arts", "Scorpio Productions", "Star Bird Studios", "Twinkle Pictures", "Silver Oak Pictures", "Mystic Cloud Pictures", "Riversong Pictures", "Gentle Breeze Cinemas", "Golden Globe Studios", "Visionary Productions", "Shining Star Pictures", "Oceanside Pictures",
                "Reflections Studios", "Dragonfly Filmworks", "Glittering Lights Pictures", "Sunset Pictures", "Broadwing Studio", "Glowing Galaxy Cinema", "Featherlight Pictures", "Starlight Cinema", "Bright Moon Pictures", "Celestial Express", "Cottonwood Pictures", "Roaring River Studios",
                "Midsummer Night Studios", "Radiant Wave Productions", "Infinity Pictures", "Mystic Meadows Studios", "Starlight Films", "Pacific Pictures", "Mystic Canyon Pictures", "Creative Chaos Studios", "Shooting Star Pictures", "Evergreen Productions", "Mystic Cat Studios",
                "Enchanted Forest Productions", "Vision Craft Studio", "Skydancer Pictures", "Morning Glory Films", "Shadow Moon Films", "Winding Path Cinemas", "Mystic Productions", "Daydream Pictures", "Sweetwater Studios", "Everlasting Films", "Sleeping Forest Studio",
                "Lyrical Lights Pictures", "Blue Horizon Films", "Reflections Pictures", "Blazing Sword Productions", "Serendipity Films", "Rainbow Valley Pictures", "Star Vision Productions", "Dreamtime Pictures", "Dreamweaver Pictures", "Dancing Sun Pictures", "Sunrise Studios",
                "Creations Pictures", "Dreaming Stars Pictures", "Waterfall Studios", "Mystic Land Picture", "Moonstone Cinemas", "Electric Light Cinema", "Wildland Pictures", "Cloud Nine Cinema", "Silver Spur Pictures", "Twilight Pictures", "Everland Pictures", "Silver Tree Pictures",
                "Moonlit Cinema", "Trailblazer Productions", "Fading Light Studios", "Silver Sky Pictures", "Dreamcatcher Studios", "Brightstar Pictures", "Mystic Flames Pictures", "Shooting Star Cinemas", "Illumine Pictures", "Wild Wind Studios", "Sunburst Cinema", "Stardust Pictures",
                "Arcadian Pictures", "Endless Summer Cinema", "Northern Lights Studio", "Solar Pictures", "Rising Sun Productions", "Mystic River Pictures", "Starry Night Pictures", "Oceanside Cinemas", "Dreamscape Pictures", "Dreamland Pictures", "Dreamweaver Studios", "Celestial Pictures",
                "Dreamweaver Productions", "Celestial Sky productions", "Twilight Zone Productions", "Shooting Star Cinemas", "Moonbeam Pictures", "Mystic Moonlight Pictures", "Southern Star Pictures", "Starlight Pictures", "Stardust Studios", "Cloudland Productions", "Shadow Moon Pictures",
                "Astral Pictures", "Mystic Memories Films", "Starlight Films", "Heavenly Dreams Films", "Stargazer Films", "Mystic Sunrise Pictures", "Sunlight Pictures", "Stardust Films", "Mystic Moon Studios", "Blue Skies Studios", "Enchanted Forest Pictures", "Starstream Pictures",
                "Mystic Light Pictures", "Glowing Embers Studios", "Dreamland Films", "Dreamwalker Pictures", "Dreamcatcher Studios", "Starry Night Films", "Moonlight Studios", "Mystic Visions Films", "Mystic Valley Pictures", "Celestial Dream Pictures"]
            state.screenplay.title = ["The Waning Moon", "The Burning Flame", "The Unspoken Truth", "The Road to Nowhere", "Into the Abyss", "Shadows of the Night", "The Secret Garden", "The Unseen Path", "The Legend of Time", "The Labyrinth of Fate",
                "The Lost Soul", "The Edge of Time", "The Call of the Wild", "Celestial Rising", "Late Night Serenade", "The Last Dance", "A Long Journey", "Emerald Bay", "The Fortune Teller", "Chasing the Horizon", "Frozen Fire",
                "Dreamweaver", "The Phoenix Rises", "Starlight in the Dark", "Eternal Flame", "Moonlight Memory", "Starstruck", "To the Ends of the Earth", "The Big Sky", "The Final Act", "Road to Redemption", "Midnight Magic", "A Wish Upon a Star",
                "The Golden Hour", "Legend of the Lake", "The Siren Song", "The Labyrinth of Fate", "Silver Lining", "The Dreamcatcher", "The Edge of the World", "The Star-Crossed Lovers", "The Storm Before the Calm", "The Silver Screen",
                "Summer Solstice", "A New Dawn", "The Witching Hour", "Flash of Lightning", "The Endless Summer", "The Road Less Traveled", "The Deep Blue Sea", "The Phoenix Reborn", "The Alchemist's Tale",
                "Heart of Gold", "A Night to Remember", "The Lost Paradise", "The Rising Sun", "The Mystic Mountain", "A Moment in Time", "The Frozen North", "The Great Escape", "The Gilded Cage",
                "The Seventh Heaven", "The Night Circus", "The Garden of Dreams", "The Tempest", "The Crimson Moon", "A Dream Come True", "The Mystic Forest", "The Shadow of the Moon", "The Star-Gazer",
                "The Golden Age", "The Lost City", "Midnight Star", "The Wanderer's Path", "Frozen in Fear", "Lost in the Shadows", "The Lonely Road Ahead", "Into the Unknown", "Where the Night Begins",
                "Within the Silence", "Nightfall's Embrace", "In the Depths of Darkness", "The Secrets of the Forest", "Echoes of the Past", "Stranded in a Storm", "Ice and Fire", "Memories of Tomorrow", "Tides of Change",
                "A Stranger's Tale", "The Path Unseen", "The Final Act", "Captive of the Night", "A Whisper in the Wind", "The Forgotten Story", "The Curse of the Moon", "The Endless Journey", "A New Dawn", "The Howling Wind",
                "The Crossroads of Fate", "Beyond the Horizon", "Burning in the Dark", "The Journey Home", "The Chilling Midnight", "The Curse of the Stars", "The Road Not Taken", "The Whispering Woods", "Into the Wild"]
            state.subgenresFromEachGenre = {
                "Action": [],
                    "Adventure": [],
                    "Comedy": [],
                    "Documentary": [],
                    "Drama": [],
                    "Fantasy": [],
                    "Horror":[],
                    "Musical": [],
                    "Romance": [],
                    "Science-Fiction": [],
                    "Thriller": [],
                    "War": []
            }
            state.allPeople = []
            state.Actors = []
            state.allDirectors =[]
            state.allWriters = []
            state.allAwards = []
            state.allTopics = []
            state.allScreenplays = []
            state.allGenres = []
            state.allSubGenres = []
            state.editPerson = []
            state.allDirectorSalary = [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1150000, 1300000, 1450000, 1600000, 1750000, 1900000, 2050000, 2200000, 2350000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000, 9000000, 9500000, 10000000, 11500000, 13000000, 14500000, 16000000, 17500000, 19000000, 20500000, 22000000, 23500000, 25000000, 26500000, 28000000,29500000, 31000000]
            state.allWriterSalary = [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000,525000,550000,575000,600000,625000,650000,675000,700000,725000,750000,825000,900000,975000,1050000,1125000,1200000,1275000,1350000,1425000,1500000,1600000,1700000,1800000,1900000,2000000,2100000,2200000,2300000,2400000,2500000,2750000,3000000,3250000,3500000,3750000,4000000,4250000,4500000,4750000,5000000,5500000,6000000,6500000,7000000,7500000,8000000,8500000,9000000,9500000,10000000,10500000,11000000,11500000,12000000]
        }

    },

    /** Methods that change the application state asynchronously */
    actions: {},
})
