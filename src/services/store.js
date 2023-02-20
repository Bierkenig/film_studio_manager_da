import {createStore} from "vuex";
import {Studio} from "@/classes/Studio";
import {Movie} from "@/classes/Movie";
import News from "@/classes/News";
import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Franchises from "@/classes/Franchises";
import {StreamingService} from "@/classes/StreamingService";
import Earnings from "@/classes/Earnings";
import DataUtil from "@/classes/DataUtil";
import FinancialPerformance from '@/classes/FinancialPerformance'
import i18next from "i18next";
import DBFetcher from "@/classes/DBFetcher";
import FinancialHistoryEntry from "@/classes/FinancialHistoryEntry";
import Loan from "@/classes/Loan";
import Award from "@/classes/Award";

export default createStore({
    /** Application state */
    state: {
        slot: null,
        screenplays: [],
        boughtScreenplays: [],
        studio: null,
        currentMovieBudget: 0,
        currentMovieExpenses: 0,
        currentMovie: null,
        currentMovieDetails: null,
        currentProdEventType: "",
        currentPostProdEventType: "",
        currentScreenplay: null,
        logo: null,
        soundeffects: false,
        backgroundMusic: true,
        currentDate: new Date("2023-01-01T00:00:00.000Z"),
        currentLanguage: 'en',
        news: [],
        earnings: [],
        financialPerformance: [],
        currentCalendarEvent: null,
        calendarEvents: [],
        franchises: [],
        currentFranchise: null,

        //while cinema
        createdMovies: [],
        //while production
        inProductionMovies: [],
        //when finished
        finishedMovies: [],
        awardsOfOwnStudio: [],

        moviesFromOtherStudios: [],
        screenplaysFromWriters: [],
        franchisesFromOtherStudios: [],

        otherStudios: [],

        boughtMovies: [],
        boughtMovieRights: [],

        financialHistory: [],

        currentLoans: [],

        feature: ["250000 - 7500000", "250000 - 2500000", "250000 - 5000000", "250000 - 5000000", "250000 - 2500000", "250000 - 5000000", "250000 - 10000000", "250000 -  2500000", "250000 - 2500000", "250000 - 2500000", "250000 - 5000000", "250000 - 100000000"],
        indie: ["25000 - 2000000", "25000 - 500000", "25000 - 1500000", "25000 - 1000000", "25000 - 500000", "25000 - 1000000", "25000 - 2000000", "25000 - 500000", "5000 - 500000", "25000 - 500000", "25000 - 1000000", "250000 - 15000000"],
        animation: ["250000 - 5000000", "250000 - 1000000", "250000 - 3500000", "250000 - 3000000", "250000 - 1000000", "250000 - 3000000", "250000 - 5000000", "250000 - 1000000", "250000 - 1000000", "250000 - 1000000", "250000 - 3000000", "1000000 - 50000000"],

        preProductionEvents: {
            actorWhoWantsToDropOut: null,
            directorWithDispute: null,
        },

        type: {
            editing: null,
            sound: null,
            vfx: null,
            acting: null,
            story: null
        },

        streamingServicesFromOtherStudios: [],
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
            "Horror": [],
            "Musical": [],
            "Romance": [],
            "Science-Fiction": [],
            "Thriller": [],
            "War": []
        },

        months: ["january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ],

        marketYears: [2023],

        awardNominationList: {
            internationalAward: {
                "Movies": [], // Movie Objects
                "ActorLeadingRole": [], // Person Objects
                "ActorSupportingRole": [], // Person Objects
                "ActressLeadingRole": [], // Person Objects
                "ActressSupportingRole": [], // Person Objects
                "Directors": [], // Person Objects
                "Writers": [], // Person Objects
            },
            independentAward: {
                "Movies": [], // Movie Objects
                "Actor": [], // Person Objects
                "Actress": [], // Person Objects
                "Directors": [], // Person Objects
                "Writers": [], // Person Objects
            },
            audienceAward: {
                "ActionOrAdventureMovies": [], // Movie Objects
                "ThrillerMovies": [], // Movie Objects
                "ScienceFictionMovies": [], // Movie Objects
                "FantasyMovies": [], // Movie Objects
                "HorrorMovies": [], // Movie Objects
                "Actor": [], // Person Objects
                "Actress": [], // Person Objects
                "Directors": [], // Person Objects
                "Writers": [], // Person Objects
            }
        },

        createdAwards: [],

        //Fetcher
        dbFetcher: null,
        //data from database
        allPeople: [],
        allActors: [],
        allDirectors: [],
        allWriters: [],
        allAwards: [],
        allTopics: [],
        allScreenplays: [],
        allMovies: [],
        allGenres: [],
        allSubGenres: [],
        allCharacters: [],

        editPerson: null,
        editStudio: null,
        allDirectorSalary: [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1150000, 1300000, 1450000, 1600000, 1750000, 1900000, 2050000, 2200000, 2350000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000, 9000000, 9500000, 10000000, 11500000, 13000000, 14500000, 16000000, 17500000, 19000000, 20500000, 22000000, 23500000, 25000000, 26500000, 28000000, 29500000, 31000000],
        allWriterSalary: [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 525000, 550000, 575000, 600000, 625000, 650000, 675000, 700000, 725000, 750000, 825000, 900000, 975000, 1050000, 1125000, 1200000, 1275000, 1350000, 1425000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000, 9000000, 9500000, 10000000, 10500000, 11000000, 11500000, 12000000],
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

        getCurrentMovie(state) {
            return state.currentMovie;
        },

        getCurrentMovieDetails(state) {
            return state.currentMovieDetails;
        },

        getCurrentScreenplay(state) {
            return state.currentScreenplay;
        },

        getBoughtScreenplays(state) {
            return state.boughtScreenplays;
        },

        getPreProductionEvents(state) {
            return state.preProductionEvents;
        },

        getNextScreenplayId(state) {
            let nextId = 0;
            let allScreenplays = state.screenplays.concat(state.boughtScreenplays, state.screenplaysFromWriters, state.allScreenplays)
            allScreenplays.forEach(screenplay => {
                if (screenplay.getId() > nextId) {
                    nextId = screenplay.getId();
                }
            })
            return nextId + 1;
        },

        getNextMovieId(state) {
            let nextId = 0;
            let allMovies = state.inProductionMovies.concat(state.createdMovies, state.finishedMovies, state.moviesFromOtherStudios, state.allMovies)
            allMovies.forEach(movie => {
                if (movie.id > nextId) {
                    nextId = movie.id;
                }
            })
            return nextId + 1;
        },

        //TODO: changes
        getCurrentLogo(state) {
            return state.logo;
        },

        getCurrentStatusOfSoundeffect(state) {
            return state.soundeffects;
        },

        getCurrentStatusOfBackgroundMusic(state) {
            return state.backgroundMusic;
        },

        getCurrentNews(state) {
            return state.news;
        },

        getEarnings(state) {
            return state.earnings;
        },

        getAllCharacters(state) {
            return state.allCharacters
        },

        getInProductionMovies(state) {
            return state.inProductionMovies;
        },

        getCurrentDate(state) {
            return state.currentDate;
        },

        getCalendarEvents(state) {
            return state.calendarEvents;
        },

        getCurrentLanguage(state) {
            return state.currentLanguage;
        },

        getMarketYears(state) {
            return state.marketYears
        },

        getFinishedMovies(state) {
            return state.finishedMovies;
        },

        getFranchises(state) {
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

        getAllActors(state) {
            return state.allActors;
        },

        getAllDirectors(state) {
            return state.allDirectors;
        },

        getAllWriters(state) {
            return state.allWriters;
        },

        getAllPeople(state) {
            return state.allPeople
        },

        getSubgenresFromEachGenre(state) {
            return state.subgenresFromEachGenre;
        },

        getAllSubGenres(state) {
            return state.allSubGenres;
        },

        getFinancialHistory(state) {
            return state.financialHistory;
        },

        getAllTopics(state) {
            return state.allTopics;
        },

        getAllGenres(state) {
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

        getOwnStreamingService(state) {
            return state.ownStreamingService;
        },

        getCurrentFranchise(state) {
            return state.currentFranchise;
        },

        getBoughtMovies(state) {
            return state.boughtMovies;
        },

        getStreamingServicesFromOtherStudios(state) {
            return state.streamingServicesFromOtherStudios;
        },

        getSlot(state) {
            return state.slot
        },

        getDirectorAndActorSalaries(state) {
            return state.allDirectorSalary;
        },

        getWriterSalaries(state) {
            return state.allWriterSalary;
        },

        getNextFranchiseId(state) {
            let nextId = 0;
            state.franchises.forEach(franchise => {
                if (franchise.getId() > nextId) {
                    nextId = franchise.getId();
                }
            })
            return nextId + 1;
        },

        getNextStudioId(state) {
            let nextId = 0;
            state.otherStudios.forEach(studio => {
                if (studio.getId() > nextId) {
                    nextId = studio.getId();
                }
            })
            return nextId + 1;
        },

        getNextEventId(state) {
            let nextId = 0;
            state.calendarEvents.forEach(calendarEvent => {
                if (calendarEvent['id'] > nextId) {
                    nextId = calendarEvent['id'];
                }
            })
            return nextId + 1;
        },

        getFranchisesFromOtherStudios(state) {
            return state.franchisesFromOtherStudios;
        },

        getNextOtherStudiosFranchiseId(state) {
            let nextId = 0;
            state.franchisesFromOtherStudios.forEach(franchise => {
                if (franchise.getId() > nextId) {
                    nextId = franchise.getId();
                }
            })
            return nextId + 1;
        },

        getBoughtMovieRights(state) {
            return state.boughtMovieRights;
        },

        getMoviesFromOtherStudios(state) {
            return state.moviesFromOtherStudios;
        },

        getScreenplaysFromWriters(state) {
            return state.screenplaysFromWriters;
        },

        getAwardsOfOwnStudio(state) {
            return state.awardsOfOwnStudio;
        },

        getCurrentCalendarEvent(state) {
            return state.currentCalendarEvent;
        },

        getInternationalAwardNominations(state) {
            return state.awardNominationList['internationalAward'];
        },

        getIndependentAwardNominations(state) {
            return state.awardNominationList['independentAward'];
        },

        getAudienceAwardNominations(state) {
            return state.awardNominationList['audienceAward'];
        },

        getCreatedAwards(state) {
            return state.createdAwards;
        },

        getNextAwardId(state) {
            let nextId = 0;
            let allAwards = state.allAwards.concat(state.createdAwards);
            allAwards.forEach(award => {
                if (award.id > nextId) {
                    nextId = award.id;
                }
            })
            return nextId + 1;
        },
    },

    /** Methods that change the application state synchronously */
    mutations: {
        addScreenplay(state, screenplay) {
            state.screenplays.push(screenplay);
        },

        addAllMovie(state, movie) {
            state.allMovies = movie
        },

        addAllScreenplay(state, screenplays) {
            state.allScreenplays = screenplays
        },

        addAllAward(state, award) {
            state.allAwards.push(award)
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

        addCreatedMovie(state, createdMovie) {
            state.createdMovies.push(createdMovie);
        },

        removeCreatedMovie(state, createdMovie) {
            state.createdMovies.splice(state.createdMovies.indexOf(createdMovie), 1);
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

        setCurrentMovieDirector(state, director) {
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

        setCurrentLoans(state, payload) {
            state.currentLoans = payload
        },

        setCurrentMovieBudget(state, budget) {
            state.currentMovieBudget = budget;
        },

        setNewCurrentScreenplay(state, screenplay) {
            state.currentScreenplay = screenplay;
        },

        setNewCurrentMovie(state, movie) {
            state.currentMovie = movie;
        },

        setCurrentScreenplayWriter(state, writer) {
            state.currentScreenplay.setWriter(writer);
        },

        setCurrentScreenplayRating(state, rating) {
            state.currentScreenplay.setRating(rating);
        },

        setCurrentScreenplayPrice(state, price) {
            state.currentScreenplay.setPrice(price);
        },

        addCurrentMovieExpenses(state, salary) {
            state.currentMovieExpenses += salary;
        },

        addBoughtScreenplay(state, screenplayId) {
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
        setCurrentLogo(state, image) {
            state.logo = image;
        },

        setCurrentSoundeffect(state, status) {
            state.soundeffects = status;
        },

        setCurrentBackgroundMusic(state, status) {
            state.backgroundMusic = status;
        },

        addNews(state, newNews) {
            state.news.push(newNews);
        },

        deleteNews(state, index) {
            state.news.splice(index, 1);
        },

        addEarnings(state, payload) {
            state.earnings.push({value: payload[0], date: payload[1]})
        },

        addFinancialPerformance(state, payload) {
            state.financialPerformance.push(payload)
        },

        addInProductionMovie(state, movie) {
            state.inProductionMovies.push(movie);
        },

        removeInProductionMovie(state, movie) {
            state.inProductionMovies.splice(state.inProductionMovies.indexOf(movie), 1);
        },

        updateCurrentDate(state) {
            let lastDate = state.currentDate;
            state.currentDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 1);
        },

        addCalendarEvents(state, calendarEvent) {
            state.calendarEvents.push(calendarEvent)
        },

        addCalendarEvent(state, calendarEvent) {
            state.calendarEvents.push(calendarEvent)
        },

        addOtherStudios(state, payload) {
            state.otherStudios = payload
        },

        setAllCharacters(state, payload) {
            state.allCharacters = payload
        },

        changeCurrentLanguage(state, value) {
            state.currentLanguage = value;
            i18next.changeLanguage(value)
        },

        addFinishedMovie(state, movie) {
            state.finishedMovies.push(movie);
        },

        addFranchise(state, franchise) {
            state.franchises.push(franchise);
        },

        removeFranchise(state, franchise) {
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

        setAllActors(state, value) {
            state.allActors = value;
        },

        setAllDirectors(state, value) {
            state.allDirectors = value;
        },

        setAllWriters(state, value) {
            state.allWriters = value;
        },

        setAllTopics(state, value) {
            state.allTopics = value;
        },

        setAllGenres(state, payload) {
            state.allGenres = payload
        },

        setAllSubGenres(state, payload) {
            state.allSubGenres = payload
        },

        setOwnStreamingService(state, value) {
            state.ownStreamingService = value;
        },

        setAllPeople(state, payload) {
            state.allPeople = payload;
        },

        addBoughtMovie(state, movie) {
            state.boughtMovies.push(movie);
        },

        addStreamingServicesFromOtherStudios(state, service) {
            state.streamingServicesFromOtherStudios.push(service)
        },

        removeStreamingServiceFromOtherStudios(state, service) {
            state.streamingServicesFromOtherStudios.splice(state.streamingServicesFromOtherStudios.indexOf(service), 1);
        },

        addFranchiseFromOtherStudios(state, franchise) {
            state.franchisesFromOtherStudios.push(franchise)
        },

        //payload[0] -> franchise, payload[1] -> movie
        addMovieToFranchiseFromOtherStudios(state, payload) {
            for (let i = 0; i < state.franchisesFromOtherStudios.length; i++) {
                if (state.franchisesFromOtherStudios[i] === payload[0]) {
                    state.franchisesFromOtherStudios[i].addAllMovies(payload[1])
                }
            }
        },

        //payload -> [0] -> bought franchise, [1] -> price of franchise
        buyFranchiseFromOtherStudios(state, payload) {
            let otherStudio = state.otherStudios.filter(st => st === payload[0].owner);
            state.franchisesFromOtherStudios.splice(state.franchisesFromOtherStudios.indexOf(payload[0]), 1);
            payload[0].owner = state.studio;
            state.franchises.push(payload[0])
            state.studio.budget = state.studio.budget - payload[1];
            otherStudio.budget = otherStudio.budget + payload[1];

            for (let i = 0; i < payload[0].allMovies.length; i++) {
                state.finishedMovies.push(payload[0].allMovies[i]);
            }
        },

        addBoughtMovieRights(state, movie) {
            state.boughtMovieRights.push(movie);
        },

        removeBoughtMovieRights(state, movie) {
            state.boughtMovieRights.splice(state.boughtMovieRights.indexOf(movie), 1);
        },

        addMoviesFromOtherStudios(state, movie) {
            state.moviesFromOtherStudios.push(movie);
        },

        removeMovieFromOtherStudios(state, movie) {
            state.moviesFromOtherStudios.splice(state.moviesFromOtherStudios.indexOf(movie), 1);
        },

        addScreenplaysFromWriters(state, movie) {
            state.screenplaysFromWriters.push(movie)
        },

        removeScreenplayFromWriters(state, movie) {
            state.screenplaysFromWriters.splice(state.screenplaysFromWriters.indexOf(movie), 1);
        },

        addAwardToOwnStudio(state, award) {
            state.awardsOfOwnStudio.push(award)
        },

        setCurrentProdEventType(state, type) {
            state.currentProdEventType = type;
        },

        setCurrentPostProdEventType(state, type) {
            state.currentPostProdEventType = type;
        },

        setCurrentCalendarEvent(state, event) {
            state.currentCalendarEvent = event;
        },

        //payload[0] -> which type of award z.B. 'internationalAward'
        //payload[1] -> which category z.B. 'Movies'
        //payload[2] -> array of nominated objects
        setNominationList(state, payload) {
            state.awardNominationList[payload[0]][payload[1]] = payload[2]
        },

        addCreatedAward(state, award) {
            state.createdAwards.push(award);
        },

        removeMovieFromAllMovies(state, movie) {
            state.allMovies.splice(state.allMovies.indexOf(movie), 1);
        },

        removePerson(state, id) {
            state.allPeople.splice(id - 1, 1)
            state.allActors.splice(id - 1, 1)
            state.allDirectors.splice(id - 1, 1)
            state.allWriters.splice(id - 1, 1)
        },

        refreshPerson(state, payload) {
            state.allPeople.forEach(person => {
                if (person.id === payload.id) {
                    person._experience = payload.exp
                    person._popularity = payload.pop
                }
            })
            state.allActors.forEach(person => {
                if (person.id === payload.id) {
                    person._experience = payload.exp
                    person._popularity = payload.pop
                }
            })
            state.allDirectors.forEach(person => {
                if (person.id === payload.id) {
                    person._experience = payload.exp
                    person._popularity = payload.pop
                }
            })
            state.allWriters.forEach(person => {
                if (person.id === payload.id) {
                    person._experience = payload.exp
                    person._popularity = payload.pop
                }
            })
        },

        createPerson(state, payload) {
            console.log(payload)
            state.allPeople.push(new Person(payload[0], payload[1][0], payload[1][1], payload[1][2], payload[1][3],
                payload[1][4], payload[1][5], payload[1][6], payload[1][7], payload[1][8], payload[1][9], payload[1][10],
                payload[1][11], payload[1][12],
                payload[1][13], payload[1][14], payload[1][15], payload[1][16], payload[1][17], payload[1][18], payload[1][19],
                payload[1][20],
                payload[1][21], payload[1][22], payload[1][23], payload[1][24], payload[1][25], payload[1][26], payload[1][27],
                payload[1][28]))

            if (payload[1][26] === 'true') {
                state.allActors.push(new Person(payload[0], payload[1][0], payload[1][1], payload[1][2], payload[1][3],
                    payload[1][4], payload[1][5], payload[1][6], payload[1][7], payload[1][8], payload[1][9], payload[1][10],
                    payload[1][11], payload[1][12],
                    payload[1][13], payload[1][14], payload[1][15], payload[1][16], payload[1][17], payload[1][18], payload[1][19],
                    payload[1][20],
                    payload[1][21], payload[1][22], payload[1][23], payload[1][24], payload[1][25], payload[1][26], payload[1][27],
                    payload[1][28]))
            }
            if (payload[1][27] === 'true') {
                state.allDirectors.push(new Person(payload[0], payload[1][0], payload[1][1], payload[1][2], payload[1][3],
                    payload[1][4], payload[1][5], payload[1][6], payload[1][7], payload[1][8], payload[1][9], payload[1][10],
                    payload[1][11], payload[1][12],
                    payload[1][13], payload[1][14], payload[1][15], payload[1][16], payload[1][17], payload[1][18], payload[1][19],
                    payload[1][20],
                    payload[1][21], payload[1][22], payload[1][23], payload[1][24], payload[1][25], payload[1][26], payload[1][27],
                    payload[1][28]))
            }
            if (payload[1][28] === 'true') {
                state.allWriters.push(new Person(payload[0], payload[1][0], payload[1][1], payload[1][2], payload[1][3],
                    payload[1][4], payload[1][5], payload[1][6], payload[1][7], payload[1][8], payload[1][9], payload[1][10],
                    payload[1][11], payload[1][12],
                    payload[1][13], payload[1][14], payload[1][15], payload[1][16], payload[1][17], payload[1][18], payload[1][19],
                    payload[1][20],
                    payload[1][21], payload[1][22], payload[1][23], payload[1][24], payload[1][25], payload[1][26], payload[1][27],
                    payload[1][28]))
            }
        },

        removeScreenplayFromAllScreenplays(state, screenplay) {
            state.allScreenplays.splice(state.allScreenplays.indexOf(screenplay), 1);
        },

        stateToSave(state, reducedState) {
            DataUtil.transferProperties(state, reducedState, [
                "slot",
                "screenplays",
                "boughtScreenplays",
                "studio",
                "createdMovies",
                "logo",
                "currentDate",
                "news",
                "earnings",
                "financialPerformance",
                "calendarEvents",
                "franchises",
                "inProductionMovies",
                "finishedMovies",
                "awardsOfOwnStudio",
                "moviesFromOtherStudios",
                "screenplaysFromWriters",
                "franchisesFromOtherStudios",
                "otherStudios",
                "boughtMovies",
                "boughtMovieRights",
                "financialHistory",
                "currentLoans",
                "preProductionEvents",
                "streamingServicesFromOtherStudios",
                "ownStreamingService",
                "type",
                "awardNominationList",
                "createdAwards",
                "allPeople",
                "allActors",
                "allDirectors",
                "allWriters",
            ])

            return reducedState
        },
        stateToSettings(state, reducedState) {
            DataUtil.transferProperties(state, reducedState, [
                "soundeffects",
                "backgroundMusic",
                "currentLanguage",
            ])

            return reducedState
        },

        loadFromSave(state, responseData) {
            // Object.keys(state).forEach(key => delete state[key]);
            // Object.assign(state, responseData)
            try {
                DataUtil.transferProperties(responseData, state, [
                    "slot",
                    "logo",
                    "type",
                    "calenderEvents",
                ])

                //TODO earnings
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
                state.otherStudios = responseData.otherStudios.map(jsonObject => Studio.fromJSON(jsonObject))
                state.boughtMovies = responseData.boughtMovies.map(jsonObject => Movie.fromJSON(jsonObject))
                state.moviesFromOtherStudios = responseData.moviesFromOtherStudios.map(jsonObject => Movie.fromJSON(jsonObject))
                state.financialPerformance = responseData.financialPerformance.map(jsonObject => FinancialPerformance.fromJSON(jsonObject))
                state.inProductionMovies = responseData.inProductionMovies.map(jsonObject => Movie.fromJSON(jsonObject))
                state.finishedMovies = responseData.finishedMovies.map(jsonObject => Movie.fromJSON(jsonObject))
                state.awardsOfOwnStudio = responseData.awardsOfOwnStudio.map(jsonObject => Award.fromJSON(jsonObject))
                state.moviesFromOtherStudios = responseData.moviesFromOtherStudios.map(jsonObject => Movie.fromJSON(jsonObject))
                state.screenplaysFromWriters = responseData.screenplaysFromWriters.map(jsonObject => Screenplay.fromJSON(jsonObject))
                state.franchisesFromOtherStudios = responseData.franchisesFromOtherStudios.map(jsonObject => Franchises.fromJSON(jsonObject))
                state.boughtMovieRights = responseData.boughtMovieRights.map(jsonObject => Movie.fromJSON(jsonObject))
                state.financialHistory = responseData.financialHistory.map(jsonObject => FinancialHistoryEntry.fromJSON(jsonObject))
                state.currentLoans = responseData.currentLoans.map(jsonObject => Loan.fromJSON(jsonObject))
                state.createdAwards = responseData.createdAwards.map(jsonObject => Award.fromJSON(jsonObject))
                state.allPeople = responseData.allPeople.map(jsonObject => Person.fromJSON(jsonObject))
                state.allWriter = responseData.allWriter.map(jsonObject => Person.fromJSON(jsonObject))
                state.allDirectors = responseData.allDirectors.map(jsonObject => Person.fromJSON(jsonObject))
                state.allActors = responseData.allActors.map(jsonObject => Person.fromJSON(jsonObject))


                state.preProductionEvents = DataUtil.objectMapPerProperty(responseData.preProductionEvents, {
                    actorWhoWantsToDropOut: DataUtil.preserveNull(Movie.fromJSON),
                    directorWithDispute: DataUtil.preserveNull(Person.fromJSON)
                })

                state.awardNominationList = DataUtil.objectMapPerProperty(responseData.awardNominationList, {
                    internationalAward: DataUtil.preserveNull(obj => DataUtil.objectMapPerProperty(obj, {
                        Movies: DataUtil.mapArray(Movie.fromJSON),
                        ActorLeadingRole: DataUtil.mapArray(Person.fromJSON),
                        ActorSupportingRole: DataUtil.mapArray(Person.fromJSON),
                        ActressLeadingRole: DataUtil.mapArray(Person.fromJSON),
                        ActressSupportingRole: DataUtil.mapArray(Person.fromJSON),
                        Directors: DataUtil.mapArray(Person.fromJSON),
                        Writers: DataUtil.mapArray(Person.fromJSON)
                    })),
                    independentAward: DataUtil.preserveNull(obj => DataUtil.objectMapPerProperty(obj, {
                        Movies: DataUtil.mapArray(Movie.fromJSON),
                        Actor: DataUtil.mapArray(Person.fromJSON),
                        Actress: DataUtil.mapArray(Person.fromJSON),
                        Directors: DataUtil.mapArray(Person.fromJSON),
                        Writers: DataUtil.mapArray(Person.fromJSON),
                    })),
                    audienceAward: DataUtil.preserveNull(obj => DataUtil.objectMapPerProperty(obj, {
                        ActionOrAdventureMovies: DataUtil.mapArray(Movie.fromJSON),
                        ThrillerMovies: DataUtil.mapArray(Movie.fromJSON),
                        ScienceFictionMovies: DataUtil.mapArray(Movie.fromJSON),
                        FantasyMovies: DataUtil.mapArray(Movie.fromJSON),
                        HorrorMovies: DataUtil.mapArray(Movie.fromJSON),
                        Actor: DataUtil.mapArray(Person.fromJSON),
                        Actress: DataUtil.mapArray(Person.fromJSON),
                        Directors: DataUtil.mapArray(Person.fromJSON),
                        Writers: DataUtil.mapArray(Person.fromJSON)
                    }))
                })

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
                //state.screenplays = responseData.screenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
                // state.boughtScreenplays = store.state.boughtScreenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
                // state.createdMovies = store.state.createdMovies.map(jsonObject => Movie.fromJSON(jsonObject))
                // //state.actors = store.state.actors.map(jsonObject => actors.find(actor => actor.id === jsonObject.id)).filter(actor => actor)
                // state.currentMovie = store.state.currentMovie ? Movie.fromJSON(store.state.currentMovie) : null
                // if (store.getters.getStudio(store.state) !== 'NO STUDIO') {
                //     state.studio = Studio.fromJSON(store.state.studio)
                // }
            } catch (e) {
                console.log(e)
                throw e
            }

        },

        setSlot(state, payload) {
            state.slot = payload
        },

        setDBCustomName(state, name, slot) {
            if (slot === 1) {
                state.dbCustomName1 = name
            } else if (slot === 2) {
                state.dbCustomName2 = name
            } else {
                state.dbCustomName2 = name
            }
        },

        resetState(state) {
            state.slot = null
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
            state.currentCalendarEvent = null
            state.calenderEvents = []
            state.franchise = []
            state.currentFranchise = null
            state.inProductionMovies = []
            state.finishedMovies = []
            state.awardsOfOwnStudio = []
            state.moviesFromOtherStudios = []
            state.screenplaysFromWriters = []
            state.franchisesFromOtherStudios = []
            state.otherStudios = []
            state.marketYears = [2023]
            state.boughtMovies = []
            state.boughtMovieRights = []
            state.financialHistory = []
            state.currentLoans = []
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
            state.screenplayTitles = ["The Waning Moon", "The Burning Flame", "The Unspoken Truth", "The Road to Nowhere", "Into the Abyss", "Shadows of the Night", "The Secret Garden", "The Unseen Path", "The Legend of Time", "The Labyrinth of Fate",
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
                "Horror": [],
                "Musical": [],
                "Romance": [],
                "Science-Fiction": [],
                "Thriller": [],
                "War": []
            }
            state.months = ["january", "february", "march", "april", "may", "june",
                "july", "august", "september", "october", "november", "december"]
            state.awardNominationList = {
                internationalAward: {
                    "Movies": [], // Movie Objects
                    "ActorLeadingRole": [], // Person Objects
                    "ActorSupportingRole": [], // Person Objects
                    "ActressLeadingRole": [], // Person Objects
                    "ActressSupportingRole": [], // Person Objects
                    "Directors": [], // Person Objects
                    "Writers": [], // Person Objects
                },
                independentAward: {
                    "Movies": [], // Movie Objects
                    "Actor": [], // Person Objects
                    "Actress": [], // Person Objects
                    "Directors": [], // Person Objects
                    "Writers": [], // Person Objects
                },
                audienceAward: {
                    "ActionOrAdventureMovies": [], // Movie Objects
                    "ThrillerMovies": [], // Movie Objects
                    "ScienceFictionMovies": [], // Movie Objects
                    "FantasyMovies": [], // Movie Objects
                    "HorrorMovies": [], // Movie Objects
                    "Actor": [], // Person Objects
                    "Actress": [], // Person Objects
                    "Directors": [], // Person Objects
                    "Writers": [], // Person Objects
                }
            }
            state.createdAwards = []
            state.dbFetcher = new DBFetcher()
            state.allPeople = []
            state.allActors = []
            state.allDirectors = []
            state.allWriters = []
            state.allAwards = []
            state.allTopics = []
            state.allScreenplays = []
            state.allMovies = []
            state.allGenres = []
            state.allSubGenres = []
            state.allCharacters = []
            state.editPerson = []
            state.editStudio = []
            state.allDirectorSalary = [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1150000, 1300000, 1450000, 1600000, 1750000, 1900000, 2050000, 2200000, 2350000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000, 9000000, 9500000, 10000000, 11500000, 13000000, 14500000, 16000000, 17500000, 19000000, 20500000, 22000000, 23500000, 25000000, 26500000, 28000000, 29500000, 31000000]
            state.allWriterSalary = [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 525000, 550000, 575000, 600000, 625000, 650000, 675000, 700000, 725000, 750000, 825000, 900000, 975000, 1050000, 1125000, 1200000, 1275000, 1350000, 1425000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000, 9000000, 9500000, 10000000, 10500000, 11000000, 11500000, 12000000]
        }

    },

    /** Methods that change the application state asynchronously */
    actions: {},
})
