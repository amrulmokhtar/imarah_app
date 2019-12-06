Meteor.publish("mosque_countries", function() {
	return Countries.find({}, {});
});

Meteor.publish("imam_countries", function() {
	return Countries.find({}, {});
});

Meteor.publish("admin_all_countries", function() {
	return Countries.find({}, {});
});

Meteor.publish("all_countries", function() {
	return Countries.find({}, {});
});

Meteor.publish("edit_country", function(countryId) {
	return Countries.find({_id:countryId}, {});
});

