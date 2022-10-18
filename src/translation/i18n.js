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
                    calendar: 'Calendar',
                    skipWeek: 'Skip to next week',
                    releasedMovie: 'Released Movies',
                    earnings: 'Earnings',
                    week: 'Week',
                    month: 'Month',
                    inProduction: 'In Production',
                    upcomingEvents: 'Upcoming Events',
                    back: 'Back',
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
                    calendar: 'Kalender',
                    skipWeek: 'Zur nächsten Woche springen',
                    releasedMovie: 'Veröffentlichte Filme',
                    earnings: 'Einnahmen',
                    week: 'Woche',
                    month: 'Monat',
                    inProduction: 'In Produktion',
                    upcomingEvents: 'Kommende Events',
                    back: 'Zurück',
                }
            }
        }
    });

export default function (app) {
    app.use(I18NextVue, { i18next });
    return app;
}