MosqueFinances.allow({
    insert: function (userId, doc) {
       return true;
    },

    update: function (userId, doc, fields, modifier) {
	return Users.isInRoles(userId, ["admin","mosque"]);
    },

    remove: function (userId, doc) {
	return Users.isInRoles(userId, ["admin","mosque"]);
    }
});

MosqueFinances.before.insert(function(userId, doc) {

});

MosqueFinances.before.update(function(userId, doc, fieldNames, modifier, options) {

});

MosqueFinances.before.remove(function(userId, doc) {

});

MosqueFinances.after.insert(function(userId, doc) {

});

MosqueFinances.after.update(function(userId, doc, fieldNames, modifier, options) {

});

MosqueFinances.after.remove(function(userId, doc) {

});
