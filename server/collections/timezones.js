Timezones.allow({
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

Timezones.before.insert(function(userId, doc) {
	
});

Timezones.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Timezones.before.remove(function(userId, doc) {
	
});

Timezones.after.insert(function(userId, doc) {
	
});

Timezones.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Timezones.after.remove(function(userId, doc) {
	
});
