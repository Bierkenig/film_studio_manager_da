import {createStore} from "vuex";
import {Studio} from "@/classes/Studio";
import {Movie} from "@/classes/Movie";

export default createStore({
    /** Application state */
    state:{
        screenplays: [],
        boughtScreenplays: [],
        studio: new Studio('NO STUDIO'),
        balance: 0,
        currentMovieBudget: 0,
        currentMovieExpenses: 0,
        createdMovies: [],
        currentMovie: null,
        currentScreenplay: null,
        //TODO: changes
        logo: null,
        soundeffects: true,
        backgroundMusic: true,
    },

    /** global data loaded from database*/
    data:{
        allActors: [],
        allDirectors:[],
        allWriters:[],
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
        }
    },

    /** Methods that change the application state asynchronously */
    actions: {},
})
