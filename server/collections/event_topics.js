EventTopics.allow({
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

EventTopics.before.insert(function(userId, doc) {
	
});

EventTopics.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EventTopics.before.remove(function(userId, doc) {
	
});

EventTopics.after.insert(function(userId, doc) {
	
});

EventTopics.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

EventTopics.after.remove(function(userId, doc) {
	
});
