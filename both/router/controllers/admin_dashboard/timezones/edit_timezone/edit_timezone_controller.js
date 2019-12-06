this.AdminDashboardTimezonesEditTimezoneController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardTimezonesEditTimezone': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("edit_timezone", this.params.timezoneId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			edit_timezone: Timezones.findOne({_id:this.params.timezoneId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});