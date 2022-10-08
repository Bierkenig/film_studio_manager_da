import store from "../services/store";

const actorGenreWeight = 65,
    actorWeight = 35,
    mainActorPerformanceWeight = 50,
    supportActorPerformanceWeight = 35,
    minorActorPerformanceWeight = 15,
    directorGenreWeight = 65,
    directorWeight = 35,
    movieRatingActorWeight = 20,
    movieRatingBudgetWeight = 15,
    movieRatingScreenplayWeight = 40,
    movieRatingDirectorWeight = 25,
    genreBudgetLevels = {
        action: 3, comedy: 1, drama: 2, fantasy: 3, horror: 1, musical: 1, romance: 1,
        scienceFiction: 3, thriller: 2, western: 2, history: 2
    },
    genreMaxIncomeInBillions = {
        action: 2, comedy: 1, drama: 2.5, fantasy: 1.5, horror: 1, musical: 1, romance: 1.5,
        scienceFiction: 2.5, thriller: 2, western: 1, history: 0.5
    },
    genreFailureRateInPercent = {
        action: 20, comedy: 10, drama: 25, fantasy: 15, horror: 10, musical: 10, romance: 15,
        scienceFiction: 25, thriller: 20, western: 30, history: 25
    };

export class Calculations {
    constructor(movie) {
        this.movie = movie;
    }

    getActorPerformanceRating(actor) {
        return (actor.getGenres()[this.movie.getScreenplay().getGenre()] * actorGenreWeight + actor.getRating() * actorWeight) / 100;
    }

    getMainPerformances() {
        let mainActors = this.movie.getRoles().main;
        let sumMainActorPerformances = 0;
        for (let mainActorsKey in mainActors) {
            sumMainActorPerformances += this.getActorPerformanceRating(mainActors[mainActorsKey]);
        }
        return (sumMainActorPerformances * mainActorPerformanceWeight) / mainActors.length;
    }

    getSupportPerformances() {
        let supportActors = this.movie.getRoles().main;
        let sumSupportActorPerformances = 0;
        for (let supportActorsKey in supportActors) {
            sumSupportActorPerformances += this.getActorPerformanceRating(supportActors[supportActorsKey]);
        }
        return (sumSupportActorPerformances * supportActorPerformanceWeight) / supportActors.length;
    }

    getMinorPerformances() {
        let minorActors = this.movie.getRoles().main;
        let sumMinorActorPerformances = 0;
        for (let minorActorsKey in minorActors) {
            sumMinorActorPerformances += this.getActorPerformanceRating(minorActors[minorActorsKey]);
        }
        return (sumMinorActorPerformances * minorActorPerformanceWeight) / minorActors.length;
    }

    getTotalActorRating() {
        return (this.getMainPerformances() + this.getSupportPerformances() + this.getMinorPerformances()) / 100
    }

    getBudgetLevel() {
        let budget = store.getters.getCurrentMovieBudget(store.state);
        if (budget > 250000000) {
            return 4;
        } else if (budget > 100000000) {
            return 3;
        } else if (budget > 50000000) {
            return 2;
        } else if (budget > 20000000) {
            return 1;
        } else {
            return 0;
        }
    }

    getBudgetRating() {
        let deviation = Math.abs(this.getBudgetLevel() - genreBudgetLevels[this.movie.getScreenplay().getGenre()]);
        switch (deviation) {
            case 0:
                return 1;
            case 1:
                return 0.5;
            case 2:
                return 0.25;
            default:
                return 0;
        }
    }

    getDirectorRating() {
        return (this.movie.getDirector().getGenres()[this.movie.getScreenplay().getGenre()] * directorGenreWeight + this.movie.getDirector().getRating() * directorWeight) / 100;
    }

    getMovieRating() {
        return (this.getTotalActorRating() * movieRatingActorWeight + this.getBudgetRating() * movieRatingBudgetWeight + this.movie.getScreenplay().getRating() * movieRatingScreenplayWeight + this.getDirectorRating() * movieRatingDirectorWeight) / 100;
    }

    generateMovieIncome() {
        let randomSuccessRate = 1 - (Math.random() * genreFailureRateInPercent[this.movie.getScreenplay().getGenre().toLowerCase()] * 2 - genreFailureRateInPercent[this.movie.getScreenplay().getGenre().toLowerCase()]) / 100;
        return genreMaxIncomeInBillions[this.movie.getScreenplay().getGenre().toLowerCase()] * Math.pow(10, 9) * (this.getMovieRating() / 10) * randomSuccessRate;
    }
}