/*****************************************************************************/
/* Mosquemapview: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Mosquemapview.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

Template.mosqueMapHeader.events({
  'click #backButton1': function () {
    window.history.back();
  }
});

Template.Mosquemapview.helpers({
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

Template.mosqueMapHeaderBar.rendered = function () {
  var mapdiv = this.find('#map');
            map = L.map(mapdiv).setView([3.1333, 101.7000], 9);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '15 events nearby'
        }).addTo(map);
         L.Icon.Default.imagePath = 'packages/leaflet/images';
        map._onResize();
};

/*****************************************************************************/
/* Mosquemapview: Lifecycle Hooks */
/*****************************************************************************/
Template.Mosquemapview.created = function () {
};

Template.Mosquemapview.rendered = function () {
};

Template.Mosquemapview.destroyed = function () {
};