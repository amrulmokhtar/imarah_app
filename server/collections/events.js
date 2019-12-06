Events.allow({
    insert: function (userId, doc) {
	return Users.isInRoles(userId, ["admin","mosque","imam"]);
    },

    update: function (userId, doc, fields, modifier) {
	return Users.isInRoles(userId, ["admin","mosque","imam"]);
    },

    remove: function (userId, doc) {
	return Users.isInRoles(userId, ["admin","mosque","imam"]);
    }
});

Events.before.insert(function(userId, doc) {
    doc = Meteor.call('denormalizeEvent',doc);
    //Mosques.update({_id:doc.mosque_id,'event.stats.'})
    var event_stats = Mosques.findOne({_id:doc.mosque_id}).event_stats || [];
    var stats_for_month = _.find(event_stats,function(event){
            return event._id && event._id.month == doc.date.getMonth()+1 && event._id.year == doc.date.getYear()})
        || event_stats[event_stats.push(
            {_id:
            {month:doc.date.getMonth()+1,year:doc.date.getFullYear()},
                total_rsvp: 0,
                avg_rsvp: 0,
                total_check_in: 0,
                avg_check_in :0
                //FIXME: figure out if this causes issues
                //avg_rating: 0
            })-1];

    stats_for_month.total_events = stats_for_month.total_events || 0;
    stats_for_month.total_events++;


    Mosques.update({_id:doc.mosque_id},
        {$set:{event_stats:event_stats}});

    doc.post_id = Posts.insert(
        {
            type:'event',
            related_to:[doc.mosque_id].concat(doc.imams),
            posted_date: new Date(),
            relevant_date: doc.date,
            content: doc.name,
            mosque_name: doc.mosque_name,
            imam_names: doc.imam_names,
            link: doc._id,
            time: doc.time
        })
});

Events.before.update(function(userId, doc, fieldNames, modifier, options) {
    if(doc.post_id){
        Posts.update({_id:doc.post_id},{
            $set:{posted_date:new Date(), relevant_date:doc.date}});
    }
});

Events.before.remove(function(userId, doc) {

});

Events.after.insert(function(userId, doc) {

});

Events.after.update(function(userId, doc, fieldNames, modifier, options) {

});

Events.after.remove(function(userId, doc) {
    Posts.remove({_id:doc.post_id});
});

Events._ensureIndex({"location.geometry":"2dsphere"});
//_ensureIndex({location.geometry:"2dsphere"});
