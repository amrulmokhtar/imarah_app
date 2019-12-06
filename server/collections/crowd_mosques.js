CrowdMosques.allow({
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

CrowdMosques.before.insert(function(userId, doc) {
	
});

CrowdMosques.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CrowdMosques.before.remove(function(userId, doc) {
	
});

CrowdMosques.after.insert(function(userId, doc) {
	
});

CrowdMosques.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CrowdMosques.after.remove(function(userId, doc) {
	
});
