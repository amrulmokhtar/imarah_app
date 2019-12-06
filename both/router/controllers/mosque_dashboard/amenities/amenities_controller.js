this.MosqueDashboardAmenitiesController = RouteController.extend({
    template: "MosqueDashboard",
    yieldTemplates: {
        /*YIELD_TEMPLATES*/
           'mosqueamenities': { to: 'MosqueDashboardSubcontent'}
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
        //msub =
        //mosqueid = Mosques.findOne()._id;
        return [
            //msub,
            Meteor.subscribe("single_mosque",Meteor.user().profile.managed_mosque_id),
            Meteor.subscribe('mosque_amenities', Meteor.user().profile.managed_mosque_id),
            Meteor.subscribe('mosque_amenity_bookings', Meteor.user().profile.managed_mosque_id)
        ];
        /*WAIT_FUNCTION*/
    },
    data: function() {
        return {
            //TODO: make this work for array of managers instead of single manager
            managed_mosque: Mosques.findOne(),
            approvedbookings: AmenityBookings.find({status: 'approved'}),
            disapprovedbookings: AmenityBookings.find({status: 'disapproved'}),
            unreadbookings: AmenityBookings.find({status: 'unread'}),
            amenities: ServiceAmenities.find(),
            params: this.params || {}
        };
        /*DATA_FUNCTION*/
    },
    onAfterAction: function() {
    }
});
