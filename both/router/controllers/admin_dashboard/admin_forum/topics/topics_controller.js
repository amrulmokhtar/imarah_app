this.AdminDashboardAdminForumTopicsController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminForumTopics': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("admin_all_forum_topics")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			admin_all_forum_topics: ForumTopics.find({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});