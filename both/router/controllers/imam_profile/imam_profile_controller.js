this.ImamProfileController = RouteController.extend({
	template: "ImamProfile",
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
			Meteor.subscribe("single_imam", this.params.imamId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			single_imam: Imams.find({_id:this.params.imamId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});