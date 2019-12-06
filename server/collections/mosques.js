Mosques.allow({
    insert: function (userId, doc) {
	return Users.isInRoles(userId, ["admin","mosque"]);
    },

    update: function (userId, doc, fields, modifier) {
        console.log(fields);
        if(fields.indexOf('sms_credits')>=0){
            return Users.isInRoles(userId, ["admin"]);
        }else{
            return Users.isInRoles(userId, ["admin","mosque"]);
        }

    },

    remove: function (userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
    }
});

Mosques.before.insert(function(userId, doc) {

});

Mosques.before.update(function(userId, doc, fieldNames, modifier, options) {
    if(fieldNames.indexOf('posts')>=0){
        //Add a normalized doc to the posts doc for newsfeed population
        if(modifier.$push){
            var postDoc =  modifier.$push.posts
            postDoc.link = doc._id;
            postDoc.type = 'post';
            postDoc.related_to = [doc._id];
            modifier.$push.posts.post_id = Posts.insert(postDoc);
            postDoc.link = undefined;
            postDoc.related_to = undefined;
            postDoc.type = undefined;
            //TODO: ensure that this does not cause problems
            postDoc.author_name = undefined;
        }else if(modifier.$pull){
            Posts.remove({_id:modifier.$push.posts.post_id})
        }else if(modifier.$set){
            var cur_ids = _.pluck(modifier.$set.posts,'post_id');
            var old_ids = _.pluck(doc.posts,'post_id');

            var removed = _.difference(old_ids,cur_ids);
            Posts.remove({_id:removed[0]});
        }
    }
});

Mosques.before.remove(function(userId, doc) {

});

Mosques.after.insert(function(userId, doc) {

});

Mosques.after.update(function(userId, doc, fieldNames, modifier, options) {

});

Mosques.after.remove(function(userId, doc) {

});

Mosques._ensureIndex({"location.geometry":"2dsphere"});
