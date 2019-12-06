Check_In.allow({
    insert: function (userId, doc) {
        return true;
    },

    update: function (userId, doc, fields, modifier) {
        return Users.isInRoles(userId, ["admin", "mosque"]);
    },

    remove: function (userId, doc) {
        return Users.isInRoles(userId, ["admin", "mosque"]);
    }
});

RSVP.allow({
    insert: function (userId, doc) {
        return true;
    },

    update: function (userId, doc, fields, modifier) {
        return Users.isInRoles(userId, ["admin","mosque"]);
    },

    remove: function (userId, doc) {
        return true;
        //return userId == doc.user_id || Users.isInRoles(userId, ["admin","mosque"]);
    }
});

RSVP.before.insert(function(uid,doc){
    Events.update({_id:doc.event_id},{$inc:{totalRSVP:1}});
});

RSVP.before.remove(function(uid,doc){
   Events.update({_id:doc.event_id},{$inc:{totalRSVP:-1}});
});

Check_In.before.insert(function(uid,doc){
    doc.mosque_id = parseID(doc.mosque_id);
    if(doc.event_id){
        //var event = Events.find({_id:doc.event_id});
        Events.update({_id:doc.event_id},{$inc:{totalCheckins:1}});
    }

    //FIXME: THIS HAS TO BE REMOVED
    //FIXME: have to figure out when is the best time/way good
    Meteor.call('denormalizeMosque',Mosques.findOne({_id:doc.mosque_id}),function(e,resp){
        delete resp._id;
        Mosques.update({_id:doc.mosque_id},resp);
    })
})