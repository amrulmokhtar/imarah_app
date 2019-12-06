this.MosqueDashboardfeedbackController = RouteController.extend({
    template: "MosqueDashboard",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
           'Mosqufeedback': { to: 'MosqueDashboardSubcontent'}
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
            Meteor.subscribe("single_mosque",Meteor.user().profile.managed_mosque_id),
            Meteor.subscribe("feedback_for_mosque",Meteor.user().profile.managed_mosque_id)
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        return {
            //TODO: make this work for array of managers instead of single manager
            managed_mosque: Mosques.find({managers:Meteor.userId()},{}),
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});


