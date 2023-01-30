import store from "@/services/store";
import {Studio} from "@/classes/Studio";
import News from "@/classes/News";
import {Avataaars} from "@/avatar/avataaars";
import Person from "@/classes/Person";
import {Screenplay} from "@/classes/Screenplay";

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
    renewPeople();
    createScreenplaysFromWriters();

    //FETCHING DB
    //clear
    /*store.state.allActors = []
    store.state.allDirectors = []
    store.state.allWriters = []
    //Fill
    let actors = [], writers = [], directors = [], people = []
    window.ipcRenderer.send('toGetPeople', "SELECT * FROM people")
    window.ipcRenderer.receive('fromGetPeople', (data) => {
        if(data.isWriter == "true"){
            writers.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                data.rating, data.action, data.adventure, data.biography, data.comedy, data.crime, data.documentary, data.drama, data.erotic,
                data.family, data.fantasy, data.history, data.horror, data.musical, data.mystery, data.romance, data.scienceFiction, data.sport,
                data.thriller, data.war, data.western, data.isActor, data.isDirector, data.isWriter))
        }
        if(data.isDirector == "true"){
            directors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                data.rating, data.action, data.adventure, data.biography, data.comedy, data.crime, data.documentary, data.drama, data.erotic,
                data.family, data.fantasy, data.history, data.horror, data.musical, data.mystery, data.romance, data.scienceFiction, data.sport,
                data.thriller, data.war, data.western, data.isActor, data.isDirector, data.isWriter))
        }
        if(data.isActor == "true"){
            actors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                data.rating, data.action, data.adventure, data.biography, data.comedy, data.crime, data.documentary, data.drama, data.erotic,
                data.family, data.fantasy, data.history, data.horror, data.musical, data.mystery, data.romance, data.scienceFiction, data.sport,
                data.thriller, data.war, data.western, data.isActor, data.isDirector, data.isWriter))
        }
        people.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
            data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
            data.rating, data.action, data.adventure, data.biography, data.comedy, data.crime, data.documentary, data.drama, data.erotic,
            data.family, data.fantasy, data.history, data.horror, data.musical, data.mystery, data.romance, data.scienceFiction, data.sport,
            data.thriller, data.war, data.western, data.isActor, data.isDirector, data.isWriter))

        this.$store.commit('setAllWriters', writers);
        this.$store.commit('setAllDirectors', directors);
        this.$store.commit('setAllActors', actors);
        this.$store.commit('setAllPeople', people);
    })*/
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
        let newStudio = new Studio(studioId, studioName, store.getters.getCurrentDate.getFullYear(), 50000000, 0);
        store.getters.getOtherStudios.push(newStudio);

        //create news of new studio
        let newsTitle = newStudio.getName() + ' gegründet';
        let newsDescription = 'Das Studio ' + newStudio.getName() + ' wurde gegründet.';
        store.commit('addNews', new News(newsTitle, newsDescription, 'Studios', null, null, null, newStudio));
        store.state.studioNames.splice(store.state.studioNames.indexOf(studioName),1);
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
        streamingServiceMovies.forEach(function (movie) {
            let checkDate = new Date(
                movie._boughtRightDate.getFullYear() + 1,
                movie._boughtRightDate.getMonth(),
                movie._boughtRightDate.getDate())

            if (store.getters.getCurrentDate > checkDate) {
                if (movie._contract === 1) {
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
    let allStreamingServiceMovies = store.getters.getBoughtMovieRights.concat(this.$store.getters.getFinishedMovies, this.$store.getters.getBoughtMovies);
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
        allGenreRatings[movie._preProduction.screenplay.genre]++;
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
    let averageOfEachGenre = counterForRatings / counterForGenreNumbers;

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

    let streamingContent = (averageOfEachGenre * 40 + totalContent * 60) / 100;

    // calculate streaming service price potential, depends on the price of the service
    let streamingServicePricePotential = 0;
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

    let streamingServiceHype = sumOfHype / allStreamingServiceMovies.length;
    store.getters.getOwnStreamingService._popularity = streamingServiceHype;

    //set streaming service services
    let potentialSubscribers = 300000000;
    store.getters.getOwnStreamingService._subscribers = potentialSubscribers * ((streamingServicePricePotential * 15 + streamingContent * 15 + streamingServiceHype * 70) / 100);
}

//create screenplays from other writers
function createScreenplaysFromWriters(){
    if(randomNumber(0.50) === 0){
        //get all necessary values
        let allScreenplayTitles = store.state.screenplayTitles;
        let allScreenplayTypes = ['Animation','Feature','Indie'];
        let allSubgenres = store.getters.getAllSubgenres;
        let allTopics =  store.getters.getAllTopics;
        let scopeValues = ['Little','Small','Normal','Large','Epic'];
        let toneValues = ['Depressing','Dark','Realistic','Upbeat','Lighthearted'];
        let specialEffectsValues = ['None','Some','Medium','Lots','Spectacle'];
        let violenceValues = [1,2,3,4,5];
        let cursingValues = [1,2,3,4,5];
        let loveSceneValues = [1,2,3,4,5];
        let ageRatingScala = {1: 'G / +3', 2: 'PG / +7', 3: 'PG-13 / +13', 4: 'R / +16', 5: 'NC-17 / +18'};
        let allWriters = store.getters.getAllWriters;


        // Shuffling the object (get key of object / title of screenplay)
        let shuffle = Object.keys(allScreenplayTitles).map((e, i, a) => {
            // Getting a random value between [i, a.length]
            // Math.floor can be translated as ~~
            let j = Math.floor(Math.random() * (a.length - i) + i);
            // Switching the elements of positions i & j
            [a[i], a[j]] = [a[j], a[i]];
            // Returning current value
            return a[i];
        });
        //set screenplay title
        let screenplayTitle = shuffle.slice(0, 1)[0];
        //set screenplay genre
        let screenplayGenre = allScreenplayTitles[screenplayTitle].genre;
        //set screenplay type
        let screenplayType = allScreenplayTypes[Math.floor(Math.random() * allScreenplayTypes.length)];
        let screenplaySubgenre = null;
        let screenplayDescription = '';
        let screenplayTopics = {firstTopic: null,secondTopic: null,thirdTopic: null};
        let screenplayDetails = {scope: '', tone: '', specialEffects: ''};
        let screenplayAgeRatingDetails = {violence: '', cursing: '', loveScenes: ''};

        //set screenplay subgenre
        if(randomNumber(0.50) === 0){
            screenplaySubgenre = allSubgenres[screenplayGenre][Math.floor(Math.random() * allSubgenres[screenplayGenre].length)]
        }

        //set screenplay description
        switch (screenplayGenre) {
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
        if(randomNumber(0.50) === 0){
            screenplayTopics.secondTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
            while (screenplayTopics.secondTopic === screenplayTopics.firstTopic){
                screenplayTopics.secondTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
            }
            if(randomNumber(0.50) === 0){
                screenplayTopics.thirdTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
                while (screenplayTopics.thirdTopic === screenplayTopics.firstTopic || screenplayTopics.thirdTopic === screenplayTopics.secondTopic){
                    screenplayTopics.thirdTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
                }
            }
        }

        //create screenplay
        let newScreenplay = new Screenplay(store.getters.getNextScreenplayId,screenplayTitle,screenplayType,screenplayGenre,screenplaySubgenre,null,null,screenplayDescription,null,null,screenplayTopics);

        //set screenplay details
        screenplayDetails.scope = scopeValues[Math.floor(Math.random() * scopeValues.length)];
        screenplayDetails.tone = toneValues[Math.floor(Math.random() * toneValues.length)];
        screenplayDetails.specialEffects = specialEffectsValues[Math.floor(Math.random() * specialEffectsValues.length)];

        //set screenplay age rating details
        screenplayAgeRatingDetails.violence = violenceValues[Math.floor(Math.random() * violenceValues.length)];
        screenplayAgeRatingDetails.cursing = cursingValues[Math.floor(Math.random() * cursingValues.length)];
        screenplayAgeRatingDetails.loveScenes = loveSceneValues[Math.floor(Math.random() * loveSceneValues.length)];

        newScreenplay.details = screenplayDetails;
        newScreenplay.ageRatingDetails = screenplayAgeRatingDetails;

        //set screenplay age rating
        newScreenplay.ageRating = ageRatingScala[Math.max(screenplayAgeRatingDetails.violence, screenplayAgeRatingDetails.cursing, screenplayAgeRatingDetails.loveScenes)];

        //set screenplay roles
        newScreenplay.roles = allScreenplayTitles[screenplayTitle].roles;
        //set screenplay acts
        newScreenplay.acts = allScreenplayTitles[screenplayTitle].acts;

        //set screenplay length
        if(newScreenplay.type === 'Feature'){
            newScreenplay.length = Math.floor(Math.random() * (300 - 60) + 60);
        } else {
            newScreenplay.length = Math.floor(Math.random() * (300 - 40) + 40);
        }

        //set screenplay writing phase
        if(newScreenplay.type === 'Feature' || newScreenplay.type === 'Animation'){
            newScreenplay.setWritingPhase(12)
        } else {
            newScreenplay.setWritingPhase(8)
        }

        //set screenplay writer
        let screenplayWriter = allWriters[Math.floor(Math.random() * allWriters.length)];

        //set screenplay rating
        let minTalent;
        let maxTalent;
        if(screenplayWriter._experience > 0 && screenplayWriter._experience <= 50){
            minTalent = screenplayWriter._talent - 15;
            maxTalent = screenplayWriter._talent + 5;
        } else if(screenplayWriter._experience > 50 && screenplayWriter._experience <= 75){
            minTalent = screenplayWriter._talent - 10;
            maxTalent = screenplayWriter._talent + 5;
        } else if(screenplayWriter._experience > 75){
            minTalent = screenplayWriter._talent - 5;
            maxTalent = screenplayWriter._talent + 5;
        }
        let writerTalent = minTalent + ((maxTalent - minTalent) / (Math.floor(Math.random() * (100 - 20 + 1)) + 20))
        let writerGenre = '';
        switch(newScreenplay.genre) {
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
        let screenplayPrice = 0;
        if(screenplayWriter._talent <= 50){
            let calculator = Math.random() * (1.5 - 1) + 1;
            screenplayPrice = (Math.round(calculator * 10) / 10) * screenplayWriter._salary;
        } else if(screenplayWriter._talent >= 51 && screenplayWriter._talent <= 75){
            let calculator = Math.random() * (2 - 1.5) + 1.5;
            screenplayPrice = (Math.round(calculator * 10) / 10) * screenplayWriter._salary;
        } else if(screenplayWriter._talent >= 76){
            let calculator = Math.random() * (3 - 2) + 2;
            screenplayPrice = (Math.round(calculator * 10) / 10) * screenplayWriter._salary;
        }
        newScreenplay.setPrice(screenplayPrice);

        //add screenplay to screenplayFromWriters array
        console.log(newScreenplay);
        store.commit('addScreenplaysFromWriters',newScreenplay);

        //delete screenplay title from source array
        delete store.state.screenplayTitles[screenplayTitle];
        console.log(store.state.screenplayTitles)
    }
}

function renewPeople() {
    //kill and refresh people
    const roles = killAndRefreshPeople()
    const diedPeople = roles.actor + roles.director + roles.writer
    console.log("Died: " + diedPeople)
    console.log("Roles: " + roles)

    //generate new ones
    for (let i = 0; i < diedPeople; i++) {
        generatePersonValues(roles)
        roles.actor--;
        roles.director--;
        roles.writer--;
    }
}

function killAndRefreshPeople() {
    let allActors = store.state.allActors
    let allDirectors = store.state.allDirectors
    let allWriters = store.state.allWriters
    let roles = {actor: 0, director: 0, writer: 0}

    //loop Actors
    allActors.forEach((el) => {
        if (checkAge(el)) {
            window.ipcRenderer.send('killPerson', ["DELETE FROM people WHERE pk_personID = ?", el._id])
            store.commit('addNews', new News(el._first_name + el._last_name + " died!", "The Actor " + el._first_name + el._last_name + " died", null, el))
            roles.actor++
        } else refreshPerson(el)
    })

    //loop Directors
    allDirectors.forEach((el) => {
        if (checkAge(el)) {
            window.ipcRenderer.send('killPerson', ["DELETE FROM people WHERE pk_personID = ?", el._id])
            store.commit('addNews', new News(el._first_name + el._last_name + " died!", "The Director " + el._first_name + el._last_name + " died", null, el))
            roles.director++
        } else refreshPerson(el)
    })

    //loop Writers
    allWriters.forEach((el) => {
        if (checkAge(el)) {
            window.ipcRenderer.send('killPerson', ["DELETE FROM people WHERE pk_personID = ?", el._id])
            store.commit('addNews', new News(el._first_name + el._last_name + " died!", "The Writer " + el._first_name + el._last_name + " died", null, el))
            roles.writer++
        } else refreshPerson(el)
    })

    return roles
}

function checkAge(person) {
    const deathAge = person._deathAge
    if (deathAge < 10) {
        return Math.random() * 100 <= 0.5
    } else if (deathAge >= 10 && deathAge < 20) {
        return Math.round(Math.random() * 99) + 1 === 1
    } else if (deathAge >= 20 && deathAge < 30) {
        return Math.round(Math.random() * 99) + 1 <= 5
    } else if (deathAge >= 30 && deathAge < 40) {
        return Math.round(Math.random() * 99) + 1 <= 10
    } else if (deathAge >= 40 && deathAge < 50) {
        return Math.round(Math.random() * 99) + 1 <= 15
    } else if (deathAge >= 50 && deathAge < 60) {
        return Math.round(Math.random() * 99) + 1 <= 20
    } else if (deathAge >= 60 && deathAge < 70) {
        return Math.round(Math.random() * 99) + 1 <= 35
    } else if (deathAge >= 70 && deathAge < 80) {
        return Math.round(Math.random() * 99) + 1 <= 50
    } else if (deathAge >= 80 && deathAge < 90) {
        return Math.round(Math.random() * 99) + 1 <= 75
    } else if (deathAge >= 90 && deathAge < 100) {
        return Math.round(Math.random() * 99) + 1 <= 85
    } else if (deathAge >= 100) {
        return Math.round(Math.random() * 99) + 1 <= 99
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
    window.ipcRenderer.send('refreshPerson', ["UPDATE people SET experience = ?, popularity = ? WHERE pk_personID = ?", [newExperience, newPopularity, person._id]])
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
    let firstName = "Benni"
    let lastName = "Franklin"

    //deathAge
    let diff = store.getters.getCurrentDate.getFullYear() - parseInt(birthday.split('-')[2])
    const deathAge = Math.round(Math.random() * (111 - diff + 1) + diff)

    //workingSince
    const workingSince = (Math.round(Math.random() * 29) + 1).toString() + "-" + (Math.round(Math.random() * 11) + 1).toString() + "-" + (store.getters.getCurrentDate.getFullYear() - 50).toString()

    //Genres
    let action = Math.round(Math.random() * 99) + 1
    let adventure = Math.round(Math.random() * 99) + 1
    let biography = Math.round(Math.random() * 99) + 1
    let comedy = Math.round(Math.random() * 99) + 1
    let crime = Math.round(Math.random() * 99) + 1
    let documentary = Math.round(Math.random() * 99) + 1
    let drama = Math.round(Math.random() * 99) + 1
    let erotic = Math.round(Math.random() * 99) + 1
    let family = Math.round(Math.random() * 99) + 1
    let fantasy = Math.round(Math.random() * 99) + 1
    let history = Math.round(Math.random() * 99) + 1
    let horror = Math.round(Math.random() * 99) + 1
    let musical = Math.round(Math.random() * 99) + 1
    let mystery = Math.round(Math.random() * 99) + 1
    let romance = Math.round(Math.random() * 99) + 1
    let scienceFiction = Math.round(Math.random() * 99) + 1
    let sport = Math.round(Math.random() * 99) + 1
    let thriller = Math.round(Math.random() * 99) + 1
    let war = Math.round(Math.random() * 99) + 1
    let western = Math.round(Math.random() * 99) + 1

    //create Roles
    let isActor = roles.actor > 0 ? "true" : "false"
    let isDirector = roles.director > 0 ? "true" : "false"
    let isWriter = roles.writer > 0 ? "true" : "false"

    //create performance & rating
    let performance = Math.round(Math.random() * 99) + 1
    let rating = Math.round((performance + experience + talent) / 3)

    //Insert Person into the db
    window.ipcRenderer.send('generatePerson', ["INSERT INTO people (avatar, first_name, last_name, birthday, deathAge, gender, nationality, ethnicity, workingSince, performance, experience, talent, popularity, rating, action, adventure, biography, comedy, crime, documentary, drama, erotic, family, fantasy, history, horror, musical, mystery, romance, scienceFiction, sport, thriller, war, western, isActor, isDirector, isWriter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [svg, firstName, lastName, birthday, deathAge, gender, nationalityValue, ethnicityValue, workingSince, performance, experience, talent, popularity, rating, action, adventure, biography, comedy, crime, documentary, drama, erotic, family, fantasy, history, horror, musical, mystery, romance, scienceFiction, sport, thriller, war, western, isActor, isDirector, isWriter]])
    window.ipcRenderer.receive('personStatus', (data) => {
        if (data === 200) {
            store.commit('addNews', new News("New Person joined", "New Person joined the Film Studio Manager Community", null))
        }
    })
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