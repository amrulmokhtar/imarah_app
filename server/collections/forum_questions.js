ForumQuestions.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return userId && doc.owner_id == userId;
	},

	remove: function (userId, doc) {
		return userId && doc.owner_id == userId;
	}
});

ForumQuestions.before.insert(function(userId, doc) {
	
	if(!doc.owner_id) doc.owner_id = userId;
});

ForumQuestions.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ForumQuestions.before.remove(function(userId, doc) {
	
});

ForumQuestions.after.insert(function(userId, doc) {
	
});

ForumQuestions.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ForumQuestions.after.remove(function(userId, doc) {
	
});
