Imams.allow({
	insert: function (userId, doc) {
		return Users.isInRoles(userId, ["admin","mosque","imam"]);
	},

	update: function (userId, doc, fields, modifier) {
		return Users.isInRoles(userId, ["admin","mosque","imam"]);
	},

	remove: function (userId, doc) {
		return Users.isInRoles(userId, ["admin"]);
	}
});

Imams.before.insert(function(userId, doc) {
	
});

Imams.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Imams.before.remove(function(userId, doc) {
	
});

Imams.after.insert(function(userId, doc) {
	
});

Imams.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Imams.after.remove(function(userId, doc) {
	
});
