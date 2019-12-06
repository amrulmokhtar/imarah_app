this.ImamDashboardImamProfileController = RouteController.extend({
	template: "ImamDashboardImamProfile",
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
			Meteor.subscribe("imam_view_profile", this.params.imamId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			imam_view_profile: Imams.find({_id:this.params.imamId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});