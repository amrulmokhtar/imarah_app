CommunityMembers.allow({
	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return Users.isInRoles(userId, ["admin","mosque"]) || userId && doc.owner_id == userId;
	},

	remove: function (userId, doc) {
		return Users.isInRoles(userId, ["admin","mosque"]) || (userId && doc.owner_id == userId);
	}
});

CommunitySMS.allow({
    insert: function (userId, doc) {
        return Users.isInRoles(userId, ["admin","mosque"])
    },

    update: function (userId, doc, fields, modifier) {
        return Users.isInRoles(userId, ["admin","mosque"]);
    },

    remove: function (userId, doc) {
        return Users.isInRoles(userId, ["admin","mosque"]);
    }
});

CommunityMembers.before.insert(function(userId, doc) {
	
	if(!doc.owner_id) doc.owner_id = userId;
});

CommunityMembers.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CommunityMembers.before.remove(function(userId, doc) {
	
});

CommunityMembers.after.insert(function(userId, doc) {
	
});

CommunityMembers.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CommunityMembers.after.remove(function(userId, doc) {
	
});
