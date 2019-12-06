this.AdminDashboardCitiesNewCityController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardCitiesNewCity': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("city_timezones"),
			Meteor.subscribe("all_cities")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			city_timezones: Timezones.find({}, {}),
			all_cities: Cities.findOne({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});