var loc = {lat:0,lng:0};
if(Meteor.isClient){
  Session.setDefault('geolocation', Geolocation.latLng() || loc);
}

NewsfeedController = RouteController.extend({
  waitOn: function () {
    if(Meteor.isClient){
      Session.set('geolocation',Geolocation.latLng());
      loc = Session.get('geolocation');
    }
    var my_mosques = EJSON.parse(localStorage.getItem('my_mosques')||'[]');
    var my_imams = EJSON.parse(localStorage.getItem('my_imams')||'[]');

    return [
      Meteor.subscribe('near_events', loc, 5000, 10),
      Meteor.subscribe('related_to_by_posted_date',my_imams.concat(my_mosques),10),
      Meteor.subscribe('related_to_by_relevant_date',my_imams.concat(my_mosques),10)
        //Subs from when newsfeed content was generated directly from mosque and imam docs
      //Meteor.subscribe('my_mosques',my_mosques),
      //Meteor.subscribe('my_imams',my_imams)
    ]
  },

  data: function () {
  },

  action: function () {


    this.render();
  }
});