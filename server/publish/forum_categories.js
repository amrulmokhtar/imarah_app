Meteor.publish("forum_categories", function() {
	return ForumCategories.find({}, {});
});

