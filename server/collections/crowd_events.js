CrowdEvents.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return true;
	},

	remove: function (userId, doc) {
		return Users.isInRoles(userId, ["admin"]);
	}
});

CrowdEvents.before.insert(function(userId, doc) {
	
});

CrowdEvents.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CrowdEvents.before.remove(function(userId, doc) {
	
});

CrowdEvents.after.insert(function(userId, doc) {
	
});

CrowdEvents.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CrowdEvents.after.remove(function(userId, doc) {
	
});
