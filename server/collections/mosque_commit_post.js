MosqueCommitpost.allow({
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

MosqueCommitpost.before.insert(function(userId, doc) {
	
});

MosqueCommitpost.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MosqueCommitpost.before.remove(function(userId, doc) {
	
});

MosqueCommitpost.after.insert(function(userId, doc) {
	
});

MosqueCommitpost.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

MosqueCommitpost.after.remove(function(userId, doc) {
	
});
