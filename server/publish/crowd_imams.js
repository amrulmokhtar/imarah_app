Meteor.publish("crowd_add_imam", function() {
	return CrowdImams.find({}, {});
});

Meteor.publish("crowd_imams", function() {
	return CrowdImams.find({}, {});
});

