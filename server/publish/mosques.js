Meteor.publish("user_mosques", function(search, limit) {
    var regex = new RegExp(search, 'i');
    return Mosques.find({$or: [
        //{address: {$regex: regex}},
        { state: {$regex: regex}},
        { name: {$regex: regex}},
        {city_name: {$regex: regex}}
    ]}, {limit: limit, fields:{name:1,address:1, city:1, city_name:1}});
});

Meteor.publish("single_mosque", function(mosqueId) {
    return Mosques.find({_id:mosqueId}, {});
});

Meteor.publish("event_mosques", function() {
    return Mosques.find({}, {fields: {picture:0}});
});

Meteor.publish("mosques_in_state", function(state){
    return Mosques.find({state:state},{fields: {picture: 0}});
})

//Turn Array with possible malformed objectID's into array with valid objectids
fixIDArray = function(id) {

    if(typeof(mid)==typeof({})){
        id = Meteor.Collection.ObjectID(id._str);
    }
    return id;
}

Meteor.publish('my_mosques', function(mosquesArray){
    mosquesArray.map(fixIDArray);
    return Mosques.find({_id:{$in:mosquesArray}});
})

Meteor.publish("user_manages_mosques", function(userId) {
    return Mosques.find({managers:userId});
})

Meteor.publish("near_mosques", function(userLocation,distance){
    return Mosques.find({'location.geometry':{$near:{
        $geometry:
        {type:"Point",
         coordinates:[userLocation.lng,userLocation.lat]
        },
        $maxDistance: distance
    }}},{limit:5,fields:{name:1,address:1,city_name:1,district:1,location:1}})
});

Meteor.publish("mosque_view_profile", function(mosqueId) {
    return Mosques.find({_id:mosqueId}, {});
});

Meteor.publish("update_mosque", function(mosqueId) {
    return Mosques.find({_id:mosqueId}, {});
});

Meteor.publish("admin_all_mosques", function() {
    return Mosques.find({}, {fields: {picture:0}});
});

Meteor.publish("admin_create_mosque", function() {
    return Mosques.find({}, {fields: {picture:0}});
});

Meteor.publish("admin_edit_mosque", function(mosqueId) {
    return Mosques.find({_id:mosqueId}, {});
});
