Session.setDefault('searchQuery','e');
Session.setDefault('loadlimit',20);

SearchController = RouteController.extend({
    template: "Search",
    yieldTemplates: {
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
        //TODO: Fix subscriptions sothat they aren't all loaded at once
        return [
            Meteor.subscribe("user_mosques",
                Session.get('searchQuery'),
                Session.get('loadlimit')),
            Meteor.subscribe("user_events",
                Session.get('searchQuery'),
                Session.get('loadlimit')),
            Meteor.subscribe("user_imams",
                Session.get('searchQuery'),
                Session.get('loadlimit'))
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        return {
            params: this.params || {}
            //user_events: Events.find({}, {}),
            //user_mosques: Mosques.find({}, {}),
            //user_imams: Imams.find({}, {})
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
