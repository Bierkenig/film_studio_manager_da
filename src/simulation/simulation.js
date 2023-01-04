import store from "@/services/store";
import {Studio} from "@/classes/Studio";
import News from "@/classes/News";

export default function simulate(){
    console.log('Simulation works')
    createStudios();
}

function createStudios(){
    let num = randomNumber(0.85);
    if(num === 1){
        let studioName = store.state.studioNames[Math.floor(Math.random() * store.state.studioNames.length)];
        let newStudio = new Studio(studioName,store.getters.getCurrentDate.getFullYear(),50000000,0);
        store.getters.getOtherStudios.push(newStudio);
        let newsTitle = newStudio.getName() + ' gegründet';
        let newsDescription = 'Das Studio ' + newStudio.getName() + ' wurde gegründet.';
        store.getters.getCurrentNews.push(new News(newsTitle,null,null,null,newStudio,newsDescription,'Studios'))
    }
}

function randomNumber(probability){
    return Math.random() < probability ? 0 : 1;
}