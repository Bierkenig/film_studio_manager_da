import store from "@/services/store";
import {Studio} from "@/classes/Studio";
import News from "@/classes/News";
import {Avataaars} from "@/avatar/avataaars"
import {all} from "core-js/internals/document-all";

//Avatar Option Lists
/*const skin = ["tanned", "yellow", "pale", "light", "brown", "darkBrown", "black"]
const mouth = ["concerned", "default", "disbelief", "eating", "grimace", "sad", "screamOpen", "serious", "smile", "tongue", "twinkle", "vomit"]
const eyes = ["squint", "closed", "cry", "default", "eyeRoll", "happy", "hearts", "side", "surprised", "wink", "winkWacky", "xDizzy"]
const eyebrows = ["angryNatural", "defaultNatural", "flatNatural", "frownNatural", "raisedExcitedNatural", "sadConcernedNatural", "unibrowNatural", "upDownNatural", "raisedExcited", "angry", "default", "sadConcerned", "upDown"]
const top = ["dreads01", "dreads02", "frizzle", "shaggyMullet", "shaggy", "shortCurly", "shortFlat", "shortRound", "sides", "shortWaved", "theCaesarAndSidePart", "theCaesar", "bigHair", "bob", "bun", "curly", "curvy", "dreads", "frida", "froAndBand", "fro", "longButNotTooLong", "miaWallace", "shavedSides", "straightAndStrand", "straight01", "straight02", "eyepatch", "turban", "hijab", "hat", "winterHat01", "winterHat02", "winterHat03", "winterHat04"]
const hairColor = ["auburn", "black", "blonde", "blondeGolden", "brown", "brownDark", "pastelPink", "platinum", "red", "silverGray"]
const facialHair = ["none", "beardLight", "beardMagestic", "beardMedium", "moustaceFancy", "moustacheMagnum"]
const facialHairColor = ["auburn", "black", "blonde", "blondeGolden", "brown", "brownDark", "pastelPink", "platinum", "red", "silverGray"]
const clothing = ["blazerAndShirt", "blazerAndSweater", "collarAndSweater", "graphicShirt", "hoodie", "overall", "shirtCrewNeck", "shirtScoopNeck", "shirtVNeck"]
const clothingColor = ["black", "blue01", "blue02", "blue03", "gray01", "gray02", "heather", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"]
const accessories = ["none", "kurt", "prescription01", "prescription02", "round", "sunglasses", "wayfarers"]
const accessoriesColor = ["black", "blue01", "blue02", "blue03", "gray01", "gray02", "heather", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"]
const hatColor = ["black", "blue01", "blue02", "blue03", "gray01", "gray02", "heather", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"]
*/
//nationality values (Germany: 10, Italy: 10, Spain: 10, France: 10, UK: 10, USA: 60)
const nationality = ["Algeria", " Angola", " Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde/Cape Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo/Republic of the Congo", "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea Guinea-Bissau", "Ivory Coast/Republic of Côte d'Ivoire", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe", "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "British Indian Ocean Territory (UK territory)", "Brunei", "Cambodia", "China", "Georgia", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Macau", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen", "UK", "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States of America", "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu", "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela", "Germany", "France", "Spain", "Italy", "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia/Czech Republic", "Denmark", "Estonia", "Finland", "Georgia", "Greece", "Hungary", "Iceland", "Ireland", "Kazakhstan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Sweden", "Switzerland", "Turkey", "Ukraine", "Vatican City"]

//ethnicity values
const ethnicity = ["Caucasian", "Black", "Asian", "Arabic", "People of Color"]


export default function simulate() {
    //TODO fetch DB again
    console.log('Simulation works')
    createStudios();
    streamingService();
    renewPeople();
}

