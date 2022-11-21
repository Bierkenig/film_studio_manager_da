import store from "../services/store";

export class Screenplay {
    constructor(id, title, type, genre, subgenre, ageRating, writer, description, rating, price, topics, scope, franchise = null) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.ageRating = ageRating;
        this.writer = writer;
        this.description = description;
        this.rating = rating;
        this.ratingRange = null;
        this.price = price;
        this.type = type;
        this.subgenre = subgenre;
        this.topics = topics;
        //scope = little, small, normal, large, epic
        this.roles = {main: [], support: [], minor: [], cameo: [], voiceOver: []};
        this.acts = {act1: [], act2: [], act3: []};
        this.details = {scope: '', tone: '', specialEffects: ''};
        this.ageRatingDetails = {violence: '', cursing: '', loveScenes: ''};
        this.length = null;
        this.writingPhase = null;
        this.rewritingValue = 3;
        this.rewritingStatus = false;
        this.franchise = franchise
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getGenre() {
        return this.genre;
    }

    getAgeRating() {
        return this.ageRating;
    }

    getWriter() {
        return this.writer;
    }

    getDescription() {
        return this.description;
    }

    getRating() {
        return this.rating;
    }

    getPrice(){
        return this.price;
    }

    getType() {
        return this.type;
    }

    getSubgenre() {
        return this.subgenre;
    }

    getActs(){
        return this.acts;
    }

    getTopics(){
        return this.topics;
    }

    getDetails(){
        return this.details;
    }

    getAgeRatingDetails(){
        return this.ageRatingDetails;
    }

    getRoles() {
        return this.roles;
    }

    getLength(){
        return this.length;
    }

    getWritingPhase() {
        return this.writingPhase;
    }

    getRewritingStatus(){
        return this.rewritingStatus;
    }

    getRewritingValue(){
        return this.rewritingValue;
    }

    getRatingRange(){
        return this.ratingRange;
    }




    setWriter(value){
        this.writer = value;
    }

    setRating(value){
        this.rating = value;
    }

    setPrice(value){
        this.price = value;
    }

    setType(value) {
        this.type = value;
    }

    setSubgenre(value) {
        this.subgenre = value;
    }

    setAct1(value) {
        this.acts.act1 = value;
    }

    setAct2(value) {
        this.acts.act2 = value;
    }

    setAct3(value) {
        this.acts.act3 = value;
    }

    addMainCharacter(actor) {
        this.roles.main.push(actor);
    }

    addSupportCharacter(actor) {
        this.roles.support.push(actor);
    }

    addMinorCharacter(actor) {
        this.roles.minor.push(actor);
    }

    addCameoCharacter(actor) {
        this.roles.cameo.push(actor);
    }

    addVoiceOverCharacter(actor) {
        this.roles.voiceOver.push(actor);
    }

    setScope(value){
        this.details.scope = value;
    }

    setTone(value){
        this.details.tone = value;
    }

    setSpecialEffects(value){
        this.details.specialEffects = value;
    }

    setViolence(value){
        this.ageRatingDetails.violence = value;
    }

    setCursing(value){
        this.ageRatingDetails.cursing = value;
    }

    setLoveScenes(value){
        this.ageRatingDetails.loveScenes = value;
    }

    setAgeRating(value){
        this.ageRating = value;
    }

    setLength(value){
        this.length = value;
    }

    setWritingPhase(value){
        this.writingPhase = value;
    }

    setRewritingStatus(value){
        this.rewritingStatus = value;
    }

    subtractRewriting(){
        this.rewritingValue = this.rewritingValue - 1;
    }

    setRatingRange(value){
        this.ratingRange = value;
    }

    toString() {
        return "Screenplay (name: " + this.title + ", type: " + this.type + ", genre: " + this.genre + ", subgenre: " + this.subgenre + ", age rating: " + this.ageRating +
            ",\nwriter: " + this.writer +
            ", rating: " + this.rating + "\n" +
            "price: " + this.price + ")\n\n";
    }

    static fromJSON(jsonObject) {
        let instance = Object.assign(new Screenplay(), jsonObject)
        instance.writer = instance.writer ? store.data.allWriters.find(writer => writer.id === instance.writer.id) : null
        return instance
    }
}