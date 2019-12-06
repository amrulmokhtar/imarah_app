this.AdminDashboardAdminEventsCrowdEventsController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminEventsCrowdEvents': { to: 'AdminDashboardAdminEventsSubcontent'},
		'AdminDashboardAdminEvents': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("admin_all_events"),
			Meteor.subscribe("crowd_events")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		
		return {
			params: this.params || {},
			admin_all_events: Events.find({}, {}),
			crowd_events: CrowdEvents.find({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});