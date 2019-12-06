ServiceAmenityTypes.allow({
	insert: function (userId, doc) {
		return Users.isInRoles(userId, ["admin","mosque"]);
	},

	update: function (userId, doc, fields, modifier) {
		return Users.isInRoles(userId, ["admin","mosque"]);
	},

	remove: function (userId, doc) {
		return Users.isInRoles(userId, ["admin"]);
	}
});

ServiceAmenityTypes.before.insert(function(userId, doc) {
	
});

ServiceAmenityTypes.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ServiceAmenityTypes.before.remove(function(userId, doc) {
	
});

ServiceAmenityTypes.after.insert(function(userId, doc) {
	
});

ServiceAmenityTypes.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ServiceAmenityTypes.after.remove(function(userId, doc) {
	
});
