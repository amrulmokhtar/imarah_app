this.ImamDashboardImamEventManagementController = RouteController.extend({
	template: "ImamDashboardImamEventManagement",
	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},
	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},
	action: function() {
		this.redirect('imam_dashboard.imam_event_management.imam_new_event', this.params || {});
		/*ACTION_FUNCTION*/
	},
	waitOn: function() {
		return [
			Meteor.subscribe("imam_events", this.params.imamId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			imam_events: Events.find({imam:this.params.imamId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});