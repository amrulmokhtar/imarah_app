/*****************************************************************************/
/* Prayertimes: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.prayertimes.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.prayertimes.helpers({
  size1: function () {
    var width = window.innerWidth;
    return [width, 27.5];
  },
  size2: function () {
    var width = window.innerWidth;
    return [width, 200];
  },
    size4: function () {
      var width = window.innerWidth,
      height = window.innerHeight;
      return [width, height];
  }
});

Template.prayerTimesContainerHeader.events({
    'touchstart #backButton1': function (evt) {
        globalmenuToggle();
        evt.preventDefault();
    },
    'click #backButton1': function () {
        globalmenuToggle();
    }
});

Template.prayerTimesLatestHeader.helpers(prayerCardHelpers);

Template.prayerTimesList.helpers({
    clientPos: function() {
        return Geolocation.latLng() || { lat: 0, lng: 0 };
    },
    prayerTimes: function(location) {
        var alltimes = prayTimes.getTimes(new Date(),
                                          [location.lat, location.lng]);
        var formatted = [];

        for (time in alltimes) {

            if(time=='midnight' || time=='sunset'){

            }else{
                var str = time.charAt(0).toUpperCase() + time.slice(1);
                if(time=='dhuhr'){str='Zohor'}

                formatted.push({time: alltimes[time], name: str});
            }

        }
        return formatted;
    }
})

/*****************************************************************************/
/* Prayertimes: Lifecycle Hooks */
/*****************************************************************************/
Template.prayertimes.created = function () {
};

Template.prayertimes.rendered = function () {
};

Template.prayertimes.destroyed = function () {
};
