this.ActivityProfileController = RouteController.extend({
	template: "ActivityProfile",
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
			Meteor.subscribe("single_event", this.params.activityId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			single_event: Events.find({_id:this.params.activityId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});