//function to create new studios
function createStudios() {
    let num = randomNumber(0.10);
    if (num === 0) {
        //get all existing studio names
        let allStudios = [store.getters.getStudio.getName()];
        store.getters.getOtherStudios.forEach(studio => {
            allStudios.push(studio.getName())
        })

        //get studio name of new studio, check if name already exists
        let studioName = store.state.studioNames[Math.floor(Math.random() * store.state.studioNames.length)];
        while (allStudios.includes(studioName)){
            studioName = store.state.studioNames[Math.floor(Math.random() * store.state.studioNames.length)]
        }

        //get id of new studio (last studio id + 1)
        let studioId;
        if (store.getters.getOtherStudios.length === 0) {
            studioId = 2;
        } else {
            studioId = store.getters.getNextStudioId;
        }
        let newStudio = new Studio(studioId, studioName, store.getters.getCurrentDate.getFullYear(), 50000000, 0);
        store.getters.getOtherStudios.push(newStudio);

        //create news of new studio
        let newsTitle = newStudio.getName() + ' gegründet';
        let newsDescription = 'Das Studio ' + newStudio.getName() + ' wurde gegründet.';
        store.commit('addNews',new News(newsTitle, newsDescription, 'Studios',null,null,null,newStudio))
    }
}

//function to get 0 or 1 with specific probability
function randomNumber(probability) {
    return Math.random() < probability ? 0 : 1;
}

//function for streaming service costs / earnings
function streamingService() {
    if (store.getters.getOwnStreamingService !== null) {
        //get movies from streaming service
        let streamingServiceMovies = store.getters.getBoughtMovieRights;

        /*
        vertragslänge von gekauften Filmrechte überprüfen und gegebenfalls aktualisieren,
        wenn vertragslänge gleich 0, dann wieder aus boughtMovieRights löschen
         */
        streamingServiceMovies.forEach(function (movie){
            let checkDate = new Date(
                movie._boughtRightDate.getFullYear()+1,
                movie._boughtRightDate.getMonth(),
                movie._boughtRightDate.getDate())

            if(store.getters.getCurrentDate > checkDate){
                if(movie._contract === 1){
                    store.commit('removeBoughtMovieRights',movie)
                } else {
                    movie._boughtRightDate = checkDate;
                    movie._contract--;
                }
            }
        })

        //earnings / costs per month
        if (((store.getters.getCurrentDate - store.getters.getOwnStreamingService._lastCheckedDate) / (1000 * 60 * 60 * 24)) > 30) {
            //get subscriber number
            let serviceMaintainmentCosts = store.getters.getOwnStreamingService._subscribers;
            //substract maintainment costs from balance
            store.commit('subtractBalance', serviceMaintainmentCosts);

            //calculate revenue for subscribers
            let revenue = store.getters.getOwnStreamingService._subscribers * store.getters.getOwnStreamingService._price;
            //add revenue to balance
            store.commit('addBalance', revenue);

            //content maintainment costs
            //divide movies into contract length
            let oneYearMovies = [];
            let twoYearsMovies = [];
            let threeYearsMovies = [];
            let fourYearsMovies = [];
            let fiveYearsMovies = [];

            streamingServiceMovies.forEach(function(movie){
                switch (movie.contract){
                    case 1:
                        oneYearMovies.push(movie);
                        break;
                    case 2:
                        twoYearsMovies.push(movie);
                        break;
                    case 3:
                        threeYearsMovies.push(movie);
                        break;
                    case 4:
                        fourYearsMovies.push(movie);
                        break;
                    case 5:
                        fiveYearsMovies.push(movie);
                        break;
                    default:
                        break;
                }
            })

            /*
            einzelne Arrays durchgehen, preis von allen movies zusammenrechnen, durch die jeweilige Vertragslänge (außer bei 1) und durch 12 dividieren,
            gesamtpreis abziehen von budget
             */
            let oneYearMoviesPrice, twoYearsMoviesPrice, threeYearsMoviesPrice, fourYearsMoviesPrice, fiveYearsMoviesPrice;

            oneYearMovies.forEach((movie) => {
                oneYearMoviesPrice += movie._totalCosts;
            })
            twoYearsMovies.forEach((movie) => {
                twoYearsMoviesPrice += movie._totalCosts;
            })
            threeYearsMovies.forEach((movie) => {
                threeYearsMoviesPrice += movie._totalCosts;
            })
            fourYearsMovies.forEach((movie) => {
                fourYearsMoviesPrice += movie._totalCosts;
            })
            fiveYearsMovies.forEach((movie) => {
                fiveYearsMoviesPrice += movie._totalCosts;
            })

            let contentMaintainmentCosts = 0;
            contentMaintainmentCosts += (oneYearMoviesPrice / 12)
            contentMaintainmentCosts += (twoYearsMoviesPrice / 2 / 12)
            contentMaintainmentCosts += (threeYearsMoviesPrice / 3 / 12)
            contentMaintainmentCosts += (fourYearsMoviesPrice / 4 / 12)
            contentMaintainmentCosts += (fiveYearsMoviesPrice / 5 / 12)

            store.commit('subtractBalance', contentMaintainmentCosts);

            //update streaming service popularity and number of subscribers
            updateServicePopularityAndSubscribers();

            //set new last checked date to know if one month has passed
            store.getters.getOwnStreamingService._lastCheckedDate = new Date(
                store.getters.getOwnStreamingService._lastCheckedDate.getFullYear(),
                store.getters.getOwnStreamingService._lastCheckedDate.getMonth() + 1,
                store.getters.getOwnStreamingService._lastCheckedDate.getDate());
        }
    }
}

