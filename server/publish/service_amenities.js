Meteor.publish('mosque_amenities', function(mosqueid) {
    return ServiceAmenities.find({'mosque_id': mosqueid});
});

Meteor.publish('single_amenity',function(amenity_id){
    return ServiceAmenities.find({_id:amenity_id});
});

Meteor.publish('mosque_amenity_bookings', function(mosqueid) {
    return AmenityBookings.find({mosque_id: mosqueid});
});


Meteor.publish('mosque_amenities_by_user', function(userid) {
    var mid = Mosques.findOne({managers: userid})._id;
    return ServiceAmenities.find({'mosque_id': mid});
});

Meteor.publish('mosque_amenity_bookings_by_user', function(userid) {
    var mosqueid = Mosques.findOne({managers: userid})._id;
    return AmenityBookings.find({mosque_id: mosqueid});
});
