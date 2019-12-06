this.AdminDashboardAdminMosquesCrowdMosquesController = RouteController.extend({
	template: "AdminDashboard",
	yieldTemplates: {
		'AdminDashboardAdminMosquesCrowdMosques': { to: 'AdminDashboardAdminMosquesSubcontent'},
		'AdminDashboardAdminMosques': { to: 'AdminDashboardSubcontent'}
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
			Meteor.subscribe("admin_all_mosques"),
			Meteor.subscribe("crowd_mosques")
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		user=Meteor.user().roles;
		if (user=='admin') {
			var userid=Meteor.userId()
		}
		else{
		}
		return {
			params: this.params || {},
			admin_all_mosques: Mosques.find({}, {}),
			crowd_mosques: CrowdMosques.find({}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});
