this.MosqueDashboardMosqueProfileMosqueProfileUpdateController = RouteController.extend({
	template: "MosqueDashboardMosqueProfileMosqueProfileUpdate",
	yieldTemplates: {
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
			Meteor.subscribe("update_mosque", this.params.mosqueId)
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
			update_mosque: Mosques.findOne({_id:this.params.mosqueId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});