ForumCategories.allow({
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

ForumCategories.before.insert(function(userId, doc) {
	
});

ForumCategories.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ForumCategories.before.remove(function(userId, doc) {
	
});

ForumCategories.after.insert(function(userId, doc) {
	
});

ForumCategories.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ForumCategories.after.remove(function(userId, doc) {
	
});
