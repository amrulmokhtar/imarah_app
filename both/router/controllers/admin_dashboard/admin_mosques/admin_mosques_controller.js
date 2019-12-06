this.AdminDashboardAdminMosquesController = RouteController.extend({
	template: "AdminDashboard ",
	yieldTemplates: {
		'MosqueDashboardMosqueMenu': { to: 'AdminDashboardSubcontent'}
		/*YIELD_TEMPLATES*/
	},
	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},
	action: function() {
		this.redirect('admin_dashboard.admin_mosques.crowd_mosques', this.params || {});
		/*ACTION_FUNCTION*/
	},
	waitOn: function() {
		return [
			Meteor.subscribe("admin_all_mosques")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			admin_all_mosques: Mosques.find({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});