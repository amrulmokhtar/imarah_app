this.HomePrivateController = RouteController.extend({
	template: "HomePrivate",
	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},
	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},
	action: function() {
		this.render();
		/*ACTION_FUNCTION*/
	},
	waitOn: function() {
		return [
			Meteor.subscribe("user_profile"),
			Meteor.subscribe("user_posts", Meteor.userId()),
			Meteor.subscribe("users"),
			Meteor.subscribe("new_user_post")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			user_profile: Users.find({_id:Meteor.userId()}, {}),
			user_posts: Posts.find({owner_id:Meteor.userId()}, {}),
			users: Users.find({}, {}),
			new_user_post: Posts.findOne({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});