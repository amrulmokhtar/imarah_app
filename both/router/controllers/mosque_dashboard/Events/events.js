this.MosqueDashboardEventsController = RouteController.extend({
    template: "MosqueDashboard",
    fastRender: true,
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
        'Mosque_events': { to: 'MosqueDashboardSubcontent'}
    },
    onBeforeAction: function() {
        /*BEFORE_FUNCTION*/

        this.next();
    },
    action: function() {
        this.render();
        /*ACTION_FUNCTION*/
    },
    waitOn: function() {
        //var msub =

         return [
             Meteor.subscribe('single_mosque', Meteor.user().profile.managed_mosque_id),
             Meteor.subscribe('mosque_events', Meteor.user().profile.managed_mosque_id)
             //Meteor.subscribe("event_topics"),
             //Meteor.subscribe("event_imams")
            //Meteor.subscribe("event_mosques"),
            //Meteor.subscribe("mosque_city"),
            //Meteor.subscribe("mosque_countries"),
            //Meteor.subscribe("mosque_timezones"),
            //Meteor.subscribe("all_events")
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {




        return {
            params: this.params || {},
            t_mosque: Mosques.findOne()
            //event_imams: Imams.find({}, {})
            /*event_mosques: Mosques.find({}, {}),
            mosque_city: Cities.find({}, {}),
            mosque_countries: Countries.find({}, {}),
            mosque_timezones: Timezones.find({}, {}),
            all_events: Events.findOne({}, {})*/
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
