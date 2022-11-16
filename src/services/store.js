import {createStore} from "vuex";
import {Studio} from "@/classes/Studio";
import {Movie} from "@/classes/Movie";
import News from "@/classes/News";
import Award from "@/classes/Award";
import Actor from "@/classes/Actor";
import {Screenplay} from "@/classes/Screenplay";

export default createStore({
    /** Application state */
    state:{
        screenplays: [],
        boughtScreenplays: [],
        studio: new Studio('NO STUDIO'),
        balance: 0,
        currentMovieBudget: 0,
        currentMovieExpenses: 0,
        //movies which are still in cinema and generate profit
        createdMovies: [],
        currentMovie: null,
        currentScreenplay: null,
        //TODO: changes
        logo: null,
        soundeffects: true,
        backgroundMusic: true,
        currentDate: new Date("January 1, 2023"),
        currentLanguage: 'en',
        //news: ['Studio XYZ gegründet', 'Studio XYZ in Konkurs','A','B','C'],
        news: [
            new News('Studio 1235 gegründet',
                new Actor(0, 'Jakob', 'hallo', 23, 23, 350498, 123456, 'male', null, 3, 'arabian', 4, 'austrian', 4, 5),
                new Movie(new Screenplay(0, 'sa', 'cooles', null, null, null, null, null, null, 123, null), new Studio('hallo'), 2023, 23),
                new Award('Deine MUm', 'internationalAward')),
            new News('Benni ist cool',
                new Actor(1, 'Benni', 'Schmid', 12, 23, 350498, 123456, 'male', null, 3, 'arabian', 4, 'austrian', 4, 5),
                new Movie(new Screenplay(0, 'hallo', 'cooles', null, null, null, null, null, null, 123, null), new Studio('hallo'), 2023, 23),
                new Award('Neuer', 'anderer Award'))
        ],
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
        //movies which are in production
        inProductionMovies: [],
        //movies which aren't in cinema anymore and are completely finished
        finishedMovies: [],
        events: [
            {
            title: "SOMETHING",
            start: '2023-01-06',
            end: '2023-01-10'
            },
            {
            title: "NICHTS",
            start: '2023-01-07',
            end: '2023-01-09'
            }],
        franchises: [],
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
        //data from database
        allActors: [],
        allDirectors: [],
        allWriters: [],
        allMovies: [],
        allAwards: [],
        allTopics: [],
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
            state.events.push(event);
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

        loadFromSave(state, responseData){
            //TODO unsicher und nicht optimal eingefügt, muss ausgebessert werden siehe auskommentierte lines
            Object.keys(state).forEach(key => delete state[key]);
            Object.assign(state, responseData)
            // state.screenplays = store.state.screenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
            // state.boughtScreenplays = store.state.boughtScreenplays.map(jsonObject => Screenplay.fromJSON(jsonObject))
            // state.createdMovies = store.state.createdMovies.map(jsonObject => Movie.fromJSON(jsonObject))
            // //state.actors = store.state.actors.map(jsonObject => actors.find(actor => actor.id === jsonObject.id)).filter(actor => actor)
            // state.currentMovie = store.state.currentMovie ? Movie.fromJSON(store.state.currentMovie) : null
            // if (store.getters.getStudio(store.state) !== 'NO STUDIO') {
            //     state.studio = Studio.fromJSON(store.state.studio)
            // }
        }
    },

    /** Methods that change the application state asynchronously */
    actions: {},
})
