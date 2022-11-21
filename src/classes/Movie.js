export class Movie {
    constructor(screenplay, date) {
        this.screenplay = screenplay
        this.title = screenplay.title
        this.date = date
        this.earnings = []
    }
}