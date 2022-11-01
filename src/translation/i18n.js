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
                    newStudioButton: 'New Studio',
                    loadButton: 'Savings',
                    exitButton: 'Exit Game',
                    settings: 'Settings',
                    languages: 'Languages',
                    music: 'Music',
                    soundeffects: 'Sound-Effects',
                    loadHeader: 'Save Files',
                    noSaving: 'No Savings',
                    createStudioHeader: 'Create Studio',
                    hard: 'Hard',
                    easy: 'Easy',
                    createStudioButton: 'Start A New Game',
                    home: 'Home',
                    movies: 'Movies',
                    library: 'Library',
                    news: 'News',
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
                        total: "Total"
                    },
                    marketShare: {
                        name: "Market Share",
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
                    comedy: 'Comedy',
                    romance: 'Romance',
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
                }
            },
            de: {
                translation: {
                    welcome: 'Willkommen!',
                    newStudioButton: 'Neues Spiel',
                    loadButton: 'Spiel laden',
                    exitButton: 'Spiel verlassen',
                    settings: 'Einstellungen',
                    languages: 'Sprachen',
                    music: 'Musik',
                    soundeffects: 'Soundeffekte',
                    loadHeader: 'Speicherstände',
                    noSaving: 'Kein Speicherstand',
                    createStudioHeader: 'Neues Studio',
                    hard: 'Hart',
                    easy: 'Leicht',
                    createStudioButton: 'Neues Spiel starten',
                    home: 'Hauptmenü',
                    movies: 'Filme',
                    library: 'Bibliothek',
                    news: 'Nachrichten',
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
                    marketShare: {
                        name: "Marktanteil",
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
                    comedy: 'Komödie',
                    romance: 'Romantik',
                    history: 'Historie',
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
                }
            }
        }
    });

export default function (app) {
    app.use(I18NextVue, {i18next});
    return app;
}