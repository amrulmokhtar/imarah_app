this.CrowdSourcingContributeImamController = RouteController.extend({
	template: "CrowdSourcing",
	yieldTemplates: {
		'CrowdSourcingContributeImam': { to: 'CrowdSourcingSubcontent'}
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
			Meteor.subscribe("crowd_add_imam")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			event_topics: EventTopics.find({}, {}),
			users: Users.find({}, {}),
			imam_countries: Countries.find({}, {}),
			crowd_add_imam: CrowdImams.findOne({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});