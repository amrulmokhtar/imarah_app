Meteor.publish("crowd_add_event", function() {
	return CrowdEvents.find({}, {});
});

Meteor.publish("crowd_events", function() {
	return CrowdEvents.find({}, {});
});

