this.AdminDashboardAdminForumTopicsEditTopicController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminForumTopicsEditTopic': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("forum_categories"),
			Meteor.subscribe("edit_forum_topic", this.params.forum_topicId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			forum_categories: ForumCategories.find({}, {}),
			edit_forum_topic: ForumTopics.findOne({_id:this.params.forum_topicId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});