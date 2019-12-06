MosqueDashboardController = RouteController.extend({
    template: "MosqueDashboard",
    fastRender: true,
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
        'MosqueDashboardMosqueMenu': { to: 'MosqueDashboardSubcontent'}
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
            Meteor.subscribe("mosque_finances",Meteor.user().profile.managed_mosque_id),
            Meteor.subscribe('mosque_events', Meteor.user().profile.managed_mosque_id),
            Meteor.subscribe("single_mosque",Meteor.user().profile.managed_mosque_id)
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        var managed_mosque = Mosques.findOne({},{});
        if(managed_mosque.posts){
            managed_mosque.posts.reverse();
        }
        return {
            //TODO: make this work for array of managers instead of single manager
            managed_mosque: managed_mosque,
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
