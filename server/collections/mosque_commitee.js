MosqueCommitee.allow({
	insert: function (userId, doc) {
		return Users.isInRoles(userId, ["admin","mosque"]);
	},

	update: function (userId, doc, fields, modifier) {
		return Users.isInRoles(userId, ["admin","mosque"]);
	},

	remove: function (userId, doc) {
		return Users.isInRoles(userId, ["admin","mosque"]);
	}
});

MosqueCommitee.before.insert(function(userId, doc) {
	
});

MosqueCommitee.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MosqueCommitee.before.remove(function(userId, doc) {
	
});

MosqueCommitee.after.insert(function(userId, doc) {
	
});

MosqueCommitee.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MosqueCommitee.after.remove(function(userId, doc) {
	
});
