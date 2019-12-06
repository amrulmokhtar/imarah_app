Meteor.publish("crowd_add_mosque", function() {
	return CrowdMosques.find({}, {});
});

Meteor.publish("crowd_mosques", function() {
	return CrowdMosques.find({}, {});
});

