Posts.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return userId && doc.owner_id == userId;
	},

	remove: function (userId, doc) {
		return userId && doc.owner_id == userId;
	}
});

Posts.before.insert(function(userId, doc) {
	
	if(!doc.owner_id) doc.owner_id = userId;
});

Posts.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Posts.before.remove(function(userId, doc) {
	
});

Posts.after.insert(function(userId, doc) {
	
});

Posts.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Posts.after.remove(function(userId, doc) {
	
});
