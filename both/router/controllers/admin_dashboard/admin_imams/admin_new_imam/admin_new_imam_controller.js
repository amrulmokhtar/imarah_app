this.AdminDashboardAdminImamsAdminNewImamController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminImamsAdminNewImam': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("event_topics"),
			Meteor.subscribe("users"),
			Meteor.subscribe("imam_countries"),
			Meteor.subscribe("all_imams")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			event_topics: EventTopics.find({}, {}),
			users: Users.find({}, {}),
			imam_countries: Countries.find({}, {}),
			all_imams: Imams.findOne({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});