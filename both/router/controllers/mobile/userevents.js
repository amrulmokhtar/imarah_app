UsereventsController = RouteController.extend({
  waitOn: function () {
    var rsvps = Meteor.subscribe('user_rsvps',Meteor.userId()||'unregistered');

    var event_ids = _.pluck(RSVP.find().fetch(), 'event_id');

    return[
        rsvps,
        Meteor.subscribe('events_with_ids',event_ids)
    ]
  },

  data: function () {

    return {
      events:Events.find()
    }
  },

  action: function () {
    this.render();
  }
});