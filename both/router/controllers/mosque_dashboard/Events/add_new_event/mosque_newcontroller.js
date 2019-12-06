this.MosqueDashboardnnewEventsController = RouteController.extend({
    template: "MosqueDashboard",
    fastRender: true,
    yieldTemplates: {
        'Mosque_add_events': { to: 'MosqueDashboardSubcontent'}
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
            //Meteor.subscribe("mosque_events", this.params.mosqueId),
            Meteor.subscribe("event_topics"),
            //Meteor.subscribe("event_imams"),
            Meteor.subscribe('single_mosque', Meteor.user().profile.managed_mosque_id)
            //Meteor.subscribe("event_mosques"),
            //Meteor.subscribe("mosque_city"),
            //Meteor.subscribe("mosque_countries"),
            //Meteor.subscribe("mosque_timezones"),
            //Meteor.subscribe("all_events")
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        var passeddate;
        if(this.params.date){
            passeddate = moment(this.params.date).format('YYYY-MM-DD')
            Session.set('passeddate', this.params.date);
        };
        return {
            params: this.params || {},
            passeddate: passeddate,
            mosque_events: Events.find({mosque: this.params.mosqueId}, {}),
            managed_mosque: Mosques.findOne({managers: Meteor.userId()}),
            event_topics: EventTopics.find({}, {})
            //event_imams: Imams.find({}, {sort:{'first_name':1}})
            //event_mosques: Mosques.find({}, {})
            //mosque_city: Cities.find({}, {}),
            //mosque_countries: Countries.find({}, {}),
            //mosque_timezones: Timezones.find({}, {}),
            //all_events: Events.findOne({}, {})
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