export function updateServicePopularityAndSubscribers(){
    // get all movies from streaming service
    let allStreamingServiceMovies = store.getters.getBoughtMovieRights.concat(this.$store.getters.getFinishedMovies, this.$store.getters.getBoughtMovies);
    // object with all genres
    let allGenreRatings = {
        'Action':0,
        'Adventure':0,
        'Biography':0,
        'Comedy':0,
        'Crime':0,
        'Documentary':0,
        'Drama':0,
        'Erotic':0,
        'Family':0,
        'Fantasy':0,
        'History':0,
        'Horror':0,
        'Musical':0,
        'Mystery':0,
        'Romance':0,
        'ScienceFiction':0,
        'Sport':0,
        'Thriller':0,
        'War':0,
        'Western':0
    }

    // count movies of each genre
    allStreamingServiceMovies.forEach(function (movie){
        allGenreRatings[movie._preProduction.screenplay.genre]++;
    })

    // determine rating for each genre
    Object.keys(allGenreRatings).forEach(key => {
        if(allGenreRatings[key] >= 1 && allGenreRatings[key] <= 5){
            allGenreRatings[key] = 1;
        } else if(allGenreRatings[key] >= 6 && allGenreRatings[key] <= 10){
            allGenreRatings[key] = 5;
        } else if(allGenreRatings[key] >= 11 && allGenreRatings[key] <= 20){
            allGenreRatings[key] = 10;
        } else if(allGenreRatings[key] >= 21 && allGenreRatings[key] <= 30){
            allGenreRatings[key] = 20;
        } else if(allGenreRatings[key] >= 31 && allGenreRatings[key] <= 40){
            allGenreRatings[key] = 30;
        } else if(allGenreRatings[key] >= 41 && allGenreRatings[key] <= 50){
            allGenreRatings[key] = 45;
        } else if(allGenreRatings[key] >= 51 && allGenreRatings[key] <= 60){
            allGenreRatings[key] = 55;
        } else if(allGenreRatings[key] >= 61 && allGenreRatings[key] <= 70){
            allGenreRatings[key] = 70;
        } else if(allGenreRatings[key] >= 71 && allGenreRatings[key] <= 85){
            allGenreRatings[key] = 85;
        } else if(allGenreRatings[key] >= 86){
            allGenreRatings[key] = 100;
        }
    });

    // count numbers of genres that have a rating greater than 0 and count all genre ratings
    let counterForGenreNumbers = 0;
    let counterForRatings = 0;
    Object.keys(allGenreRatings).forEach(key => {
        if(allGenreRatings[key] !== 0){
            counterForRatings += allGenreRatings[key];
            counterForGenreNumbers++;
        }
    });

    // divide counterForRatings by counterForGenreNumbers to get average
    let averageOfEachGenre = counterForRatings / counterForGenreNumbers;

    // get number of all movies
    let totalContent = 0;
    if(allStreamingServiceMovies >= 1 && allStreamingServiceMovies <= 10){
        totalContent = 1;
    } else if(allStreamingServiceMovies >= 11 && allStreamingServiceMovies <= 25){
        totalContent = 3;
    } else if(allStreamingServiceMovies >= 26 && allStreamingServiceMovies <= 75){
        totalContent = 5;
    } else if(allStreamingServiceMovies >= 76 && allStreamingServiceMovies <= 150){
        totalContent = 7;
    } else if(allStreamingServiceMovies >= 151 && allStreamingServiceMovies <= 250){
        totalContent = 10;
    } else if(allStreamingServiceMovies >= 251 && allStreamingServiceMovies <= 450){
        totalContent = 15;
    } else if(allStreamingServiceMovies >= 451 && allStreamingServiceMovies <= 650){
        totalContent = 25;
    } else if(allStreamingServiceMovies >= 651 && allStreamingServiceMovies <= 800){
        totalContent = 45;
    } else if(allStreamingServiceMovies >= 801 && allStreamingServiceMovies <= 1000){
        totalContent = 65;
    } else if(allStreamingServiceMovies >= 1001){
        totalContent = 100;
    }

    let streamingContent = (averageOfEachGenre * 40 + totalContent * 60) / 100;

    // calculate streaming service price potential, depends on the price of the service
    let streamingServicePricePotential = 0;
    let streamingPrice = store.getters.getOwnStreamingService._price;
    if(streamingPrice >= 1.00 && streamingPrice <= 7.50){
        streamingServicePricePotential = 1;
    } else if(streamingPrice >= 8.00 && streamingPrice <= 15.00){
        streamingServicePricePotential = 0.90;
    } else if(streamingPrice >= 15.50 && streamingPrice <= 25.00){
        streamingServicePricePotential = 0.75;
    } else if(streamingPrice >= 25.50 && streamingPrice <= 35.00){
        streamingServicePricePotential = 0.45;
    } else if(streamingPrice >= 35.50 && streamingPrice <= 45.00){
        streamingServicePricePotential = 0.25;
    } else if(streamingPrice >= 45.50 && streamingPrice <= 50.00){
        streamingServicePricePotential = 0.10;
    }

    // calculate streaming service hype = popularity
    let sumOfHype = 0;
    let hypeDrop1 = 0;
    let hypeDrop2 = 0;
    allStreamingServiceMovies.forEach(function (movie){
        if(movie._release.critics <= 50){
            hypeDrop1 = 0.75;
        } else if(movie._release.critics >= 51 && movie._release.critics <= 75){
            hypeDrop1 = 0.85;
        } else if(movie._release.critics >= 76){
            hypeDrop1 = 0.95;
        }

        if(movie._release.audience <= 50){
            hypeDrop2 = 0.75;
        } else if(movie._release.audience >= 51 && movie._release.audience <= 75){
            hypeDrop2 = 0.85;
        } else if(movie._release.audience >= 76){
            hypeDrop2 = 0.95;
        }

        movie._preProduction.hype = movie._preProduction.hype * ((hypeDrop1 + hypeDrop2) / 2);
        sumOfHype += movie._preProduction.hype;
    })

    let streamingServiceHype = sumOfHype / allStreamingServiceMovies.length;
    store.getters.getOwnStreamingService._popularity = streamingServiceHype;

    //set streaming service services
    let potentialSubscribers = 300000000;
    store.getters.getOwnStreamingService._subscribers = potentialSubscribers * ((streamingServicePricePotential * 15 + streamingContent * 15 + streamingServiceHype * 70) / 100);
}

