/*****************************************************************************/
/* Qiblat: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.qiblat.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.qiblat.helpers({
    size4: function () {
      var width = window.innerWidth,
      height = window.innerHeight;
      return [width, height];
  },
  size1: function () {
    return [(window.innerWidth),55];
  }, 
  size2: function () {
    return [(window.innerWidth), (window.innerHeight - 60)];
  },
  size3: function () {
    return [(window.innerWidth), 120]
  }, 
  size4: function () {
    return [(window.innerWidth), (window.innerHeight - 210 )]
  }
});

Template.qiblatHeader.events({
    'touchstart #barIcon': function (evt) {
        globalmenuToggle();
        evt.preventDefault();
    },
    'click #barIcon': function(e, tmpl) {
        globalmenuToggle();
    }
});

Template.compassSurface.helpers({
    clientDist: function() {
        var latlong = Geolocation.latLng() || { lat: 0, lng: 0 },
          p1 = new LatLon(latlong.lat,latlong.lng),
          p2 = new LatLon(21.42250,39.82620);

        return dist = p1.distanceTo(p2);
    },
    clientBearing: function() {
        var latlong = Geolocation.latLng() || { lat: 0, lng: 0 },
          p1 = new LatLon(latlong.lat,latlong.lng),
          p2 = new LatLon(21.42250,39.82620);

          if (Session.get('heading')) {
            var kabaDir = Session.get('heading');
          } else {
            var kabaDir = 90;
          }
        return (345 - kabaDir + p1.bearingTo(p2));
    },
    compassDir: function() {
        if(Session.get('heading')){
            heading = 345 - Session.get('heading');
            //console.log(heading);
            return heading;
        }else{
            return 90;
        }

    }
})

Template.greenPrayerCard.helpers(prayerCardHelpers);

/*
Template.contentCard.helpers({
    helper: function() {
        if (window.DeviceOrientationEvent) {
            //console.log("DeviceOrientation");
            // Listen for the deviceorientation event and handle the raw data
            window.addEventListener('deviceorientation', function(eventData) {
                // gamma is the left-to-right tilt in degrees, where right is positive
                var tiltLR = eventData.gamma;

                // beta is the front-to-back tilt in degrees, where front is positive
                var tiltFB = eventData.beta;

                // alpha is the compass direction the device is facing in degrees
                var dir = eventData.alpha

                // call our orientation event handler
                //console.log(tiltFB, tiltLR, dir);
                return tiltLR;
            }, false);
        } else {
            return "Not supported.";
        }
    }
});*/
/*****************************************************************************/
/* Qiblat: Lifecycle Hooks */
/*****************************************************************************/
Template.qiblat.created = function () {
};

var iCompassWatch;

Template.qiblat.rendered = function () {
    if (Meteor.isCordova) {
    iCompassWatch=navigator.compass.watchHeading(
        function (heading) {
            var newHeading = Math.round(heading.magneticHeading);
            Session.set("heading",newHeading);
        },
        function (error) {
            alert("Error: " + error.code);
        }, {frequency : 80});
    }
};

Template.qiblat.destroyed = function () {
    if (Meteor.isCordova) {
        navigator.compass.clearWatch(iCompassWatch);
    }
};
