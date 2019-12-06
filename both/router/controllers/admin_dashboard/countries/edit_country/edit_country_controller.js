this.AdminDashboardCountriesEditCountryController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardCountriesEditCountry': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("edit_country", this.params.countryId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			edit_country: Countries.findOne({_id:this.params.countryId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});