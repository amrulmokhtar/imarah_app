Location = new ReactiveDict();
//var CurLocation = new ReactiveVar();
Location.set('current', {lat: 0, lng: 0});
Location.set('selected', {});
Location.set('geolocation', Geolocation.latLng());
locationDep = new Deps.Dependency;

/**
* Initializes the map
* @this
*/
Template.map.rendered = function() {
    var mapdiv = this.find('#map');
    //console.log(CurLocation)
    var position = Geolocation.latLng();
    var waitsecs = 0;
    Location.set('current', position);
    initMap(mapdiv);
    Deps.autorun(function() {
        updateMap(mapdiv);
    });
    /*if (position) {
        //var position = Location.get("geolocation");

    }else {
        //waitForPosition()
    }*/

};

var map, marker;

var updateMap = function(mapdiv) {
    //locationDep.depend();
    if (!map) {
        initMap(mapdiv);
    }
    position = Location.get('current');

    map.panTo(position);
    marker.setLatLng(position);
    marker.update();
};

var initMap = function(mapdiv) {
    position = Location.get('current');
    map = L.map(mapdiv).setView([position.lat, position.lng], 15);
    marker = L.marker([position.lat, position.lng]).addTo(map);

    Location.set('geojson', marker.toGeoJSON());
    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">' +
            'OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', function(event) {
        marker.setLatLng(event.latlng);
        marker.update();
        Location.set('geojson', marker.toGeoJSON());
        Location.set('current', event.latlng);
    });
};

Template.map.helpers({
    location: function() {
        return Location.get('current');
    }
});
