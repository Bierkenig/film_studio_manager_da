import store from "@/services/store";
import {Studio} from "@/classes/Studio";
import News from "@/classes/News";

export default function simulate(){
    console.log('Simulation works')
    createStudios()
}

function createStudios(){
    let randomNumber = Prob();
    if(randomNumber >= 11){
        let studioName = store.state.studioNames[Math.floor(Math.random() * store.state.studioNames.length)];
        let newStudio = new Studio(studioName,store.getters.getCurrentDate.getFullYear());
        store.getters.getOtherStudios.push(newStudio);
        let newsTitle = newStudio.getName() + ' gegründet';
        let newsDescription = 'Das Studio ' + newStudio.getName() + ' wurde gegründet.';
        store.getters.getCurrentNews.push(new News(newsTitle,null,null,null,newStudio,newsDescription,'Studios'))
    }
}

function Prob(){
    var rnd = Math.random(),
        rnd2 = Math.random();
    if(rnd<0.9) return (1 + Math.floor(1000 * rnd2)/100);
    else return (11 + Math.floor(1000 * rnd2)/100);
}