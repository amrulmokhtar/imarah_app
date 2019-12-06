/**
 * Created by ryan on 10/01/15.
 */
var loc = {lat:0,lng:0};
NearbyEventsController = RouteController.extend({
    waitOn: function () {
        if(Meteor.isClient){
            //Session.set(Geolocation.latLng());
            loc = Session.get('geolocation');
        }
        return [
            Meteor.subscribe('near_events', loc, 5000, 10)
        ]
    },

    data: function () {
    },

    action: function () {
        this.render();
    }
});