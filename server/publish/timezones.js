Meteor.publish("mosque_timezones", function() {
	return Timezones.find({}, {});
});

Meteor.publish("city_timezones", function() {
	return Timezones.find({}, {});
});

Meteor.publish("admin_all_timezones", function() {
	return Timezones.find({}, {});
});

Meteor.publish("all_timezones", function() {
	return Timezones.find({}, {});
});

Meteor.publish("edit_timezone", function(timezoneId) {
	return Timezones.find({_id:timezoneId}, {});
});

