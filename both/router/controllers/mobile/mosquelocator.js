var loc = {lat:0,lng:0};
if(Meteor.isClient){
    Session.setDefault('geolocation', loc);
}


MosquelocatorController = RouteController.extend({
  waitOn: function() {
      //loc = Geolocation.latLng();
      if(Meteor.isClient){
          loc = Session.get('geolocation') || loc;
      }

      return [
          Meteor.subscribe('near_mosques', loc, 10000)
      ];
  },

  data: function() {
      //loc = Geolocation.latLng();
      return {
          near_mosques: Mosques.find()
      };
  },

  action: function() {
    this.render();
  }
});
