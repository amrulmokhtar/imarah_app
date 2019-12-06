Meteor.publish("event_topics", function() {
	return EventTopics.find({}, {});
});

