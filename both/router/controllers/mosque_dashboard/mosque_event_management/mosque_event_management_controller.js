this.MosqueDashboardMosqueEventManagementController = RouteController.extend({
	template: "MosqueDashboardMosqueEventManagement",
	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},
	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},
	action: function() {
		this.redirect('mosque_dashboard.mosque_event_management.mosque_new_event', this.params || {});
		/*ACTION_FUNCTION*/
	},
	waitOn: function() {
		return [
			Meteor.subscribe("mosque_events", this.params.mosqueId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			mosque_events: Events.find({mosque:this.params.mosqueId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});