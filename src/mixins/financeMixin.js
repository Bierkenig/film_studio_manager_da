export default function financeMixin(){
    return {
        watch: {
            '$store.getters.getCurrentDate': function (){
                if(this.$store.getters.getOwnStreamingService !== null){
                    if(((this.$store.getters.getCurrentDate - this.$store.getters.getOwnStreamingService._lastCheckedDate)/ (1000 * 60 * 60 * 24)) > 30)
                    {
                        let serviceMaintainmentCosts = this.$store.getters.getOwnStreamingService._subscribers;

                        let revenue = this.$store.getters.getOwnStreamingService._subscribers * this.$store.getters.getOwnStreamingService._price;

                        let sum = revenue - serviceMaintainmentCosts;
                        this.$store.commit('addBalance', sum);

                        if(sum < 0){
                            console.log(sum + '$ abgezogen!');
                        } else if (sum > 0) {
                            console.log(sum + '$ erhalten!');
                        } else {
                            console.log('0$');
                        }

                        this.$store.getters.getOwnStreamingService._lastCheckedDate = new Date(
                            this.$store.getters.getOwnStreamingService._lastCheckedDate.getFullYear(),
                            this.$store.getters.getOwnStreamingService._lastCheckedDate.getMonth() + 1,
                            this.$store.getters.getOwnStreamingService._lastCheckedDate.getDate());
                    }
                }
            }
        },
    }
}