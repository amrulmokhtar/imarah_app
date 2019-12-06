this.ImamDashboardImamProfileImamProfileUpdateController = RouteController.extend({
	template: "ImamDashboardImamProfileImamProfileUpdate",
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
			Meteor.subscribe("event_topics"),
			Meteor.subscribe("users"),
			Meteor.subscribe("imam_countries"),
			Meteor.subscribe("update_imam", this.params.imamId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			event_topics: EventTopics.find({}, {}),
			users: Users.find({}, {}),
			imam_countries: Countries.find({}, {}),
			update_imam: Imams.findOne({_id:this.params.imamId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});