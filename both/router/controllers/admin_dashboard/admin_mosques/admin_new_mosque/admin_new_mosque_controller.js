this.AdminDashboardAdminMosquesAdminNewMosqueController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminMosquesAdminNewMosque': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("mosque_city"),
			Meteor.subscribe("mosque_countries"),
			Meteor.subscribe("mosque_timezones"),
			Meteor.subscribe("users"),
			Meteor.subscribe("admin_create_mosque")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			mosque_city: Cities.find({}, {}),
			mosque_countries: Countries.find({}, {}),
			mosque_timezones: Timezones.find({}, {}),
			users: Users.find({}, {}),
			admin_create_mosque: Mosques.findOne({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});