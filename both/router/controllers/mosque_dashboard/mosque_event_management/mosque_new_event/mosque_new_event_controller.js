this.MosqueDashboardMosqueEventManagementMosqueNewEventController = RouteController.extend({
    template: "MosqueDashboardMosqueEventManagement",
    yieldTemplates: {
        'MosqueDashboardMosqueEventManagementMosqueNewEvent': { to: 'MosqueDashboardMosqueEventManagementSubcontent'}
        /*YIELD_TEMPLATES*/
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
        return [
            Meteor.subscribe("mosque_events", this.params.mosqueId),
            Meteor.subscribe("event_topics"),
            //Meteor.subscribe("event_imams"),
            Meteor.subscribe("event_mosques"),
            Meteor.subscribe("mosque_city"),
            Meteor.subscribe("mosque_countries"),
            Meteor.subscribe("mosque_timezones"),
            Meteor.subscribe("all_events")
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        return {
            params: this.params || {},
            mosque_events: Events.find({mosque:this.params.mosqueId}, {}),
            event_topics: EventTopics.find({}, {}),
            //event_imams: Imams.find({}, {}),
            event_mosques: Mosques.find({}, {}),
            mosque_city: Cities.find({}, {}),
            mosque_countries: Countries.find({}, {}),
            mosque_timezones: Timezones.find({}, {}),
            all_events: Events.findOne({}, {})
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
