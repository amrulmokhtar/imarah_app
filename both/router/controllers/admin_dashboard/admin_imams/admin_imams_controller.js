this.AdminDashboardAdminImamsController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminImams': { to: 'AdminDashboardSubcontent'}
		/*YIELD_TEMPLATES*/
	},
	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},
	action: function() {
		this.redirect('admin_dashboard.admin_imams.crowd_imams', this.params || {});
		/*ACTION_FUNCTION*/
	},
	waitOn: function() {
		return [
			Meteor.subscribe("imams")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			imams: Imams.find({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});