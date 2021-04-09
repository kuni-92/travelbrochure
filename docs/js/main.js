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
            this.destinations.push({
                way: this.newWay,
                place: this.newDestination,
                memo: this.newMemo,
            });
            this.newWay = '';
            this.newDestination = '';
            this.newMemo = '';
            this.closeDestModal();
        },
        closeDestModal: function() {
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