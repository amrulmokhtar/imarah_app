this.CrowdSourcingContributeMosqueController = RouteController.extend({
	template: "CrowdSourcing",
	yieldTemplates: {
		'CrowdSourcingContributeMosque': { to: 'CrowdSourcingSubcontent'}
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
			Meteor.subscribe("crowd_add_mosque")
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
			crowd_add_mosque: CrowdMosques.findOne({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});