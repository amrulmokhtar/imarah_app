this.AdminDashboardAdminImamsCrowdImamsController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminImamsCrowdImams': { to: 'AdminDashboardAdminImamsSubcontent'},
		'AdminDashboardAdminImams': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("imams"),
			Meteor.subscribe("crowd_imams")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			imams: Imams.find({}, {}),
			crowd_imams: CrowdImams.find({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});