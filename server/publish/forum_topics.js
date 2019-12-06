Meteor.publish("admin_all_forum_topics", function() {
	return ForumTopics.find({}, {});
});

Meteor.publish("all_forum_topics", function() {
	return ForumTopics.find({}, {});
});

Meteor.publish("edit_forum_topic", function(forum_topicId) {
	return ForumTopics.find({_id:forum_topicId}, {});
});

