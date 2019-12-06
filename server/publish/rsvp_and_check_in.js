Meteor.publish('user_checkins', function(userId) {
    return Check_In.find({user_id: userId});
});

Meteor.publish('user_rsvps', function(userId) {
    return RSVP.find({user_id: userId});
});

Meteor.publish('mosque_checkins', function(mosqueId) {
    return Check_In.find({mosque_id: mosqueId});
});

Meteor.publish('mosque_rsvps', function(mosqueId) {
    return RSVP.find({mosque_id: mosqueId});
});

Meteor.publish('event_checkins', function(eventId) {
    return Check_In.find({event_id: eventId});
});

Meteor.publish('event_rsvps', function(eventId) {
    return RSVP.find({event_id: eventId});
});
