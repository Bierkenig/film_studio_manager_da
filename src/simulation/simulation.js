import store from "@/services/store";
import {Studio} from "@/classes/Studio";
import News from "@/classes/News";
import {Avataaars} from "@/avatar/avataaars";
import {Screenplay} from "@/classes/Screenplay";
import {Character} from "@/classes/Character";
import {i18next} from "@/translation/i18n";
import {StreamingService} from "@/classes/StreamingService";
import Earnings from "@/classes/Earnings";
import {Movie} from "@/classes/Movie";
import Award from "@/classes/Award";
import {de} from "date-fns/locale";

//Avatar Option Lists
const mouth = ["concerned", "default", "disbelief", "eating", "sad", "screamOpen", "serious", "smile", "tongue", "twinkle", "vomit"]
const eyes = ["squint", "closed", "cry", "default", "eyeRoll", "happy", "hearts", "side", "surprised", "wink", "winkWacky", "xDizzy"]
const top = ["dreads01", "dreads02", "frizzle", "shaggyMullet", "shaggy", "shortCurly", "shortFlat", "shortRound", "sides", "shortWaved", "theCaesarAndSidePart", "theCaesar", "bigHair", "bob", "bun", "curly", "curvy", "dreads", "frida", "froAndBand", "fro", "longButNotTooLong", "miaWallace", "shavedSides", "straightAndStrand", "straight01", "straight02", "eyepatch", "turban", "hijab", "hat", "winterHat01", "winterHat02", "winterHat03", "winterHat04"]
const hairColor = ["auburn", "black", "blonde", "blondeGolden", "brown", "brownDark", "pastelPink", "platinum", "red", "silverGray"]
const facialHair = ["none", "beardLight", "beardMagestic", "beardMedium", "moustaceFancy", "moustacheMagnum"]
const facialHairColor = ["auburn", "black", "blonde", "blondeGolden", "brown", "brownDark", "pastelPink", "platinum", "red", "silverGray"]
const clothing = ["blazerAndShirt", "blazerAndSweater", "collarAndSweater", "graphicShirt", "hoodie", "overall", "shirtCrewNeck", "shirtScoopNeck", "shirtVNeck"]
const clothingColor = ["black", "blue01", "blue02", "blue03", "gray01", "gray02", "heather", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"]
const accessories = ["none", "kurt", "prescription01", "prescription02", "round", "sunglasses", "wayfarers"]
const accessoriesColor = ["black", "blue01", "blue02", "blue03", "gray01", "gray02", "heather", "pastelBlue", "pastelGreen", "pastelOrange", "pastelRed", "pastelYellow", "pink", "red", "white"]
//nationality values (Germany: 10, Italy: 10, Spain: 10, France: 10, UK: 10, USA: 60)
const nationality = ["Algeria", " Angola", " Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde/Cape Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo/Republic of the Congo", "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea Guinea-Bissau", "Ivory Coast/Republic of Côte d'Ivoire", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe", "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "British Indian Ocean Territory (UK territory)", "Brunei", "Cambodia", "China", "Georgia", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Macau", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen", "UK", "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States of America", "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu", "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela", "Germany", "France", "Spain", "Italy", "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia/Czech Republic", "Denmark", "Estonia", "Finland", "Georgia", "Greece", "Hungary", "Iceland", "Ireland", "Kazakhstan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Sweden", "Switzerland", "Turkey", "Ukraine", "Vatican City"]

//ethnicity values
const ethnicity = ["Caucasian", "Black", "Asian", "Arabic", "People of Color"]


export default function simulate() {
    console.log('SIMULATION: Started....')
    createStudios();
    streamingService();

    createScreenplaysFromWriters('forRandomGeneration');
    generateMoviesFromOtherStudios();

    otherStudioCreatesStreamingService();

    updateStudioPopularity();
    updateOtherStudiosPopularity();

    if(store.getters.getCurrentDate.getTime() === nthWeekdayOfMonth(1,1,new Date(store.getters.getCurrentDate.getFullYear(),0)).getTime()){
        setInternationalAwardEvents()
    } else if(store.getters.getCurrentDate.getTime() === nthWeekdayOfMonth(1,1,new Date(store.getters.getCurrentDate.getFullYear(),2)).getTime()){
        setIndependentAwardEvents()
    } else if(store.getters.getCurrentDate.getTime() === nthWeekdayOfMonth(1,1,new Date(store.getters.getCurrentDate.getFullYear(),5)).getTime()){
        setAudienceAwardEvents()
    }

    if(store.getters.getCurrentDate.getTime() === nthWeekdayOfMonth(1,4,new Date(store.getters.getCurrentDate.getFullYear(),1)).getTime()){
        //setAwardWinner('internationalAward') TODO: Kommentar entfernen wenn Daten von Datenbank richtig inserted werden
    } else if(store.getters.getCurrentDate.getTime() === nthWeekdayOfMonth(1,2,new Date(store.getters.getCurrentDate.getFullYear(),4)).getTime()){
        //setAwardWinner('independentAward') TODO: Kommentar entfernen wenn Daten von Datenbank richtig inserted werden
    } else if(store.getters.getCurrentDate.getTime() === nthWeekdayOfMonth(1,3,new Date(store.getters.getCurrentDate.getFullYear(),6)).getTime()){
        //setAwardWinner('audienceAward') TODO: Kommentar entfernen wenn Daten von Datenbank richtig inserted werden
    }

    setEventDuringPreProduction();
    setEventDuringProduction();
    setEventDuringPostProduction();

    //Tracking Production Movies
    console.log(store.getters.getCalendarEvents)

    //MONTHLY
    if (store.getters.getCurrentDate.getDate() === 1 &&
        store.getters.getCurrentDate.getMonth() !== 0 &&
        store.getters.getCurrentDate.getFullYear() !== 2023)
    {
        renewPeople();
        //FETCHING DB
        store.state.dbFetcher.fetch()
    }

    //YEARLY
    if (store.getters.getCurrentDate.getDate() === 31
        && store.getters.getCurrentDate.getMonth() === 11) {
        //calc Market Share
        if (store.getters.getCurrentDate.getFullYear() !== 2023) calcMarketShare();
    }
}

function calcMarketShare() {
    let allEarnings = 0
    let studioEarnings = {}
    let allStudios = store.getters.getOtherStudios
    allStudios.push(store.getters.getStudio)

    allStudios.forEach((el) => {
        studioEarnings[el.id] = 0
        el.movies.forEach((movie) => {
            movie._earnings.forEach((ear) => {
                allEarnings += ear.amount
                studioEarnings[el.id] += ear.amount
            })
        })
    })

    console.log(allEarnings)
    console.log(studioEarnings)
    const year = store.getters.getCurrentDate.getFullYear()
    //set Share other
    store.getters.getOtherStudios.forEach((studio) => {
        studio.marketShare[year.toString()] = (studioEarnings[studio.id] / allEarnings)
    })
    //set share
    store.getters.getStudio.marketShare[year.toString()] = studioEarnings[store.getters.getStudio.id] / allEarnings

    console.log(store.getters.getOtherStudios)

    console.log(store.getters.getStudio)
}

//function to get 0 or 1 with specific probability
function randomNumber(probability) {
    return Math.random() < probability ? 0 : 1;
}

//function to create new studios
function createStudios() {
    if (store.state.studioNames.length !== 0) {
        let num = randomNumber(0.10);
        if (num === 0) {
            //get all existing studio names
            let allStudios = [store.getters.getStudio.getName()];
            store.getters.getOtherStudios.forEach(studio => {
                allStudios.push(studio.getName())
            })

            //get studio name of new studio, check if name already exists
            let studioName = store.state.studioNames[Math.floor(Math.random() * store.state.studioNames.length)];
            while (allStudios.includes(studioName)) {
                studioName = store.state.studioNames[Math.floor(Math.random() * store.state.studioNames.length)]
            }

            //get id of new studio (last studio id + 1)
            let studioId;
            if (store.getters.getOtherStudios.length === 0) {
                studioId = 2;
            } else {
                studioId = store.getters.getNextStudioId;
            }

            let budgetValues = [50000000, 250000000, 1000000000];
            let budgetOfStudio = budgetValues[Math.floor(Math.random() * budgetValues.length)]
            let newStudio = new Studio(studioId, studioName, store.getters.getCurrentDate.getFullYear(), budgetOfStudio, 0);
            store.getters.getOtherStudios.push(newStudio);

            //create news of new studio
            let newsTitle = newStudio.getName() + i18next.t('established');
            let newsDescription = i18next.t('theStudio') + newStudio.getName() + i18next.t('wasFounded') + '.';
            store.commit('addNews', new News(newsTitle, newsDescription, 'Studios', store.getters.getCurrentDate,null, null, null, newStudio));
            store.state.studioNames.splice(store.state.studioNames.indexOf(studioName), 1);
        }
    }
}
//function for other studios to create streaming services
function otherStudioCreatesStreamingService(){
    if(randomNumber(0.15) === 0){
        let allOtherStudios = store.getters.getOtherStudios;
        let allStreamingServices = store.getters.getStreamingServicesFromOtherStudios;
        let allOtherMovies = store.getters.getMoviesFromOtherStudios.concat(store.getters.getAllMovies)

        for (let i = 0; i < allOtherStudios.length; i++) {
            let studioHasService = false;
            for (let j = 0; j < allStreamingServices; j++) {
                if(allStreamingServices[j]._owner.id === allOtherStudios[i].id){
                    studioHasService = true;
                }
            }

            let studioMovies = allOtherMovies.filter((movie) => movie._owner.id === allOtherStudios[i].id)

            if(allOtherStudios[i].budget >= 2500000000){
                if(randomNumber(0.50) === 0 && allOtherStudios[i].popularity >= 50 && studioMovies.length > 100 && !studioHasService){
                    allOtherStudios[i].budget -= 2500000000;
                    store.commit('addStreamingServicesFromOtherStudios', new StreamingService(allOtherStudios[i].name, 1,0,0,allOtherStudios[i].popularity,allOtherStudios[i], store.getters.getCurrentDate));
                    //create news of new streaming service
                    let newsTitle = 'Streaming Service' + i18next.t('established');
                    let newsDescription = i18next.t('theStreamingService') + allOtherStudios[i].name + i18next.t('wasFounded') + '.';
                    store.commit('addNews', new News(newsTitle, newsDescription, 'Studios', store.getters.getCurrentDate,null, null, null, allOtherStudios[i]));
                    break;
                }
            }
        }
    }
}

//function to update own studio popularity
function updateStudioPopularity(){
    let allMovies = store.getters.getCreatedMovies.concat(store.getters.getFinishedMovies, store.getters.getBoughtMovies, store.getters.getBoughtMovieRights);
    let sumOfAudiencePopularity = 0;
    for (let i = 0; i < allMovies.length; i++) {
        sumOfAudiencePopularity += allMovies[i]._release.audiencePopularity;
    }

    let averageOfAudiencePopularity = 0;
    if(allMovies.length !== 0){
        averageOfAudiencePopularity = sumOfAudiencePopularity / allMovies.length;
    }

    if(averageOfAudiencePopularity < 25){
        if(store.getters.getStudio.popularity < 4){
            store.getters.getStudio.popularity = 1;
        } else {
            store.getters.getStudio.popularity -= 3;
        }
    } else if(averageOfAudiencePopularity >= 25 && averageOfAudiencePopularity < 50){
        if(store.getters.getStudio.popularity < 3){
            store.getters.getStudio.popularity = 1;
        } else {
            store.getters.getStudio.popularity -= 2;
        }
    } else if(averageOfAudiencePopularity >= 50 && averageOfAudiencePopularity < 75){
        if(store.getters.getStudio.popularity > 98){
            store.getters.getStudio.popularity = 100;
        } else {
            store.getters.getStudio.popularity += 2;
        }
    } else if(averageOfAudiencePopularity >= 75){
        if(store.getters.getStudio.popularity > 97){
            store.getters.getStudio.popularity = 100;
        } else {
            store.getters.getStudio.popularity += 3;
        }
    }
}

//function to update other studios popularity
function updateOtherStudiosPopularity(){
    let allOtherMovies = store.getters.getMoviesFromOtherStudios;
    let allOtherStudios = store.getters.getOtherStudios;

    for (let i = 0; i < allOtherStudios.length; i++) {
        let studioMovies = [];
        for (let j = 0; j < allOtherMovies.length; j++) {
            if(allOtherMovies[j]._owner.id === allOtherStudios[i].id){
                studioMovies.push(allOtherMovies[j]);
            }
        }

        let sumOfAudiencePopularity = 0;
        for (let i = 0; i < studioMovies.length; i++) {
            sumOfAudiencePopularity += studioMovies[i]._release.audiencePopularity;
        }

        let averageOfAudiencePopularity = 0;
        if(studioMovies.length !== 0){
            averageOfAudiencePopularity = sumOfAudiencePopularity / studioMovies.length;
        }

        if(averageOfAudiencePopularity < 25){
            if(allOtherStudios[i].popularity < 4){
                allOtherStudios[i].popularity = 1;
            } else {
                allOtherStudios[i].popularity -= 3;
            }
        } else if(averageOfAudiencePopularity >= 25 && averageOfAudiencePopularity < 50){
            if(allOtherStudios[i].popularity < 3){
                allOtherStudios[i].popularity = 1;
            } else {
                allOtherStudios[i].popularity -= 2;
            }
        } else if(averageOfAudiencePopularity >= 50 && averageOfAudiencePopularity < 75){
            if(allOtherStudios[i].popularity > 98){
                allOtherStudios[i].popularity = 100;
            } else {
                allOtherStudios[i].popularity += 2;
            }
        } else if(averageOfAudiencePopularity >= 75){
            if(allOtherStudios[i].popularity > 97){
                allOtherStudios[i].popularity = 100;
            } else {
                allOtherStudios[i].popularity += 3;
            }
        }
    }
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
        streamingServiceMovies.forEach(function (movie) {
            let checkDate = new Date(
                movie._boughtRightDate.getFullYear() + 1,
                movie._boughtRightDate.getMonth(),
                movie._boughtRightDate.getDate())

            if (store.getters.getCurrentDate > checkDate) {
                if (movie._contract === 1) {
                    movie._boughtRightDate = null;
                    movie._contract = null;
                    store.commit('removeBoughtMovieRights', movie)
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
            store.commit('addEarnings',new Earnings(serviceMaintainmentCosts, store.getters.getCurrentDate))
            store.commit('subtractBalance', serviceMaintainmentCosts);

            //calculate revenue for subscribers
            let revenue = store.getters.getOwnStreamingService._subscribers * store.getters.getOwnStreamingService._price;
            //add revenue to balance
            store.commit('addEarnings',new Earnings(revenue, store.getters.getCurrentDate))
            store.commit('addBalance', revenue);

            //content maintainment costs
            //divide movies into contract length
            let oneYearMovies = [];
            let twoYearsMovies = [];
            let threeYearsMovies = [];
            let fourYearsMovies = [];
            let fiveYearsMovies = [];

            streamingServiceMovies.forEach(function (movie) {
                switch (movie.contract) {
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
            let oneYearMoviesPrice, twoYearsMoviesPrice, threeYearsMoviesPrice, fourYearsMoviesPrice,
                fiveYearsMoviesPrice;

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

            store.commit('addEarnings',new Earnings(contentMaintainmentCosts, store.getters.getCurrentDate))
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

export function updateServicePopularityAndSubscribers() {
    // get all movies from streaming service
    let allStreamingServiceMovies = store.getters.getBoughtMovieRights.concat(store.getters.getFinishedMovies, store.getters.getBoughtMovies);
    // object with all genres
    let allGenreRatings = {
        'Action': 0,
        'Adventure': 0,
        'Biography': 0,
        'Comedy': 0,
        'Crime': 0,
        'Documentary': 0,
        'Drama': 0,
        'Erotic': 0,
        'Family': 0,
        'Fantasy': 0,
        'History': 0,
        'Horror': 0,
        'Musical': 0,
        'Mystery': 0,
        'Romance': 0,
        'ScienceFiction': 0,
        'Sport': 0,
        'Thriller': 0,
        'War': 0,
        'Western': 0
    }

    // count movies of each genre
    allStreamingServiceMovies.forEach(function (movie) {
        allGenreRatings[movie._preProduction.screenplay.genre.genreName]++;
    })

    // determine rating for each genre
    Object.keys(allGenreRatings).forEach(key => {
        if (allGenreRatings[key] >= 1 && allGenreRatings[key] <= 5) {
            allGenreRatings[key] = 1;
        } else if (allGenreRatings[key] >= 6 && allGenreRatings[key] <= 10) {
            allGenreRatings[key] = 5;
        } else if (allGenreRatings[key] >= 11 && allGenreRatings[key] <= 20) {
            allGenreRatings[key] = 10;
        } else if (allGenreRatings[key] >= 21 && allGenreRatings[key] <= 30) {
            allGenreRatings[key] = 20;
        } else if (allGenreRatings[key] >= 31 && allGenreRatings[key] <= 40) {
            allGenreRatings[key] = 30;
        } else if (allGenreRatings[key] >= 41 && allGenreRatings[key] <= 50) {
            allGenreRatings[key] = 45;
        } else if (allGenreRatings[key] >= 51 && allGenreRatings[key] <= 60) {
            allGenreRatings[key] = 55;
        } else if (allGenreRatings[key] >= 61 && allGenreRatings[key] <= 70) {
            allGenreRatings[key] = 70;
        } else if (allGenreRatings[key] >= 71 && allGenreRatings[key] <= 85) {
            allGenreRatings[key] = 85;
        } else if (allGenreRatings[key] >= 86) {
            allGenreRatings[key] = 100;
        }
    });

    // count numbers of genres that have a rating greater than 0 and count all genre ratings
    let counterForGenreNumbers = 0;
    let counterForRatings = 0;
    Object.keys(allGenreRatings).forEach(key => {
        if (allGenreRatings[key] !== 0) {
            counterForRatings += allGenreRatings[key];
            counterForGenreNumbers++;
        }
    });

    // divide counterForRatings by counterForGenreNumbers to get average
    let averageOfEachGenre = 0;
    if(allStreamingServiceMovies.length !== 0){
        averageOfEachGenre = counterForRatings / counterForGenreNumbers;
    }

    // get number of all movies
    let totalContent = 0;
    if (allStreamingServiceMovies >= 1 && allStreamingServiceMovies <= 10) {
        totalContent = 1;
    } else if (allStreamingServiceMovies >= 11 && allStreamingServiceMovies <= 25) {
        totalContent = 3;
    } else if (allStreamingServiceMovies >= 26 && allStreamingServiceMovies <= 75) {
        totalContent = 5;
    } else if (allStreamingServiceMovies >= 76 && allStreamingServiceMovies <= 150) {
        totalContent = 7;
    } else if (allStreamingServiceMovies >= 151 && allStreamingServiceMovies <= 250) {
        totalContent = 10;
    } else if (allStreamingServiceMovies >= 251 && allStreamingServiceMovies <= 450) {
        totalContent = 15;
    } else if (allStreamingServiceMovies >= 451 && allStreamingServiceMovies <= 650) {
        totalContent = 25;
    } else if (allStreamingServiceMovies >= 651 && allStreamingServiceMovies <= 800) {
        totalContent = 45;
    } else if (allStreamingServiceMovies >= 801 && allStreamingServiceMovies <= 1000) {
        totalContent = 65;
    } else if (allStreamingServiceMovies >= 1001) {
        totalContent = 100;
    }

    let streamingContent = 0;
    if (allStreamingServiceMovies.length !== 0){
        streamingContent = (averageOfEachGenre * 40 + totalContent * 60) / 100;
    }

    // calculate streaming service price potential, depends on the price of the service
    let streamingServicePricePotential = 0;
    if(allStreamingServiceMovies.length !== 0){
        let streamingPrice = store.getters.getOwnStreamingService._price;
        if (streamingPrice >= 1.00 && streamingPrice <= 7.50) {
            streamingServicePricePotential = 1;
        } else if (streamingPrice >= 8.00 && streamingPrice <= 15.00) {
            streamingServicePricePotential = 0.90;
        } else if (streamingPrice >= 15.50 && streamingPrice <= 25.00) {
            streamingServicePricePotential = 0.75;
        } else if (streamingPrice >= 25.50 && streamingPrice <= 35.00) {
            streamingServicePricePotential = 0.45;
        } else if (streamingPrice >= 35.50 && streamingPrice <= 45.00) {
            streamingServicePricePotential = 0.25;
        } else if (streamingPrice >= 45.50 && streamingPrice <= 50.00) {
            streamingServicePricePotential = 0.10;
        }
    }

    // calculate streaming service hype = popularity
    let sumOfHype = 0;
    let hypeDrop1 = 0;
    let hypeDrop2 = 0;
    allStreamingServiceMovies.forEach(function (movie) {
        if (movie._release.critics <= 50) {
            hypeDrop1 = 0.75;
        } else if (movie._release.critics >= 51 && movie._release.critics <= 75) {
            hypeDrop1 = 0.85;
        } else if (movie._release.critics >= 76) {
            hypeDrop1 = 0.95;
        }

        if (movie._release.audience <= 50) {
            hypeDrop2 = 0.75;
        } else if (movie._release.audience >= 51 && movie._release.audience <= 75) {
            hypeDrop2 = 0.85;
        } else if (movie._release.audience >= 76) {
            hypeDrop2 = 0.95;
        }

        movie._preProduction.hype = movie._preProduction.hype * ((hypeDrop1 + hypeDrop2) / 2);
        sumOfHype += movie._preProduction.hype;
    })

    let streamingServiceHype = 0;
    if(allStreamingServiceMovies.length !== 0){
        streamingServiceHype = sumOfHype / allStreamingServiceMovies.length;
    }
    store.getters.getOwnStreamingService._popularity = streamingServiceHype;

    //set streaming service services
    let potentialSubscribers = 300000000;
    store.getters.getOwnStreamingService._subscribers = potentialSubscribers * ((streamingServicePricePotential * 15 + streamingContent * 15 + streamingServiceHype * 70) / 100);
}

//create screenplays from other writers
export function createScreenplaysFromWriters(type) {
    if (store.state.screenplayTitles.length !== 0) {
        if (randomNumber(0.10) === 0 || type === 'forMovieGeneration') {
            //get all necessary values
            const randomProfile = require('random-profile-generator');
            let allScreenplayTitles = store.state.screenplayTitles;
            let allScreenplayTypes = ['Animation', 'Feature', 'Indie'];
            let allGenres = store.getters.getAllGenres;
            let allSubgenres = store.getters.getSubgenresFromEachGenre;
            let allTopics = store.getters.getAllTopics;
            let scopeValues = ['Little', 'Small', 'Normal', 'Large', 'Epic'];
            let toneValues = ['Depressing', 'Dark', 'Realistic', 'Upbeat', 'Lighthearted'];
            let specialEffectsValues = ['None', 'Some', 'Medium', 'Lots', 'Spectacle'];
            let violenceValues = [1, 2, 3, 4, 5];
            let cursingValues = [1, 2, 3, 4, 5];
            let loveSceneValues = [1, 2, 3, 4, 5];
            let ageRatingScala = {1: 'G / +3', 2: 'PG / +7', 3: 'PG-13 / +13', 4: 'R / +16', 5: 'NC-17 / +18'};
            let allWriters = store.getters.getAllWriters;
            let characterMoments = ['dies', 'kills', 'defies', 'losesTo', 'escapes', 'isCaptured', 'runsAway', 'isOnAMission', 'completesTheMission',
                'losesSomeoneImportant', 'isAlive', 'helps', 'sendsOnAMission', 'fights', 'letsGo', 'fallsInLoveWith'];
            let settings = ['undefined', 'space', 'france', 'germany', 'uk', 'russia', 'italy', 'spain', 'China', 'india', 'saudiArabia', 'Japan',
                'southKorea', 'southAfrica', 'morocco', 'egypt', 'canada', 'USA', 'mexico', 'brazil', 'colombia', 'argentina', 'australia', 'newZealand'];
            let timePeriods = ['farFuture', 'nearFuture', 'presentDay', '90s', '80s', '70s', '60s', 'century20', 'century19', 'century18', 'industrialRevolution',
                'theRenaissance', 'highMiddleAges', 'earlyMiddleAges', 'vikingEra', 'darkAge', 'ancientWorld', 'stoneAge'];


            //set screenplay title
            let screenplayTitle = allScreenplayTitles[Math.floor(Math.random() * allScreenplayTitles.length)];
            //set screenplay genre
            let screenplayGenre = allGenres[Math.floor(Math.random() * allGenres.length)];
            //set screenplay type
            let screenplayType = allScreenplayTypes[Math.floor(Math.random() * allScreenplayTypes.length)];
            let screenplaySubgenre = null;
            let screenplayDescription = '';
            let screenplayTopics = {firstTopic: null, secondTopic: null, thirdTopic: null};
            let screenplayDetails = {scope: '', tone: '', specialEffects: ''};
            let screenplayAgeRatingDetails = {violence: '', cursing: '', loveScenes: ''};

            //set screenplay subgenre
            if (randomNumber(0.50) === 0) {
                screenplaySubgenre = allSubgenres[screenplayGenre.genreName][Math.floor(Math.random() * allSubgenres[screenplayGenre.genreName].length)]
            }

            //set screenplay description
            switch (screenplayGenre.genreName) {
                case 'Action':
                    screenplayDescription = 'An action movie.';
                    break;
                case 'Adventure':
                    screenplayDescription = 'An adventure movie.';
                    break;
                case 'Comedy':
                    screenplayDescription = 'A comedy movie.';
                    break;
                case 'Documentary':
                    screenplayDescription = 'A documentary movie.';
                    break;
                case 'Drama':
                    screenplayDescription = 'A drama movie.';
                    break;
                case 'Fantasy':
                    screenplayDescription = 'A fantasy movie.';
                    break;
                case 'Horror':
                    screenplayDescription = 'A horror movie.';
                    break;
                case 'Musical':
                    screenplayDescription = 'A musical movie.';
                    break;
                case 'Romance':
                    screenplayDescription = 'A romance movie.';
                    break;
                case 'Science-Fiction':
                    screenplayDescription = 'A science-fiction movie.';
                    break;
                case 'Thriller':
                    screenplayDescription = 'A thriller movie.';
                    break;
                case 'War':
                    screenplayDescription = 'A war movie.';
                    break;
                default:
                    break;
            }

            //set screenplay topics
            screenplayTopics.firstTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
            if (randomNumber(0.50) === 0) {
                screenplayTopics.secondTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
                while (screenplayTopics.secondTopic === screenplayTopics.firstTopic) {
                    screenplayTopics.secondTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
                }
                if (randomNumber(0.50) === 0) {
                    screenplayTopics.thirdTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
                    while (screenplayTopics.thirdTopic === screenplayTopics.firstTopic || screenplayTopics.thirdTopic === screenplayTopics.secondTopic) {
                        screenplayTopics.thirdTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
                    }
                }
            }

            //create screenplay
            let newScreenplay = new Screenplay(store.getters.getNextScreenplayId, screenplayTitle, screenplayType, screenplayGenre, screenplaySubgenre, null, null, screenplayDescription, null, null, screenplayTopics);

            //set screenplay details
            screenplayDetails.scope = scopeValues[Math.floor(Math.random() * scopeValues.length)];
            screenplayDetails.tone = toneValues[Math.floor(Math.random() * toneValues.length)];
            screenplayDetails.specialEffects = specialEffectsValues[Math.floor(Math.random() * specialEffectsValues.length)];

            //set screenplay age rating details
            let randomViolenceRating = violenceValues[Math.floor(Math.random() * violenceValues.length)];
            let randomCursingRating = cursingValues[Math.floor(Math.random() * cursingValues.length)];
            let randomLoveScenes = loveSceneValues[Math.floor(Math.random() * loveSceneValues.length)];
            screenplayAgeRatingDetails.violence = ageRatingScala[randomViolenceRating];
            screenplayAgeRatingDetails.cursing = ageRatingScala[randomCursingRating];
            screenplayAgeRatingDetails.loveScenes = ageRatingScala[randomLoveScenes];

            newScreenplay.details = screenplayDetails;
            newScreenplay.ageRatingDetails = screenplayAgeRatingDetails;

            //set screenplay age rating
            newScreenplay.ageRating = ageRatingScala[Math.max(randomViolenceRating, randomCursingRating, randomLoveScenes)];

            //set screenplay roles
            //newScreenplay.roles = allScreenplayTitles[screenplayTitle].roles;
            addCharacter(newScreenplay.roles.main, Math.floor(Math.random() * (3 - 1) + 1));
            addCharacter(newScreenplay.roles.support, Math.floor(Math.random() * (3 - 1) + 1));
            addCharacter(newScreenplay.roles.minor, Math.floor(Math.random() * (3 - 1) + 1));
            addCharacter(newScreenplay.roles.cameo, Math.floor(Math.floor(Math.random() * 4)));

            function addCharacter(array, max) {
                if (max !== 0) {
                    for (let i = 0; i < max; i++) {
                        let profile = randomProfile.profile();
                        array.push(new Character(profile.firstName, profile.gender.toLowerCase(), profile.age))
                    }
                }
            }

            //set screenplay acts
            // newScreenplay.acts = allScreenplayTitles[screenplayTitle].acts;
            let screenplayCharacters = newScreenplay.roles.main.concat(newScreenplay.roles.support, newScreenplay.roles.minor, newScreenplay.roles.cameo);

            // set screenplay acts character moments
            for (let i = 0; i < 3; i++) {
                let randomCharacterMoment = characterMoments[Math.floor(Math.random() * characterMoments.length)];
                let characterOne = null;
                let characterTwo = null;

                if (randomCharacterMoment === 'dies' || randomCharacterMoment === 'escapes' || randomCharacterMoment === 'isCaptured' ||
                    randomCharacterMoment === 'runsAway' || randomCharacterMoment === 'isOnAMission' || randomCharacterMoment === 'completesTheMission' ||
                    randomCharacterMoment === 'losesSomeoneImportant' || randomCharacterMoment === 'isAlive') {

                    characterOne = screenplayCharacters[Math.floor(Math.random() * screenplayCharacters.length)].name;
                    if (i === 0) {
                        addCharacterMoment(newScreenplay.acts.act1, i, characterOne, randomCharacterMoment, '', 1);
                    } else if (i === 1) {
                        addCharacterMoment(newScreenplay.acts.act2, i, characterOne, randomCharacterMoment, '', 2);
                    } else {
                        addCharacterMoment(newScreenplay.acts.act3, i, characterOne, randomCharacterMoment, '', 3);
                    }
                } else {
                    characterOne = screenplayCharacters[Math.floor(Math.random() * screenplayCharacters.length)].name;
                    characterTwo = screenplayCharacters[Math.floor(Math.random() * screenplayCharacters.length)].name;
                    while (characterTwo === characterOne) {
                        characterTwo = screenplayCharacters[Math.floor(Math.random() * screenplayCharacters.length)].name;
                    }

                    if (i === 0) {
                        addCharacterMoment(newScreenplay.acts.act1, i, characterOne, randomCharacterMoment, characterTwo, 1);
                    } else if (i === 1) {
                        addCharacterMoment(newScreenplay.acts.act2, i, characterOne, randomCharacterMoment, characterTwo, 2);
                    } else {
                        addCharacterMoment(newScreenplay.acts.act3, i, characterOne, randomCharacterMoment, characterTwo, 3);
                    }
                }
            }

            function addCharacterMoment(array, id, chOne, chMoment, chTwo, listNumber) {
                if (chTwo === '') {
                    array.push({
                        id: id,
                        characterOne: chOne,
                        characterMoment: chMoment,
                        characterTwo: '',
                        textDe: 'Charakter Ereignis: ' + checkMoment(chOne, i18next.t(chMoment, {lng: 'de'}), ''),
                        textEn: 'Character Moment: ' + checkMoment(chOne, i18next.t(chMoment, {lng: 'en'}), ''),
                        list: listNumber,
                        type: 'characterMoment'
                    })
                } else {
                    array.push({
                        id: id,
                        characterOne: chOne,
                        characterMoment: chMoment,
                        characterTwo: chTwo,
                        textDe: 'Charakter Ereignis: ' + checkMoment(chOne, i18next.t(chMoment, {lng: 'de'}), chTwo),
                        textEn: 'Character Moment: ' + checkMoment(chOne, i18next.t(chMoment, {lng: 'en'}), chTwo),
                        list: listNumber,
                        type: 'characterMoment'
                    })
                }
            }

            function checkMoment(chOne, chMoment, chTwo) {
                let realMessage = chOne + ' ';
                if (chTwo === '') {
                    realMessage += chMoment;
                } else if (chMoment === 'lets ... go') {
                    realMessage += 'lets ' + chTwo + ' go';
                } else if (chMoment === 'lasst ... gehen') {
                    realMessage += 'lasst ' + chTwo + ' gehen';
                } else if (chMoment === 'sends ... on a mission') {
                    realMessage += 'sends ' + chTwo + ' on a mission';
                } else if (chMoment === 'schickt ... auf eine Mission') {
                    realMessage += 'schickt ' + chTwo + ' auf eine Mission';
                } else if (chMoment === 'fordert ... heraus') {
                    realMessage += 'fordert ' + chTwo + ' heraus';
                } else {
                    realMessage += chMoment + ' ' + chTwo;
                }
                return realMessage;
            }

            //set screenplay acts settings
            for (let i = 0; i < 3; i++) {
                let randomSetting = settings[Math.floor(Math.random() * settings.length)];
                if (i === 0) {
                    addSettingOrTimePeriod(newScreenplay.acts.act1, i + 3, randomSetting, randomSetting, 'setting', 'Setting: ', 'Ort: ', 1);
                } else if (i === 1) {
                    addSettingOrTimePeriod(newScreenplay.acts.act2, i + 3, randomSetting, randomSetting, 'setting', 'Setting: ', 'Ort: ', 2);
                } else {
                    addSettingOrTimePeriod(newScreenplay.acts.act3, i + 3, randomSetting, randomSetting, 'setting', 'Setting: ', 'Ort: ', 3);
                }
            }

            //set screenplay acts time periods
            for (let i = 0; i < 3; i++) {
                let randomTimePeriod = timePeriods[Math.floor(Math.random() * timePeriods.length)];
                if (i === 0) {
                    addSettingOrTimePeriod(newScreenplay.acts.act1, i + 6, randomTimePeriod, randomTimePeriod, 'timePeriod', 'Time Period: ', 'Zeitspanne: ', 1);
                } else if (i === 1) {
                    addSettingOrTimePeriod(newScreenplay.acts.act2, i + 6, randomTimePeriod, randomTimePeriod, 'timePeriod', 'Time Period: ', 'Zeitspanne: ', 2);
                } else {
                    addSettingOrTimePeriod(newScreenplay.acts.act3, i + 6, randomTimePeriod, randomTimePeriod, 'timePeriod', 'Time Period: ', 'Zeitspanne: ', 3);
                }
            }

            function addSettingOrTimePeriod(array, id, elementType, element, typeString, titleStringEn, titleStringDe, listNumber) {
                array.push({
                    id: id,
                    value: element,
                    textDe: titleStringDe + i18next.t(elementType, {lng: 'de'}),
                    textEn: titleStringEn + i18next.t(elementType, {lng: 'en'}),
                    list: listNumber,
                    type: typeString
                })
            }

            //set screenplay writing phase
            if (newScreenplay.type === 'Feature' || newScreenplay.type === 'Animation') {
                newScreenplay.setWritingPhase(12)
            } else {
                newScreenplay.setWritingPhase(8)
            }

            //set screenplay writer
            let screenplayWriter = allWriters[Math.floor(Math.random() * allWriters.length)];
            newScreenplay.writer = screenplayWriter;

            //set screenplay rating
            let minTalent;
            let maxTalent;
            if (screenplayWriter._experience > 0 && screenplayWriter._experience <= 50) {
                minTalent = screenplayWriter._talent - 15;
                maxTalent = screenplayWriter._talent + 5;
            } else if (screenplayWriter._experience > 50 && screenplayWriter._experience <= 75) {
                minTalent = screenplayWriter._talent - 10;
                maxTalent = screenplayWriter._talent + 5;
            } else if (screenplayWriter._experience > 75) {
                minTalent = screenplayWriter._talent - 5;
                maxTalent = screenplayWriter._talent + 5;
            }
            let writerTalent = minTalent + ((maxTalent - minTalent) / (Math.floor(Math.random() * (100 - 20 + 1)) + 20))
            let writerGenre = '';
            switch (newScreenplay.genre) {
                case 'Action':
                    writerGenre = screenplayWriter._action;
                    break;
                case 'Adventure':
                    writerGenre = screenplayWriter._adventure;
                    break;
                case 'Comedy':
                    writerGenre = screenplayWriter._comedy;
                    break;
                case 'Documentary':
                    writerGenre = screenplayWriter._documentary;
                    break;
                case 'Drama':
                    writerGenre = screenplayWriter._drama;
                    break;
                case 'Fantasy':
                    writerGenre = screenplayWriter._fantasy;
                    break;
                case 'Horror':
                    writerGenre = screenplayWriter._horror;
                    break;
                case 'Musical':
                    writerGenre = screenplayWriter._musical;
                    break;
                case 'Romance':
                    writerGenre = screenplayWriter._romance;
                    break;
                case 'ScienceFiction':
                    writerGenre = screenplayWriter._scienceFiction;
                    break;
                case 'Thriller':
                    writerGenre = screenplayWriter._thriller;
                    break;
                case 'War':
                    writerGenre = screenplayWriter._war;
                    break;
                default:
                    break;
            }
            let screenplayRating = Math.floor((writerTalent * 65 + writerGenre * 35) / 100);
            newScreenplay.setRating(screenplayRating)
            newScreenplay.setRatingRange((Math.ceil(newScreenplay.rating / 10) * 10) - 9 + ' - ' + (Math.ceil(newScreenplay.rating / 10) * 10))

            //set screenplay price
            let index = Math.round((screenplayWriter._talent * 35 + screenplayWriter._experience * 25 + screenplayWriter._popularity * 40) / 100);
            let screenplayWriterSalary = store.getters.getWriterSalaries[index - 1];

            let screenplayPrice = 0;
            if (screenplayWriter._talent <= 50) {
                let calculator = Math.random() * (1.5 - 1) + 1;
                screenplayPrice = (Math.round(calculator * 10) / 10) * screenplayWriterSalary;
            } else if (screenplayWriter._talent >= 51 && screenplayWriter._talent <= 75) {
                let calculator = Math.random() * (2 - 1.5) + 1.5;
                screenplayPrice = (Math.round(calculator * 10) / 10) * screenplayWriterSalary;
            } else if (screenplayWriter._talent >= 76) {
                let calculator = Math.random() * (3 - 2) + 2;
                screenplayPrice = (Math.round(calculator * 10) / 10) * screenplayWriterSalary;
            }
            newScreenplay.setPrice(screenplayPrice);

            //add screenplay to screenplayFromWriters array
            if(type === 'forMovieGeneration'){
                return newScreenplay;
            } else {
                console.log(newScreenplay);
                store.commit('addScreenplaysFromWriters', newScreenplay);
            }

            store.state.screenplayTitles.splice(store.state.screenplayTitles.indexOf(screenplayTitle), 1);
        }
    }
}

// function to renew people
let counter = 0

function renewPeople() {
    //kill and refresh people
    let allPeople = store.state.allPeopleTest
    let roles = {actor: 0, director: 0, writer: 0}
    let id = []
    let refresh = []

    allPeople.forEach((el) =>  {
        if (checkAge(el)) {
            id.push(el._id)
            let type = ""
            if (el._isActor === "true") {
                type += "Actor | "
                roles.actor++
            }
            if (el._isDirector === "true") {
                type += "Director | "
                roles.director++
            }
            if (el._isWriter === "true") {
                type += "Writer"
                roles.writer++
            }
            store.commit('addNews', new News(el._first_name + ' ' + el._last_name + " died!", "The " + type + " " + el._first_name + ' ' + el._last_name + " died", null, store.getters.getCurrentDate, el))
        } else {
            refresh.push(refreshPerson(el))
        }
    })
    console.log(counter)
    window.ipcRenderer.send('killPerson', ["DELETE FROM people WHERE pk_personID = ?", id])
    window.ipcRenderer.send('refreshPerson', ["UPDATE people SET experience = ?, popularity = ? WHERE pk_personID = ?", refresh])

    console.log(roles)
    console.log("Died: " + id.length)

    //generate new ones
    let newOnes = []
    for (let i = 0; i < id.length; i++) {
        newOnes.push(generatePersonValues(roles))
        roles.actor--;
        roles.director--;
        roles.writer--;
    }

    console.log(newOnes)

    window.ipcRenderer.send('generatePerson', ["INSERT INTO people (avatar, first_name, last_name, birthday, deathAge, gender, nationality, ethnicity, workingSince, performance, experience, talent, popularity, rating, action, adventure, comedy, documentary, drama, fantasy, horror, musical, romance, scienceFiction, thriller, war, isActor, isDirector, isWriter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", newOnes])
    id = []
    window.ipcRenderer.removeAllListeners('generatePerson')
    window.ipcRenderer.removeAllListeners('killPerson')
    window.ipcRenderer.removeAllListeners('refreshPerson')
}

function checkAge(person) {
    const deathAge = person._deathAge
    if (deathAge < 10) {
        return randomNumber(0.0005) === 0
    } else if (deathAge >= 10 && deathAge < 20) {
        return randomNumber(0.001) === 0
    } else if (deathAge >= 20 && deathAge < 30) {
        return randomNumber(0.002) === 0
    } else if (deathAge >= 30 && deathAge < 40) {
        return randomNumber(0.003) === 0
    } else if (deathAge >= 40 && deathAge < 50) {
        return randomNumber(0.005) === 0
    } else if (deathAge >= 50 && deathAge < 60) {
        return randomNumber(0.007) === 0
    } else if (deathAge >= 60 && deathAge < 70) {
        return randomNumber(0.009) === 0
    } else if (deathAge >= 70 && deathAge < 80) {
        return randomNumber(0.011) === 0
    } else if (deathAge >= 80 && deathAge < 90) {
        return randomNumber(0.014) === 0
    } else if (deathAge >= 90 && deathAge < 100) {
        return randomNumber(0.018) === 0
    } else if (deathAge >= 100) {
        return randomNumber(0.020) === 0
    }
}

function refreshPerson(person) {
    const [days, month, year] = person._workingSince.split('-')
    const dateDifference = dateDiff(store.getters.getCurrentDate, new Date(parseInt(year), parseInt(month), parseInt(days)))
    //gen new Experience
    let newExperience = 0
    if (dateDifference <= 5) newExperience = Math.floor(Math.random() * (35 - 20 + 1) + 20);
    if (dateDifference > 5 && dateDifference <= 10) newExperience = Math.floor(Math.random() * (45 - 36 + 1) + 36);
    if (dateDifference > 10 && dateDifference <= 15) newExperience = Math.floor(Math.random() * (55 - 46 + 1) + 46);
    if (dateDifference > 15 && dateDifference <= 20) newExperience = Math.floor(Math.random() * (60 - 56 + 1) + 56);
    if (dateDifference > 20 && dateDifference <= 25) newExperience = Math.floor(Math.random() * (70 - 61 + 1) + 61);
    if (dateDifference > 25 && dateDifference <= 30) newExperience = Math.floor(Math.random() * (75 - 71 + 1) + 71);
    if (dateDifference > 30 && dateDifference <= 35) newExperience = Math.floor(Math.random() * (80 - 76 + 1) + 76);
    if (dateDifference > 35 && dateDifference <= 40) newExperience = Math.floor(Math.random() * (85 - 81 + 1) + 81);
    if (dateDifference > 40 && dateDifference <= 45) newExperience = Math.floor(Math.random() * (90 - 86 + 1) + 86);
    if (dateDifference > 45 && dateDifference <= 50) newExperience = Math.floor(Math.random() * (95 - 91 + 1) + 91);
    if (dateDifference > 50) newExperience = Math.floor(Math.random() * (99 - 96 + 1) + 96);
    //gen new Popularity
    let newPopularity = person._popularity
    if (person.audienceRating < 25) newPopularity -= 3
    if (person.audienceRating >= 25 && person.audienceRating < 50) newPopularity -= 2
    if (person.audienceRating >= 50 && person.audienceRating < 75) newPopularity += 2
    if (person.audienceRating >= 75) newPopularity += 3
    //send new Values to DB
    return {id: person._id, exp: newExperience, pop: newPopularity}
}

function dateDiff(date1, date2) {
    return date2.getFullYear() - date1.getFullYear()
}

function generatePersonValues(roles) {
    const experience = 20
    const popularity = 20

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

    //calc Avatar
    let [skin, eyes, clothing, top, hairColor, facialHair, facialHairColor, mouth, accessories, accessoriesColor, clothingColor] = generateAvatarValues(ethnicityValue)
    let svg
    if (gender === 'male') {
        svg = Avataaars.create({
            width: "150",
            style: "transparent",
            skin: skin,
            eyes: eyes,
            clothing: clothing,
            top: top,
            hairColor: hairColor,
            facialHair: facialHair,
            facialHairColor: facialHairColor,
            mouth: mouth,
            clothingColor: clothingColor
        })
    } else if (gender === 'female' || gender === 'diverse') {
        svg = Avataaars.create({
            width: "150",
            style: "transparent",
            skin: skin,
            eyes: eyes,
            clothing: clothing,
            top: top,
            hairColor: hairColor,
            mouth: mouth,
            accessories: accessories,
            accessoriesColor: accessoriesColor,
            clothingColor: clothingColor
        })
    }
    svg.toString()

    //calc talent
    let talent = 0
    if (Math.round(Math.random() * 99) <= 25) {
        talent = Math.floor(Math.random() * (25 - 1 + 1) + 1)
    } else if (Math.round(Math.random() * 99) <= 75) {
        talent = Math.floor(Math.random() * (50 - 25 + 1) + 25)
    } else if (Math.round(Math.random() * 99) <= 25) {
        talent = Math.floor(Math.random() * (75 - 50 + 1) + 50)
    } else if (Math.round(Math.random() * 99) <= 5) {
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
    let birthday = (Math.round(Math.random() * 29) + 1).toString() + "-" + (Math.round(Math.random() * 11) + 1).toString() + "-" + (store.getters.getCurrentDate.getFullYear() - age).toString()

    //create first + lastname
    const randomProfile = require('random-profile-generator');
    let profile;
    if (gender === 'diverse') {
        profile = randomProfile.profile()
    } else {
        profile = randomProfile.profile(gender)
    }
    let firstName = profile.firstName
    let lastName = profile.lastName

    //deathAge
    let diff = store.getters.getCurrentDate.getFullYear() - parseInt(birthday.split('-')[2])
    const deathAge = Math.round(Math.random() * (111 - diff + 1) + diff)

    //workingSince
    const workingSince = (Math.round(Math.random() * 29) + 1).toString() + "-" + (Math.round(Math.random() * 11) + 1).toString() + "-" + (store.getters.getCurrentDate.getFullYear() - 50).toString()

    //Genres
    let action = Math.round(Math.random() * 99) + 1
    let adventure = Math.round(Math.random() * 99) + 1
    let comedy = Math.round(Math.random() * 99) + 1
    let documentary = Math.round(Math.random() * 99) + 1
    let drama = Math.round(Math.random() * 99) + 1
    let fantasy = Math.round(Math.random() * 99) + 1
    let horror = Math.round(Math.random() * 99) + 1
    let musical = Math.round(Math.random() * 99) + 1
    let romance = Math.round(Math.random() * 99) + 1
    let scienceFiction = Math.round(Math.random() * 99) + 1
    let thriller = Math.round(Math.random() * 99) + 1
    let war = Math.round(Math.random() * 99) + 1

    //create Roles
    let isActor = roles.actor > 0 ? "true" : "false"
    let isDirector = roles.director > 0 ? "true" : "false"
    let isWriter = roles.writer > 0 ? "true" : "false"

    //create performance & rating
    let performance = Math.round(Math.random() * 99) + 1
    let rating = Math.round((performance + experience + talent) / 3)

    //Insert Person into the db
    return [svg, firstName, lastName, birthday, deathAge, gender, nationalityValue, ethnicityValue, workingSince, performance, experience, talent, popularity, rating, action, adventure, comedy, documentary, drama, fantasy, horror, musical, romance, scienceFiction, thriller, war, isActor, isDirector, isWriter]
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

function generateAvatarValues(ethnicity) {
    let array = []
    //skin, eyes, clothing, top, hairColor, facialHair, facialHairColor, mouth, accessories, accessoriesColor
    switch (ethnicity) {
        case 'Caucasian':
            array.push("light")
            break
        case 'Black':
            array.push("black")
            break
        case 'Asian':
            array.push("yellow")
            break
        case 'Arabic':
            array.push("darkBrown")
            break
        case 'People of Color':
            array.push("brown")
            break
    }

    array.push(eyes[Math.round(Math.random() * 11)])
    array.push(clothing[Math.round(Math.random() * 8)])
    array.push(top[Math.round(Math.random() * 34)])
    array.push(hairColor[Math.round(Math.random() * 9)])
    array.push(facialHair[Math.round(Math.random() * 5)])
    array.push(facialHairColor[Math.round(Math.random() * 9)])
    array.push(mouth[Math.round(Math.random() * 10)])
    array.push(accessories[Math.round(Math.random() * 6)])
    array.push(accessoriesColor[Math.round(Math.random() * 14)])
    array.push(clothingColor[Math.round(Math.random() * 14)])

    return array
}

// functions to set award events
function setAwardWinner(typeOfAward){
    let nominationList = {};
    if(typeOfAward === 'internationalAward'){
        nominationList = store.getters.getInternationalAwardNominations;
    } else if(typeOfAward === 'independentAward'){
        nominationList = store.getters.getIndependentAwardNominations;
    } else if(typeOfAward === 'audienceAward'){
        nominationList = store.getters.getAudienceAwardNominations;
    }

    for (let i = 0; i < Object.keys(nominationList).length; i++) {
        let randomElement = nominationList[Object.keys(nominationList)[i]][Math.floor(Math.random() * nominationList[Object.keys(nominationList)[i]].length)]
        nominationList[Object.keys(nominationList)[i]] = [randomElement]
    }

    if(typeOfAward === 'internationalAward'){
        store.commit('addCreatedAward', new Award(store.getters.getNextAwardId,
            nominationList['ActorLeadingRole'][0], nominationList['ActorSupportingRole'][0],
            nominationList['ActressLeadingRole'][0], nominationList['ActressSupportingRole'][0],
            nominationList['Movies'][0],nominationList['Directors'][0], null,
            nominationList['Writers'][0],null,null,null,null,null,
            null,null,null, 'international',
            store.getters.getCurrentDate.getFullYear().toString()))
    } else if(typeOfAward === 'independentAward'){
        store.commit('addCreatedAward', new Award(store.getters.getNextAwardId,
            null, null, null, null,
            nominationList['Movies'][0],nominationList['Directors'][0], null,nominationList['Writers'][0],
            nominationList['Actor'][0],nominationList['Actress'][0],null,null,null,
            null,null,null, 'independent',
            store.getters.getCurrentDate.getFullYear().toString()))
    } else if(typeOfAward === 'audienceAward'){
        if(nominationList['ActionOrAdventureMovies'][0]._preProduction.screenplay.genre.genreName === 'Action'){
            store.commit('addCreatedAward', new Award(store.getters.getNextAwardId,
                null, null, null, null,
                nominationList['Movies'][0],nominationList['Directors'][0], null,nominationList['Writers'][0],
                nominationList['Actor'][0],nominationList['Actress'][0],null,nominationList['ActionOrAdventureMovies'][0],
                nominationList['ThrillerMovies'][0], nominationList['ScienceFictionMovies'][0],nominationList['FantasyMovies'][0],
                nominationList['HorrorMovies'][0], 'audience', store.getters.getCurrentDate.getFullYear().toString()))
        } else if(nominationList['ActionOrAdventureMovies'][0]._preProduction.screenplay.genre.genreName === 'Adventure'){
            store.commit('addCreatedAward', new Award(store.getters.getNextAwardId,
                null, null, null, null,
                nominationList['Movies'][0],nominationList['Directors'][0], nominationList['Writers'][0],null,
                nominationList['Actor'][0],nominationList['Actress'][0],nominationList['ActionOrAdventureMovies'][0],null,
                nominationList['ThrillerMovies'][0], nominationList['ScienceFictionMovies'][0],nominationList['FantasyMovies'][0],
                nominationList['HorrorMovies'][0], 'audience', store.getters.getCurrentDate.getFullYear().toString()))
        }
    }
}

function setInternationalAwardEvents(){
    // 'International Award'
    let internationalAwardNominationStartDate = nthWeekdayOfMonth(2,4,new Date(store.getters.getCurrentDate.getFullYear(),0))
    let internationalAwardNominationEndDate = nthWeekdayOfMonth(3,4,new Date(store.getters.getCurrentDate.getFullYear(),0))

    let internationalAwardPresentationStartDate = nthWeekdayOfMonth(2,4,new Date(store.getters.getCurrentDate.getFullYear(),1))
    let internationalAwardPresentationEndDate = nthWeekdayOfMonth(3,4,new Date(store.getters.getCurrentDate.getFullYear(),1))

    addElementToCalendarEvents('','',null,null, internationalAwardNominationStartDate, internationalAwardNominationEndDate, 'internationalAwardNomination');
    addElementToCalendarEvents('','',null,null, internationalAwardPresentationStartDate, internationalAwardPresentationEndDate, 'internationalAwardPresentation');

    //nominationsForInternationalAward(); TODO: Kommentar entfernen wenn Daten von Datenbank richtig inserted werden
}

function nominationsForInternationalAward(){
    let allFinishedMovies = store.getters.getFinishedMovies.concat(store.getters.getMoviesFromOtherStudios, store.state.allMovies);
    let bestMovies = [];

    for (let i = 0; i < allFinishedMovies.length; i++) {
        if(allFinishedMovies[i]._release.criticsFormula >= 75 && allFinishedMovies[i]._release.audiencePopularity >= 50){
            bestMovies.push(allFinishedMovies[i]);
        }
    }
    bestMovies.sort((a,b) => b._release.criticsFormula - a._release.criticsFormula);

    //set nomination list of movies
    store.commit('setNominationList',['internationalAward','Movies',bestMovies.slice(0,10)]);

    //nomination list of leading actors and actress
    let allMainActorsOfBestMovies = [];
    let allMainActressOfBestMovies = [];

    //nomination list of supporting actors and actress
    let allSupportActorsOfBestMovies = [];
    let allSupportActressOfBestMovies = [];

    //nomination list of writers and directors
    let nominatedWriters = [];
    let nominatedDirectors = [];

    for (let i = 0; i < bestMovies.length; i++) {
        //add writer and director of best movies to nominated list
        nominatedWriters.push(bestMovies[i]._preProduction.screenplay.writer);
        nominatedDirectors.push(bestMovies[i]._preProduction.hiredDirector);

        //iterate through main actors and actress
        iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.main, allMainActorsOfBestMovies, allMainActressOfBestMovies)
        //iterate through support actors and actress
        iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.support, allSupportActorsOfBestMovies, allSupportActressOfBestMovies)
    }

    allMainActorsOfBestMovies.sort((a,b) => b.audienceRating - a.audienceRating);
    allMainActressOfBestMovies.sort((a,b) => b.audienceRating - a.audienceRating);

    allSupportActorsOfBestMovies.sort((a,b) => b.audienceRating - a.audienceRating);
    allSupportActressOfBestMovies.sort((a,b) => b.audienceRating - a.audienceRating);

    nominatedWriters.sort((a,b) => b.audienceRating - a.audienceRating);
    nominatedDirectors.sort((a,b) => b.audienceRating - a.audienceRating);

    //set nomination list of leading actors and actress
    store.commit('setNominationList',['internationalAward','ActorLeadingRole',allMainActorsOfBestMovies.slice(0,5)]);
    store.commit('setNominationList',['internationalAward','ActressLeadingRole',allMainActressOfBestMovies.slice(0,5)]);
    //set nomination list of supporting actors and actress
    store.commit('setNominationList',['internationalAward','ActorSupportingRole',allSupportActorsOfBestMovies.slice(0,5)]);
    store.commit('setNominationList',['internationalAward','ActressSupportingRole',allSupportActressOfBestMovies.slice(0,5)]);
    //set nomination list of writers and directors
    store.commit('setNominationList',['internationalAward','Directors',nominatedDirectors.slice(0,5)]);
    store.commit('setNominationList',['internationalAward','Writers',nominatedWriters.slice(0,5)]);
}

function setIndependentAwardEvents(){
    // 'Independent Award'
    let independentAwardNominationStartDate = nthWeekdayOfMonth(2,2,new Date(store.getters.getCurrentDate.getFullYear(),3));
    let independentAwardNominationEndDate = nthWeekdayOfMonth(3,2,new Date(store.getters.getCurrentDate.getFullYear(),3));

    let independentAwardPresentationStartDate = nthWeekdayOfMonth(2,2,new Date(store.getters.getCurrentDate.getFullYear(),4));
    let independentAwardPresentationEndDate = nthWeekdayOfMonth(3,2,new Date(store.getters.getCurrentDate.getFullYear(),4));

    addElementToCalendarEvents('','',null,null, independentAwardNominationStartDate, independentAwardNominationEndDate, 'independentAwardNomination');
    addElementToCalendarEvents('','',null,null, independentAwardPresentationStartDate, independentAwardPresentationEndDate,'independentAwardPresentation');

    //nominationsForIndependentAward(); TODO: Kommentar entfernen wenn Daten von Datenbank richtig inserted werden
}

function nominationsForIndependentAward(){
    let allFinishedMovies = store.getters.getFinishedMovies.concat(store.getters.getMoviesFromOtherStudios, store.state.allMovies);
    let bestMovies = [];

    for (let i = 0; i < allFinishedMovies.length; i++) {
        if(allFinishedMovies[i]._release.criticsFormula >= 85 && allFinishedMovies[i]._release.audiencePopularity >= 25){
            bestMovies.push(allFinishedMovies[i]);
        }
    }
    bestMovies.sort((a,b) => b._release.criticsFormula - a._release.criticsFormula);

    //set nomination list of movies
    store.commit('setNominationList',['independentAward','Movies',bestMovies.slice(0,5)]);

    //nomination list of leading actors and actress
    let nominatedActors = [];
    let nominatedActress = [];

    //nomination list of writers and directors
    let nominatedWriters = [];
    let nominatedDirectors = [];

    for (let i = 0; i < bestMovies.length; i++) {
        //add writer and director of best movies to nominated list
        nominatedWriters.push(bestMovies[i]._preProduction.screenplay.writer);
        nominatedDirectors.push(bestMovies[i]._preProduction.hiredDirector);

        //iterate through main actors and actress
        iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.main, nominatedActors, nominatedActress)
        //iterate through support actors and actress
        iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.support, nominatedActors, nominatedActress)
        //iterate through minor actors and actress
        iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.minor, nominatedActors, nominatedActress)
        //iterate through cameo actors and actress
        iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.cameo, nominatedActors, nominatedActress)
    }

    nominatedWriters.sort((a,b) => b.audienceRating - a.audienceRating);
    nominatedDirectors.sort((a,b) => b.audienceRating - a.audienceRating);

    nominatedActors.sort((a,b) => b.audienceRating - a.audienceRating);
    nominatedActress.sort((a,b) => b.audienceRating - a.audienceRating);

    //set nomination list of writers and directors
    store.commit('setNominationList',['independentAward','Directors',nominatedDirectors.slice(0,3)]);
    store.commit('setNominationList',['independentAward','Writers',nominatedWriters.slice(0,3)]);
    //set nomination list of writers and directors
    store.commit('setNominationList',['independentAward','Actor',nominatedActors.slice(0,3)]);
    store.commit('setNominationList',['independentAward','Actress',nominatedActress.slice(0,3)]);
}

function setAudienceAwardEvents(){
    // 'Audience Award'
    let audienceAwardNominationStartDate = nthWeekdayOfMonth(2,3,new Date(store.getters.getCurrentDate.getFullYear(),5));
    let audienceAwardNominationEndDate = nthWeekdayOfMonth(3,3,new Date(store.getters.getCurrentDate.getFullYear(),5));

    let audienceAwardPresentationStartDate = nthWeekdayOfMonth(2,3,new Date(store.getters.getCurrentDate.getFullYear(),6));
    let audienceAwardPresentationEndDate = nthWeekdayOfMonth(3,3,new Date(store.getters.getCurrentDate.getFullYear(),6));

    addElementToCalendarEvents('','',null,null, audienceAwardNominationStartDate, audienceAwardNominationEndDate,'audienceAwardNomination');
    addElementToCalendarEvents('','',null,null, audienceAwardPresentationStartDate, audienceAwardPresentationEndDate, 'audienceAwardPresentation');

    //nominationsForAudienceAward(); TODO: Kommentar entfernen wenn Daten von Datenbank richtig inserted werden
}

function nominationsForAudienceAward(){
    let allFinishedMovies = store.getters.getFinishedMovies.concat(store.getters.getMoviesFromOtherStudios, store.state.allMovies);
    let bestMovies = [];

    for (let i = 0; i < allFinishedMovies.length; i++) {
        if(allFinishedMovies[i]._release.criticsFormula >= 25 && allFinishedMovies[i]._release.audiencePopularity >= 75){
            bestMovies.push(allFinishedMovies[i]);
        }
    }
    bestMovies.sort((a,b) => b._release.criticsFormula - a._release.criticsFormula);

    let nominatedActionOrAdventureMovies = [];
    let nominatedThrillerMovies = [];
    let nominatedScienceFictionMovies = [];
    let nominatedFantasyMovies = [];
    let nominatedHorrorMovies = [];

    //nomination list of writers and directors
    let nominatedWriters = [];
    let nominatedDirectors = [];

    //nomination list of leading actors and actress
    let nominatedActors = [];
    let nominatedActress = [];

    for (let i = 0; i < bestMovies.length; i++) {
        if(bestMovies[i]._preProduction.screenplay.genre.genreName === 'Action' ||
            bestMovies[i]._preProduction.screenplay.genre.genreName === 'Adventure'){
            nominatedActionOrAdventureMovies.push(bestMovies[i]);
            nominatedWriters.push(bestMovies[i]._preProduction.screenplay.writer);
            nominatedDirectors.push(bestMovies[i]._preProduction.hiredDirector);

            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.main, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.support, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.minor, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.cameo, nominatedActors, nominatedActress)
        } else if(bestMovies[i]._preProduction.screenplay.genre.genreName === 'Thriller'){
            nominatedThrillerMovies.push(bestMovies[i])
            nominatedWriters.push(bestMovies[i]._preProduction.screenplay.writer);
            nominatedDirectors.push(bestMovies[i]._preProduction.hiredDirector);

            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.main, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.support, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.minor, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.cameo, nominatedActors, nominatedActress)

        } else if(bestMovies[i]._preProduction.screenplay.genre.genreName === 'Science-Fiction'){
            nominatedScienceFictionMovies.push(bestMovies[i])
            nominatedWriters.push(bestMovies[i]._preProduction.screenplay.writer);
            nominatedDirectors.push(bestMovies[i]._preProduction.hiredDirector);

            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.main, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.support, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.minor, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.cameo, nominatedActors, nominatedActress)

        } else if(bestMovies[i]._preProduction.screenplay.genre.genreName === 'Fantasy'){
            nominatedFantasyMovies.push(bestMovies[i])
            nominatedWriters.push(bestMovies[i]._preProduction.screenplay.writer);
            nominatedDirectors.push(bestMovies[i]._preProduction.hiredDirector);

            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.main, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.support, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.minor, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.cameo, nominatedActors, nominatedActress)

        } else if(bestMovies[i]._preProduction.screenplay.genre.genreName === 'Horror'){
            nominatedHorrorMovies.push(bestMovies[i])
            nominatedWriters.push(bestMovies[i]._preProduction.screenplay.writer);
            nominatedDirectors.push(bestMovies[i]._preProduction.hiredDirector);

            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.main, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.support, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.minor, nominatedActors, nominatedActress)
            iterateThroughActors(bestMovies[i]._preProduction.screenplay.actors.cameo, nominatedActors, nominatedActress)
        }
    }

    nominatedWriters.sort((a,b) => b.audienceRating - a.audienceRating);
    nominatedDirectors.sort((a,b) => b.audienceRating - a.audienceRating);

    nominatedActors.sort((a,b) => b.audienceRating - a.audienceRating);
    nominatedActress.sort((a,b) => b.audienceRating - a.audienceRating);

    store.commit('setNominationList',['audienceAward','ActionOrAdventureMovies',nominatedActionOrAdventureMovies.slice(0,5)]);
    store.commit('setNominationList',['audienceAward','ThrillerMovies',nominatedThrillerMovies.slice(0,5)]);
    store.commit('setNominationList',['audienceAward','ScienceFictionMovies',nominatedScienceFictionMovies.slice(0,5)]);
    store.commit('setNominationList',['audienceAward','FantasyMovies',nominatedFantasyMovies.slice(0,5)]);
    store.commit('setNominationList',['audienceAward','HorrorMovies',nominatedHorrorMovies.slice(0,5)]);

    store.commit('setNominationList',['audienceAward','Directors',nominatedDirectors.slice(0,5)]);
    store.commit('setNominationList',['audienceAward','Writers',nominatedWriters.slice(0,5)]);

    store.commit('setNominationList',['audienceAward','Actor',nominatedActors.slice(0,5)]);
    store.commit('setNominationList',['audienceAward','Actress',nominatedActress.slice(0,5)]);

}


