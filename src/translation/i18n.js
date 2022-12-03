import i18next from "i18next";
import I18NextVue from 'i18next-vue';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: 'en',
        lng: 'en',
        resources: {
            en: {
                translation: {
                    welcome: 'Welcome!',
                    newGameButton: 'New Game',
                    loadButton: 'Load Game',
                    exitButton: 'Exit Game',
                    settings: 'Settings',
                    languages: 'Languages',
                    music: 'Music',
                    soundeffects: 'Sound-Effects',
                    loadHeader: 'Save Files',
                    SlotHeader: 'Save Slots',
                    noSaving: 'No Savings',
                    createStudioHeader: 'Create Studio',
                    hard: 'Hard',
                    easy: 'Easy',
                    createStudioButton: 'Start A New Game',
                    home: 'Home',
                    movies: 'Movies',
                    library: 'Library',
                    news: 'News',
                    newsData: {
                        person: "Person",
                        movie: "Movie",
                        award: "Award",
                        week: "Week",
                        month: "Month",
                        year: "Year",
                        name: "Name",
                        age: "Age",
                        gender: "Gender",
                        values: "Values",
                        title: "Title",
                        studio: "Studio",
                        earnings: "Earnings",
                    },
                    finances: 'Finances',
                    takeCredit: "Loan",
                    buyStudio: "Buy",
                    labelTakeCredit: "Take out a loan",
                    labelBuyStudio: "Buy a Studio",
                    descCredit: "Produce and release your own Movie",
                    descStudio: "Lorem ipsum deine Mum",
                    fiscalPerformance: {
                        name: "Fiscal Performance",
                        area: "Area",
                        incoming: "Incoming",
                        outgoing: "Outgoing",
                        accumulated: "Accumulated",
                    },
                    production: "Production",
                    marketing: "Marketing",
                    loan: "Loan",
                    cinema: "Cinema",
                    total: "Total",
                    marketShare: {
                        name: "Market Share",
                    },
                    financialHistory: {
                        name: "Financial History",
                        event1: "Studio acquired",
                        desc1: "Of the Movie",
                        event2: "Studio closed",
                        desc2: "Of the Movie",
                        event3: "New Studio has been founded",
                        desc3: "Of the Movie",
                    },
                    dates: {
                        january: "January",
                        february: "February",
                        march: "March",
                        april: "April",
                        may: "May",
                        june: "June",
                        july: "July",
                        august: "August",
                        september: "September",
                        october: "October",
                        november: "November",
                        december: "December",
                    },
                    buyScreenplaySection: {
                        buyScreenplay: "Buy a Screenplay",
                        buy: "Buy",
                        choose: "Choose",
                        expand: "Expand with a Sequel or a Prequel",
                        expand2: "Expand",
                        new: "Create a new Screenplay",
                        create2: "Create",
                        existing: "Choose a existing Screenplay",
                        pitch: "Pitch an idea",
                        idea: "Show screenplay infos",
                        continue: "Continue",
                        selFran: "Selected Franchise: ",
                        select: "Select",
                    },
                    hireDirectorSection: {
                        hire: "Choose a Director with whom you want to negotiate",
                        negotiate: "Negotiate",
                        salary: "Select a salary for ",
                        control: "Choose the directors creative control",
                        offer: "Send offer",
                        decision: "'s decision: ",
                        think: "Try to readjust the salary or increase the creative control",
                        declined: " declined your Offers 3 times. Try to negotiate with another Director"
                    },
                    durationSection: {
                        set: "Set the Pre Production Phase of your Movie",
                        set2: "Set the Production Phase of your Movie",
                        set3: "Set the Post Production Phase of your Movie",
                        confirm: "Confirm",
                        releaseDate: "Set the release Date for your Production",
                        continue: "Continue",
                        choice: "Your choice: "
                    },
                    actorSection: {
                        hire: "Hire Actors for your Movie",
                        negotiate: "Negotiate",
                        salary: "Select a Salary for ",
                        offer: "Send offer",
                        decision: "'s decision: ",
                        readjust: "Try to readjust the Salary",
                        continue: "Continue",
                        spots: "You have ",
                        spots2: " spots for the role ",
                        spots3: " left",
                        no: "no",
                        mood: "'s opinion on your decision",
                        important: "IMPORTANT!!",
                        notHappy: "Your Director isn't happy with your Actor selection",
                        goingOn: "Do you want to ignore it and just go on?",
                        close: "Close",
                    },
                    budgetSection: {
                        overall: "Set the Budget for your Movie",
                        production: "Set the Budget for the Production",
                        extras: "Set the Budget for Extras",
                        cinematography: "Set the Budget for the Cinematography",
                        sound: "Set the Budget for the Sound",
                        editing: "Set the Budget for the Editing",
                        score: "Set the Budget for the Score",
                        set: "Set the Budget for the Set",
                        stunts: "Set the Budget for the Stunts",
                        costume: "Set the Budget for the Costume",
                        makeup: "Set the Budget for the Makeup",
                        sfx: "Set the Budget for SFX",
                        vfx: "Set the Budget for VFX",
                        button: "Confirm",
                        continue: "Continue"
                    },
                    event: {
                        breakdown: "Breakdown",
                        what: "What happened",
                        fire: "Fire broke out",
                        sets: "Sets are broken",
                        weather: "Problems with the weather",
                        location: "Location",
                        unavailable: "Location is unavailable",
                        ignore: "Consequences that will happen: ",
                        set: "Pay %5 more Set Budget",
                        production: "Pay 5% more Production Budget",
                        close: "Close"
                    },
                    dispute: {
                        dispute: "Dispute",
                        happened: "What happened: ",
                        dispute2: "There is a Dispute between ",
                        and: " and ",
                        fire: "Fire Actor",
                        fire2: "Fire Director",
                        nothing: "Do nothing",
                        hire: "Hire a new Director",
                        hire2: "Hire a new Actor",
                        extend: "Do you want to extend the production budget by 25%",
                        yes: "Yes",
                        no: "No",
                        one: "Fire one Actor",
                        both: "Fire both Actors",
                        fire3: "Fire",
                    },
                    budgetProblems: {
                        budget: "Budgetary Issues",
                        happened: "What happened: Allocated budget was not enough",
                        increase: "You need to increase the different budget Sections",
                        select: "Select the new Budget for the different Sections",
                        set: "Set the new Budget"
                    },
                    illnessInjuries: {
                        illness: "Illness",
                        injuries: "Injuries",
                        dropped1: "An Actor dropped out due to illness",
                        dropped2: "An Actor dropped out due to injuries",
                        production: "Production stopped",
                        allocate: "Do you want to allocate more budget?",
                        yes: "Yes",
                        no: "No",
                        set: "Set the new Budget"
                    },
                    productionNotFinished: {
                        fin: "Production not finished",
                        cause1: "Cause: Production was set to minimal",
                        cause2: "Cause: Production Budget was set to low",
                        cause3: "Cause: Problems occurred on and off the set",
                        options: "Your options",
                        option1: "Stop shooting, but your quality drop by 15%",
                        option2: "Resume shooting, but your budget will increase by 20% and your hype drops by 5%",
                        stop: "Stop shooting",
                        resume: "Resume shooting"
                    },
                    notDone: {
                        desc: "Not done with the Shot",
                        happened: "Due to problems production has been delayed and and Post production phase cannot begin",
                        shot: "Stop shooting, but your Quality drops by 20%",
                        prod: "Extend the Production, but your hype drop by 5% and your costs increase by 20%",
                        stop: "Stop shooting",
                        extend: "Extend Production",
                    },
                    options: {
                        message: "Your Production has ended",
                        message2: "Do you want to continue with the Post Production or cancel the Movie",
                        cancel: "Cancel your current Movie",
                        continue: "Continue with the Post Production",
                    },
                    postProduction: {
                        msg: "More Time for VFX",
                        qst: "Do you want to give more time for vfx?",
                        yes: "Yes",
                        no: "No",
                        save: "Save"
                    },
                    test: {
                        msg: "Test screening with audience",
                        change: "The age rating changed due to test screening with the audience",
                        change2: "The age rating changed due to your Director",
                        age: "Age rating changed from ",
                        age2: "Your Director changed the age rating from ",
                        to: " to ",
                    },
                    changeActor: {
                        h3: "Change of Actor",
                        msg: "One of your actors has been changed",
                        new: "New actor: ",
                        reshoot: "Your Movie has to be reshot",
                        budget: "Your budget is increasing by: ",
                        hype: "Your hype decreases by: ",
                        ignore: "Ignore the change",
                        accept: "Accept",
                        ignore2: "Ignoring this Issue increases the risk of failure"
                    },
                    changeEnding: {
                        h3: "Change of Ending",
                        ending: "Your ending has to be changed",
                        qst: "Do you want to ignore it and increase the risk of failure or reshoot the ending which decreases the hype and increases the budget",
                        budget: "Budget increases by: 10%",
                        hype: "Hype decreases by: 5%",
                        ignore: "Ignore",
                        reshoot: "Reshoot",
                    },
                    reeditingDirector: {
                        h3: "Reediting by Director",
                        msg: "Do you want to reedit the movie by the director?",
                        reedit: "Reedit",
                        ignore: "Ignore",
                        hype: "Hype increases by: 5%",
                        quality: "Quality will drop by: 10%",
                        save: "Save"
                    },
                    finalCut: {
                        h3: "Final cut by director",
                        msg: "Your Director doesn't want to do the final cut",
                        ignore: "Ignoring it will cause a higher risk of failure",
                        accept: "Accept",
                        ignore2: "Ignore"
                    },
                    marketingSection: {
                        interest: "Interested Groups",
                        children: "Children",
                        teenager: "Teenager",
                        adult: "Adults",
                        trailer: "Trailers",
                        add: "Add trailer",
                        scope: "Your Screenplay Scope: ",
                        champaign: "Marketing champaign",

                    },
                    calendar: 'Calendar',
                    streaming: 'Streaming',
                    skipWeek: 'Skip to next week',
                    releasedMovie: 'Released Movies',
                    earnings: 'Earnings',
                    week: 'Week',
                    month: 'Month',
                    inProduction: 'In Production',
                    upcomingEvents: 'Upcoming Events',
                    back: 'Back',
                    managerDashboard: 'Your manager dashboard',
                    close: 'Close',
                    finishedMovies: 'Finished Movies',
                    owningScreenplays: 'Owning Screenplays',
                    franchises: 'Franchises',
                    createScreenplay: 'Create Screenplay',
                    createMovie: 'Create Movie',
                    buyScreenplay: 'Buy Screenplay',
                    adventure: 'Adventure',
                    biography: 'Biography',
                    comedy: 'Comedy',
                    crime: 'Crime',
                    documentary: 'Documentary',
                    erotic: 'Erotic',
                    family: 'Family',
                    mystery: 'Mystery',
                    romance: 'Romance',
                    war: 'War',
                    history: 'History',
                    character: 'Character',
                    main: 'Main',
                    support: 'Support',
                    voiceOver: 'Voice Over',
                    between15: 'between 1 and 5',
                    between05: 'between 0 and 5',
                    continue: 'Continue',
                    gender: 'Gender',
                    male: 'Male',
                    female: 'Female',
                    age: 'Age',
                    ageRating: 'Age Rating',
                    diverse: 'Diverse',
                    castAs: 'Cast As',
                    save: 'Save',
                    saveCharacter: 'Save Character',
                    act1: 'Act 1',
                    act2: 'Act 2',
                    act3: 'Act 3',
                    acts: 'Acts',
                    addCharacterMoment: 'Add Character Moment',
                    addLocation: 'Add Location',
                    addTimePeriod: 'Add Time Period',
                    timePeriod: 'Time Period',
                    farFuture: 'Far Future',
                    nearFuture: 'Near Future',
                    presentDay: 'Present Day',
                    century20: '20th Century',
                    century19: '19th Century',
                    century18: '18th Century',
                    industrialRevolution: 'Industrial Revolution',
                    the: 'The',
                    highMiddleAges: 'High Middle Ages',
                    earlyMiddleAges: 'Early Middle Ages',
                    vikingEra: 'Viking Era',
                    darkAge: 'Dark Ages',
                    ancientWorld: 'Ancient World',
                    stoneAge: 'Stone Age',
                    dies: 'dies',
                    kills: 'kills',
                    defies: 'defies',
                    losesTo: 'loses to',
                    escapes: 'escapes',
                    isCaptured: 'is captured',
                    runsAway: 'runs away',
                    isOnAMission: 'is on a mission',
                    completesTheMission: 'completes the mission',
                    losesSomeoneImportant: 'loses someone important',
                    isAlive: 'is alive',
                    helps: 'helps',
                    sendsOnAMission: 'sends ... on a mission',
                    fights: 'fights',
                    letsGo: 'lets ... go',
                    fallsInLoveWith: 'falls in love with',
                    characterMoments: 'Character Moments',
                    moment: 'Moment',
                    location: 'Location',
                    europe: 'Europe',
                    france: 'France',
                    germany: 'Germany',
                    uk: 'United Kingdom',
                    russia: 'Russia',
                    italy: 'Italy',
                    spain: 'Spain',
                    asia: 'Asia',
                    india: 'India',
                    saudiArabia: 'Saudi Arabia',
                    southKorea: 'South Korea',
                    africa: 'Africa',
                    southAfrica: 'South Africa',
                    morocco: 'Morocco',
                    egypt: 'Egypt',
                    northAmerica: 'North America',
                    canada: 'Canada',
                    mexico: 'Mexico',
                    southAmerica: 'South America',
                    brazil: 'Brazil',
                    colombia: 'Colombia',
                    argentina: 'Argentina',
                    oceania: 'Oceania',
                    australia: 'Australia',
                    newZealand: 'New Zealand',
                    space: 'Space',
                    undefined: 'Undefined',
                    countries: 'Countries',
                    warningMsgScreenplayPlot: 'You have to add 1 element of each type to every act! ' +
                        'You can only add 1 element of each type to every act!',
                    topic: 'Topic',
                    topics: 'Topics',
                    scope: 'Scope',
                    tone: 'Tone',
                    useOfSpecialEffects: 'Use of Special Effects',
                    specialEffects: 'Special Effects',
                    little: 'Little',
                    small: 'Small',
                    violence: 'Violence',
                    cursing: 'Cursing',
                    loveScenes: 'Love Scenes',
                    large: 'Large',
                    epic: 'Epic',
                    depressing: 'Depressing',
                    dark: 'Dark',
                    realistic: 'Realistic',
                    upbeat: 'Upbeat',
                    lightHearted: 'Light-Hearted',
                    none: 'None',
                    some: 'Some',
                    medium: 'Medium',
                    lots: 'Lots',
                    spectacle: 'Spectacle',
                    intensive: 'Intensive',
                    graphical: 'Graphical',
                    strong: 'Strong',
                    crude: 'Crude',
                    offensive: 'Offensive',
                    familyFriendly: 'Family Friendly',
                    passionate: 'Passionate',
                    steamy: 'Steamy',
                    explicit: 'Explicit',
                    overallAgeRating: 'Overall Age Rating: ',
                    screenplayLength: 'Screenplay Length',
                    screenplayLengthMsgPart1: 'The screenplay length must be between',
                    screenplayLengthMsgPart2: 'and 300 pages! One page equals one minute of screen time!',
                    end: 'End',
                    no: 'No',
                    hireWriter: 'Hire Writer',
                    salary: 'Salary',
                    rating: 'Rating',
                    writer: 'Writer',
                    price: 'Price',
                    roles: 'Roles',
                    writingPhase: 'Writing Phase',
                    save_slot: 'Save-Slot',
                    buyRights: 'Buy Movie Rights',
                    rights: 'Movie Rights',
                    rightsMsg: 'Buy rights to movies from other studios!',
                    ownServiceHeader: 'Information of your own service',
                    subscribers: 'Subscribers',
                    owner: 'Owner',
                    contract: 'Contract',
                    unlimited: 'Unlimited',
                    screenplay: 'Screenplay',
                    date: 'Date',
                    years: 'Years',
                    contentManagement: 'Content Management',
                    ascending: 'Ascending',
                    descending: 'Descending',
                    sortBy: 'Sort by',
                    competitorServices: 'Competitor Services',
                    createService: 'Create Servce',
                    saveScreenplay: 'Save Screenplay',
                    popularity: 'Popularity',
                    viewServices: 'View Services',
                    competitorMsg: 'View the statistics of other services.',
                    changes: 'Changes',
                }
            },
            de: {
                translation: {
                    welcome: 'Willkommen!',
                    newGameButton: 'Neues Spiel',
                    loadButton: 'Spiel laden',
                    exitButton: 'Spiel verlassen',
                    settings: 'Einstellungen',
                    languages: 'Sprachen',
                    music: 'Musik',
                    soundeffects: 'Soundeffekte',
                    loadHeader: 'Speicherstände',
                    SlotHeader: 'Speicherslots',
                    noSaving: 'Kein Speicherstand',
                    createStudioHeader: 'Neues Studio',
                    hard: 'Hart',
                    easy: 'Leicht',
                    createStudioButton: 'Neues Spiel starten',
                    home: 'Hauptmenü',
                    movies: 'Filme',
                    library: 'Bibliothek',
                    news: 'Nachrichten',
                    newsData: {
                        person: "Person",
                        movie: "Film",
                        award: "Auszeichnung",
                        week: "Woche",
                        month: "Month",
                        year: "Year",
                        name: "Name",
                        age: "Alter",
                        gender: "Geschlecht",
                        values: "Werte",
                        title: "Titel",
                        studio: "Studio",
                        earnings: "Einnahmen",
                    },
                    finances: 'Finanzen',
                    takeCredit: "Leihen",
                    buyStudio: "Kaufen",
                    labelTakeCredit: "Kredit aufnehmen",
                    labelBuyStudio: "Studio kaufen",
                    descCredit: "Produzieren und veröffentlichen Sie Ihren eigene Film",
                    descStudio: "Lorem ipsum deine Mum",
                    fiscalPerformance: {
                        name: "Finanzielle Leistungsfähigkeit",
                        area: "Bereich",
                        incoming: "Einkommen",
                        outgoing: "Ausgaben",
                        accumulated: "Kumuliert",
                        total: "Gesamt"
                    },
                    production: "Produktion",
                    marketing: "Vermarktung",
                    loan: "Kredit",
                    cinema: "Kino",
                    total: "Total",
                    marketShare: {
                        name: "Marktanteil",
                    },
                    financialHistory: {
                        name: "Finanzielle Geschichte",
                        event1: "Studio wurde erworben",
                        desc1: "Von dem Film",
                        event2: "Studio geschlossen",
                        desc2: "Von dem Film",
                        event3: "Neues Studio wurde gegründet",
                        desc3: "Von dem Film",
                    },
                    dates: {
                        january: "Jänner",
                        february: "Februar",
                        march: "März",
                        april: "April",
                        may: "Mai",
                        june: "Juni",
                        july: "Juli",
                        august: "August",
                        september: "September",
                        october: "Oktober",
                        november: "November",
                        december: "Dezember",
                    },
                    buyScreenplaySection: {
                        buyScreenplay: "Ein Drehbuch kaufen",
                        buy: "Kaufen",
                        choose: "Wählen",
                        expand: "Erweitern Sie mit einem Sequel oder Prequel",
                        expand2: "Erweitern",
                        new: "Ein neues Drehbuch erstellen",
                        create2: "Erstellen",
                        existing: "Wählen Sie ein bestehendes Drehbuch aus",
                        pitch: "Eine Idee vorschlagen",
                        idea: "Drehbuch-Infos anzeigen",
                        continue: "Weiter",
                        selFran: "Ausgewähltes Franchise: ",
                        select: "Auswählen",
                    },
                    hireDirectorSection: {
                        hire: "Wählen Sie einen Direktor, mit dem Sie verhandeln wollen",
                        negotiate: "Verhandeln",
                        salary: "Wählen Sie ein Gehalt für ",
                        control: "Wählen Sie die kreative Kontrolle des Regisseurs",
                        offer: "Angebot senden",
                        decision: "'s Entscheidung': ",
                        think: "Versuchen Sie, das Gehalt anzupassen oder die kreative Kontrolle zu erhöhen",
                        declined: " lehnte Ihre Angebote 3 Mal ab. Versuchen Sie, mit einem anderen Direktor zu verhandeln"
                    },
                    durationSection: {
                        set: "Legen Sie die Vorproduktionsphase Ihres Films fest",
                        set2: "Legen Sie die Produktionsphase Ihres Films fest",
                        set3: "Legen Sie die Postproduktionsphase Ihres Films fest",
                        confirm: "Bestätigen",
                        releaseDate: "Legen Sie das Veröffentlichungsdatum für Ihre Produktion fest",
                        continue: "Bestätigen",
                        choice: "Fortfahren"
                    },
                    actorSection: {
                        hire: "Schauspieler für Ihren Film anheuern",
                        negotiate: "Verhandeln",
                        salary: "Wählen Sie ein Gehalt für ",
                        offer: "Angebot senden",
                        decision: "'s Entscheidung': ",
                        readjust: "Versuchen Sie, das Gehalt neu anzupassen",
                        continue: "Weiter",
                        spots: "Sie haben ",
                        spots2: " Spots für die Rolle ",
                        spots3: " übrig",
                        no: "nein",
                        mood: "'s Meinung zu Ihrer Entscheidung",
                        important: "WICHTIG!!",
                        notHappy: "Ihr Direktor ist mit Ihrer Schauspielerauswahl nicht zufrieden",
                        goingOn: "Wollen Sie es ignorieren und einfach weitermachen?",
                        close: "Schließen",
                    },
                    budgetSection: {
                        overall: "Legen Sie das Budget für Ihren Film fest",
                        production: "Legen Sie das Budget für die Produktion fest",
                        extras: "Legen Sie das Budget für die Extras fest",
                        cinematography: "Legen Sie das Budget für die Kinematographie fest",
                        sound: "Legen Sie das Budget für den Ton fest",
                        editing: "Legen Sie das Budget für den Schnitt fest",
                        score: "Legen Sie das Budget für den Score fest",
                        set: "Legen Sie das Budget für das Set fest",
                        stunts: "Legen Sie das Budget für die Stunts fest",
                        costume: "Legen Sie das Budget für das Kostüm fest",
                        makeup: "Legen Sie das Budget für das Make-up fest",
                        sfx: "Legen Sie das Budget für die SFX fest",
                        vfx: "Legen Sie das Budget für die VFX fest",
                        button: "Bestätigen",
                        continue: "Weiter"
                    },
                    calendar: 'Kalender',
                    streaming: 'Streaming',
                    skipWeek: 'Zur nächsten Woche springen',
                    releasedMovie: 'Veröffentlichte Filme',
                    earnings: 'Einnahmen',
                    week: 'Woche',
                    month: 'Monat',
                    inProduction: 'In Produktion',
                    upcomingEvents: 'Kommende Events',
                    back: 'Zurück',
                    managerDashboard: 'Dein Management Dashboard',
                    close: 'Schließen',
                    finishedMovies: 'Fertige Filme',
                    owningScreenplays: 'Drehbücher - in Besitz',
                    franchises: 'Filmreihen',
                    createScreenplay: 'Drehbuch erstellen',
                    createMovie: 'Film erstellen',
                    buyScreenplay: 'Drehbuch kaufen',
                    description: 'Beschreibung',
                    movieTitle: 'Filmtitel',
                    adventure: 'Abenteuer',
                    biography: 'Biographie',
                    comedy: 'Komödie',
                    crime: 'Verbrechen',
                    documentary: 'Dokumentationsfilm',
                    erotic: 'Erotisch',
                    family: 'Familie',
                    mystery: 'Rätsel',
                    romance: 'Romantisch',
                    war: 'Krieg',
                    history: 'Geschichte',
                    character: 'Charakter',
                    main: 'Hauptdarsteller',
                    support: 'Nebendarsteller',
                    voiceOver: 'Sprecher',
                    between15: 'zwischen 1 und 5',
                    between05: 'zwischen 0 and 5',
                    continue: 'Weiter',
                    gender: 'Geschlecht',
                    male: 'Männlich',
                    female: 'Weiblich',
                    diverse: 'Divers',
                    age: 'Alter',
                    ageRating: 'Altersbeschränkung',
                    castAs: 'Besetzen als',
                    save: 'Speichern',
                    saveCharacter: 'Charakter speichern',
                    act1: 'Akt 1',
                    act2: 'Akt 2',
                    act3: 'Akt 3',
                    acts: 'Akten',
                    addCharacterMoment: 'Charakter Ereignisse hinzufügen',
                    addLocation: 'Ort hinzufügen',
                    addTimePeriod: 'Zeitspanne hinzufügen',
                    timePeriod: 'Zeitspanne',
                    farFuture: 'Ferne Zukunft',
                    nearFuture: 'Nahe Zukunft',
                    presentDay: 'Gegenwart',
                    century20: '20. Jhdt.',
                    century19: '19. Jhdt.',
                    century18: '18. Jhdt.',
                    industrialRevolution: 'Industrielle Revolution',
                    the: 'Die',
                    highMiddleAges: 'Hochmittelalter',
                    earlyMiddleAges: 'Frühmittelalter',
                    vikingEra: 'Wikingerzeit',
                    darkAge: 'Dunkles Zeitalter',
                    ancientWorld: 'Antike Welt',
                    stoneAge: 'Steinzeit',
                    dies: 'stirbt',
                    kills: 'tötet',
                    defies: 'fordert ... heraus',
                    losesTo: 'verliert gegen',
                    escapes: 'entkommt',
                    isCaptured: 'wird erfasst',
                    runsAway: 'läuft weg',
                    isOnAMission: 'ist auf einer Mission',
                    completesTheMission: 'schließt die Mission ab',
                    losesSomeoneImportant: 'verliert jemand Wichtiges',
                    isAlive: 'ist am Leben',
                    helps: 'hilft',
                    sendsOnAMission: 'schickt ... auf eine Mission',
                    fights: 'kämpft gegen',
                    letsGo: 'lasst ... gehen',
                    fallsInLoveWith: 'verliebt sich in',
                    characterMoments: 'Charakter Ereignisse',
                    moment: 'Ereignis',
                    location: 'Ort',
                    europe: 'Europa',
                    france: 'Frankreich',
                    germany: 'Deutschland',
                    uk: 'Vereinigtes Königreich',
                    russia: 'Russland',
                    italy: 'Italien',
                    spain: 'Spanien',
                    asia: 'Asien',
                    india: 'Indien',
                    saudiArabia: 'Saudi Arabien',
                    southKorea: 'Südkorea',
                    africa: 'Afrika',
                    southAfrica: 'Südafrika',
                    morocco: 'Marokko',
                    egypt: 'Ägypten',
                    northAmerica: 'Nordamerika',
                    canada: 'Kanada',
                    mexico: 'Mexiko',
                    southAmerica: 'Südamerika',
                    brazil: 'Brasilien',
                    colombia: 'Kolumbien',
                    argentina: 'Argentinien',
                    oceania: 'Ozeanien',
                    australia: 'Australien',
                    newZealand: 'Neuseeland',
                    space: 'Weltraum',
                    undefined: 'Unbestimmt',
                    countries: 'Länder',
                    warningMsgScreenplayPlot: 'Du musst 1 Element jeder Art zu jedem Akt hinzufügen! ' +
                        'Sie können nur 1 Element jeder Art zu jedem Akt hinzufügen!',
                    topic: 'Thema',
                    topics: 'Themen',
                    scope: 'Umfang',
                    tone: 'Ton',
                    useOfSpecialEffects: 'Verwendung von Special Effekte',
                    little: 'Wenig',
                    small: 'Klein',
                    violence: 'Gewalt',
                    cursing: 'Gefluche',
                    loveScenes: 'Liebesszenen',
                    large: 'Groß',
                    epic: 'Episch',
                    depressing: 'Deprimierend',
                    dark: 'Düster',
                    realistic: 'Realistisch',
                    upbeat: 'Fröhlich',
                    lightHearted: 'Heiter',
                    none: 'Keine',
                    some: 'Einige',
                    medium: 'Mittel',
                    lots: 'Viele',
                    spectacle: 'Sehr Viele',
                    intensive: 'Intensiv',
                    graphical: 'Anschaulich',
                    strong: 'Stark',
                    crude: 'Lieblos',
                    offensive: 'Abstoßend',
                    familyFriendly: 'Familienfreundlich',
                    passionate: 'Leidenschaftlich',
                    steamy: 'Heiß',
                    explicit: 'Explizit',
                    overallAgeRating: 'Allgemeine Altersbeschränkung: ',
                    screenplayLength: 'Drehbuchlänge',
                    screenplayLengthMsgPart1: 'Die Drehbuchlänge muss zwischen',
                    screenplayLengthMsgPart2: 'und 300 Seiten betragen! Eine Seite entspricht einer Minuten Bildschirmzeit!',
                    end: 'Ende',
                    no: 'Keine',
                    hireWriter: 'Autor anheuern',
                    salary: 'Gehalt',
                    rating: 'Bewertung',
                    writer: 'Autor',
                    price: 'Preis',
                    roles: 'Rollen',
                    writingPhase: 'Schreibphase',
                    save_slot: 'Speicherstand',
                    buyRights: 'Filmrecht kaufen',
                    rights: 'Filmrechte',
                    rightsMsg: 'Kaufe Rechte für Filme von anderen Studios!',
                    ownServiceHeader: 'Information zum eigenen Streaming Service',
                    subscribers: 'Abonnenten',
                    owner: 'Besitzer',
                    contract: 'Vertrag',
                    unlimited: 'Unbeschränkt',
                    screenplay: 'Drehbuch',
                    date: 'Datum',
                    years: 'Jahre',
                    contentManagement: 'Filmrechte in Besitz',
                    ascending: 'Aufsteigend',
                    descending: 'Absteigend',
                    sortBy: 'Sortieren nach',
                    competitorServices: 'Gegnerische Streaming Services',
                    createService: 'Streaming Service erstellen',
                    saveScreenplay: 'Drehbuch speichern',
                    popularity: 'Bekanntheit',
                    viewServices: 'Services anzeigen',
                    competitorMsg: 'Zeig die Statistiken von anderen Services an!',
                    changes: 'Umsatz',
                }
            }
        }
    });

export {i18next};

export default function (app) {
    app.use(I18NextVue, {i18next});
    return app;
}