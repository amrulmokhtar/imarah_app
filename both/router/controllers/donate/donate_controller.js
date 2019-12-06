/**
 * Created by ryan on 31/01/15.
 */

DonateController = RouteController.extend({
    template: "Donate",
    //fastRender: true,
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
            Meteor.subscribe('single_mosque',parseID(this.params.mosqueId))
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {

        return {
            mosque: Mosques.findOne({_id:parseID(this.params.mosqueId)}),
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});

DonatethanksController = RouteController.extend({
    template: "Donatethanks",
    //fastRender: true,
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
            Meteor.subscribe('single_mosque',parseID(this.params.mosqueId))
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {

        return {
            mosque: Mosques.findOne({_id:parseID(this.params.mosqueId)}),
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});