function renewPeople() {
    //kill and refresh people
    const roles = killAndRefreshPeople()
    const diedPeople = roles.actor + roles.director + roles.writer
    console.log(diedPeople)
    console.log(roles)

    //generate new ones
    /*for (let i = 0; i < diedPeople; i++) {
        generatePersonValues(roles)
        roles.actor--;
        roles.director--;
        roles.writer--;
    }*/
}

function killAndRefreshPeople() {
    let allActors = store.state.allActors
    let allDirectors = store.state.allDirectors
    let allWriters = store.state.allWriters
    let roles = {actor: 0, director: 0, writer: 0}

    //loop Actors
    //TODO check for age + check for Type in News
    allActors.forEach((el) => {
        if (el._age > 90) {
            store.commit('addNews', new News(el._first_name + el._last_name + " died!", "The Actor " + el._first_name + el._last_name + " died", null, el))
            window.ipcRenderer.send('killPerson', ["DELETE FROM people WHERE pk_personID = ?", el._id])
        } else refreshPerson(el)
        roles.actor++;
    })

    //loop Directors
    allDirectors.forEach((el) => {
        if (el._age > 90) {
            store.commit('addNews', new News(el._first_name + el._last_name + " died!", "The Director " + el._first_name + el._last_name + " died", null, el))
            window.ipcRenderer.send('killPerson', ["DELETE FROM people WHERE pk_personID = ?", el._id])
        } else refreshPerson(el)
        roles.director++;
    })

    //loop Writers
    allWriters.forEach((el) => {
        if (el._age > 90) {
            store.commit('addNews', new News(el._first_name + el._last_name + " died!", "The Writer " + el._first_name + el._last_name + " died", null, el))
            window.ipcRenderer.send('killPerson', ["DELETE FROM people WHERE pk_personID = ?", el._id])
        } else refreshPerson(el)
        roles.writer++;
    })

    return roles
}

