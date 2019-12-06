this.ServiceAmenities = new Meteor.Collection('service_amenities');
this.ServiceAmenities.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: 'Amenity or Service Name'
    },
    bookable: {
        type: Boolean,
        label: 'Is this Amenity or Service Bookable?'
    },
    fee: {
        type: Number,
        decimal: true,
        label: 'Fee to use the Amenity or Service'
    },
    description: {
        type: String,
        label: 'Description of Amenity. State if fee if hourly or once-off'
    },
    mosque_id: {
        type: Meteor.Collection.ObjectID,
        label: 'ID of Mosque the Amenity Belongs to'
    }
}));


this.AmenityBookings = new Meteor.Collection('amenitybookings');
this.AmenityBookings.attachSchema(new SimpleSchema({
    mosque_id: {
        type: 'String',
        label: 'ID of Mosque the booking belongs to'
    },
    amenity_id: {
        type: 'String'
    },
    amenity_name: {
        type: 'String'
    },
    reason: {
        type: 'String'
    },
    status: {
        type: 'String'
    },
    reply_notes:{
        type: 'String',
        optional: true
    },
    reply_further_action:{
        type: 'String',
        optional: true
    },
    customer: {
        type: 'String',
        label: 'Name of customer'
    },
    user_id: {
        type: 'String'
    },
    date: {
        type: Date,
        label: 'Date of booking'
    },
    time: {
        type: Date,
        label: 'Time for booking'
    }
}));
