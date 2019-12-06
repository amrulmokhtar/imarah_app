/**
 * Created by ryan on 20/01/15.
 */

JaisEventsController = RouteController.extend({
    template: "JaisEvents",
    fastRender: true,
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
            Meteor.subscribe('mosques_in_state','Selangor')
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {

        return {
            mosques: Mosques.find({},{sort:{name:1}}),
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
