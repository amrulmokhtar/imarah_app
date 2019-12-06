Meteor.publish("user_events", function(search,limit) {
    var regex = new RegExp(search,'i');
    return Events.find({$or: [
        { name: regex}
    ]}, {limit: limit, fields:{name:1, date:1, time:1}});
});

 Meteor.publish('events_with_ids', function(id_array){
     //console.log(id_array);
     var events = Events.find({_id:{$in:id_array}});
     //console.log(events.fetch());
    return events;
 });

Meteor.publish('events_for_mosque_managed_by_user', function(userid) {
    var mosque = Mosques.findOne({managers: userid});
    if (mosque) {
        return Events.find({mosque_id: mosque._id},{fields: {picture:0}});
    }else{
        return Events.find({},{fields: {picture: 0}});
    }
});

Meteor.publish("single_event", function(activityId) {
    return Events.find({_id:activityId}, {});
});

Meteor.publish("imam_events", function(imamId) {
    return Events.find({imams:imamId}, {fields: {picture: 0}});
});

Meteor.publish("all_events", function() {
    return Events.find({}, {fields: {picture: 0}});
});

Meteor.publish("imam_edit_event", function(eventId) {
    return Events.find({_id:eventId}, {fields: {picture: 0}});
});

Meteor.publish("near_events", function(userLocation,distance,limit){
    userLocation = userLocation || {lat:0,lng:0};
    return Events.find({'location.geometry':{$near:{
        $geometry:
        {
            type:"Point",
            coordinates:[userLocation.lng, userLocation.lat]
        },
        $maxDistance: distance
    }}},
        {fields:{name:1,location:1,imam_names:1,mosque_name:1},limit:limit})
});

Meteor.publish("mosque_events", function(mosqueId) {
    return Events.find({mosque_id:mosqueId}, {fields: {picture: 0}});
});

Meteor.publish("mosque_edit_event", function(eventId) {
    return Events.find({_id:eventId}, {});
});

Meteor.publish("admin_all_events", function() {
    return Events.find({}, {fields: {picture: 0}});
});

Meteor.publish("edit_event", function(eventId) {
    return Events.find({_id:eventId}, {});
});
