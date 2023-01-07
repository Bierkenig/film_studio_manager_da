import store from "@/services/store";
import {Studio} from "@/classes/Studio";
import News from "@/classes/News";

export default function simulate(){
    console.log('Simulation works')
    createStudios();
    streamingService();
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

function streamingService(){
    if(store.getters.getOwnStreamingService !== null){
        if(((store.getters.getCurrentDate - store.getters.getOwnStreamingService._lastCheckedDate)/ (1000 * 60 * 60 * 24)) > 30)
        {
            let serviceMaintainmentCosts = store.getters.getOwnStreamingService._subscribers;

            let revenue = store.getters.getOwnStreamingService._subscribers * store.getters.getOwnStreamingService._price;

            let sum = revenue - serviceMaintainmentCosts;
            store.commit('addBalance', sum);

            if(sum < 0){
                console.log(sum + '$ abgezogen!');
            } else if (sum > 0) {
                console.log(sum + '$ erhalten!');
            } else {
                console.log('0$');
            }

            store.getters.getOwnStreamingService._lastCheckedDate = new Date(
                store.getters.getOwnStreamingService._lastCheckedDate.getFullYear(),
                store.getters.getOwnStreamingService._lastCheckedDate.getMonth() + 1,
                store.getters.getOwnStreamingService._lastCheckedDate.getDate());
        }
    }
}