/**
 * Created by ryan on 20/01/15.
 */

JaisDashboardController = RouteController.extend({
    template: "JaisDashboard",
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
            Meteor.subscribe('mosques_in_state','Selangor')
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        var districts;
        districts = _.chain(
            Mosques.find({$and:[{district: {$ne: ''}},
            {district: {$ne: undefined}}]}).fetch())
            .pluck('district').uniq().value();
        districts.push('Other');
        return {
            districts:districts,
            mosques: Mosques.find(),
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
