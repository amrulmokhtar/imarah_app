this.AdminDashboardAdminImamsAdminEditImamController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminImamsAdminEditImam': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("admin_edit_imam", this.params.imamId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			event_topics: EventTopics.find({}, {}),
			users: Users.find({}, {}),
			imam_countries: Countries.find({}, {}),
			admin_edit_imam: Imams.findOne({_id:this.params.imamId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});