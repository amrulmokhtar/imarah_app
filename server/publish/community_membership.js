Meteor.publish("community_members", function(mosque_id) {
        return CommunityMembers.find({mosque_id:mosque_id})
});

Meteor.publish("community_sms", function(mosque_id) {
    return CommunitySMS.find({mosque_id:mosque_id})
});