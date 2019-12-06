this.AdminDashboardCitiesEditCityController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardCitiesEditCity': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("edit_city", this.params.cityId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			city_timezones: Timezones.find({}, {}),
			edit_city: Cities.findOne({_id:this.params.cityId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});