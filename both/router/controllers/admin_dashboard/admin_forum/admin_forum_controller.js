this.AdminDashboardAdminForumController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminForum': { to: 'AdminDashboardSubcontent'}
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
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {}
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});