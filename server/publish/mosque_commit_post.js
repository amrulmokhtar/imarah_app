Meteor.publish("user_mosquecommit", function(userId) {
	return MosqueCommitpost.find({ownerId:userId}, {});
});

Meteor.publish("new_mosque_commit", function() {
	return MosqueCommitpost.find({}, {});
});

