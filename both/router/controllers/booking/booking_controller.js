/**
 * Created by ryan on 20/01/15.
 */

BookamenityController = RouteController.extend({
    template: "Bookamenity",
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
            Meteor.subscribe('single_amenity',this.params.amenityId)
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {

        return {
            amenity: ServiceAmenities.findOne()
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
