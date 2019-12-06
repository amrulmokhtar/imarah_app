Countries.allow({
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

Countries.before.insert(function(userId, doc) {
	
});

Countries.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Countries.before.remove(function(userId, doc) {
	
});

Countries.after.insert(function(userId, doc) {
	
});

Countries.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Countries.after.remove(function(userId, doc) {
	
});
