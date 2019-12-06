CrowdImams.allow({
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

CrowdImams.before.insert(function(userId, doc) {

});

CrowdImams.before.update(function(userId, doc, fieldNames, modifier, options) {

});

CrowdImams.before.remove(function(userId, doc) {

});

CrowdImams.after.insert(function(userId, doc) {

});

CrowdImams.after.update(function(userId, doc, fieldNames, modifier, options) {

});

CrowdImams.after.remove(function(userId, doc) {

});
