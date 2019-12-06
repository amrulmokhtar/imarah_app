this.MosqueDashboardMosqueEventManagementMosqueEditEventController = RouteController.extend({
	template: "MosqueDashboardMosqueEventManagementMosqueEditEvent",
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
			//Meteor.subscribe("event_imams"),
			Meteor.subscribe("event_mosques"),
			Meteor.subscribe("mosque_city"),
			Meteor.subscribe("mosque_countries"),
			Meteor.subscribe("mosque_timezones"),
			Meteor.subscribe("mosque_edit_event", this.params.eventId)
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		return {
			params: this.params || {},
			event_topics: EventTopics.find({}, {}),
			//event_imams: Imams.find({}, {}),
			event_mosques: Mosques.find({}, {}),
			mosque_city: Cities.find({}, {}),
			mosque_countries: Countries.find({}, {}),
			mosque_timezones: Timezones.find({}, {}),
			mosque_edit_event: Events.findOne({_id:this.params.eventId}, {})
		};
		/*DATA_FUNCTION*/
	},
	onAfterAction: function() {
	}
});