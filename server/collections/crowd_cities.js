CrowdCities.allow({
    insert: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return Users.isInRoles(userId, ["admin"]);
    }
});


CrowdCities._ensureIndex({"location.geometry":"2dsphere"});
