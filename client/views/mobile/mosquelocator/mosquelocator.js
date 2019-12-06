/*****************************************************************************/
/* Mosquelocator: Event Handlers and Helpersss .js*/
/*****************************************************************************/



Template.mosquelocator.events({
    /*
     * Example:
     *  'click .selector': function (e, tmpl) {
     *
     *  }
     */
});

Template.mosquelocator.helpers({
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

Template.mosqueLocatorHeader.events({

    'touchstart #backButton1': function (evt) {
        globalmenuToggle();
        evt.preventDefault();
    },
    'click #backButton1': function(e, tmpl) {
        globalmenuToggle();
        //   Session.set('menuOpen', !Session.get('menuOpen'));
    }
});

Template.mosquesCard.helpers({
    distancefrom: function(point, latlng){
        //console.log(point)
        //console.log(latlng)
        var point2 = {type: 'Point', coordinates:[latlng.lng, latlng.lat]};
        meters = GeoJSON.pointDistance(point.geometry, point2);
        kmeters = meters/1000;
        return kmeters.toFixed(2) + 'km away';
    },
    clientPos: function() {
        return Geolocation.latLng() || { lat: 0, lng: 0 };
    }
})

Template.mosqueLocatorContained.helpers({
    distancefrom: function(point, latlng){
        var point2 = {type: 'Point', coordniates:[latlng.lng, latlng.lat]};
        meters = gju.pointDistance(point, point2);
        kmeters = meters/1000;
        return kmeters + 'km';
    },
    clientPos: function() {
        loc = Geolocation.latLng() || { lat: 0, lng: 0 };
        Session.set('geolocation',loc);
        return loc;
    },
    nearbymosques: function(coordinates) {

        return Mosques.find().fetch();
    }
});

Template.mosqueLocatorContainer.helpers({
    mosqueMapHeight: function () {
        var height = window.innerHeight, hgt = (2/3*(height) - 60) + 'px';
        return hgt;
    }
});

Template.mosqueLocatorContainer.rendered = function () {
    //L.Icon.Default.imagePath =
    mosques = Mosques.find().fetch();
    loc = Geolocation.latLng() || {lat:0,lng:0};
    var mapdiv = this.find('#mapNearbyMosques');
    map = L.map(mapdiv).setView([loc.lat, loc.lng], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: mosques.length + ' mosques nearby'
    }).addTo(map);
    L.Icon.Default.imagePath = 'packages/leaflet/images';
    map._onResize();


    /*
    Mosques.find({'location.geometry':{$near:{
        $geometry:
        {type:"Point",
         coordinates:[loc.lng,loc.lat]
        },
        $maxDistance: 10000}}},{}).fetch()
      */
    mosques.forEach(function(mosque) {
        //console.log(mosque)
        coords = mosque.location.geometry.coordinates;
        var tmark = L.marker([coords[1],coords[0]]);
        tmark.bindPopup(mosque.name);
        tmark.addTo(map);
    });


};

/*****************************************************************************/
/* Mosquelocator: Lifecycle Hooks */
/*****************************************************************************/
Template.mosquelocator.created = function() {
};

Template.mosquelocator.rendered = function() {
};

Template.mosquelocator.destroyed = function() {
};
