Meteor.publish("user_imams", function(search, limit) {
    var regex = new RegExp(search,'i');
    return Imams.find({
        $or: [
            {first_name: regex},
            {title: regex},
            {last_name: regex}]
    }, {limit: limit, fields:{first_name:1, last_name:1, title:1, picture:1}});
});

Meteor.publish('my_imams',function(imamArray){
    return Imams.find({_id:{$in:imamArray}});
})

Meteor.publish("single_imam", function(imamId) {
    return Imams.find({_id:imamId}, {});
});

Meteor.publish("event_imams", function() {
    return Imams.find({},
                      {fields:
                       {title: 1,
                        first_name: 1,
                        last_name: 1
                       }});
});

Meteor.publish("imam_view_profile", function(imamId) {
    return Imams.find({_id:imamId}, {});
});

Meteor.publish("update_imam", function(imamId) {
    return Imams.find({_id:imamId}, {});
});

Meteor.publish("imams", function() {
    return Imams.find({}, {fields:
                           {
                               title: 1,
                               first_name: 1,
                               last_name: 1
                           }});
});

Meteor.publish("all_imams", function() {
    return Imams.find({}, {fields: {picture:0}});
});

Meteor.publish("admin_edit_imam", function(imamId) {
    return Imams.find({_id:imamId}, {fields: {picture:0}});
});