function iterateThroughActors(array, maleArray, femaleArray){
    for (let i = 0; i < array; i++) {
        if(array[i].gender === 'male'){
            maleArray.push(array[i])
        } else if(array.gender === 'female'){
            femaleArray.push(array[i])
        }
    }
}

function addElementToCalendarEvents(movieTitle, studioTitle, actor, director, startDate, endDate, type){
    store.commit('addCalendarEvent', {
        id: store.getters.getNextEventId,
        movie: movieTitle,
        studio: studioTitle,
        actor: actor,
        director: director,
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
        type: type,
        completed: false,
    })
    return undefined;
}

function nthWeekdayOfMonth(weekday, n, date) {
    let count = 0,
        idate = new Date(date.getFullYear(), date.getMonth(), 1);
    while (true) {
        if (idate.getDay() === weekday) {
            if (++count == n) {
                break;
            }
        }
        idate.setDate(idate.getDate() + 1);
    }
    return idate;
}

// function to set event during pre production
function setEventDuringPreProduction(){
    let eventsPreProduction = ['dropOut','recast','creative','difficulty','extend'];
    let allCalendarEvents = store.getters.getCalendarEvents;
    let allPreProductionMovies = store.getters.getInProductionMovies.filter((movie) => movie._status === 'Pre Production');

    for (let i = 0; i < eventsPreProduction.length; i++) {
        switch (eventsPreProduction[i]){
            case 'dropOut':
                allPreProductionMovies.forEach((movie)  => {
                    let eventAlreadyExists = false;
                    for (let j = 0; j < allCalendarEvents.length; j++) {
                        if(allCalendarEvents[j].type === 'dropOut' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title){
                            eventAlreadyExists = true;
                        }
                    }

                    if(!eventAlreadyExists){
                        let date1 = store.getters.getCurrentDate;
                        let date2 = new Date(movie._preProduction.startDate.getFullYear(), movie._preProduction.startDate.getMonth(), movie._preProduction.startDate.getDate() + (movie._preProduction.preProductionLength * 7));
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                        if(Difference_In_Days >= 6){
                            for (let j = 0; j < movie._preProduction.screenplay.actors.main.length; j++) {
                                let f = addDropOutEvent(movie._preProduction.screenplay.actors.main[j], null, movie._preProduction.screenplay.actors.main[j].actorMorale, movie, 'dropOut')
                                if(f === undefined){
                                    return undefined;
                                }
                            }
                            for (let j = 0; j < movie._preProduction.screenplay.actors.support.length; j++) {
                                let f = addDropOutEvent(movie._preProduction.screenplay.actors.support[j], null, movie._preProduction.screenplay.actors.support[j].actorMorale, movie, 'dropOut')
                                if(f === undefined){
                                    return undefined;
                                }
                            }
                            for (let j = 0; j < movie._preProduction.screenplay.actors.minor.length; j++) {
                                let f = addDropOutEvent(movie._preProduction.screenplay.actors.minor[j], null, movie._preProduction.screenplay.actors.minor[j].actorMorale, movie, 'dropOut')
                                if(f === undefined){
                                    return undefined;
                                }
                            }
                            for (let j = 0; j < movie._preProduction.screenplay.actors.cameo.length; j++) {
                                let f = addDropOutEvent(movie._preProduction.screenplay.actors.cameo[j], null, movie._preProduction.screenplay.actors.cameo[j].actorMorale, movie, 'dropOut')
                                if(f === undefined){
                                    return undefined;
                                }
                            }
                        }
                    }
                })
                break;
            case 'recast':
                allPreProductionMovies.forEach((movie)  => {
                    let eventAlreadyExists = false;
                    for (let j = 0; j < allCalendarEvents.length; j++) {
                        if(allCalendarEvents[j].type === 'recast' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title){
                            eventAlreadyExists = true;
                        }
                    }

                    if(!eventAlreadyExists){
                        let date1 = store.getters.getCurrentDate;
                        let date2 = new Date(movie._preProduction.startDate.getFullYear(), movie._preProduction.startDate.getMonth(), movie._preProduction.startDate.getDate() + (movie._preProduction.preProductionLength * 7));
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                        if(Difference_In_Days >= 6){
                            let director = movie._preProduction.hiredDirector;
                            if (director._rating > 75) {
                                let movieMainActors = movie._preProduction.screenplay.actors.main;
                                let randomActor = movieMainActors[Math.floor(Math.random() * movieMainActors.length)]
                                let f = addPreProductionEventWithProbability(0.50, movie, randomActor, null, 'recast')
                                if (f === undefined) {
                                    return undefined;
                                }
                            } else if (director._rating <= 75 && director._rating > 50) {
                                let movieMainActors = movie._preProduction.screenplay.actors.main;
                                let randomActor = movieMainActors[Math.floor(Math.random() * movieMainActors.length)]
                                let f = addPreProductionEventWithProbability(0.25, movie, randomActor, null, 'recast')
                                if (f === undefined) {
                                    return undefined;
                                }
                            } else {
                                let movieMainActors = movie._preProduction.screenplay.actors.main;
                                let randomActor = movieMainActors[Math.floor(Math.random() * movieMainActors.length)]
                                let f = addPreProductionEventWithProbability(0.05, movie, randomActor, null, 'recast')
                                if (f === undefined) {
                                    return undefined;
                                }
                            }
                        }
                    }
                });
                break;
            case 'creative':
                allPreProductionMovies.forEach((movie)  => {
                    let eventAlreadyExists = false;
                    for (let j = 0; j < allCalendarEvents.length; j++) {
                        if(allCalendarEvents[j].type === 'creative' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title){
                            eventAlreadyExists = true;
                        }
                    }

                    if(!eventAlreadyExists){
                        let date1 = store.getters.getCurrentDate;
                        let date2 = new Date(movie._preProduction.startDate.getFullYear(), movie._preProduction.startDate.getMonth(), movie._preProduction.startDate.getDate() + (movie._preProduction.preProductionLength * 7));
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                        if(Difference_In_Days >= 6){
                            let director = movie._preProduction.hiredDirector;
                            addDropOutEvent(null, director, director.dirMorale, movie, 'creative')
                        }
                    }
                });
                break;
            case 'difficulty':
                allPreProductionMovies.forEach((movie)  => {
                    let eventAlreadyExists = false;
                    for (let j = 0; j < allCalendarEvents.length; j++) {
                        if(allCalendarEvents[j].type === 'difficulty' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title){
                            eventAlreadyExists = true;
                        }
                    }

                    if(!eventAlreadyExists){
                        let date1 = store.getters.getCurrentDate;
                        let date2 = new Date(movie._preProduction.startDate.getFullYear(), movie._preProduction.startDate.getMonth(), movie._preProduction.startDate.getDate() + (movie._preProduction.preProductionLength * 7));
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                        if(Difference_In_Days >= 6){
                            let budgetPop = movie._preProduction.budgetPop;
                            if (budgetPop === 10) {
                                if (movie._preProduction.hiredDirector._rating > 75) {
                                    if (randomNumber(0.5) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                } else if (movie._preProduction.hiredDirector._rating <= 75 && movie._preProduction.hiredDirector._rating > 50) {
                                    if (randomNumber(0.25) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                } else {
                                    if (randomNumber(0.15) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                }
                            } else if (budgetPop === 11) {
                                if (movie._preProduction.hiredDirector._rating > 75) {
                                    if (randomNumber(0.35) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                } else if (movie._preProduction.hiredDirector._rating <= 75 && movie._preProduction.hiredDirector._rating > 50) {
                                    if (randomNumber(0.15) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                } else {
                                    if (randomNumber(0.05) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                }
                            } else if (budgetPop === 12) {
                                if (movie._preProduction.hiredDirector._rating > 75) {
                                    if (randomNumber(0.15) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                } else if (movie._preProduction.hiredDirector._rating <= 75 && movie._preProduction.hiredDirector._rating > 50) {
                                    if (randomNumber(0.10) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                } else {
                                    if (randomNumber(0.05) === 0) {
                                        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                        let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'difficulty')
                                        if (f === undefined) {
                                            return undefined;
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                break;
            default:
                break;
        }
    }
}

// function to set event during production
function setEventDuringProduction() {
    let eventsProduction = ['weather', 'castMember', 'budgetForCostumes', 'equipment', 'budget', 'breakdown', 'duration',
        'directorLeaves', 'changes', 'injured'];
    let allCalendarEvents = store.getters.getCalendarEvents;
    let allProductionMovies = store.getters.getInProductionMovies.filter((movie) => movie._status === 'Production');

    for (let i = 0; i < eventsProduction.length; i++) {
        switch (eventsProduction[i]) {
            case 'weather':
                break;
            case 'castMember':
                allProductionMovies.forEach((movie)  => {
                    let eventAlreadyExists = false;
                    let preProductionFinished = false;
                    for (let j = 0; j < allCalendarEvents.length; j++) {
                        if(allCalendarEvents[j].type === 'castMember' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title){
                            eventAlreadyExists = true;
                        }
                        if(allCalendarEvents[j].type === 'preProductionFinished' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title && allCalendarEvents[j].completed === true){
                            preProductionFinished = true;
                        }
                    }

                    if(!eventAlreadyExists && preProductionFinished){
                        let date1 = store.getters.getCurrentDate;
                        let date2 = new Date(movie._preProduction.startDate.getFullYear(), movie._preProduction.startDate.getMonth(), movie._preProduction.startDate.getDate() + (movie._preProduction.productionLength * 7));
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                        if(Difference_In_Days >= 6){
                            let allMovieActors = movie._preProduction.screenplay.actors.main.concat(movie._preProduction.screenplay.actors.support,
                                movie._preProduction.screenplay.actors.minor, movie._preProduction.screenplay.actors.cameo)

                            for (let j = 0; j < allMovieActors.length; j++) {
                                if(allMovieActors[i].actorMorale === 5 && randomNumber(0.05) === 0){
                                    let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                    let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                    let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',allMovieActors[i],movie._preProduction.hiredDirector,startDate,endDate,'castMember')
                                    if(f === undefined){
                                        return undefined;
                                    }
                                } else if(allMovieActors[i].actorMorale === 4 && randomNumber(0.15) === 0){
                                    let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                    let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                    let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',allMovieActors[i],movie._preProduction.hiredDirector,startDate,endDate,'castMember')
                                    if(f === undefined){
                                        return undefined;
                                    }
                                } else if(allMovieActors[i].actorMorale === 3 && randomNumber(0.25) === 0){
                                    let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                    let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                    let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',allMovieActors[i],movie._preProduction.hiredDirector,startDate,endDate,'castMember')
                                    if(f === undefined){
                                        return undefined;
                                    }
                                } else if(allMovieActors[i].actorMorale === 2 && randomNumber(0.50) === 0){
                                    let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                    let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                    let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',allMovieActors[i],movie._preProduction.hiredDirector,startDate,endDate,'castMember')
                                    if(f === undefined){
                                        return undefined;
                                    }
                                } else if(allMovieActors[i].actorMorale === 1 && randomNumber(0.75) === 0){
                                    let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                    let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                    let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',allMovieActors[i],movie._preProduction.hiredDirector,startDate,endDate,'castMember')
                                    if(f === undefined){
                                        return undefined;
                                    }
                                }
                            }
                        }
                    }
                });
                break;
            case 'budgetForCostumes':
                break;
            case 'equipment':
                break;
            case 'budget':
                break;
            case 'breakdown':
                break;
            case 'duration':
                break;
            case 'directorLeaves':
                allProductionMovies.forEach((movie)  => {
                    let eventAlreadyExists = false;
                    let preProductionFinished = false;
                    for (let j = 0; j < allCalendarEvents.length; j++) {
                        if(allCalendarEvents[j].type === 'directorLeaves' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title){
                            eventAlreadyExists = true;
                        }
                        if(allCalendarEvents[j].type === 'preProductionFinished' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title && allCalendarEvents[j].completed === true){
                            preProductionFinished = true;
                        }
                    }

                    if(!eventAlreadyExists && preProductionFinished){
                        let date1 = store.getters.getCurrentDate;
                        let date2 = new Date(movie._preProduction.startDate.getFullYear(), movie._preProduction.startDate.getMonth(), movie._preProduction.startDate.getDate() + (movie._preProduction.productionLength * 7));
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                        if(Difference_In_Days >= 6){
                            if(movie._preProduction.hiredDirector.dirMorale === 5 && randomNumber(0.05) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'directorLeaves')
                                if(f === undefined){
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.dirMorale === 4 && randomNumber(0.15) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'directorLeaves')
                                if(f === undefined){
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.dirMorale === 3 && randomNumber(0.25) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'directorLeaves')
                                if(f === undefined){
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.dirMorale === 2 && randomNumber(0.50) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'directorLeaves')
                                if(f === undefined){
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.dirMorale === 1 && randomNumber(0.75) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'directorLeaves')
                                if(f === undefined){
                                    return undefined;
                                }
                            }
                        }
                    }
                });
                break;
            case 'changes':
                allProductionMovies.forEach((movie)  => {
                    let eventAlreadyExists = false;
                    let preProductionFinished = false;
                    for (let j = 0; j < allCalendarEvents.length; j++) {
                        if(allCalendarEvents[j].type === 'changes' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title){
                            eventAlreadyExists = true;
                        }
                        if(allCalendarEvents[j].type === 'preProductionFinished' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title && allCalendarEvents[j].completed === true){
                            preProductionFinished = true;
                        }
                    }

                    if(!eventAlreadyExists && preProductionFinished){
                        let date1 = store.getters.getCurrentDate;
                        let date2 = new Date(movie._preProduction.startDate.getFullYear(), movie._preProduction.startDate.getMonth(), movie._preProduction.startDate.getDate() + (movie._preProduction.productionLength * 7));
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                        if(Difference_In_Days >= 6){
                            if(movie._preProduction.hiredDirector.rating > 75 && randomNumber(0.35) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'changes')
                                if(f === undefined){
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.rating <= 75 && movie._preProduction.hiredDirector.rating > 50 && randomNumber(0.15) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'changes')
                                if(f === undefined){
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.rating <= 50 && randomNumber(0.05) === 0) {
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(), store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(), store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'changes')
                                if (f === undefined) {
                                    return undefined;
                                }
                            }
                        }
                    }
                });
                break;
            case 'injured':
                break;
            default:
                break;
        }
    }
}

// function to set event during production
function setEventDuringPostProduction() {
    let eventsProduction = ['sound', 'postProductionProblem', 'visualEffects', 'visualQuality', 'reshooting'];
    let allCalendarEvents = store.getters.getCalendarEvents;
    let allPostProductionMovies = store.getters.getInProductionMovies.filter((movie) => movie._status === 'Post Production');

    for (let i = 0; i < eventsProduction.length; i++) {
        switch (eventsProduction[i]) {
            case 'reshooting':
                allPostProductionMovies.forEach((movie)  => {
                    let eventAlreadyExists = false;
                    let productionFinished = false;
                    for (let j = 0; j < allCalendarEvents.length; j++) {
                        if(allCalendarEvents[j].type === 'reshooting' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title){
                            eventAlreadyExists = true;
                        }
                        if(allCalendarEvents[j].type === 'productionFinished' && allCalendarEvents[j].movie === movie._preProduction.screenplay.title && allCalendarEvents[j].completed === true){
                            productionFinished = true;
                        }
                    }

                    if(!eventAlreadyExists && productionFinished){
                        let date1 = store.getters.getCurrentDate;
                        let date2 = new Date(movie._preProduction.startDate.getFullYear(), movie._preProduction.startDate.getMonth(), movie._preProduction.startDate.getDate() + (movie._preProduction.postProductionLength * 7));
                        let Difference_In_Time = date2.getTime() - date1.getTime();
                        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                        if(Difference_In_Days >= 6){
                            if(movie._preProduction.hiredDirector.dirMorale === 5 && randomNumber(0.05) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'changes')
                                if(f === undefined){
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.dirMorale === 4 && randomNumber(0.15) === 0){
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title,'',null,movie._preProduction.hiredDirector,startDate,endDate,'changes')
                                if(f === undefined){
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.dirMorale === 3 && randomNumber(0.25) === 0) {
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(), store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(), store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'changes')
                                if (f === undefined) {
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.dirMorale === 2 && randomNumber(0.50) === 0) {
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(), store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(), store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'changes')
                                if (f === undefined) {
                                    return undefined;
                                }
                            } else if(movie._preProduction.hiredDirector.dirMorale === 1 && randomNumber(0.75) === 0) {
                                let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(), store.getters.getCurrentDate.getDate() + 4);
                                let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(), store.getters.getCurrentDate.getDate() + 5);
                                let f = addElementToCalendarEvents(movie._preProduction.screenplay.title, '', null, movie._preProduction.hiredDirector, startDate, endDate, 'changes')
                                if (f === undefined) {
                                    return undefined;
                                }
                            }
                        }
                    }
                });
                break;
            default:
                break;
        }
    }
}

function addDropOutEvent(actor, director, personMorale,  movie, eventType){
    console.log(personMorale);
    switch (personMorale){
        case 5:
            let f = addPreProductionEventWithProbability(0.05,movie,actor,director, eventType);
            if(f === undefined){
                return undefined;
            }
            break;
        case 4:
            let g = addPreProductionEventWithProbability(0.15,movie,actor,director, eventType)
            if(g === undefined){
                return undefined;
            }
            break;
        case 3:
            let h = addPreProductionEventWithProbability(0.25,movie,actor,director, eventType)
            if(h === undefined){
                return undefined;
            }
            break;
        case 2:
            let i = addPreProductionEventWithProbability(0.50,movie,actor,director, eventType)
            if(i === undefined){
                return undefined;
            }
            break;
        case 1:
            let j = addPreProductionEventWithProbability(0.75,movie,actor,director, eventType)
            if(j === undefined){
                return undefined;
            }
            break;
        default:
            break;
    }
}

function addPreProductionEventWithProbability(probability, movie, actor, director, eventType){
    if(randomNumber(probability) === 0){
        let startDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 4);
        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),store.getters.getCurrentDate.getDate() + 5);
        addElementToCalendarEvents(movie._preProduction.screenplay.title,'',actor,director, startDate, endDate, eventType)
        return undefined;
    }
    return null;
}

// function to generate movies
function generateMoviesFromOtherStudios(){
    if(store.getters.getOtherStudios.length !== 0 && store.state.screenplayTitles.length !== 0){
        if(randomNumber(0.10) === 0){
            let allOtherStudios = store.getters.getOtherStudios;
            let randomStudio = allOtherStudios[Math.floor(Math.random() * allOtherStudios.length)];

            let newMovie = new Movie(store.getters.getNextMovieId, randomStudio, null, 'Finished', 100,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined);
            newMovie._foundationDate = store.getters.getCurrentDate;
            newMovie._preProduction.screenplay = createScreenplaysFromWriters('forMovieGeneration');

            console.log(newMovie)
        }
    }
}
