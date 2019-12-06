/*****************************************************************************/
/* Nearbyevents: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Nearbyevents.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.nearbyEventsContainer.rendered = function () {
        var mapdiv = this.find('#mapNearby');
            map = L.map(mapdiv).setView([3.1333, 101.7000], 9);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '15 events nearby'
        }).addTo(map);
         L.Icon.Default.imagePath = 'packages/leaflet/images';
        map._onResize();
};

Template.Nearbyevents.helpers({
  size1: function () {
    var width = window.innerWidth;
    return [width, 27.5];
  },
  size2: function () {
    var width = window.innerWidth;
    return [width, 190];
  },
    size4: function () {
      var width = window.innerWidth,
      height = window.innerHeight;
      return [width, height];
  }
});

Template.nearbyEventsContainer.helpers({
  mapHeight: function () {
    var height = window.innerHeight, hgt = (2/3*(height) - 60) + 'px';

    return hgt;
  }
});

Template.nearByAreaHeader.events({
  'click #backButton1': function () {
      window.history.back();
  }
});

/*****************************************************************************/
/* Nearbyevents: Lifecycle Hooks */
/*****************************************************************************/
Template.Nearbyevents.created = function () {
};

Template.Nearbyevents.rendered = function () {
};

Template.Nearbyevents.destroyed = function () {
};

