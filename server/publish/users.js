 Meteor.publish("users", function() {
        return Meteor.users.find({}, {});
});

  
    Meteor.publish("user_profile", function(userId) {
        return Meteor.users.find({_id:userId}, {});
});