function refreshPerson(person) {
    //gen new Values
    let newExperience = 30
    let newPopularity = 30
    //TODO WHEN DB IS UPDATED (worked since ?)


    //send new Values to DB
    window.ipcRenderer.send('refreshPerson', ["UPDATE people SET experience = ?, popularity = ? WHERE pk_personID = ?", [newExperience, newPopularity, person._id]])
}

function generatePersonValues(roles) {
    const experience = 20
    const popularity = 20
    //calc talent
    let talent = 0
    const random = Math.round(Math.random() * 99)
    const random1 = Math.round(Math.random() * 99)
    const random2 = Math.round(Math.random() * 99)
    const random3 = Math.round(Math.random() * 99)
    if (random <= 25) {
        talent = Math.floor(Math.random() * (25 - 1 + 1) + 1)
    } else if (random1 <= 75) {
        talent = Math.floor(Math.random() * (50 - 25 + 1) + 25)
    } else if (random2 <= 25) {
        talent = Math.floor(Math.random() * (75 - 50 + 1) + 50)
    } else if (random3 <= 5) {
        talent = Math.floor(Math.random() * (100 - 75 + 1) + 75)
    }
    //calc age
    let age = 0
    const ageRandom = Math.round(Math.random() * 99)
    const ageRandom1 = Math.round(Math.random() * 99)
    const ageRandom2 = Math.round(Math.random() * 99)
    const ageRandom3 = Math.round(Math.random() * 99)
    const ageRandom4 = Math.round(Math.random() * 99)
    const ageRandom5 = Math.round(Math.random() * 99)
    const ageRandom6 = Math.round(Math.random() * 99)
    const ageRandom7 = Math.round(Math.random() * 99)
    const ageRandom8 = Math.round(Math.random() * 99)
    const ageRandom9 = Math.round(Math.random() * 99)
    const ageRandom10 = Math.round(Math.random() * 99)
    if (ageRandom >= 0 && ageRandom <= 25) {
        age = Math.floor(Math.random() * (10 - 1 + 1) + 1)
    } else if (ageRandom1 >= 0 && ageRandom1 <= 75) {
        age = Math.floor(Math.random() * (20 - 10 + 1) + 10)
    } else if (ageRandom2 >= 0 && ageRandom2 <= 90) {
        age = Math.floor(Math.random() * (30 - 20 + 1) + 20)
    } else if (ageRandom3 >= 0 && ageRandom3 <= 85) {
        age = Math.floor(Math.random() * (40 - 30 + 1) + 30)
    } else if (ageRandom4 >= 0 && ageRandom4 <= 75) {
        age = Math.floor(Math.random() * (50 - 40 + 1) + 40)
    } else if (ageRandom5 >= 0 && ageRandom5 <= 50) {
        age = Math.floor(Math.random() * (60 - 50 + 1) + 50)
    } else if (ageRandom6 >= 0 && ageRandom6 <= 35) {
        age = Math.floor(Math.random() * (70 - 60 + 1) + 60)
    } else if (ageRandom7 >= 0 && ageRandom7 <= 25) {
        age = Math.floor(Math.random() * (80 - 70 + 1) + 70)
    } else if (ageRandom8 >= 0 && ageRandom8 <= 15) {
        age = Math.floor(Math.random() * (90 - 80 + 1) + 80)
    } else if (ageRandom9 >= 0 && ageRandom9 <= 10) {
        age = Math.floor(Math.random() * (100 - 90 + 1) + 90)
    } else if (ageRandom10 >= 0 && ageRandom10 <= 5) {
        age = Math.floor(Math.random() * (111 - 100 + 1) + 100)
    }

    //create Avatar + TODO remove testing
    let svg = Avataaars.create({
        eyes: "squint"
    })
    //create first + lastname (TODO später Riesendatensatz laut Manu)
    let firstName = "Benni"
    let lastName = "Franklin"
    //create gender
    let gender
    const genderRandom = Math.round(Math.random() * 9)
    if (genderRandom <= 4) gender = "male"
    else if (genderRandom > 4 && genderRandom <= 8) gender = "female"
    else gender = "diverse"
    //create nationality & ethnicity
    let array = generateNationalityAndEthnicity()
    const nationalityValue = array[0]
    const ethnicityValue = array[1]

    //create Roles
    let isActor = roles.actor > 0 ? "true" : "false"
    let isDirector = roles.director > 0 ? "true" : "false"
    let isWriter = roles.writer > 0 ? "true" : "false"
    //create performance & rating
    let performance = Math.round(Math.random() * 100)
    let rating = (performance + experience + talent) / 3

    //get last ID
    let lastID = 0
    window.ipcRenderer.send('lastID', "SELECT max(pk_personID) from people")
    window.ipcRenderer.on('sendLastID', (event, data) => {
        lastID = data
    })

    //Insert Person into the db + TODO anpassen wenn datenbank angepasst ist + add News when a Person gets generated
    window.ipcRenderer.send('generatePerson', ["INSERT INTO people (pk_personID, avatar, first_name, last_name, age, gender, nationality, ethnicity, performance, experience, depth, craft, talent, popularity, rating, salary, isActor, isDirector, isWriter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [lastID, svg, firstName, lastName, age, gender, nationalityValue, ethnicityValue, performance, experience, "null", "null", talent, popularity, rating, "null", isActor, isDirector, isWriter]])

}

function generateNationalityAndEthnicity() {
    let array = []
    //nationality
    const nationalityRandom = Math.round(Math.random() * 129)
    if (nationalityRandom < 60) array[0] = nationality[128]
    else if (nationalityRandom >= 60 && nationalityRandom < 70) array[0] = nationality[155]
    else if (nationalityRandom >= 70 && nationalityRandom < 80) array[0] = nationality[156]
    else if (nationalityRandom >= 80 && nationalityRandom < 90) array[0] = nationality[157]
    else if (nationalityRandom >= 90 && nationalityRandom < 100) array[0] = nationality[158]
    else if (nationalityRandom >= 100 && nationalityRandom < 110) array[0] = nationality[105]
    else array[0] = nationality[Math.round(Math.random() * 203)]
    //ethnicity
    const ethnicityRandom = Math.round(Math.random() * 4)
    array[1] = ethnicity[ethnicityRandom]
    return array
}