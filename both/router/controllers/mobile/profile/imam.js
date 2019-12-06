ImamController = RouteController.extend({
  waitOn: function() {
      var id = parseID(this.params._id);
      return [
          Meteor.subscribe('single_imam', id),
          //Meteor.subscribe('imam_events', id)
          ];
  },

  data: function() {
      return{
          imam: Imams.findOne({_id:parseID(this.params._id)})
          //events: Events.find()
      };
  },

  action: function () {
    this.render();
  }
});
