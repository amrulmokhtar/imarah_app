Cities.allow({
    insert: function (userId, doc) {
        return Users.isInRoles(userId, ["admin"]);
    },

    update: function (userId, doc, fields, modifier) {
        return Users.isInRoles(userId, ["admin"]);
    },

    remove: function (userId, doc) {
        return Users.isInRoles(userId, ["admin"]);
    }
});

Cities.before.insert(function(userId, doc) {

});

Cities.before.update(function(userId, doc, fieldNames, modifier, options) {

});

Cities.before.remove(function(userId, doc) {

});

Cities.after.insert(function(userId, doc) {

});

Cities.after.update(function(userId, doc, fieldNames, modifier, options) {

});

Cities.after.remove(function(userId, doc) {

});

Cities._ensureIndex({"location.geometry":"2dsphere"});
