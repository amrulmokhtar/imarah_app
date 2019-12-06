this.MosqueDashboardMosqueProfileController = RouteController.extend({
    template: "MosqueDashboardMosqueProfile",
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
        return [
            Meteor.subscribe("mosque_view_profile", this.params.mosqueId)
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        return {
            params: this.params || {},
            mosque_view_profile: Mosques.find({_id:this.params.mosqueId}, {})
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
