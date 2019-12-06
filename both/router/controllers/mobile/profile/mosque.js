MosqueController = RouteController.extend({
  waitOn: function() {
   //   mq_sub =
      //mq = Mosques.findOne();
      //console.log(mq);
      //ev_sub = Meteor.subscribe('mosque_events', this.params._id);

      return [
          Meteor.subscribe('single_mosque', parseID(this.params._id)),
          Meteor.subscribe("mosque_events", parseID(this.params._id))
      ];
  },
  data: function() {
      return {
          mosque: Mosques.findOne({_id:parseID(this.params._id)}),
          events: Events.find()
      }
  },

  action: function() {
    this.render();
  }
});
