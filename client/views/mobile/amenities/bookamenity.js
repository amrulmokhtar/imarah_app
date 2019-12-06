/**
 * Created by ryan on 29/01/15.
 */


Template.Bookamenity.created = function(){

}

Template.BookingOfSurface.created = function(){
    console.log(this);
}

Template.bookingSurface.events({
    'click #bookingButton': function(e,t){
        validateForm(
            $('#bookingform'),
            function(fieldName, fieldValue) {

            },
            function(msg) {

            },
            function(values) {
                var amenity = ServiceAmenities.findOne()
                values.date = moment(values.date)._d;
                values.amenity_name = amenity.name;
                values.amenity_id = amenity._id;
                values.user_id = Meteor.userId();
                values.reason = values.reason || 'Not Specified';
                values.time = moment(values.time,'HH:mm')._d;
                values.reply_notes = ' ';
                values.reply_further_action = ' ';
                values.status = 'new';
                values.mosque_id = amenity.mosque_id;
                values.customer = Meteor.user().profile.name;
                AmenityBookings.insert(values);
            }
        )
    }
});