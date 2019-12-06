ForumTopics.allow({
	insert: function (userId, doc) {
		return Users.isInRoles(userId, ["admin"]);
	},

	update: function (userId, doc, fields, modifier) {
		return Users.isInRoles(userId, ["admin"]);
	},

	remove: function (userId, doc) {
		return Users.isInRoles(userId, ["admin"]);
	}
});

ForumTopics.before.insert(function(userId, doc) {
	
});

ForumTopics.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ForumTopics.before.remove(function(userId, doc) {
	
});

ForumTopics.after.insert(function(userId, doc) {
	
});

ForumTopics.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ForumTopics.after.remove(function(userId, doc) {
	
});
