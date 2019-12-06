this.MosqueProfileController = RouteController.extend({
	template: "MosqueProfile",
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
			Meteor.subscribe("single_mosque", this.params.mosqueId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			single_mosque: Mosques.find({_id:this.params.mosqueId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});