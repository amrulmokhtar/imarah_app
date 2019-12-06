Meteor.publish("user_posts", function(userId) {
	return Posts.find({ownerId:userId}, {});
});

Meteor.publish("new_user_post", function() {
	return Posts.find({}, {});
});

Meteor.publish('related_to_by_posted_date', function(related_id_array,limit){
	return Posts.find(
		{
			related_to:{$in: related_id_array}
		},
		{
			sort:{posted_date:-1},
			limit:limit
		});
})

Meteor.publish('related_to_by_relevant_date', function(related_id_array,limit){
	return Posts.find(
		{
			related_to:{$in: related_id_array},
			relevant_date:{$gt:new Date()}
		},
		{
			sort:{relevant_date:-1},
			limit:limit
		});
})