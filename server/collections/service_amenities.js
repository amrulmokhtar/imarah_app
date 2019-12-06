ServiceAmenities.allow({
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

ServiceAmenities.before.insert(function(userId, doc) {
	
});

ServiceAmenities.before.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ServiceAmenities.before.remove(function(userId, doc) {
	
});

ServiceAmenities.after.insert(function(userId, doc) {
	
});

ServiceAmenities.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

ServiceAmenities.after.remove(function(userId, doc) {
	
});

AmenityBookings.allow({
    insert: function (userId, doc) {
        return true;//Users.isInRoles(userId, ["admin","mosque"]);
    },

    update: function (userId, doc, fields, modifier) {
        return Users.isInRoles(userId, ["admin","mosque"]);
    },

    remove: function (userId, doc) {
        return Users.isInRoles(userId, ["admin","mosque"]);
    }
});