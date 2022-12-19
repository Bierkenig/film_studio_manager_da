import {createStore} from "vuex";
import {Studio} from "@/classes/Studio";
import {Movie} from "@/classes/Movie";
import News from "@/classes/News";
import Award from "@/classes/Award";
import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Franchises from "@/classes/Franchises";
import {StreamingService} from "@/classes/StreamingService";
import Earnings from "@/classes/Earnings";
import Event from "@/classes/Event";

export default createStore({
    /** Application state */
    state:{
        slot: null,
        dbCustomName1: null,
        dbCustomName2: null,
        dbCustomName3: null,
        screenplays: [],
        boughtScreenplays: [],
        studio: new Studio('NO STUDIO'),
        balance: 0,
        currentMovieBudget: 0,
        currentMovieExpenses: 0,
        //movies which are still in cinema and generate profit
        createdMovies: [],
        //muss das ins save file?
        currentMovie: null,
        currentScreenplay: null,
        //TODO: changes
        logo: null,
        soundeffects: true,
        backgroundMusic: true,
        currentDate: new Date("January 01, 2023"),
        currentLanguage: 'en',
        //news: ['Studio XYZ gegründet', 'Studio XYZ in Konkurs','A','B','C'],
        news: [
            new News('Studio 1235 gegründet',
                new Person(0,null,'Jakob','hallo',23,'male','austrian','arabian',4,4,3,null,null,5,23,123456,true,false,false,null),
                new Movie(new Screenplay(0, 'sa', 'cooles', null, null, null, null, null, null, 123, null), new Studio('hallo'), 2023, 23),
                new Award('Deine MUm', 'internationalAward')),
            new News('Benni ist cool',
                new Person(1,null,'Benni','Schmid',12,'male','austrian','arabian',4,4,3,null,null,5,23,123456,true,false,false,null),
                new Movie(new Screenplay(0, 'hallo', 'cooles', null, null, null, null, null, null, 123, null), new Studio('hallo'), 2023, 23),
                new Award('Neuer', 'anderer Award'))
        ],
        //nicht fertig
        earnings: [
            {
                value: 245000,
                date: new Date(2024,0,4)
            },
            {
                value: 500000,
                date: new Date(2023,11,15)
            }
        ],
        //nicht fertig
        financialPerformance: [
            {
                date: {
                    name: "January 2023",
                    data: {
                        production: {incoming: "-", outgoing: -300000},
                        marketing: {incoming: "-", outgoing: -40000},
                        loan: {incoming: "-", outgoing: -30000000},
                        cinema: {incoming: 33000000, outgoing: -2000000},
                        streaming: {incoming: 200000, outgoing: -20000000},
                    }
                }
            },
            {
                date: {
                    name: "February 2023",
                    data: {
                        production: {incoming: "-", outgoing: -20000},
                        marketing: {incoming: "-", outgoing: -30000},
                        loan: {incoming: "-", outgoing: -30000000},
                        cinema: {incoming: 33000000, outgoing: -2000000},
                        streaming: {incoming: 200000, outgoing: -20000000},
                    }
                },
            }
        ],
        //movies which are in currentProduction
        inProductionMovies: [],
        //movies which aren't in cinema anymore and are completely finished
        finishedMovies: [],
        //nicht fertig
        happeningEvent: new Event("Breakdown", new Date("2020-12-21"), new Date("2022-09-01")),
        franchises: [new Franchises(0, 'Hallo was geht')],
        currentFranchise: null,
        otherStudios: [
            [new Studio('Example Studio 1').getName(), "2023", 100],
            [new Studio('Example Studio 2').getName(), "2023", 200],
        ],
        financialHistory: [
            {title: "financialHistory.event1", desc: "financialHistory.desc1", iconPath: ""},
            {title: "financialHistory.event2", desc: "financialHistory.desc2", iconPath: ""},
            {title: "financialHistory.event3", desc: "financialHistory.desc3", iconPath: ""},
        ],
        allYears: [2023, 2024, 2025],

        //movie State
        movieState: "",
        //preProduction
        preProduction: {
            isPreProduction: false,
            currentScreenplay: null,
            hiredDirector: new Person(0,null,'Jakob','hallo',23,'male','austrian','arabian',4,4,null,5,null,5,23,123456,false,true,false,null),
            feature: ["250000 - 7500000", "250000 - 2500000", "250000 - 5000000", "250000 - 5000000", "250000 - 2500000", "250000 - 5000000", "250000 - 10000000", "250000 -  2500000", "250000 - 2500000", "250000 - 2500000", "250000 - 5000000", "250000 - 100000000"],
            indie: ["25.000 - 2.000.000", "25.000 - 500.000", "25.000 - 1.500.000", "25.000 - 1.000.000", "25.000 - 500.000", "25.000 - 1.000.000", "25.000 - 2.000.000", "25.000 - 500.000", "5.000 - 500.000", "25.000 - 500.000", "25.000 - 1.000.000", "250.000 - 15.000.000"],
            animated: ["250.000 - 5.000.000", "250.000 - 1.000.000", "250.000 - 3.500.000", "250.000 - 3.000.000", "250.000 - 1.000.000", "250.000 - 3.000.000", "250.000 - 5.000.000", "250.000 - 1.000.000", "250.000 - 1.000.000", "250.000 - 1.000.000", "250.000 - 3.000.000", "1.000.000 - 50.000.000"],
            outgoings: 0,
            //can be: 2 = fine, 3 = angry and 1 = relaxed
            directorMood: 0,
            duration: {
                preProductionLength: 0,
                productionLength: 0,
                postProductionLength: 0,
                releaseDate: 0,
            },
            budget: {
                production: 0,
                extras: 0,
                cinematography: 0,
                sound: 0,
                editing: 0,
                score: 0,
                set: 0,
                stunts: 0,
                costume: 0,
                makeup: 0,
                vfx: 0,
                sfx: 0,
                problemBudget: 0,
            },
            budgetPop: 12,
        },

        marketing: {

        },

        streamingServicesFromOtherStudios: [new StreamingService('ASX Studio',1,0,0,'AS'),
            new StreamingService('TUV Studio',1,0,0,'TU'),
            new StreamingService('HUA Studio',1,0,0,'HU')],
        ownStreamingService: null,
        //movies which you are owning (created, bought rights, bought movies)
        allOwningMovies: [new Movie(new Screenplay(2, 'TEST3', null, null,
            null,null, null, null, null, null,
            {firstTopic: undefined, secondTopic: undefined, thirdTopic: undefined}),'25.11.2022','MEINS',0)],
        //movies from other studios (no rights have been bought yet, non-owning movies)
        moviesFromOtherStudios: [new Movie(new Screenplay(0, 'TEST', null, null,
            null,null, null, null, null, null,
            {firstTopic: undefined, secondTopic: undefined, thirdTopic: undefined}),'21.11.2022','Example Studio2',null),
            new Movie(new Screenplay(1, 'TEST2', null, null,
                null,null, null, null, null, null,
                {firstTopic: undefined, secondTopic: undefined, thirdTopic: undefined}),'23.11.2022','Example Studio1',null),
            new Movie(new Screenplay(3, 'TEST3', null, null,
                null,null, null, null, null, null,
                {firstTopic: undefined, secondTopic: undefined, thirdTopic: undefined}),'25.11.2022','Example Studio3',null)],



        //data from database
        allPeople: [],
        allActors: [],
        allDirectors: [],
        allWriters: [],
        allMovies: [],
        allAwards: [],
        allTopics: [],
        allScreenplays: [],

        //editor
        editPerson: null,

        //salary
        allDirectorSalary: [11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 115000, 130000, 145000, 160000, 175000, 190000, 205000, 220000, 235000, 250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1150000, 1300000, 1450000, 1600000, 1750000, 1900000, 2050000, 2200000, 2350000, 2500000, 2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000, 4750000, 5000000, 5500000, 6000000, 6500000, 7000000, 7500000, 8000000, 8500000, 9000000, 9500000, 10000000, 11500000, 13000000, 14500000, 16000000, 17500000, 19000000, 20500000, 22000000, 23500000, 25000000],
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
            return state.balance;
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

        getCurrentScreenplay(state){
            return state.currentScreenplay;
        },

        getBoughtScreenplays(state){
            return state.boughtScreenplays;
        },

        getNextScreenplayId(state){
            let nextId = 0;
            state.screenplays.forEach(screenplay => {
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

        getEvents(state){
            return state.events;
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

        getAllActors(state){
            return state.allActors;
        },

        getAllDirectors(state){
            return state.allDirectors;
        },

        getAllWriters(state){
            return state.allWriters;
        },

        getFinancialHistory(state) {
            return state.financialHistory;
        },

        getAllTopics(state){
            return state.allTopics;
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

        getAllOwningMovies(state) {
            return state.allOwningMovies;
        },

        getMoviesFromOtherStudios(state) {
            return state.moviesFromOtherStudios;
        },

        getStreamingServicesFromOtherStudios(state){
            return state.streamingServicesFromOtherStudios;
        },

        getSlot(state){
            return state.slot
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
            state.balance = payload.budget;
            state.logo = payload.logo;
        },

        addBalance(state, value) {
            state.balance += parseInt(value);
        },

        subtractBalance(state, value) {
            if (parseInt(value) > state.balance) {
                throw "BALANCE TOO LOW";
            } else {
                state.balance -= parseInt(value);
            }
        },

        subtractMovieExpensesFromBalance(state) {
            let expenses = state.currentMovieExpenses + state.currentMovieBudget;
            if (parseInt(expenses) > state.balance) {
                throw "BALANCE TOO LOW";
            } else {
                state.balance -= parseInt(expenses);
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

        setCurrentMovieBudget(state, budget) {
            state.currentMovieBudget = budget;
        },

        setNewCurrentScreenplay(state, screenplay){
            state.currentScreenplay = screenplay;
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
            state.currentDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()+7);
        },

        addEvent(state, event){
            state.happeningEvents.push(event);
        },

        changeCurrentLanguage(state, value){
            state.currentLanguage = value;
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

        addCurrentScreenplayVoiceOverCharacter(state, character) {
            state.currentScreenplay.addVoiceOverCharacter(character);
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

        setOwnStreamingService(state, value){
            state.ownStreamingService = value;
        },

        setAllPeople(state, payload) {
            state.allPeople = payload;
        },

        addOwningMovie(state, movie){
            state.allOwningMovies.push(movie);
        },

        addMoviesFromOtherStudios(state, movie){
            state.moviesFromOtherStudios.push(movie);
        },

        addStreamingServicesFromOtherStudios(state, service){
            state.streamingServicesFromOtherStudios.push(service)
        },

        stateToSave(state, reducedState){
            Screenplay.transferProperties(state, reducedState, [
                "slot",
                "hasEditedDB",
                "screenplays",
                "boughtScreenplays",
                "studio",
                "balance",
                "currentMovieBudget",
                "currentMovieExpenses",
                "createdMovies",
                "logo",
                "soundeffects",
                "backgroundMusic",
                "currentDate",
                "currentLanguage",
                "news",
                "earnings",
                "financialPerformance",
                "inProductionMovies",
                "finishedMovies",
                "events",
                "franchises",
                "otherStudios",
                "financialHistory",
                "allYears",
                "preProduction",
                "allDirectorSalary",
                "ownStreamingService"
            ])

            return reducedState
        },

        loadFromSave(state, responseData){

            // Object.keys(state).forEach(key => delete state[key]);
            // Object.assign(state, responseData)

            Screenplay.transferProperties(responseData, state, [
                "slot",
                "hasEditedDB",
                "balance",
                "currentMovieBudget",
                "currentMovieExpenses",
                "soundeffects",
                "backgroundMusic",
                "currentLanguage",
                "financialHistory",
                "allYears",
                "allDirectorSalary",
                "allOwningMovies",
                "moviesFromOtherStudios",
                "logo"
            ])

            state.currentDate = new Date(responseData.currentDate)
            state.ownStreamingService = StreamingService.fromJSON(responseData.ownStreamingService)
            state.franchises = responseData.franchises.map(jsonObject => Franchises.fromJSON(jsonObject))
            state.screenplays = responseData.screenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
            state.boughtScreenplays = responseData.boughtScreenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
            state.studio = Studio.fromJSON(responseData.studio)
            state.createdMovies = responseData.createdMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            state.news = responseData.news.map(jsonObject => News.fromJSON(jsonObject))
            state.earnings = responseData.earnings.map(jsonObject => Earnings.fromJSON(jsonObject))
            state.inProductionMovies = responseData.inProductionMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            state.finishedMovies = responseData.finishedMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            state.otherStudios = responseData.otherStudios.map(jsonObject => Studio.fromJSON(jsonObject))
            state.allOwningMovies = responseData.allOwningMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            state.moviesFromOtherStudios = responseData.moviesFromOtherStudios.map(jsonObject => Movie.fromJSON(jsonObject))
            /**
                "events",
                "financialPerformance",
                "preProduction",
             **/

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
        }

    },

    /** Methods that change the application state asynchronously */
    actions: {},
})
