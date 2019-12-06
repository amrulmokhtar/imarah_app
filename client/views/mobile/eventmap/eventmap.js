/*****************************************************************************/
/* Eventmap: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Eventmap.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.Eventmap.helpers({    
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

Template.eventMapHeader.events({
  'click #backButton1': function () {
    window.history.back();
  }
});

Template.eventMapHeaderBar.rendered = function () {
  var mapdiv = this.find('#map');
            map = L.map(mapdiv).setView([3.1333, 101.7000], 9);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '15 events nearby'
        }).addTo(map);
         L.Icon.Default.imagePath = 'packages/leaflet/images';
        map._onResize();
};
/*****************************************************************************/
/* Eventmap: Lifecycle Hooks */
/*****************************************************************************/
Template.Eventmap.created = function () {
};

Template.Eventmap.rendered = function () {
};

Template.Eventmap.destroyed = function () {
};
