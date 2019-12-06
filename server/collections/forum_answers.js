ForumAnswers.allow({
	insert: function (userId, doc) {
		return Users.isInRoles(userId, ["imam"]);
	},

	update: function (userId, doc, fields, modifier) {
		return userId && doc.imam_id == userId && Users.isInRoles(userId, ["imam"]);
	},

	remove: function (userId, doc) {
		return userId && doc.imam_id == userId && Users.isInRoles(userId, ["admin","imam"]);
	}
});

ForumAnswers.before.insert(function(userId, doc) {
	
	if(!doc.imam_id) doc.imam_id = userId;
});

ForumAnswers.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ForumAnswers.before.remove(function(userId, doc) {
	
});

ForumAnswers.after.insert(function(userId, doc) {
	
});

ForumAnswers.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ForumAnswers.after.remove(function(userId, doc) {
	
});
