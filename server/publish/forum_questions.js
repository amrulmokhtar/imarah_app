Meteor.publish("all_forum_questions", function() {
	return ForumQuestions.find({}, {});
});

