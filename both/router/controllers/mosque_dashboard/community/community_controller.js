MosqueDashboardCommunityController = RouteController.extend({
    template: "MosqueDashboardCommunity",
    /*yieldTemplates: {
        YIELD_TEMPLATES
           'mosqueamenities': { to: 'MosqueDashboardSubcontent'}
    },*/
  onBeforeAction: function() {
        /*BEFORE_FUNCTION*/
        this.next();
    },
    action: function() {
        this.render();
        /*ACTION_FUNCTION*/
    },
    waitOn: function() {
        //msub =
        //mosqueid = Mosques.findOne()._id;
        return [
            //msub,
            Meteor.subscribe("single_mosque",Meteor.user().profile.managed_mosque_id),
            Meteor.subscribe('community_members',Meteor.user().profile.managed_mosque_id),
            Meteor.subscribe('community_sms',Meteor.user().profile.managed_mosque_id)
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        return {
            //TODO: make this work for array of managers instead of single manager
            managed_mosque: Mosques.findOne(),
            community_members: CommunityMembers.find(),
            community_sms: CommunitySMS.find(),
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
