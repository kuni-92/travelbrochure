var app = new Vue ({
    el: '#app',
    data: {
        newWay: '',
        newDestination: '',
        newMemo: '',
        destModalClass: "modal",
        destinations: [],
    },
    mounted() {
        if(localStorage.destinations) {
            try {
                this.destinations = JSON.parse(localStorage.getItem('destinations'));
            } catch(e) {
                localStorage.removeItem('destinations');
            }
        }
    },
    watch: {
        destinations(dest) {
            const parsed = JSON.stringify(dest);
            localStorage.setItem('destinations', parsed);
        }
    },
    computed: {
        getSearchURL: function() {
            return function(place) {
                const param = new URLSearchParams();
                param.append('query', place);
                const query = param.toString();
                const url = 'https://www.google.com/maps/search/?api=1&'
                console.log(url + query);
                return url + query;
            }
        },
        getDirectionURL: function() {
            return function(place, way) {
                const param = new URLSearchParams();
                param.append('destination', place);
                param.append('travelmode', way);
                const query = param.toString();
                const url = 'https://www.google.com/maps/dir/?api=1&'
                console.log(url + query);
                return url + query;
            }
        },
    },
    methods: {
        addDestination: function() {

            try {
                this.destinations.push({
                    way: this.newWay,
                    place: this.newDestination,
                    memo: this.newMemo,
                });
            } catch(e) {
                this.destinations = [];
            }
            this.closeDestModal();
        },
        clearModal: function() {
            this.newWay = '';
            this.newDestination = '';
            this.newMemo = '';
        },
        closeDestModal: function() {
            this.clearModal();
            this.destModalClass = "modal";
        },
        showDestModal: function() {
            this.destModalClass = "is-active modal";
        },
        deleteCard: function(index) {
            this.destinations.splice(index, 1);
        }
    }
})