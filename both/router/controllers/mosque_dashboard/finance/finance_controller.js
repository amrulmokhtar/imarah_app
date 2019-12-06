this.MosqueDashboardFinanceController = RouteController.extend({
    template: "MosqueDashboard",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
        'Mosquefinance': { to: 'MosqueDashboardSubcontent'}
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
        var userrole=Meteor.user().roles ;
        /*

          if(userrole=='admin'){
          manager=Meteor.userId();
          }
          else{

          manager=Meteor.user().profile.manager;
          }*/
        return [
            Meteor.subscribe("single_mosque",Meteor.user().profile.managed_mosque_id),
            Meteor.subscribe("mosque_finances",Meteor.user().profile.managed_mosque_id)
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        return {
            //TODO: make this work for array of managers instead of single manager
            managed_mosque: Mosques.findOne(),
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
